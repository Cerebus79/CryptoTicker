
import React, { useState } from 'react';
import axios from 'axios';
import ValidationErrors from './ValidationErrors';
import { Button } from "@material-tailwind/react";

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/'
    const [errors,setError] = useState(null);
    

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setError(err) );
    }

    return (
        <>
            <h1>Test errors</h1>
            <div className="flex w-max gap-4">
                    <Button onClick={handleNotFound}>Not Found</Button>
                    <Button onClick={handleBadRequest}>Bad request</Button>
                    <Button onClick={handleValidationError}>Validation Error</Button>
                    <Button onClick={handleServerError}>Server error</Button>
                    <Button onClick={handleUnauthorised}>Unauthorised</Button>
                    <Button onClick={handleBadGuid}>Bad guid</Button>
                </div>
                {
                    errors && <ValidationErrors errors={errors}/>
                }
            
        </>
    )
}

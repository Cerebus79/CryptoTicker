import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../model/serverError";


export default class CommonStore
{
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor()
    {
        makeAutoObservable(this);

        reaction(
            () => this.token, //runs when change to this
            token => {        //reaction to run after a change
                if(token){
                    window.localStorage.setItem('jwt', token);
                }
                else
                {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) =>{
        this.token = token;
    }

    setAppLoaded = () =>{
        this.appLoaded = true;
    }

}
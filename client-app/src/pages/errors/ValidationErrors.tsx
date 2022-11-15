import ErrorMsg from "../../components/errors/ErrorMsg";


interface props {
    errors: any
}

export default function ValidationErrors({errors}:props)
{
    return(
        <div>
            {errors && (
                <div>
                    {
                        errors.map((err:any, i:any)=>( 
                            <ErrorMsg key={i} errorMsg={err} />
                        ))
                    }
                </div>
            )}
        </div>
    );
}
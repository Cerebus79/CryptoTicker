interface props {
    errorTitle?: string;
    errorMsg : string;
}

export default function ErrorMessage({errorTitle, errorMsg}:props) {

    return (
        <>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {errorTitle ? <strong className="font-bold">{errorTitle}</strong> : "" }
                
                <span className="block sm:inline">{errorMsg}</span>
            </div>
        </>
    );

}

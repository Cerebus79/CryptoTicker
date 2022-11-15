
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../middleware/api/agent";
import { User, UserFormValues } from "../model/user";

//import { history } from "../..";

export default class UserStore
{
    user: User | null = null;
    
    constructor()
    {
        makeAutoObservable(this);
    }

    get IsLoggedIn()
    {
        return !!this.user;
    }

    login = async (userVals:UserFormValues) =>
    {
        try
        {
            var user = await agent.AccountApi.login(userVals);

            runInAction(()=> this.user = user );

            console.log(user);
        }
        catch(errors)
        {
            console.log(errors);
            throw errors;
        }
    }
/*
    logout = async () =>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () =>
    {
        try
        {
            const user = await agent.Account.current();

            runInAction(()=> this.user = user );
        }
        catch(error)
        {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) =>
    {
        try{

            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);

            runInAction(()=>{
                
                this.user = user;
               
            });

            history.push('/activities');
            store.modalStore.closeModal();


        }
        catch(error)
        {
            throw(error);
        }
    }*/
}
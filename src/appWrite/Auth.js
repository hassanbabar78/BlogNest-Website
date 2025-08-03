import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";


class AuthServices{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
   

    async createAccount({email, password, name}){
        try {
            if (password.length < 8) {
              throw new Error("Password must be at least 8 characters long");
            }
            const createdAccount =  await this.account.create(ID.unique(), email, password, name);
            if(createdAccount){
                console.log("The account has been created successfully...");
                // I wanted that user must go towards the login upon creation of Account
                // return this.login(email, password);
                return createdAccount;
            }else{
                return createdAccount;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async login({email, password}){
        try {
            const logged = await this.account.createEmailPasswordSession(email, password);
            return logged;
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
           const user = await this.account.get();
           return user;
           console.log(user);
        } catch (error) {
            throw error;
        }
        return null; // Incase the user could not get
    }
    async logout(){
        try {
           return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authServices = new AuthServices()

export default authServices;
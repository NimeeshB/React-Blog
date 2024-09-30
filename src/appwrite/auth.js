import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
     client = new Client()
     account;

     constructor(){ // Jab bhi koi obj use karein/ banaye tab client aur account ka access hona chahiye and uss liye constructor ke andar hai client aur account 
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjecdId);

        this.account= new Account(this.client);
     }

     async createAccount({email, password, name})
     {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method 
                return this.login({email, password}); 
            }
            else{
                return userAccount;

            }

            
        } catch (error) {
            console.log("Apprwrite service :: createAccount error ::", error);
        }

     }

     async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
     }

     async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            console.log("Apprwrite service :: getCurrentUser error ::", error);
        }
        return null;
     }

     async logout(){
        try {
            await this.account.deleteSessions(); // deletesessions se saare session delete hojayenge, jis bhi browser se user ne login kiya hai sare logout
        } catch (error) {
            console.log("Apprwrite service :: logout error ::", error)
        }
     }
}

const authService = new AuthService();
export default authService
import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service
{
    client = new Client()
    databases; // account tabhi banna chahiye jab account create hota hai that is whe someone usees the object
    bucket;

    constructor()
    {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjecdId);

        this.databases = new Databases(this.client) // yahape banega account because as soon as object is created the constructor is calledd
        this.bucket = new Storage(this.client) // this is used because if we dont use this then these variables will be treated as local variables and cannot be accessed outside of this class/ method. Now that 'this' is used they are the properties of the object created of the Service class
     }

     //content is whatever user mentions in the Realtime text editor, featured image is the image taken from the user while creating the post, slug is auto populated with the title in small case 
     //status is either active or inactive which can be selected when a post is created 
     //featuredImage is the ID for that particular image stored in DB 

     //The keys in the data object ({title, content, featuredImage, status, userId}) must match the field names in your Appwrite collection schema. When you call createDocument, Appwrite matches these keys with the field names in the collection.
     async createPost({title, slug, content, featuredImage, status, userId})
     {
        try 
        {   //slug value passed is used as the document ID here in the createDocument 
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {title, content, featuredImage, status, userId})
        } 
        catch (error) 
        {
            console.log("Appwrite service :: createPost :: error", error);
        }
     }

     // naya wala title,content, featured imag, status. UserID change nahi hoga, that will be same as jo creator hoga post ka usko hi post ka edit access milega
     async updatePost(slug, {title, content, featuredImage, status })
     {
        try 
        {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {title, content, featuredImage, status})           
        } 
        catch (error) 
        {
            console.log("Appwrite service :: updatePost :: error", error)
        }
     }

     async deletePost(slug)
     {
        try 
        {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true
            
        } 
        catch (error)
        {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
     }

     async getPost(slug){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug) 
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
     }

     async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, queries) 
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
     }

     //yahape file ka blob dena hai and not the file name 
     async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file) 
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
     }

     async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId) 
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
     }

     getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(config.appwriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false
        }
     }

}


const service = new Service()
export default service
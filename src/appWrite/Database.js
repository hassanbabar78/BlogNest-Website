// import { Client, Databases,Storage,  ID } from "appwrite";
// import conf from "../conf/conf";


// export class DataServices{
//     client = new Client();
//     databases;
//     storage;

//     constructor(){
//         this.client
//             .setEndpoint(conf.appwriteURL)
//             .setProject('<PROJECT_ID>');
//         this.databases = new Databases(this.client);
//         this.storage = new Storage(this.client);
//     }

//     async createPost({title, content, slug, featuredImage, status, userId}){
//         try {
//             return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,{
//                 title,
//                 content,
//                 featuredImage,
//                 status,
//                 userId
//             })
//         } catch (error) {
//             throw error;
//         }
//     }

//     async updatePost(slug,{title, content, featuredImage, status}){
//         try {
//             return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
//                 title,
//                 content,
//                 featuredImage,
//                 status
//             });
//         } catch (error) {
//             throw error;
//         }
//     }
//     async deletePost(slug){
//         try {
//             return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getAllPosts(queries = [Query.equal("status","active")]){
//         try {
//             return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
//         } catch (error) {
//             throw error;
//         }
//     }

//     async uploadFile(file){
//         try {
//             return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async deleteFile(fileId){
//         try {
//             return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getFilePreview(fileId){
//         try {
//             return await this.storage.getFilePreview(conf.appwriteBucketId, fileId);
//         } catch (error) {
//             throw error;
//         }
//     }
// };

// const dataServices = new DataServices();
// export default dataServices;

import { Client, Databases,Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";


export class DataServices{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, content, slug, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, ID.unique(),{
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            });
        } catch (error) {
            throw error;
        }
    }
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            throw error;
        }
    }

    async getAllActivePosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            throw error;
        }
    }
    async getAllPosts(){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            throw error;
        }
    }
    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            throw error;
        }
    }
    async getFilePreview(fileId){
        try {
            return await this.storage.getFileView(conf.appwriteBucketId, fileId);
        } catch (error) {
            throw error;
        }
    }
};

const dataServices = new DataServices();
export default dataServices;


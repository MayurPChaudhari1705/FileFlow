"use server";
import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file"
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

const handleError = ( error : unknown , message : string ) => {
    console.log(error , message);
    throw error;
}


export const uploadFile = async ({ file , ownerId , accountId , path } : UploadFileProps) => {
    try {
        const { storage , database } = await createAdminClient();

        const inputFile = InputFile.fromBuffer(file , file.name);

        const bucketFile = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            inputFile
        )

        const fileDocument = {
            type : getFileType(bucketFile.name).type,
            name : bucketFile.name,
            url : constructFileUrl(bucketFile.$id),
            extension : getFileType(bucketFile.name).extension,
            size : bucketFile.sizeOriginal,
            owner : ownerId,
            accountId : accountId,
            users : [],
            bucketFileId : bucketFile.$id
        }

        const newFile = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            ID.unique(),
            fileDocument
        ).catch( async (error) => {
            await storage.deleteFile(
                appwriteConfig.bucketId,
                bucketFile.$id
            )

            handleError(error , "Failed to create file document");
        })

        revalidatePath(path);
        return parseStringify(newFile);
    } 
    catch (error) {
        handleError(error , "Failed to upload file");
    }
}

const Queries = ( currentUser : Models.Document , types : string[] , searchText : string , sort : string , limit ?: number) => {
    const queries = [
        Query.or([
            Query.equal("owner" , [currentUser.$id]),
            Query.contains("users" , [currentUser.email])
        ])
    ]

    if(types.length > 0) queries.push(Query.equal("type" , types))
    
    if(searchText) queries.push(Query.contains("name" , searchText))

    if(limit) queries.push(Query.limit(limit))

    if(sort){
        const [ sortBy , orderBy ] = sort.split("-")

        queries.push(
            orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
        )
    }
    return queries;
}

export const getFiles = async ({ types = [] , searchText = "" , sort = "$createdAt-desc" , limit } : GetFilesProps) => {
    const { database } = await createAdminClient();
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) throw new Error("User not found");

        const queries = Queries(currentUser , types , searchText , sort , limit );
        const files = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            queries
        );
        return parseStringify(files);
    } catch (error) {
        handleError(error , "Failed to get files");
    }
}

export const renameFile = async ({ fileName , extension ,  documentId , path } : { fileName : string , extension : string , documentId : string , path : string }) => {
    const { database } =  await createAdminClient();
    try {
        const fullName = `${fileName}.${extension}`
        const file = await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            documentId,
            {
                name : fullName
            }
        )
        revalidatePath(path);
        return parseStringify(file);
    } catch (error) {
        handleError(error , "Failed to rename file");
    }
}

export const updateFileUsers = async ({ emails,  documentId , path } : {  emails : string[] , documentId : string , path : string }) => {
    const { database } =  await createAdminClient();
    try {
        const file = await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            documentId,
            {
                users : emails
            }
        )
        revalidatePath(path);
        return parseStringify(file);
    } catch (error) {
        handleError(error , "Failed to rename file");
    }
}

export const deleteFile = async ({   documentId , bucketFileId , path } : {  documentId : string , bucketFileId : string , path : string }) => {
    const { database , storage } =  await createAdminClient();
    try {
        const deletedFile = await database.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            documentId,
        )
        if(deletedFile){
            await storage.deleteFile(
                appwriteConfig.bucketId,
                bucketFileId
            )
        }
        revalidatePath(path);
        return parseStringify(deletedFile);
    } catch (error) {
        handleError(error , "Failed to rename file");
    }
}

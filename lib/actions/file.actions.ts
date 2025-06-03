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

const Queries = ( currentUser : Models.Document) => {
    const queries = [
        Query.or([
            Query.equal("owner" , [currentUser.$id]),
            Query.contains("users" , [currentUser.email])
        ])
    ]
    return queries;
}

export const getFiles = async () => {
    const { database } = await createAdminClient();
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) throw new Error("User not found");

        const queries = Queries(currentUser);
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
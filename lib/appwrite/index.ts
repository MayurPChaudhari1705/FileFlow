"use server";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const createSessionClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    //Get the session cookie from the request
    const session =  (await cookies()).get("appwrite-session");

    if(!session || !session.value) redirect('sign-in');

    client.setSession(session.value);
    return {
        get account () {
            return new Account(client);
        },

        get database () {
            return new Databases(client);
        }
    }
}

export const createAdminClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

    return {
        get account () {
            return new Account(client);
        },

        get database () {
            return new Databases(client);
        },

        get storage () {
            return new Storage(client);
        },

        get avatars () {
            return new Avatars(client);
        }
    }
}
import { Account, Client } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

const client = new Client()
.setEndpoint(appwriteConfig.endpointUrl)
.setProject(appwriteConfig.projectId);

export const account = new Account(client);


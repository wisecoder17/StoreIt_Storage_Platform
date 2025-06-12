"use server";

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";
import { handleError } from "../utils";
import { redirect } from "next/navigation";

export const initAppwriteClient = (sessionToken?: string) => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  if (sessionToken) {
    client.setSession(sessionToken);
  }

  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    // storage: new Storage(client),
    // avatars: new Avatars(client),
  };
};

export const createSessionClient = async (options?: { required?: boolean }) => {

  const session = (await cookies()).get("appwrite-session");

  if (!session?.value) {
    handleError(new Error("No session found"), "No session found");
    if (options?.required) redirect("/auth/signin");
    return null;
  }

  return initAppwriteClient(session.value);
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};

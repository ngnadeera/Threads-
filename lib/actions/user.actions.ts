"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    userId:String;
    username:String;
    name:String;
    image:String;
    bio:String;
    path:String;

}

export async function updateUser({
    userId,
    username,
    name,
    image,
    bio,
    path,
}: Params): Promise<void> {
    connectToDB;

try {

    await User.findOneAndUpdate(
        { id: userId },
        { username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
        },
        { upsert: true }   //updating and inserting (if specific value does not exist)
        )

        if (path === '/profile/edit'){
            revalidatePath(path);
        }

} catch (err:any) {

    throw new Error(`Failed to create/update user: ${err.message}`)

}

}

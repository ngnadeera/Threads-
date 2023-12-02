"use client"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { userValidation } from "@/lib/validations/user";

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";

interface Props {
    user : {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    }

    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle} : Props) =>   {

   const [files, setFiles] = useState();

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
        }
    });

    const handleImage = (e : ChangeEvent, fiedlChange: (value: string)  => void ) => {
        e.preventDefault();
    }

    function onSubmit(values: z.infer<typeof userValidation>) {
        console.log(values)
      }

    

    return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start
      gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="account-form_image-label">
                {field.value ? (
                    <Image
                        src={field.value}
                        alt="profile photo"
                        width={96}
                        height={96}
                        priority
                        className="rounded-full object-contain"
                    />
                ) : (
                    <Image
                        src="/assets/profile.svg"
                        alt="profile photo"
                        width={24}
                        height={24}
                        priority
                        className="rounded-full object-contain"
                    />
                )}
              </FormLabel>
              <FormControl className="flex-1  text-base-semibold text-gray-200">
                <Input 
                    type="file"
                    accept="image/"
                    placeholder="upload a image"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />


    <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full flex-col">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl >
                <Input 
                type="text"
                className="account-form_input no-focus"
                {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full flex-col">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl className="flex-1  text-base-semibold text-gray-200">
                <Input 
                type="text"
                className="account-form_input no-focus"
                {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full flex-col">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl className="flex-1  text-base-semibold text-gray-200">
                <Textarea 
                rows={10}
                className="account-form_input no-focus"
                {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" >Submit</Button>
      </form>
    </Form>
    )

}

export default AccountProfile;
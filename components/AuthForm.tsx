"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OtpModal from "./OTPModal";

const formSchema = z.object({
  username: z.string().optional(),
  useremail: z.string().email(),
});
type FormType = "sign-up" | "sign-in";
const AuthForm = ({ type }: { type: FormType }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      useremail: ""
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
       const user = await createAccount({
        fullName : values.username || "",
        email : values.useremail
      })
      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const isSignIn = type === "sign-in";
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">{isSignIn ? "Sign In" : "Sign Up"}</h1>
               {!isSignIn &&  <FormField 
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name"  {...field} className="shad-input" />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />}
           <FormField 
            control={form.control}
            name = 'useremail'
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email"  {...field} className="shad-input" />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-submit-btn" disabled = {isLoading} >
            {isSignIn ? "Sign In" : "Sign Up"}
            {isLoading && (
            <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="animate-spin ml-2" />
          )}
          </Button>
          {errorMessage && <p className="error-message">
            *{errorMessage}
            </p>}
            <div className="body02 flex justify-center">
              <p className="text-light-100">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="ml-1 font-medium text-brand" >
              {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </div>
        </form>
      </Form>

      {
        accountId && <OtpModal email={form.getValues("useremail") } accountId={accountId}  />
      }
    </>
  );
};

export default AuthForm;

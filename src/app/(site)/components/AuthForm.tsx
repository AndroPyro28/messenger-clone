"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "../../../components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string(),
  email: z
    .string()
    .email("this should be an email")
    .nonempty("email is required"),
  password: z.string().nonempty("password is required"),
});

export type FormValues = z.infer<typeof schema> | FieldValues;

function AuthForm() {
  type variant = "LOGIN" | "REGISTER";
  const [variants, setVariants] = useState<variant>("LOGIN");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const session = useSession();

  useEffect(() => {
    if(session?.status === 'authenticated') {
      router.push('/users')
    }

  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variants === "LOGIN") {
      setVariants((prev) => "REGISTER");
    } else {
      setVariants((prev) => "LOGIN");
    }
  }, [variants]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const disabled = loading || isSubmitting;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      if (variants == "REGISTER") {
        await axios.post("/api/register", data);
        toast.success("Register Success!");
        const response = await signIn("credentials",data);
      }
      if (variants == "LOGIN") {
        const response = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (response?.error) {
          toast.error("invalid credentials");
        }

        if (response?.ok && !response.error) {
          toast.success("Logged In!");
        }
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const socialActions = async (action: string) => {
    setLoading(true);

    try {
      const response = await signIn(action, { redirect: false });

      if (response?.error) {
        toast.error("invalid credentials");
      }

      if (response?.ok && !response.error) {
        toast.success("Logged In!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mt-8
    sm:max-auto
    sm:w-full
    sm:max-w-md
    "
    >
      <div
        className="bg-white
      px-4
      py-8
      shadow
      sm:rounded-lg
      sm:px-10"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variants === "REGISTER" && (
            <Input
              errors={errors}
              label="Name"
              register={register}
              id="name"
              disabled={disabled}
              placeholder="name"
            />
          )}

          <Input
            errors={errors}
            label="Email"
            type="email"
            register={register}
            id="email"
            placeholder="email"
            disabled={disabled}
          />

          <Input
            errors={errors}
            label="Password"
            type="password"
            register={register}
            id="password"
            placeholder="password"
            disabled={disabled}
          />

          <Button disabled={disabled} type="submit" className="w-full">
            {(() => {
              if (!loading)
                return variants === "LOGIN" ? "Sign in" : "Register";

              return <LoadingSpinner size={20} />;
            })()}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolue inset-0 flex items-center ">
              <div className="w-full border-gray-300 border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 -mt-3">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialActions("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialActions("google")}
            />
          </div>
        </div>

        <div
          className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500"
          onClick={toggleVariant}
        >
          {variants === "LOGIN"
            ? "New to messenger?"
            : "Already have an account?"}
          <div className="underline cursor-pointer">
            {variants === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

import AuthForm from "@/app/(site)/components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:max-auto sm:w-full sm:max-w-md">
        <Image src={'/images/logo.png'} alt="logo" height={"48"} width={"48"} className="mx-auto w-auto" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
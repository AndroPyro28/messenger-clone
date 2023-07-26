"use client"
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {CldUploadButton} from 'next-cloudinary'
function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue("message", "", { shouldValidate: true });
    try {
      const res = await axios.post("/api/messages", {
        ...data,
        conversationId,
      });
    } catch (error) {
      console.error(error)
    }
    
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image:result?.info.secure_url,
      conversationId
    })
  }

  return (
    <div className="px-4 py-4 border-t flex items-center gap-2 lg:gap-4 w-full">
        <CldUploadButton 
        options={{maxFiles:1,}}

        onUpload={handleUpload}
        uploadPreset="next-messenger-clone"
        >
      <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          register={register}
          id="message"
          required
          placeholder="write a message"
          errors={errors}
        />
        <button
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          type="submit"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}

export default Form;

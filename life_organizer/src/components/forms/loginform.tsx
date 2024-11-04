"use client";
import { AuthError } from "next-auth";
import { Input } from "../common/Input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Form from "../common/Form";

export default function LoginForm() {
  const submitUser = async (formData: FormData) => {
    try {
      const login = {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false,
      };
      const session = await signIn("credentials", login);
      if (session?.error === "CredentialsSignin") {
        toast.error("Invalid Credentials");
        document
          .getElementById("loginForm")
          ?.classList.add("border-2", "border-red-500", "p-4", "rounded-xl");
      }
    } catch (err) {
      toast.error("Something Went Wrong");
      console.log(err);
    } finally {
      redirect("/");
    }
  };
  return (
    <Form
      id="loginForm"
      formTitle="Log In"
      submitForm={submitUser}
      submitButtonName="Log In"
    >
      <Input
        type="text"
        name="username"
        label="Username *"
        required
        placeholder="johndoe89"
      />
      <Input
        name="password"
        type="Password"
        label="Create A Password *"
        required
        placeholder="************"
      />
    </Form>
  );
}

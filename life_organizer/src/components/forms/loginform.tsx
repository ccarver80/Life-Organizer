"use client";
import { AuthError } from "next-auth";
import { Input } from "../common/Input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    <div className="flex flex-col p-5 bg-white bg-opacity-80 rounded-xl">
      <div className="text-2xl text-center">
        <h3>
          <b>Login</b>
        </h3>
      </div>
      <div className="flex flex-col w-1/2 mx-auto mt-5 text-center">
        <form
          id="loginForm"
          className="flex flex-col font-bold gap-y-5"
          action={submitUser}
        >
          <Input
            inputClassName="border border-black p-2 rounded"
            type="text"
            name="username"
            label="Username *"
            required
            placeholder="johndoe89"
          />
          <Input
            inputClassName="border border-black p-2 rounded"
            name="password"
            type="Password"
            label="Create A Password *"
            required
            placeholder="************"
          />
          <button
            className="p-5 bg-blue-400 text-white mx-auto mt-5 text-center rounded-xl w-fit"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

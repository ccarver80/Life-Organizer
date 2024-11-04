"use client";
import { createUser } from "@/lib/actions/createUser";
import { Input } from "../common/Input";
import { validateForm } from "@/lib/actions/validateUser";
import Form from "../common/Form";

export default function SignUpForm() {
  const submitUser = async (formData: FormData) => {
    const usernameError = document.getElementById("usernameError");
    const usernameBorder = document.getElementById("usernameDiv");
    const passwordError = document.getElementById("passwordError");
    const passwordBorder = document.getElementById("passwordDiv");

    const formValid = await validateForm(formData);

    if (formValid == "password error") {
      // hide username error border and message
      usernameBorder?.classList.remove("border-2", "border-red-400", "p-2");
      usernameError?.classList.add("hidden");
      // show password error border and message
      passwordBorder?.classList.add("border-2", "border-red-400", "p-2");
      passwordError?.classList.remove("hidden");
    } else if (formValid == "username error") {
      // Hide password error border and message
      passwordBorder?.classList.remove("border-2", "border-red-400", "p-2");
      passwordError?.classList.add("hidden");
      // Show username border and message
      usernameBorder?.classList.add("border-2", "border-red-400", "p-2");
      usernameError?.classList.remove("hidden");
    }
  };

  return (
    <Form
      formTitle="Sign up today!"
      submitForm={submitUser}
      submitButtonName="Sign Up"
    >
      <div id="usernameDiv">
        <Input
          type="text"
          name="username"
          label="Create A Username *"
          required
          placeholder="johndoe89"
        />
        <p id="usernameError" className="hidden text-red-400, font-bold mt-4">
          No Spaces Allowed In Username
        </p>
      </div>
      <div id="passwordDiv" className="flex flex-col gap-2">
        <Input
          name="password"
          type="Password"
          label="Create A Password *"
          required
          placeholder="************"
        />
        <Input
          name="password2"
          type="password"
          label="Confirm Password*"
          required
          placeholder="**************"
        />
        <p id="passwordError" className="hidden text-red-400, font-bold mt-4">
          Please Make Sure Passwords Match
        </p>
      </div>
      <Input
        name="email"
        type="email"
        label="Email Address*"
        placeholder="john_doe_3@emaildomain.com"
        required
      />
    </Form>
  );
}

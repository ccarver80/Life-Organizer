"use client";

import { createRecipe } from "@/lib/actions/createRecipe";
import Form from "../common/Form";
import { Input } from "../common/Input";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function AddRecipeForm() {
  const router = useRouter();
  async function submitRecipe(formData: FormData) {
    const recipe = await createRecipe(formData);
    if (recipe?.rec_id) {
      (document.getElementById("addRecipeForm") as HTMLFormElement)?.reset();
      toast.success("Recipe Added!!");
      router.refresh();
    }
  }

  return (
    <Form
      id="addRecipeForm"
      formTitle="Add Recipe"
      submitForm={submitRecipe}
      submitButtonName="Add Recipe"
    >
      <Input
        type="text"
        name="recipe_name"
        label="Recipe Name"
        placeholder="Chicken Basil Pasta"
      />

      <div className="border border-black p-2 gap-y-2 flex flex-col">
        <h2 className="text-xl">Where did you get this recipe?</h2>
        <p className="">Examples:</p>
        <ul className="text-sm flex flex-col gap-y-2 underline mb-2">
          <li>"Betty Croker CookBook pg-34"</li>
          <li>"Secret Family Recipe"</li>
          <li>"www.recipes.com/beef-stroganof"</li>
        </ul>
        <Input
          type="text"
          name="recipe_source"
          label="Recipe Source"
          placeholder="Cookbook ABC pg 254"
        />
      </div>
    </Form>
  );
}

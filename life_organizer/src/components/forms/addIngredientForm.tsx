"use client";
import { fractionOptions } from "@/lib/constants/fractions";
import Form from "../common/Form";
import { Input } from "../common/Input";
import Select from "../common/Select";
import { unitOptions } from "@/lib/constants/units";
import { useState } from "react";
import { submitIngredients } from "@/lib/actions/PostActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Ingredient {
  number: number;
  ingredient_name: string;
  ingredient_amount: string;
  recipeRec_id: number;
}

export default function AddIngredientForm({
  recipeName,
  recipeId,
}: {
  recipeName: string;
  recipeId: number;
}) {
  const router = useRouter();

  const [ingredients, addIngredient] = useState<Ingredient[]>([]);
  const [ingredientCount, addIngredientCount] = useState(0);

  function removeItem(itemNumber: number) {
    console.log(itemNumber);
    addIngredient((prevItem) =>
      prevItem.filter((item) => item.number !== itemNumber)
    );
  }
  async function submitAllIngredients() {
    const submit = await submitIngredients(ingredients, recipeId);
    if (submit?.count) {
      toast.success("Ingredients Added To Recipe!");
      addIngredient([]);

      (
        document.getElementById(`addIngredient ${recipeId}`) as HTMLFormElement
      ).close();
      router.refresh();
    }
  }

  function submitIngredient(formData: FormData) {
    let ingredient = {
      number: 0,
      recipeRec_id: recipeId,
      ingredient_name: "",
      ingredient_amount: "",
    };
    const whole_number = formData.get("whole_number") as string;
    const fraction = formData.get("fraction") as string;
    const units = formData.get("units") as string;
    const name = formData.get("ingredient_name") as string;

    // Parse string together for ingredient
    addIngredientCount(ingredientCount + 1);
    ingredient = {
      number: ingredientCount,
      ingredient_amount: `${whole_number} ${fraction} ${units}`,
      ingredient_name: name,
      recipeRec_id: recipeId,
    };

    addIngredient((prevItems) => [...prevItems, ingredient]);
    (document.getElementById("addIngredientForm") as HTMLFormElement).reset();
  }
  return (
    <>
      <Form
        id="addIngredientForm"
        formTitle="Add Ingredient"
        submitForm={submitIngredient}
        submitButtonName="Add Ingredient"
      >
        <Input
          inputClassName="w-16 border border-black mx-auto p-2 rounded flex"
          type="number"
          name="whole_number"
          label="Whole Number"
        />
        <Select label="Fraction" name="fraction" options={fractionOptions} />
        <Select label="Units" name="units" options={unitOptions} />
        <Input
          type="Text"
          name="ingredient_name"
          label="Ingredient Name"
          placeholder="whole wheat flour"
        />
      </Form>
      <h2>Ingredients:</h2>
      <ul>
        {ingredients
          ? ingredients.map((ingredient) => {
              return (
                <li>
                  {ingredient.ingredient_amount} {ingredient.ingredient_name}{" "}
                  <button
                    className="text-red-400 ml-2"
                    onClick={() => removeItem(ingredient.number)}
                  >
                    Remove Item
                  </button>
                </li>
              );
            })
          : ""}
      </ul>
      {ingredients.length > 0 ? (
        <button
          onClick={submitAllIngredients}
          className="mx-auto bg-blue-300 text-2xl p-2 rounded-xl w-fit mt-5"
        >
          Add These To Recipie: <u>{recipeName}</u>{" "}
        </button>
      ) : (
        ""
      )}
    </>
  );
}

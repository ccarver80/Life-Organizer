"use client";
import { removeItem } from "@/lib/actions/DeleteActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface Ingredients {
  rec_id: number;
  createdAt: Date;
  updatedAt: Date;
  ingredient_name: string;
  ingredient_amount: string;
  recipeRec_id: number;
}

export default function RecipieIngredients({
  ingredients,
  recipe_name,
  recipeSource,
}: {
  ingredients: Ingredients[];
  recipe_name: string;
  recipeSource: string | null;
}) {
  const router = useRouter();

  if (!recipeSource) {
    recipeSource = "n/a";
  }
  return (
    <>
      <h2>Recipe: {recipe_name}</h2>
      <h2>Recipe Source: {recipeSource}</h2>
      <h2>Ingredients:</h2>
      <ul>
        {ingredients
          ? ingredients.map((ingredient) => {
              return (
                <li>
                  {ingredient.ingredient_amount}
                  {ingredient.ingredient_name}
                  <button
                    className="text-red-400 ml-2"
                    onClick={async () => {
                      const remove = await removeItem(ingredient.rec_id);
                      if (remove?.rec_id) {
                        toast.success("Ingredient Deleted!");
                        router.refresh();
                      }
                    }}
                  >
                    Remove Item
                  </button>
                </li>
              );
            })
          : ""}
      </ul>
    </>
  );
}

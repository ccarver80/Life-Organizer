import Modal from "@/components/common/Modal";
import NextTable from "@/components/common/Table";
import AddIngredientForm from "@/components/forms/addIngredientForm";
import AddRecipeForm from "@/components/forms/addRecipeForm";
import AddRecipeStepForm from "@/components/forms/addRecipeStepForm";
import RecipieIngredients from "@/components/RecipeIngredients";
import RecipeSteps from "@/components/RecipeSteps";
import RemoveRecipe from "@/components/RemoveRecipe";

import { getRecipes, getIngredients, getSteps } from "@/lib/actions/GetActions";
import { Table, TableColumn, TableHeader } from "@nextui-org/table";

export default async function Page() {
  const recipes = await getRecipes();

  const columns = [
    { key: "recipe_name", label: "Recipe Name" },
    { key: "recipe_source", label: "Recipe Source" },
  ];
  const rows = new Array();

  recipes.map((recipe) => {
    rows.push({
      key: String(recipe.rec_id),
      recipe_name: recipe.recipe_name,
      recipe_source: recipe.recipe_source,
    });
  });

  return (
    <>
      <div className="mt-5 ml-5">
        <Modal
          buttonName="Add Recipe"
          className="bg-blue-200 p-2 rounded-xl text-xl border shadow-lg"
          modalName="addRecipeModal"
        >
          <AddRecipeForm />
        </Modal>
      </div>
      {/* Map over recipes and show on dashboard */}
      <div className="ml-5 mt-10 flex flex-col gap-y-3">
        <h2>Recipes:</h2>
        <NextTable rows={rows} columns={columns} />
      </div>
    </>
  );
}

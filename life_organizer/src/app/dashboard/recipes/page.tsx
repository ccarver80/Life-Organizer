import Modal from "@/components/common/Modal";
import AddIngredientForm from "@/components/forms/addIngredientForm";
import AddRecipeForm from "@/components/forms/addRecipeForm";
import RecipieIngredients from "@/components/RecipeIngredients";
import RemoveRecipe from "@/components/RemoveRecipe";
import { removeItem } from "@/lib/actions/DeleteActions";
import { getRecipes, getIngredients } from "@/lib/actions/GetActions";

export default async function Page() {
  const recipes = await getRecipes();

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
        {recipes
          ? recipes.map(async (recipe) => {
              const ingredients = await getIngredients(recipe.rec_id);

              return (
                <div className="flex gap-x-4">
                  <Modal
                    buttonName={recipe.recipe_name}
                    className="text-2xl ml-5 w-fit"
                    modalName={`recipe${recipe.rec_id.toString()}`}
                  >
                    {/* List of all ingredients for recipe */}
                    <RecipieIngredients
                      recipe_name={recipe.recipe_name}
                      ingredients={ingredients}
                      recipeSource={recipe.recipe_source}
                    />

                    {/* Add Ingredients */}
                    <Modal
                      buttonName="Add Ingredient"
                      className="bg-yellow-300 text-xl"
                      modalName={`addIngredient ${recipe.rec_id}`}
                    >
                      <AddIngredientForm
                        recipeId={recipe.rec_id}
                        recipeName={recipe.recipe_name}
                      />
                    </Modal>
                  </Modal>
                  <RemoveRecipe recipeId={recipe.rec_id} />
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

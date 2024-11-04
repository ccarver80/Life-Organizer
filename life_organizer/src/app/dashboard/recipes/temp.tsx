{recipes
    ? recipes.map(async (recipe) => {
        const ingredients = await getIngredients(recipe.rec_id);

        const steps = await getSteps(recipe.rec_id);

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
              {/* List of Recipe Steps */}
              <RecipeSteps steps={ste} />

              <AddRecipeStepForm recipeId={recipe.rec_id} />
            </Modal>
            <RemoveRecipe recipeId={recipe.rec_id} />
          </div>
        );
      })
    : ""}
</div>
"use client";

import { useState } from "react";
import Form from "../common/Form";
import { Input } from "../common/Input";
import { submitStep } from "@/lib/actions/PostActions";
import { useRouter } from "next/navigation";

export default function AddRecipeStepForm({ recipeId }: { recipeId: number }) {
  const [addStep, setAddStep] = useState(false);

  const router = useRouter();

  async function submitForm(formData: FormData) {
    const step = await submitStep(formData, recipeId);
    if (step?.rec_id) {
      setAddStep(false);
      router.refresh();
    }
  }
  return (
    <>
      {addStep ? (
        <Form
          id="addStepForm"
          formTitle="Add Cooking Step"
          submitButtonName="Add Step"
          submitForm={submitForm}
        >
          <Input
            name="step_number"
            type="number"
            inputClassName=""
            label="Step Number"
          />

          <Input
            type="text"
            name="step_description"
            label="Step Description"
            placeholder="Preheat oven to 400..."
          />
        </Form>
      ) : (
        <button className="flex" onClick={() => setAddStep(true)}>
          click to add step
        </button>
      )}
    </>
  );
}

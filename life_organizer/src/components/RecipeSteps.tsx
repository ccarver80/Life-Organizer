"use client";
import { removeStep } from "@/lib/actions/DeleteActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Steps {
  rec_id: number;
  createdAt: Date;
  updatedAt: Date;
  step_number: number;
  step_description: string;
  recipeRec_id: number;
}
export default function RecipeSteps({ steps }: { steps: Steps[] }) {
  const router = useRouter();
  return (
    <ul>
      {steps
        ? steps.map((step) => {
            return (
              <li>
                {step.step_number}.) {step.step_description}{" "}
                <button
                  className="text-red-400 ml-2"
                  onClick={async () => {
                    const remove = await removeStep(step.rec_id);
                    if (remove?.rec_id) {
                      toast.success("Step Deleted!");
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
  );
}

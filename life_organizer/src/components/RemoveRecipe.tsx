"use client";

import { removeRecipe } from "@/lib/actions/DeleteActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ({ recipeId }: { recipeId: number }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        const remove = await removeRecipe(recipeId);
        if (remove?.rec_id) {
          toast.success("Recipe Deleted!");
          router.refresh();
        }
      }}
    >
      Remove Recipe
    </button>
  );
}

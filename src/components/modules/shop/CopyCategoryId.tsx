"use client";
import { Categories } from "@/types";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const CopyCategoryId = ({ category }: { category: Categories }) => {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Copied categoryId to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div>
      <Copy
        size={16}
        className="cursor-pointer text-muted-foreground hover:text-black"
        onClick={() => handleCopy(category.id)}
      />
    </div>
  );
};

export default CopyCategoryId;

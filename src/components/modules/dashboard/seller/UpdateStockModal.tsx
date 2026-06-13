// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Field, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// export type FieldConfig = {
//   name: string;
//   label: string;
//   type?: "text" | "email" | "number" | "password" | "textarea";
//   placeholder?: string;
//   required?: boolean;
// };

// type FormModalProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   title: string;
//   submitLabel?: string;

//   fields: FieldConfig[];

//   initialValues?: Record<string, string>;

//   onSubmit: (values: Record<string, string>) => Promise<void> | void;
// };

// const UpdateStockModal = ({
//   open,
//   onOpenChange,
//   title,
//   submitLabel = "Submit",
//   fields,
//   initialValues = {},
//   onSubmit,
// }: FormModalProps) => {
//   const emptyState = () => Object.fromEntries(fields.map((f) => [f.name, ""]));

//   const [values, setValues] = useState<Record<string, string>>(emptyState);
//   const [loading, setLoading] = useState(false);

//   // Sync initial values whenever they change (e.g. opening for a different row)
//   useEffect(() => {
//     if (open) {
//       setValues({ ...emptyState(), ...initialValues });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, initialValues]);
//   const handleChange = (name: string, value: string) =>
//     setValues((prev) => ({ ...prev, [name]: value }));

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       await onSubmit(values);
//       onOpenChange(false);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{title}</DialogTitle>
//           </DialogHeader>

//           <div className="flex flex-col gap-4 pt-1">
//             {fields.map((field) => (
//               <Field key={field.name}>
//                 <FieldLabel>
//                   {field.label}
//                   {field.required && (
//                     <span className="text-red-500 ml-0.5">*</span>
//                   )}
//                 </FieldLabel>

//                 {field.type === "textarea" ? (
//                   <textarea
//                     name={field.name}
//                     value={values[field.name] ?? ""}
//                     placeholder={field.placeholder}
//                     required={field.required}
//                     rows={3}
//                     onChange={(e) => handleChange(field.name, e.target.value)}
//                     className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                 ) : (
//                   <Input
//                     name={field.name}
//                     type={field.type ?? "text"}
//                     value={values[field.name] ?? ""}
//                     placeholder={field.placeholder}
//                     required={field.required}
//                     onChange={(e) => handleChange(field.name, e.target.value)}
//                   />
//                 )}
//               </Field>
//             ))}

//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-green-500 hover:bg-green-600 text-white w-full"
//             >
//               {loading ? "Saving..." : submitLabel}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateStockModal;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicine: { id: string; name: string; stock: number } | null;
  onSubmit: (id: string, stock: number) => Promise<void> | void;
};

const UpdateStockModal = ({
  open,
  onOpenChange,
  medicine,
  onSubmit,
}: Props) => {
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill with current stock when modal opens
  useEffect(() => {
    if (open) {
      setStock(String(medicine?.stock ?? ""));
    }
  }, [open, medicine]);

  const handleSubmit = async () => {
    if (!medicine) return;
    setLoading(true);
    try {
      await onSubmit(medicine.id, Number(stock));
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          {/* Read-only medicine name for context */}
          <Field>
            <FieldLabel>Medicine</FieldLabel>
            <Input value={medicine?.name ?? ""} disabled />
          </Field>

          <Field>
            <FieldLabel>
              Stock Quantity <span className="text-red-500 ml-0.5">*</span>
            </FieldLabel>
            <Input
              type="number"
              min={0}
              placeholder="Enter new stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Field>

          <Button
            onClick={handleSubmit}
            disabled={loading || !stock}
            className="bg-green-500 hover:bg-green-600 text-white w-full"
          >
            {loading ? "Updating..." : "Update Stock"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStockModal;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormContext } from "react-hook-form";
import { useState, type ChangeEvent } from "react";
const CustomImageInput = ({ title, id }: { title: string; id: string }) => {
  const [image, setImage] = useState("");
  const { setValue } = useFormContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setValue(id, file, { shouldValidate: true });
    }
  };
  return (
    <div className="flex justify-center flex-col w-full  items-center gap-3">
      <Avatar className="w-32 h-32">
        <AvatarImage src={image} />
        <AvatarFallback>{title}</AvatarFallback>
      </Avatar>
      <Label htmlFor={id}>{title}</Label>
      <Input
        id={id}
        name={id}
        type="file"
        className="w-1/4"
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomImageInput;

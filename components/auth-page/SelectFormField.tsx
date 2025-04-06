"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

const SelectFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  required = false,
}: SelectFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="space-y-2">
            <FormLabel>
              {label}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                required={required}
              >
                <SelectTrigger className="border-[#A07CFE] focus-visible:ring-[#FE8FB5]/50">
                  <SelectValue
                    placeholder={placeholder || `Select ${label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default SelectFormField;

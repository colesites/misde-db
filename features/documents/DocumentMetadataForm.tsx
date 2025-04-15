"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { DocumentFormSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { XCircle } from "lucide-react";
import FormFields from "@/components/auth-page/FormFields";
import SelectFormField from "@/components/auth-page/SelectFormField";
import type { DocumentFormValues, ExtractedData } from "./types";
import { documentTypes, departments } from "./utils";

interface DocumentMetadataFormProps {
  extractedData: ExtractedData;
  processComplete: boolean;
  file: File | null;
  isUploading: boolean;
  onSubmitDoc: (values: DocumentFormValues) => Promise<void>;
  onCancel: () => void;
  defaultValues?: Partial<DocumentFormValues>;
}

export default function DocumentMetadataForm({
  extractedData,
  processComplete,
  file,
  isUploading,
  onSubmitDoc,
  onCancel,
  defaultValues,
}: DocumentMetadataFormProps) {
  const { metadata } = extractedData;
  const router = useRouter();

  const formSchema = DocumentFormSchema();

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      type: "",
      department: "",
      isPublic: false,
      tags: [],
    },
  });

  const watchedTags = useWatch({ control: form.control, name: "tags" });

  const addTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    const cleanTag = tag.trim();
    if (cleanTag && !currentTags.includes(cleanTag)) {
      form.setValue("tags", [...currentTags, cleanTag]);
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitDoc)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormFields
              control={form.control}
              name="title"
              label="Document Title"
              placeholder="Enter document title"
            />

            <SelectFormField
              control={form.control}
              name="department"
              label="Department"
              options={departments}
              required
            />

            <SelectFormField
              control={form.control}
              name="type"
              label="Document Type"
              options={documentTypes}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Description</Label>
              <Textarea
                id="content"
                {...form.register("content")}
                placeholder="Enter document description"
                className="min-h-[120px] border-[#A07CFE] focus-visible:ring-[#FE8FB5]/50"
              />
              {form.formState.errors.content && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {watchedTags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex gap-1 items-center"
                  >
                    {tag}
                    <div
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      <XCircle className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  id="new-tag"
                  placeholder="Add a tag..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addTag(input.value);
                      input.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const input = document.getElementById(
                      "new-tag"
                    ) as HTMLInputElement;
                    if (input) {
                      addTag(input.value);
                      input.value = "";
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            {processComplete && (
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">AI Confidence Score</h3>
                  <Badge
                    variant={metadata.confidence > 80 ? "default" : "outline"}
                    className={metadata.confidence > 80 ? "bg-green-500" : ""}
                  >
                    {metadata.confidence}%
                  </Badge>
                </div>
                <Progress value={metadata.confidence} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  The AI's confidence in the accuracy of the extracted metadata
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="isPublic"
                {...form.register("isPublic")}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isPublic" className="text-sm font-normal">
                Make this document publicly accessible
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading || !file}>
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentFormSchema } from "@/schemas";
import type * as z from "zod";
import { Form } from "@/components/ui/form";
import FormFields from "@/components/auth-page/FormFields";
import SelectFormField from "@/components/auth-page/SelectFormField";

export default function UploadDocumentPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const formSchema = DocumentFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "",
      department: "",
      isPublic: false,
      tags: [],
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      toast("Please select a file to upload");
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload the file to a storage service
      // and get a URL back
      const fileUrl = `/documents/${file.name}`;

      // Create document in database
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          fileUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload document");
      }

      toast("Your document has been uploaded successfully");

      router.push("/dashboard/documents");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  const documentTypes = [
    { value: "policy", label: "Policy Document" },
    { value: "research", label: "Research Paper" },
    { value: "report", label: "Report" },
    { value: "whitepaper", label: "White Paper" },
    { value: "strategic", label: "Strategic Plan" },
    { value: "guideline", label: "Guideline" },
  ];

  const departments = [
    { value: "administration", label: "Administration" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "finance", label: "Finance" },
    { value: "technology", label: "Technology" },
    { value: "agriculture", label: "Agriculture" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "transportation", label: "Transportation" },
    { value: "environment", label: "Environment" },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
        <p className="text-muted-foreground">
          Upload a new document to the MISDE Database
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/20"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-center">
                      <div className="rounded-full bg-primary/10 p-4">
                        <FileUp className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports PDF, DOCX, XLSX, PPTX, and TXT files up to 10MB
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                      >
                        Browse Files
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.xlsx,.pptx,.txt"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-center">
                      <div className="rounded-full bg-green-100 p-4">
                        <FileUp className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove File
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

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
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g. policy, education, reform"
                  className="border-[#A07CFE] focus-visible:ring-[#FE8FB5]/50"
                  onChange={(e) => {
                    const tagsArray = e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag !== "");
                    form.setValue("tags", tagsArray);
                  }}
                />
              </div>

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
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/documents")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading || !file}>
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

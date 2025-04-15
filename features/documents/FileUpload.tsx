"use client";

import type React from "react";
import { motion } from "framer-motion";
import { FileUp, FileText, X, FileDigit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateFile } from "./utils";
import type { FileInfo } from "./types";

interface FileUploadZoneProps {
  fileInfo: FileInfo;
  onFileChange: (file: File | null) => void;
  onDragStateChange: (isDragging: boolean) => void;
  onContinue: () => void;
}

export default function FileUpload({
  fileInfo,
  onFileChange,
  onDragStateChange,
  onContinue,
}: FileUploadZoneProps) {
  const { file, isDragging } = fileInfo;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragStateChange(true);
  };

  const handleDragLeave = () => {
    onDragStateChange(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDragStateChange(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        onFileChange(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        onFileChange(selectedFile);
      }
    }
  };

  return (
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
            <p className="font-medium">Drag and drop your file here</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports PDF, DOCX, XLSX, PPTX, TXT, JPEG, PNG, and TIFF files up
              to 20MB
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
              accept=".pdf,.docx,.xlsx,.pptx,.txt,.jpg,.jpeg,.png,.tiff"
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
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onFileChange(null)}
            >
              <X className="h-4 w-4 mr-2" />
              Remove File
            </Button>
            <Button type="button" size="sm" onClick={onContinue}>
              <FileDigit className="h-4 w-4 mr-2" />
              Digitize with AI
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

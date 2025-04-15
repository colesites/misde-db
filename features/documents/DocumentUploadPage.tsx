"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FileUp, FileDigit, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type {
  DocumentFormValues,
  FileInfo,
  ProcessingState,
  ExtractedData,
} from "./types";
import { processDocument } from "./utils";
import FileUploadZone from "./FileUpload";
import ProcessingProgress from "./ProcessingProgress";
import ProcessingComplete from "./ProcessingComplete";
import ExtractedContentPreview from "./ExtractedContentPreview";
import DocumentMetadataForm from "./DocumentMetadataForm";
import ProcessingOptions from "./ProgressingOptions";

export default function DocumentUploadPage() {
  const router = useRouter();

  // File state
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    file: null,
    isDragging: false,
  });

  // Tab state
  const [activeTab, setActiveTab] = useState("upload");

  // Processing state
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    processingProgress: 0,
    processingStage: "",
    processComplete: false,
    processError: null,
  });

  // Extracted data state
  const [extractedData, setExtractedData] = useState<ExtractedData>({
    extractedText: "",
    metadata: {
      title: "",
      type: "",
      department: "",
      date: "",
      confidence: 0,
      tags: [],
    },
    verificationResult: {
      verified: false,
      score: 0,
      issues: [],
    },
  });

  // Upload state
  const [isUploading, setIsUploading] = useState(false);

  // File handlers
  const handleFileChange = (file: File | null) => {
    setFileInfo((prev) => ({ ...prev, file }));
    if (!file) {
      setProcessingState((prev) => ({
        ...prev,
        processComplete: false,
        processError: null,
      }));
    }
  };

  const handleDragStateChange = (isDragging: boolean) => {
    setFileInfo((prev) => ({ ...prev, isDragging }));
  };

  // Process document
  const handleProcessFile = () => {
    if (!fileInfo.file) return;

    processDocument(fileInfo.file, {
      setProcessingProgress: (progress) =>
        setProcessingState((prev) => ({
          ...prev,
          processingProgress: progress,
        })),
      setProcessingStage: (stage) =>
        setProcessingState((prev) => ({ ...prev, processingStage: stage })),
      setExtractedText: (text) =>
        setExtractedData((prev) => ({ ...prev, extractedText: text })),
      setMetadata: (metadata) =>
        setExtractedData((prev) => ({ ...prev, metadata })),
      setVerificationResult: (result) =>
        setExtractedData((prev) => ({ ...prev, verificationResult: result })),
      setIsProcessing: (isProcessing) =>
        setProcessingState((prev) => ({ ...prev, isProcessing })),
      setProcessComplete: (complete) =>
        setProcessingState((prev) => ({ ...prev, processComplete: complete })),
      updateForm: (values) => {
        // This would update form values in a real implementation
      },
      setActiveTab,
    });
  };

  // Form submission
  const handleSubmit = async (values: DocumentFormValues) => {
    if (!fileInfo.file) {
      toast.error("File required", {
        description: "Please select a file to upload",
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload the file to a storage service
      // and get a URL back
      const fileUrl = `/documents/${fileInfo.file.name}`;

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

      toast.success("Document uploaded", {
        description: "Your document has been uploaded successfully",
      });

      router.push("/dashboard/documents");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Upload failed", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Upload & Digitize Document
        </h1>
        <p className="text-muted-foreground">
          Upload a document to the MISDE Database with AI-powered digitization
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="upload">
            <FileUp className="mr-2 h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="digitize" disabled={!fileInfo.file}>
            <FileDigit className="mr-2 h-4 w-4" />
            Digitize
          </TabsTrigger>
          <TabsTrigger
            value="metadata"
            disabled={!processingState.processComplete && !fileInfo.file}
          >
            <Tag className="mr-2 h-4 w-4" />
            Metadata
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Upload a document to be added to the MISDE Database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone
                fileInfo={fileInfo}
                onFileChange={handleFileChange}
                onDragStateChange={handleDragStateChange}
                onContinue={() => setActiveTab("digitize")}
              />
            </CardContent>
          </Card>

          {fileInfo.file && (
            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("digitize")}>
                Continue to Digitize
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Digitize Tab */}
        <TabsContent value="digitize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Document Digitization</CardTitle>
              <CardDescription>
                Extract text, metadata, and verify document authenticity with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!processingState.processComplete &&
                !processingState.isProcessing && (
                  <ProcessingOptions
                    file={fileInfo.file}
                    onProcess={handleProcessFile}
                    isProcessing={processingState.isProcessing}
                  />
                )}

              <ProcessingProgress processingState={processingState} />

              {processingState.processComplete && (
                <ProcessingComplete
                  extractedData={extractedData}
                  onContinue={() => setActiveTab("metadata")}
                />
              )}
            </CardContent>
          </Card>

          {processingState.processComplete && (
            <ExtractedContentPreview content={extractedData.extractedText} />
          )}
        </TabsContent>

        {/* Metadata Tab */}
        <TabsContent value="metadata">
          <Card>
            <CardHeader>
              <CardTitle>Document Metadata</CardTitle>
              <CardDescription>
                {processingState.processComplete
                  ? "Review and edit the AI-extracted metadata before saving"
                  : "Enter document details and metadata"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentMetadataForm
                extractedData={extractedData}
                processComplete={processingState.processComplete}
                file={fileInfo.file}
                isUploading={isUploading}
                onSubmitDoc={handleSubmit}
                onCancel={() => router.push("/dashboard/documents")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import { ArrowRight, Check, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ExtractedData } from "./types";
import { downloadTextFile } from "./utils";

interface ProcessingCompleteProps {
  extractedData: ExtractedData;
  onContinue: () => void;
}

export default function ProcessingComplete({
  extractedData,
  onContinue,
}: ProcessingCompleteProps) {
  const { extractedText, verificationResult } = extractedData;

  const handleDownload = () => {
    downloadTextFile(extractedText, "digitized-document.txt");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-6 border rounded-lg">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold mt-2">Processing Complete</h3>
          <p className="text-muted-foreground">
            Document successfully digitized and analyzed
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Extracted Text</h3>
          <p className="text-sm text-muted-foreground">
            {extractedText.substring(0, 150)}...
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleDownload}
          >
            <FileText className="mr-2 h-4 w-4" />
            Download Text
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Document Verification</h3>
            <Badge
              variant={verificationResult.verified ? "default" : "outline"}
              className={verificationResult.verified ? "bg-green-500" : ""}
            >
              {verificationResult.score}%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {verificationResult.verified
              ? "Document verified as authentic"
              : "Document verification failed"}
          </p>
          <Button variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onContinue}>
          Continue to Metadata
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

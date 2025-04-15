"use client";

import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ProcessingState } from "./types";

interface ProcessingProgressProps {
  processingState: ProcessingState;
}

export default function ProcessingProgress({
  processingState,
}: ProcessingProgressProps) {
  const { isProcessing, processingProgress, processingStage } = processingState;

  if (!isProcessing) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">{processingStage}</h3>
      <Progress value={processingProgress} className="h-2" />
      <div className="grid grid-cols-3 text-center">
        <div>
          <div
            className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
              processingProgress >= 30
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {processingProgress >= 30 ? <Check className="h-4 w-4" /> : 1}
          </div>
          <p className="text-xs mt-1">OCR</p>
        </div>
        <div>
          <div
            className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
              processingProgress >= 70
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {processingProgress >= 70 ? <Check className="h-4 w-4" /> : 2}
          </div>
          <p className="text-xs mt-1">Metadata</p>
        </div>
        <div>
          <div
            className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
              processingProgress >= 100
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {processingProgress >= 100 ? <Check className="h-4 w-4" /> : 3}
          </div>
          <p className="text-xs mt-1">Verification</p>
        </div>
      </div>
      <p className="text-sm text-center text-muted-foreground">
        Please wait while we process your document...
      </p>
    </div>
  );
}

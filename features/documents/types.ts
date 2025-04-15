import type { z } from "zod"
import { DocumentFormSchema } from "@/schemas"

export interface FileInfo {
  file: File | null
  isDragging: boolean
}

export interface ProcessingState {
  isProcessing: boolean
  processingProgress: number
  processingStage: string
  processComplete: boolean
  processError: string | null
}

export interface ExtractedData {
  extractedText: string
  metadata: {
    title: string
    type: string
    department: string
    date: string
    confidence: number
    tags: string[]
  }
  verificationResult: {
    verified: boolean
    score: number
    issues: string[]
  }
}

export const schema = DocumentFormSchema();

export type DocumentFormValues = z.infer<typeof schema>;

export interface SelectOption {
  value: string
  label: string
}

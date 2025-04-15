import { toast } from "sonner"

export const validateFile = (file: File): boolean => {
  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "text/plain",
  ]
  const maxSize = 20 * 1024 * 1024 // 20MB

  if (!validTypes.includes(file.type)) {
    toast.error("Invalid file type", {
      description: "Please upload a supported document format.",
    })
    return false
  }

  if (file.size > maxSize) {
    toast.error("File too large", {
      description: "File size must be less than 20MB.",
    })
    return false
  }

  return true
}

export const downloadTextFile = (text: string, filename: string): void => {
  const element = document.createElement("a")
  const file = new Blob([text], { type: "text/plain" })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)

  toast.success("Download complete", {
    description: "The digitized document has been downloaded.",
  })
}

export const documentTypes = [
  { value: "policy", label: "Policy Document" },
  { value: "research", label: "Research Paper" },
  { value: "report", label: "Report" },
  { value: "whitepaper", label: "White Paper" },
  { value: "strategic", label: "Strategic Plan" },
  { value: "guideline", label: "Guideline" },
]

export const departments = [
  { value: "administration", label: "Administration" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
  { value: "technology", label: "Technology" },
  { value: "agriculture", label: "Agriculture" },
  { value: "infrastructure", label: "Infrastructure" },
]

export const processDocument = (
  file: File,
  callbacks: {
    setProcessingProgress: (progress: number) => void
    setProcessingStage: (stage: string) => void
    setExtractedText: (text: string) => void
    setMetadata: (metadata: any) => void
    setVerificationResult: (result: any) => void
    setIsProcessing: (isProcessing: boolean) => void
    setProcessComplete: (complete: boolean) => void
    updateForm: (values: any) => void
    setActiveTab: (tab: string) => void
  },
): void => {
  const {
    setProcessingProgress,
    setProcessingStage,
    setExtractedText,
    setMetadata,
    setVerificationResult,
    setIsProcessing,
    setProcessComplete,
    updateForm,
    setActiveTab,
  } = callbacks

  setIsProcessing(true)
  setProcessingProgress(0)
  setProcessingStage("Initializing OCR")

  // Simulate processing stages with timeouts
  setTimeout(() => {
    setProcessingProgress(10)
    setProcessingStage("Performing OCR analysis")

    setTimeout(() => {
      setProcessingProgress(30)
      setProcessingStage("Extracting text content")

      setTimeout(() => {
        setProcessingProgress(50)
        setProcessingStage("Generating metadata")

        setTimeout(() => {
          setProcessingProgress(70)
          setProcessingStage("Tagging content")

          setTimeout(() => {
            setProcessingProgress(90)
            setProcessingStage("Verifying document authenticity")

            setTimeout(() => {
              setProcessingProgress(100)
              setProcessingStage("Complete")

              // Set mock extracted content
              const extractedText = `# Digital Transformation Policy 2023

## Executive Summary

This policy document outlines the government's comprehensive strategy for digital transformation across all departments and agencies. The goal is to improve service delivery, increase operational efficiency, and enhance citizen engagement through the strategic use of digital technologies.

## 1. Introduction

The rapid advancement of digital technologies presents both opportunities and challenges for government operations. This policy establishes a framework for the systematic adoption of digital technologies to transform how government services are delivered and how internal operations are conducted.

## 2. Vision and Objectives

Our vision is to create a digitally enabled government that delivers efficient, accessible, and personalized services to citizens while optimizing internal processes.

Key objectives include:
- Enhance citizen experience through digital service delivery
- Improve operational efficiency through process automation
- Strengthen data-driven decision making
- Build digital capabilities within the public sector
- Ensure digital inclusion and accessibility`

              setExtractedText(extractedText)

              // Set mock metadata
              const metadata = {
                title: "Digital Transformation Policy 2023",
                type: "Policy Document",
                department: "Technology",
                date: "2023-07-25",
                confidence: 92,
                tags: ["Digital", "Policy", "Technology", "Transformation", "E-Government"],
              }

              setMetadata(metadata)

              // Update form with extracted metadata
              updateForm({
                title: "Digital Transformation Policy 2023",
                type: "policy",
                department: "technology",
                content:
                  "This policy document outlines the government's comprehensive strategy for digital transformation across all departments and agencies.",
                tags: ["Digital", "Policy", "Technology", "Transformation", "E-Government"],
              })

              // Set mock verification result
              setVerificationResult({
                verified: true,
                score: 98,
                issues: [],
              })

              setIsProcessing(false)
              setProcessComplete(true)

              // Switch to the metadata tab to show the results
              setActiveTab("metadata")

              toast.success("Document processed successfully", {
                description: "AI has extracted text and metadata from your document.",
              })
            }, 1000)
          }, 800)
        }, 1200)
      }, 1000)
    }, 1200)
  }, 800)
}

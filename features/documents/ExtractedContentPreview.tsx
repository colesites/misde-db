"use client"

interface ExtractedContentPreviewProps {
  content: string
}

export default function ExtractedContentPreview({ content }: ExtractedContentPreviewProps) {
  if (!content) return null

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-2">Extracted Content Preview</h3>
      <div className="h-[300px] border rounded-md p-4 bg-muted/30">
          <div className="whitespace-pre-wrap font-mono text-sm">{content}</div>
      </div>
    </div>
  )
}

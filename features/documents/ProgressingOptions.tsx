"use client";

import { FileText, FileDigit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ProcessingOptionsProps {
  file: File | null;
  onProcess: () => void;
  isProcessing: boolean;
}

export default function ProcessingOptions({
  file,
  onProcess,
  isProcessing,
}: ProcessingOptionsProps) {
  if (!file) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center p-4 rounded-lg border">
        <div className="rounded-full bg-primary/10 p-2 mr-4">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Processing Options:</p>

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-rotate" className="flex items-center gap-2">
            <span>Auto-rotate Pages</span>
          </Label>
          <Switch id="auto-rotate" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="enhance-quality" className="flex items-center gap-2">
            <span>Enhance Image Quality</span>
          </Label>
          <Switch id="enhance-quality" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="detect-tables" className="flex items-center gap-2">
            <span>Detect Tables</span>
          </Label>
          <Switch id="detect-tables" defaultChecked />
        </div>
      </div>

      <Button className="w-full" onClick={onProcess} disabled={isProcessing}>
        <FileDigit className="mr-2 h-4 w-4" />
        Start AI Processing
      </Button>
    </div>
  );
}

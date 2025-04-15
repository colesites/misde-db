"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  Pencil,
  Share2,
  Star,
  Trash,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function DocumentClientView({
  document,
  author,
  relatedDocuments,
  isOfficial,
  sampleContent,
}: any) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {document.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              className="h-9 w-9"
            >
              <Star
                className={`h-5 w-5 ${
                  isFavorite
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link href={document.fileUrl || "#"}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Link>
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>

            {isOfficial && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Document</DropdownMenuItem>
                  <DropdownMenuItem>Update Metadata</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Document
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-0">
              <div className="rounded-lg border bg-card p-6">
                <div
                  className="prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html:
                      document.id === "1" ? sampleContent : document.content,
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="mt-0">
              {/* Your metadata content here */}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-medium mb-4">Author</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg"
                  alt={author?.name || "Unknown"}
                />
                <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{author?.name}</p>
                <p className="text-xs text-muted-foreground">{author?.email}</p>
              </div>
            </div>
          </div>
          {/* Add related documents or other sidebar info */}
        </div>
      </div>
    </div>
  );
}

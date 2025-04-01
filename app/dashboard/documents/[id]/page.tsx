"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, ChevronDown, Download, FileText, Pencil, Share2, Star, Trash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { documents, findDocumentById, findUserById } from "@/lib/mock-data"
import { useSession } from "next-auth/react"

// Sample document content for the first document
const sampleContent = `
  <h1>Digital Transformation Policy 2023</h1>
  <h2>Executive Summary</h2>
  <p>This policy document outlines the government's comprehensive strategy for digital transformation across all departments and agencies. The goal is to improve service delivery, increase operational efficiency, and enhance citizen engagement through the strategic use of digital technologies.</p>
    
  <h2>1. Introduction</h2>
  <p>The rapid advancement of digital technologies presents both opportunities and challenges for government operations. This policy establishes a framework for the systematic adoption of digital technologies to transform how government services are delivered and how internal operations are conducted.</p>
    
  <h2>2. Vision and Objectives</h2>
  <p>Our vision is to create a digitally enabled government that delivers efficient, accessible, and personalized services to citizens while optimizing internal processes.</p>
  <p>Key objectives include:</p>
  <ul>
    <li>Enhance citizen experience through digital service delivery</li>
    <li>Improve operational efficiency through process automation</li>
    <li>Strengthen data-driven decision making</li>
    <li>Build digital capabilities within the public sector</li>
    <li>Ensure digital inclusion and accessibility</li>
  </ul>
    
  <h2>3. Strategic Pillars</h2>
  <h3>3.1 Digital Infrastructure</h3>
  <p>Develop robust, secure, and scalable digital infrastructure to support government operations and service delivery.</p>
    
  <h3>3.2 Digital Services</h3>
  <p>Design and deliver citizen-centric digital services that are accessible, intuitive, and efficient.</p>
    
  <h3>3.3 Data Governance</h3>
  <p>Establish frameworks for responsible data collection, management, sharing, and utilization across government.</p>
    
  <h3>3.4 Digital Workforce</h3>
  <p>Build digital capabilities within the public sector through training, recruitment, and organizational change.</p>
    
  <h3>3.5 Digital Inclusion</h3>
  <p>Ensure that digital transformation benefits all citizens regardless of location, ability, or socioeconomic status.</p>
    
  <h2>4. Implementation Framework</h2>
  <p>This policy will be implemented through a phased approach over a five-year period (2023-2028), with regular monitoring and evaluation to track progress and make necessary adjustments.</p>
    
  <h2>5. Governance Structure</h2>
  <p>A Digital Transformation Steering Committee, chaired by the Minister of Technology, will oversee the implementation of this policy. Each department will establish a Digital Transformation Unit responsible for implementing the policy within their respective domains.</p>
    
  <h2>6. Conclusion</h2>
  <p>Digital transformation is essential for modernizing government operations and improving service delivery. This policy provides a comprehensive framework to guide this transformation in a coordinated and strategic manner.</p>
`

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [userRole, setUserRole] = useState("PUBLIC")
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (session?.user?.role) {
      setUserRole(session.user.role)
    }
  }, [session])

  const isOfficial = userRole === "ADMIN" || userRole === "USER"

  // Get document data based on ID
  const documentId = params.id as string
  const document = findDocumentById(documentId)

  if (!document) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
        <p className="mb-6">The document you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/dashboard/documents">Back to Documents</Link>
        </Button>
      </div>
    )
  }

  // Get author information
  const author = findUserById(document.authorId)

  // Find related documents (excluding current document)
  const relatedDocuments = documents
    .filter(
      (doc) =>
        doc.id !== document.id &&
        (doc.department === document.department || doc.tags.some((tag) => document.tags.includes(tag))),
    )
    .slice(0, 3)
    .map((doc) => ({
      id: doc.id,
      title: doc.title,
      type: doc.type,
    }))

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleFavorite} className="h-9 w-9">
              <Star className={`h-5 w-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
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
                  dangerouslySetInnerHTML={{ __html: document.id === "1" ? sampleContent : document.content }}
                />
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="mt-0">
              <div className="rounded-lg border bg-card p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Document Information</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Document Type</dt>
                      <dd>{document.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Department</dt>
                      <dd>{document.department}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                      <dd>{document.createdAt.toISOString().split("T")[0]}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                      <dd>{document.updatedAt.toISOString().split("T")[0]}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">File Size</dt>
                      <dd>{`${(Math.random() * 5 + 1).toFixed(1)} MB`}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">File Type</dt>
                      <dd>{document.fileUrl?.split(".").pop()?.toUpperCase() || "PDF"}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{document.content.substring(0, 200)}...</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-medium mb-4">Author</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={author?.name || "Unknown"} />
                <AvatarFallback>
                  {author?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "UN"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{author?.name || "Unknown Author"}</p>
                <p className="text-sm text-muted-foreground">{author?.position || "Unknown Position"}</p>
                <p className="text-sm text-muted-foreground">{author?.department || "Unknown"} Department</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-medium mb-4">Document History</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="absolute top-8 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border" />
                </div>
                <div>
                  <p className="font-medium">Document Updated</p>
                  <p className="text-sm text-muted-foreground">{document.updatedAt.toISOString().split("T")[0]}</p>
                  <p className="text-sm text-muted-foreground">Updated by {author?.name || "Unknown"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Document Created</p>
                  <p className="text-sm text-muted-foreground">{document.createdAt.toISOString().split("T")[0]}</p>
                  <p className="text-sm text-muted-foreground">Created by {author?.name || "Unknown"}</p>
                </div>
              </div>
            </div>
          </div>

          <Collapsible className="rounded-lg border bg-card">
            <div className="p-4">
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <h3 className="font-medium">Related Documents</h3>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-2">
                {relatedDocuments.length > 0 ? (
                  relatedDocuments.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/dashboard/documents/${doc.id}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground p-2">No related documents found.</p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

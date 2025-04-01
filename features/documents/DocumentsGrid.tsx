"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Download, Eye, FileText, MoreHorizontal, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { documents } from "@/lib/mock-data"

// Process documents
const documentsList = documents.map((doc) => {
  return {
    ...doc,
    fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
    fileType: doc.fileUrl?.split(".").pop()?.toUpperCase() || "PDF",
  }
})

export default function DocumentsGrid() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documentsList.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="h-full flex flex-col">
            <CardContent className="pt-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(doc.id)}>
                  <Star
                    className={`h-4 w-4 ${
                      favorites.includes(doc.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>

              <Link
                href={`/dashboard/documents/${doc.id}`}
                className="font-medium hover:text-primary hover:underline block mb-2"
              >
                {doc.title}
              </Link>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>{doc.type}</span>
                <span>•</span>
                <span>{doc.department}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {doc.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {doc.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{doc.tags.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{doc.updatedAt.toISOString().split("T")[0]}</span>
              </div>
            </CardContent>

            <CardFooter className="border-t p-3 flex justify-between">
              <div className="text-sm text-muted-foreground">
                {doc.fileSize} • {doc.fileType}
              </div>

              <div className="flex gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/documents/${doc.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>

                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

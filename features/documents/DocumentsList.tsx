"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  Star,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { documents, users } from "@/lib/mock-data";
// import { useSession } from "next-auth/react";

// Process documents with author information
const documentsList = documents.map((doc) => {
  const author = users.find((user) => user.id === doc.authorId);
  return {
    ...doc,
    fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
    fileType: doc.fileUrl?.split(".").pop()?.toUpperCase() || "PDF",
    author: {
      name: author?.name || "Unknown User",
      avatar: "/placeholder.svg?height=32&width=32",
      initials:
        author?.name
          ?.split(" ")
          .map((n) => n[0])
          .join("") || "UN",
    },
  };
});

export default function DocumentsList() {
  // const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState("PUBLIC");
  const [favorites, setFavorites] = useState<string[]>([]);

  // useEffect(() => {
  //   if (session?.user?.role) {
  //     setUserRole(session.user.role);
  //   }
  // }, [session]);

  const isOfficial = userRole === "ADMIN" || userRole === "USER";

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {documentsList.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/documents/${doc.id}`}
                  className="font-medium hover:text-primary hover:underline"
                >
                  {doc.title}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleFavorite(doc.id)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      favorites.includes(doc.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{doc.type}</span>
                <span>•</span>
                <span>{doc.department}</span>
                <span>•</span>
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>{doc.fileType}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {doc.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {doc.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{doc.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{doc.updatedAt.toISOString().split("T")[0]}</span>
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src={doc.author.avatar} alt={doc.author.name} />
              <AvatarFallback>{doc.author.initials}</AvatarFallback>
            </Avatar>

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
                  <DropdownMenuItem>
                    <Link
                      href={`/dashboard/documents/${doc.id}`}
                      className="flex items-center w-full"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleFavorite(doc.id)}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>
                      {favorites.includes(doc.id)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </span>
                  </DropdownMenuItem>

                  {isOfficial && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, FileText, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { documents } from "@/lib/mock-data";
import { users } from "@/lib/mock-data";
import { useSession } from "next-auth/react";

// Get recent documents and sort by updatedAt
const recentDocuments = [...documents]
  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  .slice(0, 5)
  .map((doc) => {
    const author = users.find((user) => user.id === doc.authorId);
    return {
      ...doc,
      user: {
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

export default function RecentDocuments({ name, filename }) {
  // const { data: session, status } = useSession();

  const handleDownload = async () => {
    const response = await fetch(`/api/download/${filename}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = name; // Use the desired download name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to download file:', response.status);
      // Handle error (e.g., display a message to the user)
    }
  };

  return (
    <div className="space-y-4">
      {recentDocuments.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center justify-between p-4 rounded-lg border"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{doc.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{doc.type}</span>
                <span>•</span>
                <span>{doc.department}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{doc.updatedAt.toISOString().split("T")[0]}</span>
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src={doc.user.avatar} alt={doc.user.name} />
              <AvatarFallback>{doc.user.initials}</AvatarFallback>
            </Avatar>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/documents/${doc.id}`}
                    className="w-full"
                  >
                    View Document
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>Download PDF</DropdownMenuItem>
                <DropdownMenuItem>Share Document</DropdownMenuItem>
                <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete Document
                    </DropdownMenuItem>
                {/* {session?.user.role === "ADMIN" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete Document
                    </DropdownMenuItem>
                  </>
                )} */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

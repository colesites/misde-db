import { Suspense } from "react"
import Link from "next/link"
import { Filter, Grid3X3, List, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentsSkeleton from "@/features/documents/DocumentsSkeleton"
import DocumentsList from "@/features/documents/DocumentsList"
import DocumentsGrid from "@/features/documents/DocumentsGrid"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Browse and search government documents</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/documents/upload">
            <Plus className="mr-2 h-4 w-4" />
            <span>Upload Document</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6">
        <div className="space-y-6">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="policy">Policy Documents</SelectItem>
                  <SelectItem value="research">Research Papers</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                  <SelectItem value="whitepaper">White Papers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Document list/grid view */}
          <Tabs defaultValue="list">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span>List</span>
                </TabsTrigger>
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span>Grid</span>
                </TabsTrigger>
              </TabsList>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="list" className="mt-6">
              <Suspense fallback={<DocumentsSkeleton type="list" />}>
                <DocumentsList />
              </Suspense>
            </TabsContent>

            <TabsContent value="grid" className="mt-6">
              <Suspense fallback={<DocumentsSkeleton type="grid" />}>
                <DocumentsGrid />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar filters */}
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-3">Departments</h3>
            <div className="space-y-2">
              {["All Departments", "Education", "Health", "Finance", "Technology", "Agriculture"].map((dept) => (
                <div key={dept} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`dept-${dept}`}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked={dept === "All Departments"}
                  />
                  <label htmlFor={`dept-${dept}`} className="ml-2 text-sm">
                    {dept}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-3">Date Range</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="from-date" className="block text-sm mb-1">
                  From
                </label>
                <Input type="date" id="from-date" />
              </div>
              <div>
                <label htmlFor="to-date" className="block text-sm mb-1">
                  To
                </label>
                <Input type="date" id="to-date" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Policy",
                "Research",
                "Education",
                "Health",
                "Finance",
                "Technology",
                "Agriculture",
                "Infrastructure",
              ].map((tag) => (
                <div key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

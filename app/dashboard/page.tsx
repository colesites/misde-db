"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { FileUp, Sparkles, MessageSquare, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardStats from "@/features/dashboard/DashboardStats";
import DashboardSearch from "@/features/dashboard/DashBoardSearch";
import RecentDocuments from "@/features/dashboard/RecentDocuments";
import DashboardSkeleton from "@/features/dashboard/DashboardSkeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample events data - in a real app, this would come from your database
  const events = [
    { date: new Date(2023, 7, 15), title: "Digital Government Conference" },
    { date: new Date(2023, 8, 5), title: "AI Workshop" },
    { date: new Date(2023, 7, 22), title: "Tech Summit" },
  ];

  return (
    <section className="py-8 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to MISDE Database. Access government resources.
          </p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                modifiers={{
                  // Highlight days with events
                  hasEvent: events.map((event) => new Date(event.date)),
                }}
                modifiersStyles={{
                  hasEvent: {
                    backgroundColor: "rgba(var(--primary), 0.1)",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  },
                }}
              />
              <div className="p-3 border-t">
                <h3 className="font-medium mb-1">Events on selected date:</h3>
                {events.some(
                  (event) =>
                    date &&
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
                ) ? (
                  <ul className="space-y-1">
                    {events
                      .filter(
                        (event) =>
                          date &&
                          event.date.getDate() === date.getDate() &&
                          event.date.getMonth() === date.getMonth() &&
                          event.date.getFullYear() === date.getFullYear()
                      )
                      .map((event, index) => (
                        <li key={index} className="text-sm">
                          {event.title}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No events on this date
                  </p>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Button size="sm" className="cursor-pointer" asChild>
            <Link href="/dashboard/documents/upload">
              <FileUp className="mr-2 h-4 w-4" />
              <span>Upload Document</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <DashboardSearch />
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Recently updated government resources
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <span>View All</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading recent documents...</div>}>
              <RecentDocuments />
            </Suspense>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get help finding documents or information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Sparkles className="h-10 w-10 text-primary mb-4" />
                <p className="mb-4">
                  Ask questions about government documents, policies, or data
                </p>
                <Button className="w-full cursor-pointer" asChild>
                  <Link href="/dashboard/chatbot">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Open AI Assistant</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Government events and conferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Digital Government Conference</p>
                    <p className="text-sm text-muted-foreground">
                      Aug 15, 2023
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">AI Workshop</p>
                    <p className="text-sm text-muted-foreground">Sep 5, 2023</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

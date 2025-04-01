import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpcomingEvents from "@/components/home-page/UpcomingEvents";
import Link from "next/link";

const Events = () => {
  return (
    <div id="events" className="container mx-auto py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Events</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Stay up to date with government initiatives, training sessions, and
          networking opportunities.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Past Events</CardTitle>
            <CardDescription>
              Recent government initiatives and completed projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-semibold">
                Digital Literacy Training for Civil Servants
              </h4>
              <p className="text-sm text-muted-foreground">May 15, 2023</p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-semibold">
                Policy Document Digitization Launch
              </h4>
              <p className="text-sm text-muted-foreground">March 28, 2023</p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-semibold">Open Government Data Initiative</h4>
              <p className="text-sm text-muted-foreground">January 12, 2023</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link href="/events#past-events">View All Past Events</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Join us at these upcoming government events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingEvents />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link href="/events#upcoming-events">
                View All Upcoming Events
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Events;

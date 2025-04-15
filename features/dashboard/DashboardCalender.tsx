"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Make sure these dates are in the future or match your current date for testing
  const events = [
    { date: new Date(2025, 3, 15), title: "Digital Government Conference" },
    { date: new Date(2025, 3, 5), title: "AI Workshop" },
    { date: new Date(2025, 3, 22), title: "Tech Summit" },
  ];

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Calendar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            components={{
              DayContent: (props) => {
                const date = props.date;
                const isEvent = hasEvent(date);
                return (
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    {date.getDate()} {/* ✅ Correct way to show day number */}
                    {isEvent && (
                      <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                );
              },
            }}
          />
          <div className="p-4 border-t">
            <h3 className="font-medium mb-2">Events on selected date:</h3>
            {date && hasEvent(date) ? (
              <div className="space-y-2">
                {events
                  .filter(
                    (event) =>
                      event.date.getDate() === date.getDate() &&
                      event.date.getMonth() === date.getMonth() &&
                      event.date.getFullYear() === date.getFullYear()
                  )
                  .map((event, index) => (
                    <div key={index} className="p-2 bg-muted rounded-md">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No events on this date
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DashboardCalendar;

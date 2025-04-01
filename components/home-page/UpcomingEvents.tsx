"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { events } from "@/lib/mock-data";

// Get upcoming events
const upcomingEvents = [...events]
  .filter((event) => event.date > new Date())
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 3);

export default function UpcomingEvents() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border rounded-lg p-4 cursor-pointer"
          onClick={() =>
            setExpandedEvent(expandedEvent === event.id ? null : event.id)
          }
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{event.title}</h4>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{event.date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {event.date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {expandedEvent === event.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-sm"
            >
              <p className="mt-2">{event.description}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

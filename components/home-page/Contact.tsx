"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
  return (
    <section className="py-16 bg-muted" id="contact">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Contact Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with the Ministry of Innovation, Science and Digital Economy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    Ministry of Innovation, Science and Digital Economy
                    <br />
                    Adeyeye Ibidunmoye Building, Left wing Ground Floor
                    <br />
                    Ekiti State, Nigeria
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+234 (0) 803 456 7890</p>
                  <p className="text-muted-foreground">+234 (0) 705 123 4567</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@misde.gov.ng</p>
                  <p className="text-muted-foreground">support@misde.gov.ng</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">Office Hours</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-muted-foreground">8:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Saturday</p>
                  <p className="text-muted-foreground">9:00 AM - 1:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Sunday</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 aspect-square md:aspect-auto md:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.1733953331247!2d5.2193!3d7.6256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzcnMzIuMiJOIDXCsDEzJzA5LjUiRQ!5e0!3m2!1sen!2sng!4v1650000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MISDE Office Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {[
            {
              name: "Digital Innovation",
              email: "innovation@misde.gov.ng",
              phone: "+234 (0) 803 111 2222",
              description: "For inquiries about digital innovation initiatives and programs.",
            },
            {
              name: "Science & Research",
              email: "research@misde.gov.ng",
              phone: "+234 (0) 803 333 4444",
              description: "For scientific research collaborations and funding opportunities.",
            },
            {
              name: "Digital Economy",
              email: "economy@misde.gov.ng",
              phone: "+234 (0) 803 555 6666",
              description: "For digital economy policies and business development.",
            },
          ].map((dept, index) => (
            <motion.div key={dept.name} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-muted-foreground mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{dept.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{dept.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
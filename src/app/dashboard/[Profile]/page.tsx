"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { db } from "@/db"; // Assume this is your Prisma client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [doctor, setDoctor] = useState({
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Dr, Healthville, MC 12345",
    bio: "Dr. Jane Smith is a board-certified cardiologist...",
    education: "MD from Harvard Medical School",
    certifications: "American Board of Internal Medicine - Cardiovascular Disease",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // const { getUser } = await getKindeServerSession();
      // const kindeId = (await getUser()).id;

      const existingDoctor = await db.user.findFirst({
        where: {
          id: kindeId,
        },
      });

      if (existingDoctor) {
        // Update existing user
        await db.user.update({
          where: { id: kindeId },
          data: { ...doctor },
        });
      } else {
        // Create new user if none exists
        await db.user.create({
          data: {
            ...doctor,
            id: kindeId,
          },
        });
      }

      setIsEditing(false);
      console.log("Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={doctor.name} />
              <AvatarFallback>{doctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{doctor.name}</CardTitle>
              <p className="text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={doctor.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  value={doctor.specialty}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={doctor.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex">
                  <Mail className="w-5 h-5 mr-2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={doctor.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex">
                  <Phone className="w-5 h-5 mr-2 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={doctor.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="flex">
                  <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    value={doctor.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                name="education"
                value={doctor.education}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                name="certifications"
                value={doctor.certifications}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sample Upcoming Appointments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CalendarDays className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CalendarDays className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="font-semibold">Jane Roe</p>
                <p className="text-sm text-muted-foreground">Sep 25, 2023 at 2:30 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

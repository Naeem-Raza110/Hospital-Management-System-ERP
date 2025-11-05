import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState("2024-01-22");

  const appointments = [
    {
      id: "A001",
      time: "09:00 AM",
      patient: "John Smith",
      doctor: "Dr. Michael Chen",
      department: "Cardiology",
      status: "Confirmed",
      type: "Check-up",
    },
    {
      id: "A002",
      time: "10:30 AM",
      patient: "Sarah Johnson",
      doctor: "Dr. Emily Taylor",
      department: "Pediatrics",
      status: "Confirmed",
      type: "Consultation",
    },
    {
      id: "A003",
      time: "11:00 AM",
      patient: "Mike Davis",
      doctor: "Dr. Sarah Williams",
      department: "Neurology",
      status: "Pending",
      type: "Follow-up",
    },
    {
      id: "A004",
      time: "02:00 PM",
      patient: "Emily Brown",
      doctor: "Dr. James Rodriguez",
      department: "Orthopedics",
      status: "Confirmed",
      type: "Surgery",
    },
    {
      id: "A005",
      time: "03:30 PM",
      patient: "David Wilson",
      doctor: "Dr. Lisa Anderson",
      department: "Dermatology",
      status: "Cancelled",
      type: "Consultation",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Appointment Scheduling
        </h1>
        <p className="text-gray-600 mt-1">
          Book and manage patient appointments
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Booking Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Book New Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient Name</Label>
                <Input id="patient" placeholder="Enter patient name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d1">
                      Dr. Michael Chen - Cardiology
                    </SelectItem>
                    <SelectItem value="d2">
                      Dr. Sarah Williams - Neurology
                    </SelectItem>
                    <SelectItem value="d3">
                      Dr. James Rodriguez - Orthopedics
                    </SelectItem>
                    <SelectItem value="d4">
                      Dr. Emily Taylor - Pediatrics
                    </SelectItem>
                    <SelectItem value="d5">
                      Dr. Lisa Anderson - Dermatology
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Appointment Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Appointment Time</Label>
                <Input id="time" type="time" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Check-up</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today's Appointments</span>
              <Badge variant="outline" className="text-blue-600">
                {appointments.length} Total
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600 mb-1" />
                      <span className="text-xs font-semibold text-blue-600">
                        {appointment.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-500" />
                          {appointment.patient}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Stethoscope className="h-4 w-4 mr-1 text-gray-500" />
                          {appointment.doctor}
                        </p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.department}
                      </span>
                      <span>•</span>
                      <span>{appointment.type}</span>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2;
              const hasAppointment = day > 0 && day <= 28 && day % 3 === 0;
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center rounded-lg border transition-all duration-200 ${
                    day > 0 && day <= 31
                      ? hasAppointment
                        ? "bg-blue-100 border-blue-300 hover:bg-blue-200 cursor-pointer"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 cursor-pointer"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  {day > 0 && day <= 31 && (
                    <span
                      className={`text-sm ${
                        hasAppointment
                          ? "font-semibold text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;

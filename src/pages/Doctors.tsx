import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, Mail, Phone, Clock } from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    {
      id: 'D001',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      experience: '15 years',
      email: 'michael.chen@hospital.com',
      phone: '+1 234-567-8901',
      availability: 'Available',
      schedule: 'Mon-Fri, 9:00 AM - 5:00 PM',
      patients: 234,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      id: 'D002',
      name: 'Dr. Sarah Williams',
      specialty: 'Neurology',
      experience: '12 years',
      email: 'sarah.williams@hospital.com',
      phone: '+1 234-567-8902',
      availability: 'Available',
      schedule: 'Mon-Fri, 10:00 AM - 6:00 PM',
      patients: 189,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      id: 'D003',
      name: 'Dr. James Rodriguez',
      specialty: 'Orthopedics',
      experience: '18 years',
      email: 'james.rodriguez@hospital.com',
      phone: '+1 234-567-8903',
      availability: 'On Leave',
      schedule: 'Tue-Sat, 8:00 AM - 4:00 PM',
      patients: 312,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
    {
      id: 'D004',
      name: 'Dr. Emily Taylor',
      specialty: 'Pediatrics',
      experience: '10 years',
      email: 'emily.taylor@hospital.com',
      phone: '+1 234-567-8904',
      availability: 'Available',
      schedule: 'Mon-Fri, 9:00 AM - 5:00 PM',
      patients: 267,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
      id: 'D005',
      name: 'Dr. Robert Kim',
      specialty: 'General Surgery',
      experience: '20 years',
      email: 'robert.kim@hospital.com',
      phone: '+1 234-567-8905',
      availability: 'In Surgery',
      schedule: 'Mon-Thu, 7:00 AM - 3:00 PM',
      patients: 445,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    },
    {
      id: 'D006',
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      experience: '8 years',
      email: 'lisa.anderson@hospital.com',
      phone: '+1 234-567-8906',
      availability: 'Available',
      schedule: 'Wed-Sun, 11:00 AM - 7:00 PM',
      patients: 156,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Surgery':
        return 'bg-blue-100 text-blue-800';
      case 'On Leave':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600 mt-1">View and manage all doctors in the hospital</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name, specialty, or doctor ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor, index) => (
          <Card
            key={doctor.id}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={doctor.avatar} />
                    <AvatarFallback>{doctor.name.split(' ')[1][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
                <Badge className={getAvailabilityColor(doctor.availability)}>
                  {doctor.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  {doctor.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  {doctor.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  {doctor.schedule}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="text-sm font-semibold">{doctor.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Patients</p>
                    <p className="text-sm font-semibold">{doctor.patients}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">ID</p>
                    <p className="text-sm font-semibold">{doctor.id}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
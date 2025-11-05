import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Eye, DollarSign, CreditCard, TrendingUp } from 'lucide-react';

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bills = [
    {
      id: 'INV-001',
      patient: 'John Smith',
      date: '2024-01-20',
      amount: 2500.0,
      status: 'Paid',
      service: 'Cardiology Consultation',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-002',
      patient: 'Sarah Johnson',
      date: '2024-01-19',
      amount: 1800.0,
      status: 'Pending',
      service: 'Pediatric Check-up',
      paymentMethod: 'Insurance',
    },
    {
      id: 'INV-003',
      patient: 'Mike Davis',
      date: '2024-01-18',
      amount: 5200.0,
      status: 'Paid',
      service: 'Neurology Surgery',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-004',
      patient: 'Emily Brown',
      date: '2024-01-17',
      amount: 3400.0,
      status: 'Overdue',
      service: 'Orthopedic Treatment',
      paymentMethod: 'Cash',
    },
    {
      id: 'INV-005',
      patient: 'David Wilson',
      date: '2024-01-16',
      amount: 1200.0,
      status: 'Paid',
      service: 'Dermatology Consultation',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-006',
      patient: 'Lisa Martinez',
      date: '2024-01-15',
      amount: 4500.0,
      status: 'Pending',
      service: 'General Surgery',
      paymentMethod: 'Insurance',
    },
  ];

  const filteredBills = bills.filter(
    (bill) =>
      bill.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills.filter((b) => b.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = bills.filter((b) => b.status === 'Pending').reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Manage invoices and payment records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+12.5%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paid Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${paidAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">
              {bills.filter((b) => b.status === 'Paid').length} invoices paid
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">
              {bills.filter((b) => b.status === 'Pending').length} invoices pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by patient name or invoice ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices ({filteredBills.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.patient}</TableCell>
                    <TableCell>{bill.service}</TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell className="font-semibold">${bill.amount.toLocaleString()}</TableCell>
                    <TableCell>{bill.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-green-50 hover:text-green-600"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
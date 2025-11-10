"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  Briefcase, 
  UserCheck, 
  IndianRupee,
  FileText,
  Download,
  Banknote
} from "lucide-react";

// Sample data - in real app, this would come from props or API
const reimbursementDetails = {
  id: "02",
  employeeName: "Rakshit Chaudhary",
  employeeId: "EMP12345",
  email: "rakshit.chaudhary@company.com",
  category: "Internet Bill",
  description: "Monthly internet bill for remote work - November 2024",
  project: "LTI PAN",
  manager: "Nitu Gupta",
  amount: 699,
  submittedDate: "2024-11-05",
  approvalDate: "2024-11-06",
  approvalStatus: "approved",
  paymentStatus: "unpaid",
  billAttachment: "internet_bill_nov_2024.pdf",
  items: [
    {
      id: 1,
      description: "Broadband Internet Service",
      date: "2024-11-01",
      amount: 699,
    }
  ],
  comments: [
    {
      id: 1,
      author: "Rakshit Chaudhary",
      role: "Employee",
      comment: "Submitting monthly internet bill for remote work expenses.",
      timestamp: "2024-11-05 10:30 AM"
    },
    {
      id: 2,
      author: "Nitu Gupta",
      role: "Manager",
      comment: "Approved. Internet expense is valid for remote work.",
      timestamp: "2024-11-06 02:15 PM"
    }
  ]
};

export default function ReimbursementDetails() {
  const router = useRouter();
  const [details, setDetails] = useState(reimbursementDetails);

  const getApprovalBadge = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} capitalize text-sm`}>
        {status === "approved" ? "Approved" : status === "rejected" ? "Rejected" : "Pending"}
      </Badge>
    );
  };

  const getPaymentBadge = (status) => {
    const variants = {
      paid: "bg-blue-100 text-blue-800 border-blue-300",
      unpaid: "bg-gray-100 text-gray-800 border-gray-300",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} capitalize text-sm`}>
        {status === "paid" ? "Paid" : "Unpaid"}
      </Badge>
    );
  };

  const handleMarkAsPaid = () => {
    setDetails({ ...details, paymentStatus: "paid" });
    console.log("Marking as paid:", details.id);
  };

  const handleDownloadBill = () => {
    console.log("Downloading bill:", details.billAttachment);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Reimbursement Details</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reimbursement Request #{details.id}
          </h1>
          <div className="flex gap-3">
            {getApprovalBadge(details.approvalStatus)}
            {getPaymentBadge(details.paymentStatus)}
          </div>
        </div>
        
        <div className="flex gap-3">
          {details.approvalStatus === "approved" && details.paymentStatus === "unpaid" && (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleMarkAsPaid}
            >
              <Banknote size={18} className="mr-2" />
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Employee Name</p>
                    <p className="font-medium text-gray-900">{details.employeeName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium text-gray-900">{details.employeeId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-2">
                  <User className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{details.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reimbursement Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reimbursement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{details.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Project</p>
                    <p className="font-medium text-gray-900">{details.project}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Manager</p>
                    <p className="font-medium text-gray-900">{details.manager}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Submitted Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(details.submittedDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-2">
                  <FileText className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium text-gray-900">{details.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expense Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4 text-gray-700">{item.description}</td>
                        <td className="py-3 px-4 text-gray-700">
                          {new Date(item.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          ₹ {item.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan="2" className="py-3 px-4 text-right font-bold text-gray-900">
                        Total Amount:
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600 text-lg">
                        ₹ {details.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Comments & Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Comments & Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {details.comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {comment.role}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-auto">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Amount Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Amount Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ₹ {details.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-600" size={24} />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {details.billAttachment}
                      </p>
                      <p className="text-xs text-gray-500">PDF Document</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDownloadBill}
                  >
                    <Download size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Submitted</p>
                    <p className="text-sm text-gray-500">
                      {new Date(details.submittedDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                {details.approvalStatus !== "pending" && (
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      details.approvalStatus === "approved" ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {details.approvalStatus === "approved" ? "Approved" : "Rejected"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(details.approvalDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}
                {details.paymentStatus === "paid" && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Payment Completed</p>
                      <p className="text-sm text-gray-500">Recently</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
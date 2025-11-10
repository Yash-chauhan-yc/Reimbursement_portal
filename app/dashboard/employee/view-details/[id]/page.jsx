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
  FileText,
  Download,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";

// Sample data - in real app, this would come from props or API
const reimbursementDetails = {
  id: "01",
  employeeName: "Yash Chauhan",
  employeeId: "EMP12345",
  email: "yash.chauhan@company.com",
  category: "Travel, Food, Accommodation",
  description: "Business trip to Mumbai for client meeting - accommodation, food, and local travel expenses",
  project: "LTI PAN",
  manager: "Nitu Gupta",
  amount: 1157,
  submittedDate: "2024-11-05",
  status: "pending",
  paymentStatus: "unpaid",
  billAttachment: "travel_expenses_nov_2024.pdf",
  items: [
    {
      id: 1,
      description: "Hotel Accommodation (2 nights)",
      date: "2024-11-01",
      amount: 800,
    },
    {
      id: 2,
      description: "Food & Meals",
      date: "2024-11-02",
      amount: 250,
    },
    {
      id: 3,
      description: "Local Travel (Taxi)",
      date: "2024-11-02",
      amount: 107,
    }
  ],
  comments: [
    {
      id: 1,
      author: "Yash Chauhan",
      role: "Employee",
      comment: "Submitting expenses for Mumbai client meeting on November 1-2, 2024.",
      timestamp: "2024-11-05 10:30 AM"
    }
  ]
};

export default function EmployeeReimbursementDetails() {
  const router = useRouter();
  const [details] = useState(reimbursementDetails);

  const getStatusBadge = (status) => {
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

  const getPaymentBadge = (paymentStatus) => {
    const variants = {
      paid: "bg-blue-100 text-blue-800 border-blue-300",
      unpaid: "bg-gray-100 text-gray-800 border-gray-300",
    };

    return (
      <Badge variant="outline" className={`${variants[paymentStatus]} capitalize text-sm`}>
        {paymentStatus === "paid" ? "Paid" : "Payment Pending"}
      </Badge>
    );
  };

  const handleEdit = () => {
    router.push(`/dashboard/employee/edit/${details.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this reimbursement request?")) {
      console.log("Deleting request:", details.id);
      // Add API call here
      router.push("/dashboard/employee");
    }
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
            {getStatusBadge(details.status)}
            {details.status === "approved" && getPaymentBadge(details.paymentStatus)}
          </div>
        </div>
        
        {details.status === "pending" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={handleEdit}
            >
              <Edit size={18} className="mr-2" />
              Edit Request
            </Button>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={handleDelete}
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Status Alert */}
      {details.status === "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Pending Approval</h3>
            <p className="text-sm text-yellow-800">
              Your reimbursement request is currently being reviewed by {details.manager}. 
              You will be notified once a decision is made.
            </p>
          </div>
        </div>
      )}

      {details.status === "approved" && details.paymentStatus === "unpaid" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-green-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">Approved - Payment Processing</h3>
            <p className="text-sm text-green-800">
              Your request has been approved by {details.manager}. 
              The finance team will process your payment shortly.
            </p>
          </div>
        </div>
      )}

      {details.status === "approved" && details.paymentStatus === "paid" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-blue-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Payment Complete</h3>
            <p className="text-sm text-blue-800">
              Your reimbursement of ₹ {details.amount.toLocaleString('en-IN')} has been processed and paid.
            </p>
          </div>
        </div>
      )}

      {details.status === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-red-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Request Rejected</h3>
            <p className="text-sm text-red-800">
              Your reimbursement request has been rejected by {details.manager}. 
              Please check the comments below for more details.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Information</CardTitle>
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
                    <p className="text-sm text-gray-500">Assigned Manager</p>
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

          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expense Breakdown</CardTitle>
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
              {details.comments.length > 0 ? (
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
              ) : (
                <p className="text-gray-500 text-center py-4">No comments yet</p>
              )}
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
                {details.status === "pending" && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <p className="font-medium text-gray-900">Under Review</p>
                      <p className="text-sm text-gray-500">By {details.manager}</p>
                    </div>
                  </div>
                )}
                {details.status === "approved" && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Approved</p>
                      <p className="text-sm text-gray-500">By {details.manager}</p>
                    </div>
                  </div>
                )}
                {details.status === "rejected" && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Rejected</p>
                      <p className="text-sm text-gray-500">By {details.manager}</p>
                    </div>
                  </div>
                )}
                {details.status === "approved" && details.paymentStatus === "paid" && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Payment Completed</p>
                      <p className="text-sm text-gray-500">By Finance Team</p>
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
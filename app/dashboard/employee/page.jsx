"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const initialRequests = [
  {
    id: "01",
    category: "Travel, Food, Accommodation",
    amount: "₹ 1,157",
    project: "LTI PAN",
    manager: "Nitu Gupta",
    status: "pending",
    paymentStatus: "unpaid",
    submittedDate: "2024-11-05",
  },
  {
    id: "02",
    category: "Internet Bill",
    amount: "₹ 699",
    project: "LTI PAN",
    manager: "Nitu Gupta",
    status: "approved",
    paymentStatus: "unpaid",
    submittedDate: "2024-11-03",
  },
  {
    id: "03",
    category: "Food",
    amount: "₹ 750",
    project: "FINO",
    manager: "Rashmi Chaudhary",
    status: "rejected",
    paymentStatus: "unpaid",
    submittedDate: "2024-11-01",
  },
  {
    id: "04",
    category: "Travel",
    amount: "₹ 2,500",
    project: "LTI PAN",
    manager: "Nitu Gupta",
    status: "approved",
    paymentStatus: "paid",
    submittedDate: "2024-10-28",
  },
];

export default function EmployeeDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} capitalize`}>
        {status === "approved"
          ? "Approved"
          : status === "rejected"
          ? "Rejected"
          : "Pending"}
      </Badge>
    );
  };

  const getPaymentBadge = (status, paymentStatus) => {
    if (status !== "approved") return null;
    
    const variants = {
      paid: "bg-blue-100 text-blue-800 border-blue-300",
      unpaid: "bg-gray-100 text-gray-800 border-gray-300",
    };

    return (
      <Badge variant="outline" className={`${variants[paymentStatus]} capitalize ml-2`}>
        {paymentStatus === "paid" ? "Paid" : "Payment Pending"}
      </Badge>
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setRequests(requests.filter((req) => req.id !== id));
      console.log(`Deleting request ${id}`);
      // Add API call here
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/employee/edit/${id}`);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-600">Track and manage your expense reimbursement requests</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => router.push("/dashboard/employee/raiseImbursement")}
        >
          <PlusCircle size={20} className="mr-2" />
          Raise Reimbursement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
          <p className="text-sm text-yellow-800 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">
            {requests.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-green-800 mb-1">Approved</p>
          <p className="text-2xl font-bold text-green-900">
            {requests.filter((r) => r.status === "approved").length}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-blue-800 mb-1">Paid</p>
          <p className="text-2xl font-bold text-blue-900">
            {requests.filter((r) => r.paymentStatus === "paid").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Reimbursement Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Request ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Project
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Manager
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Submitted
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      #{request.id}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {request.category}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {request.project}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {request.manager}
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      {request.amount}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(request.submittedDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {getStatusBadge(request.status)}
                        {getPaymentBadge(request.status, request.paymentStatus)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => router.push(`/dashboard/employee/view-details/${request.id}`)}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleEdit(request.id)}
                            >
                              <Edit size={16} className="mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(request.id)}
                            >
                              <Trash2 size={16} className="mr-1" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
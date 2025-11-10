"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

const initialRequests = [
  {
    id: "01",
    employeeName: "Yash Chauhan",
    category: "Travel, Food, Accommodation",
    project: "LTI PAN",
    amount: "₹ 1,157",
    status: "pending",
  },
  {
    id: "02",
    employeeName: "Rakshit Chaudhary",
    category: "Internet Bill",
    project: "LTI PAN",
    amount: "₹ 699",
    status: "approved",
  },
  {
    id: "03",
    employeeName: "Pushpendar Kumar",
    category: "Food",
    project: "LTI PAN",
    amount: "₹ 750",
    status: "rejected",
  },
  {
    id: "04",
    employeeName: "Ashish Kumar Saini",
    category: "Travel",
    project: "FINO",
    amount: "₹ 2,500",
    status: "pending",
  },
];

export default function ManagerDashboard() {
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

  const handleApprove = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
    console.log(`Approving request ${id}`);
    // Add API call here
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
    console.log(`Rejecting request ${id}`);
    // Add API call here
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-gray-600">Review and approve team reimbursement requests</p>
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
                    S/N
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Employee
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Project
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Total Amount
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
                      {request.id}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {request.employeeName}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {request.category}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {request.project}
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      {request.amount}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-300 hover:bg-green-50"
                              onClick={() => handleApprove(request.id)}
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                              onClick={() => handleReject(request.id)}
                            >
                              <XCircle size={16} className="mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {request.status === "approved" && (
                          <span className="text-sm text-green-600 font-medium">
                            ✓ Approved
                          </span>
                        )}
                        {request.status === "rejected" && (
                          <span className="text-sm text-red-600 font-medium">
                            ✗ Rejected
                          </span>
                        )}
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 h-auto"
                          size="sm"
                          onClick={() => router.push(`/dashboard/manager/view-details/${request.id}`)}
                        >
                          View Details
                        </Button>
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
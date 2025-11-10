// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Banknote } from "lucide-react";

// const initialRequests = [
//   {
//     id: "01",
//     employeeName: "Yash Chauhan",
//     category: "Travel, Food, Accommodation",
//     project: "LTI PAN",
//     manager: "Nitu Gupta",
//     amount: "₹ 1,157",
//     approvalStatus: "pending",
//     paymentStatus: "unpaid",
//   },
//   {
//     id: "02",
//     employeeName: "Rakshit Chaudhary",
//     category: "Internet Bill",
//     project: "LTI PAN",
//     manager: "Nitu Gupta",
//     amount: "₹ 699",
//     approvalStatus: "approved",
//     paymentStatus: "unpaid",
//   },
//   {
//     id: "03",
//     employeeName: "Pushpendar Kumar",
//     category: "Food",
//     project: "LTI PAN",
//     manager: "Nitu Gupta",
//     amount: "₹ 750",
//     approvalStatus: "rejected",
//     paymentStatus: "unpaid",
//   },
//   {
//     id: "04",
//     employeeName: "Ashish Kumar Saini",
//     category: "Travel",
//     project: "FINO",
//     manager: "Rashmi Chaudhary",
//     amount: "₹ 2,500",
//     approvalStatus: "approved",
//     paymentStatus: "paid",
//   },
// ];

// export default function FinanceDashboard() {
//   const router = useRouter();
//   const [requests, setRequests] = useState(initialRequests);

//   const getApprovalBadge = (approvalStatus) => {
//     const variants = {
//       pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
//       approved: "bg-green-100 text-green-800 border-green-300",
//       rejected: "bg-red-100 text-red-800 border-red-300",
//     };

//     return (
//       <Badge
//         variant="outline"
//         className={`${variants[approvalStatus]} capitalize`}
//       >
//         {approvalStatus === "approved"
//           ? "Approved"
//           : approvalStatus === "rejected"
//           ? "Rejected"
//           : "Pending"}
//       </Badge>
//     );
//   };

//   const getPaymentBadge = (paymentStatus) => {
//     const variants = {
//       paid: "bg-blue-100 text-blue-800 border-blue-300",
//       unpaid: "bg-gray-100 text-gray-800 border-gray-300",
//     };

//     return (
//       <Badge
//         variant="outline"
//         className={`${variants[paymentStatus]} capitalize`}
//       >
//         {paymentStatus === "paid" ? "Paid" : "Unpaid"}
//       </Badge>
//     );
//   };

//   const handleMarkAsPaid = (id) => {
//     setRequests(
//       requests.map((request) =>
//         request.id === id ? { ...request, paymentStatus: "paid" } : request
//       )
//     );
//     // Add your API call here to update payment status
//     console.log(`Marking request ${id} as paid`);
//   };

//   return (
//     <div className="p-8">
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Process payments for approved reimbursement requests
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">
//             Reimbursement Requests
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200">
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     S/N
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Employee
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Category
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Project
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Manager
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Amount
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Approval Status
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Payment Status
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-900">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((request) => (
//                   <tr
//                     key={request.id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="py-4 px-4 font-medium text-gray-900">
//                       {request.id}
//                     </td>
//                     <td className="py-4 px-4 text-gray-700">
//                       {request.employeeName}
//                     </td>
//                     <td className="py-4 px-4 text-gray-700">
//                       {request.category}
//                     </td>
//                     <td className="py-4 px-4 text-gray-700">
//                       {request.project}
//                     </td>
//                     <td className="py-4 px-4 text-gray-700">
//                       {request.manager}
//                     </td>
//                     <td className="py-4 px-4 text-gray-700 font-semibold">
//                       {request.amount}
//                     </td>
//                     <td className="py-4 px-4">
//                       {getApprovalBadge(request.approvalStatus)}
//                     </td>
//                     <td className="py-4 px-4">
//                       {getPaymentBadge(request.paymentStatus)}
//                     </td>
//                     <td className="py-4 px-4">
//                       <div className="flex items-center gap-2">
//                         {request.approvalStatus === "approved" &&
//                           request.paymentStatus === "unpaid" && (
//                             <Button
//                               size="sm"
//                               className="bg-blue-600 hover:bg-blue-700 text-white"
//                               onClick={() => handleMarkAsPaid(request.id)}
//                             >
//                               <Banknote size={16} className="mr-1" />
//                               Mark as Paid
//                             </Button>
//                           )}
//                         {request.paymentStatus === "paid" && (
//                           <span className="text-sm text-green-600 font-medium flex items-center">
//                             <span className="mr-1">✓</span> Payment Complete
//                           </span>
//                         )}
//                         {request.approvalStatus === "pending" && (
//                           <span className="text-sm text-yellow-600 font-medium">
//                             Awaiting Manager Approval
//                           </span>
//                         )}
//                         {request.approvalStatus === "rejected" && (
//                           <span className="text-sm text-red-600 font-medium">
//                             Rejected by Manager
//                           </span>
//                         )}
//                         <Button
//                           variant="link"
//                           className="text-blue-600 p-0 h-auto"
//                           size="sm"
//                         >
//                           View Details
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Banknote } from "lucide-react";

const initialRequests = [
  {
    id: "01",
    employeeName: "Rahul Sharma",
    category: "Travel, Food, Accommodation",
    project: "Project Alpha",
    manager: "John Doe",
    amount: "₹ 1,157",
    approvalStatus: "pending", // pending, approved, rejected
    paymentStatus: "unpaid", // unpaid, paid
  },
  {
    id: "02",
    employeeName: "Priya Singh",
    category: "Internet Bill",
    project: "Project Beta",
    manager: "Jane Smith",
    amount: "₹ 699",
    approvalStatus: "approved",
    paymentStatus: "unpaid",
  },
  {
    id: "03",
    employeeName: "Amit Kumar",
    category: "Food",
    project: "Project Gamma",
    manager: "Mike Johnson",
    amount: "₹ 750",
    approvalStatus: "rejected",
    paymentStatus: "unpaid",
  },
  {
    id: "04",
    employeeName: "Neha Gupta",
    category: "Travel",
    project: "Project Delta",
    manager: "Sarah Williams",
    amount: "₹ 2,500",
    approvalStatus: "approved",
    paymentStatus: "paid",
  },
  {
    id: "05",
    employeeName: "Vikram Patel",
    category: "Office Supplies",
    project: "Project Alpha",
    manager: "John Doe",
    amount: "₹ 1,200",
    approvalStatus: "approved",
    paymentStatus: "unpaid",
  },
];

export default function FinanceDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);

  const getApprovalBadge = (approvalStatus) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };

    return (
      <Badge variant="outline" className={`${variants[approvalStatus]} capitalize`}>
        {approvalStatus === "approved"
          ? "Approved"
          : approvalStatus === "rejected"
          ? "Rejected"
          : "Pending"}
      </Badge>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    const variants = {
      paid: "bg-blue-100 text-blue-800 border-blue-300",
      unpaid: "bg-gray-100 text-gray-800 border-gray-300",
    };

    return (
      <Badge variant="outline" className={`${variants[paymentStatus]} capitalize`}>
        {paymentStatus === "paid" ? "Paid" : "Unpaid"}
      </Badge>
    );
  };

  const handleMarkAsPaid = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id
          ? { ...request, paymentStatus: "paid" }
          : request
      )
    );
    // Add your API call here to update payment status
    console.log(`Marking request ${id} as paid`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-gray-600">Process payments for approved reimbursement requests</p>
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
                    Manager
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Approval Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Payment Status
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
                    <td className="py-4 px-4 text-gray-700">
                      {request.manager}
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      {request.amount}
                    </td>
                    <td className="py-4 px-4">
                      {getApprovalBadge(request.approvalStatus)}
                    </td>
                    <td className="py-4 px-4">
                      {getPaymentBadge(request.paymentStatus)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {request.approvalStatus === "approved" &&
                          request.paymentStatus === "unpaid" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => handleMarkAsPaid(request.id)}
                            >
                              <Banknote size={16} className="mr-1" />
                              Mark as Paid
                            </Button>
                          )}
                        {request.paymentStatus === "paid" && (
                          <span className="text-sm text-green-600 font-medium flex items-center">
                            <span className="mr-1">✓</span> Payment Complete
                          </span>
                        )}
                        {request.approvalStatus === "pending" && (
                          <span className="text-sm text-yellow-600 font-medium">
                            Awaiting Manager Approval
                          </span>
                        )}
                        {request.approvalStatus === "rejected" && (
                          <span className="text-sm text-red-600 font-medium">
                            Rejected by Manager
                          </span>
                        )}
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 h-auto"
                          size="sm"
                          onClick={() => router.push(`/dashboard/finance/view-details/${request.id}`)}
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
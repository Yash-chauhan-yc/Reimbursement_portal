"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const CATEGORIES = [
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "accommodation", label: "Accommodation" },
  { value: "internet", label: "Internet Bill" },
  { value: "other", label: "Other" },
];

const PROJECTS = [
  { value: "lti-pan", label: "LTI PAN" },
  { value: "npi", label: "NPI" },
  { value: "fino", label: "FINO" },
  { value: "indigo", label: "INDIGO" },
];

const MANAGERS = [
  { value: "nitu-gupta", label: "Nitu Gupta" },
  { value: "monika-verma", label: "Monika Verma" },
  { value: "rashmi-chaudhary", label: "Rashmi Chaudhary" },
  { value: "Renu-verma", label: "Renu Verma" },
];

export default function RaiseReimbursement() {
  const router = useRouter();
  const [reimbursements, setReimbursements] = useState([
    {
      id: 1,
      category: "",
      description: "",
      amount: "",
      date: "",
      project: "",
      manager: "",
      bill: null,
    },
  ]);

  const addReimbursement = () => {
    setReimbursements([
      ...reimbursements,
      {
        id: reimbursements.length + 1,
        category: "",
        description: "",
        amount: "",
        date: "",
        project: "",
        manager: "",
        bill: null,
      },
    ]);
  };

  const deleteReimbursement = (id) => {
    if (reimbursements.length > 1) {
      setReimbursements(reimbursements.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = () => {
    console.log("Submitting reimbursements:", reimbursements);
    // Add your submit logic here
  };

  const handleFileChange = (id, file) => {
    setReimbursements(
      reimbursements.map((item) =>
        item.id === id ? { ...item, bill: file } : item
      )
    );
  };

  const updateReimbursement = (id, field, value) => {
    setReimbursements(
      reimbursements.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
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
        <ChevronRight size={16} className="text-gray-400" />
        <span className="text-gray-900 font-medium">Raise Reimbursement</span>
      </nav>

      <div className="w-full">
        {reimbursements.map((reimbursement, index) => (
          <div key={reimbursement.id} className="mb-8">
            {index === 0 && (
              <p className="text-sm text-gray-600 mb-6">
                Kindly fill in the form below to submit a Reimbursement
              </p>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Category and Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select
                    value={reimbursement.category}
                    onValueChange={(value) =>
                      updateReimbursement(reimbursement.id, "category", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Enter purpose"
                    value={reimbursement.description}
                    onChange={(e) =>
                      updateReimbursement(
                        reimbursement.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="min-h-[42px]"
                  />
                </div>
              </div>

              {/* Project and Manager */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project
                  </label>
                  <Select
                    value={reimbursement.project}
                    onValueChange={(value) =>
                      updateReimbursement(reimbursement.id, "project", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS.map((project) => (
                        <SelectItem key={project.value} value={project.value}>
                          {project.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manager
                  </label>
                  <Select
                    value={reimbursement.manager}
                    onValueChange={(value) =>
                      updateReimbursement(reimbursement.id, "manager", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {MANAGERS.map((manager) => (
                        <SelectItem key={manager.value} value={manager.value}>
                          {manager.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Amount and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={reimbursement.amount}
                    onChange={(e) =>
                      updateReimbursement(
                        reimbursement.id,
                        "amount",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={reimbursement.date}
                      onChange={(e) =>
                        updateReimbursement(
                          reimbursement.id,
                          "date",
                          e.target.value
                        )
                      }
                      className="pr-10"
                    />
                    <Calendar
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>
              </div>

              {/* Upload Bill */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Bill
                </label>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleFileChange(reimbursement.id, e.target.files[0])
                    }
                  />
                </div>
                {reimbursement.bill && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {reimbursement.bill.name}
                  </p>
                )}
              </div>

              {/* Delete Button */}
              <div>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => deleteReimbursement(reimbursement.id)}
                  disabled={reimbursements.length === 1}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={addReimbursement}
          >
            Add Reimbursement
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-12"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
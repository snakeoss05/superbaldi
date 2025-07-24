"use client";

import { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Badge } from "../components/badge";
import { Eye, Edit, Trash2, Search } from "lucide-react";

export default function InvoiceList({ invoices, onView, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            size="sm">
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
            size="sm">
            Pending
          </Button>
          <Button
            variant={statusFilter === "paid" ? "default" : "outline"}
            onClick={() => setStatusFilter("paid")}
            size="sm">
            Paid
          </Button>
          <Button
            variant={statusFilter === "overdue" ? "default" : "outline"}
            onClick={() => setStatusFilter("overdue")}
            size="sm">
            Overdue
          </Button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-semibold">Invoice ID</th>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Date</th>
              <th className="text-left p-4 font-semibold">Due Date</th>
              <th className="text-left p-4 font-semibold">Amount</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono font-semibold text-blue-600">
                  {invoice.id}
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium">{invoice.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {invoice.customerEmail}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">
                  {formatDate(invoice.invoiceDate)}
                </td>
                <td className="p-4 text-gray-600">
                  {formatDate(invoice.dueDate)}
                </td>
                <td className="p-4 font-semibold">
                  ${invoice.total.toFixed(2)}
                </td>
                <td className="p-4">
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView(invoice)}
                      title="View Invoice">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(invoice)}
                      title="Edit Invoice">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete invoice ${invoice.id}?`
                          )
                        ) {
                          onDelete(invoice.id);
                        }
                      }}
                      title="Delete Invoice">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No invoices found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

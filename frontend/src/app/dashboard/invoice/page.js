"use client";

import { useState } from "react";
import { Button } from "../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import { Plus, FileText } from "lucide-react";
import InvoiceForm from "./invoice-form";
import InvoiceList from "./invoice-list";
import InvoiceView from "./invoice-view";
import { toast } from "react-hot-toast";

export default function InvoiceManager() {
  const [currentView, setCurrentView] = useState("list"); // list, create, edit, view
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerAddress: "123 Main St, City, State 12345",
      invoiceDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "paid",
      items: [
        {
          id: 1,
          description: "Web Development",
          quantity: 1,
          price: 1500,
          total: 1500,
        },
        {
          id: 2,
          description: "SEO Optimization",
          quantity: 1,
          price: 500,
          total: 500,
        },
      ],
      subtotal: 2000,
      tax: 200,
      total: 2200,
      notes: "Thank you for your business!",
    },
    {
      id: "INV-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      customerAddress: "456 Oak Ave, City, State 67890",
      invoiceDate: "2024-01-20",
      dueDate: "2024-02-20",
      status: "pending",
      items: [
        {
          id: 1,
          description: "Logo Design",
          quantity: 1,
          price: 800,
          total: 800,
        },
        {
          id: 2,
          description: "Business Cards",
          quantity: 500,
          price: 1,
          total: 500,
        },
      ],
      subtotal: 1300,
      tax: 130,
      total: 1430,
      notes: "Payment due within 30 days",
    },
    {
      id: "INV-003",
      customerName: "Bob Johnson",
      customerEmail: "bob@example.com",
      customerAddress: "789 Pine St, City, State 54321",
      invoiceDate: "2024-01-25",
      dueDate: "2024-02-25",
      status: "overdue",
      items: [
        {
          id: 1,
          description: "Mobile App Development",
          quantity: 1,
          price: 3000,
          total: 3000,
        },
      ],
      subtotal: 3000,
      tax: 300,
      total: 3300,
      notes: "50% deposit required",
    },
  ]);

  const handleCreateInvoice = (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      status: "pending",
    };
    setInvoices([...invoices, newInvoice]);
    setCurrentView("list");
    toast({
      title: "Invoice Created!",
      description: `Invoice ${newInvoice.id} has been created successfully.`,
    });
  };

  const handleUpdateInvoice = (invoiceData) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === selectedInvoice.id
          ? { ...invoiceData, id: selectedInvoice.id }
          : inv
      )
    );
    setCurrentView("list");
    setSelectedInvoice(null);
    toast({
      title: "Invoice Updated!",
      description: `Invoice ${
        invoiceData.id || selectedInvoice.id
      } has been updated successfully.`,
    });
  };

  const handleDeleteInvoice = (invoiceId) => {
    setInvoices(invoices.filter((inv) => inv.id !== invoiceId));
    toast({
      title: "Invoice Deleted!",
      description: `Invoice ${invoiceId} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setCurrentView("view");
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setCurrentView("edit");
  };

  const getStatusStats = () => {
    const stats = invoices.reduce(
      (acc, invoice) => {
        acc[invoice.status] = (acc[invoice.status] || 0) + 1;
        acc.total += invoice.total;
        return acc;
      },
      { paid: 0, pending: 0, overdue: 0, total: 0 }
    );
    return stats;
  };

  const stats = getStatusStats();

  if (currentView === "create") {
    return (
      <div>
        <div className="mb-6">
          <Button
            onClick={() => setCurrentView("list")}
            variant="outline"
            className="mb-4">
            ← Back to Invoices
          </Button>
        </div>
        <InvoiceForm
          onSubmit={handleCreateInvoice}
          onCancel={() => setCurrentView("list")}
        />
      </div>
    );
  }

  if (currentView === "edit" && selectedInvoice) {
    return (
      <div>
        <div className="mb-6">
          <Button
            onClick={() => setCurrentView("list")}
            variant="outline"
            className="mb-4">
            ← Back to Invoices
          </Button>
        </div>
        <InvoiceForm
          invoice={selectedInvoice}
          onSubmit={handleUpdateInvoice}
          onCancel={() => setCurrentView("list")}
          isEditing={true}
        />
      </div>
    );
  }

  if (currentView === "view" && selectedInvoice) {
    return (
      <div>
        <div className="mb-6">
          <Button
            onClick={() => setCurrentView("list")}
            variant="outline"
            className="mb-4">
            ← Back to Invoices
          </Button>
        </div>
        <InvoiceView
          invoice={selectedInvoice}
          onEdit={() => setCurrentView("edit")}
          onDelete={() => {
            handleDeleteInvoice(selectedInvoice.id);
            setCurrentView("list");
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Invoices</p>
                <p className="text-3xl font-bold">{invoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Paid</p>
                <p className="text-3xl font-bold">{stats.paid}</p>
              </div>
              <div className="h-8 w-8 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Pending</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">⏳</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Overdue</p>
                <p className="text-3xl font-bold">{stats.overdue}</p>
              </div>
              <div className="h-8 w-8 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoice Management
              </CardTitle>
              <CardDescription>
                Manage all your invoices in one place
              </CardDescription>
            </div>
            <Button
              onClick={() => setCurrentView("create")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <InvoiceList
            invoices={invoices}
            onView={handleViewInvoice}
            onEdit={handleEditInvoice}
            onDelete={handleDeleteInvoice}
          />
        </CardContent>
      </Card>
    </div>
  );
}

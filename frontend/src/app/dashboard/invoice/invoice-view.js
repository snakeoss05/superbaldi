"use client";

import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { Badge } from "../components/badge";
import {
  Edit,
  Trash2,
  Download,
  Mail,
  PrinterIcon as Print,
} from "lucide-react";

export default function InvoiceView({ invoice, onEdit, onDelete }) {
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here");
  };

  const handleSendEmail = () => {
    // In a real app, this would send the invoice via email
    alert("Email functionality would be implemented here");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invoice {invoice.id}</h2>
          <p className="text-gray-600">View and manage invoice details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (
                confirm(
                  `Are you sure you want to delete invoice ${invoice.id}?`
                )
              ) {
                onDelete();
              }
            }}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Invoice Display */}
      <Card className="shadow-lg print:shadow-none">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
              <p className="text-lg font-semibold text-blue-600">
                {invoice.id}
              </p>
            </div>
            <div className="text-right">
              <Badge
                className={`${getStatusColor(
                  invoice.status
                )} text-lg px-4 py-2`}>
                {invoice.status.charAt(0).toUpperCase() +
                  invoice.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Company and Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                From:
              </h3>
              <div className="text-gray-600">
                <p className="font-semibold">Your Company Name</p>
                <p>123 Business Street</p>
                <p>City, State 12345</p>
                <p>contact@yourcompany.com</p>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Bill To:
              </h3>
              <div className="text-gray-600">
                <p className="font-semibold">{invoice.customerName}</p>
                <p>{invoice.customerEmail}</p>
                {invoice.customerAddress && (
                  <div className="whitespace-pre-line">
                    {invoice.customerAddress}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Invoice Date</p>
              <p className="font-semibold">{formatDate(invoice.invoiceDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-semibold">{formatDate(invoice.dueDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-semibold text-lg">
                ${invoice.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">
                      Description
                    </th>
                    <th className="border border-gray-200 p-3 text-center">
                      Quantity
                    </th>
                    <th className="border border-gray-200 p-3 text-right">
                      Price
                    </th>
                    <th className="border border-gray-200 p-3 text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 p-3">
                        {item.description}
                      </td>
                      <td className="border border-gray-200 p-3 text-center">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-200 p-3 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="border border-gray-200 p-3 text-right font-semibold">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-1/2">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Tax (10%):</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-gray-300 font-bold text-lg">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Notes
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 whitespace-pre-line">
                  {invoice.notes}
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 border-t pt-4">
            <p>Thank you for your business!</p>
            <p>
              For questions about this invoice, please contact us at
              contact@yourcompany.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

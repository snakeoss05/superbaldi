"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Textarea } from "../components/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import {
  Plus,
  Trash2,
  Save,
  User,
  Calendar,
  DollarSign,
  FileText,
  Scan,
} from "lucide-react";
import ProductScanner from "./product-scanner";

export default function InvoiceForm({
  invoice,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ id: 1, description: "", quantity: 1, price: 0, total: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: "",
    status: "pending",
  });

  const [showProductScanner, setShowProductScanner] = useState(false);

  useEffect(() => {
    if (invoice && isEditing) {
      setFormData(invoice);
    }
  }, [invoice, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "price") {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }

    setFormData((prev) => ({ ...prev, items: newItems }));
    calculateTotals(newItems);
  };

  const addItem = () => {
    const newItem = {
      id: formData.items.length + 1,
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
    };
    setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: newItems }));
      calculateTotals(newItems);
    }
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    setFormData((prev) => ({
      ...prev,
      subtotal: subtotal,
      tax: tax,
      total: total,
    }));
  };

  const handleProductSelected = (product) => {
    const newItems = [...formData.items, product];
    setFormData((prev) => ({ ...prev, items: newItems }));
    calculateTotals(newItems);
    setShowProductScanner(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (showProductScanner) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <ProductScanner
          onProductSelect={handleProductSelected}
          onClose={() => setShowProductScanner(false)}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
          <CardDescription className="text-blue-100">
            Enter customer details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(e) =>
                  handleInputChange("customerName", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email *</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="customer@example.com"
                value={formData.customerEmail}
                onChange={(e) =>
                  handleInputChange("customerEmail", e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerAddress">Customer Address</Label>
            <Textarea
              id="customerAddress"
              placeholder="Enter customer address"
              value={formData.customerAddress}
              onChange={(e) =>
                handleInputChange("customerAddress", e.target.value)
              }
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Invoice Details
          </CardTitle>
          <CardDescription className="text-green-100">
            Set invoice dates and status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date *</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={formData.invoiceDate}
                onChange={(e) =>
                  handleInputChange("invoiceDate", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Items
          </CardTitle>
          <CardDescription className="text-orange-100">
            Add products or services
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {formData.items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg bg-gray-50">
              <div className="md:col-span-2 space-y-2">
                <Label>Description *</Label>
                <Input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity *</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "price",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Total</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={`$${item.total.toFixed(2)}`}
                    readOnly
                    className="bg-gray-100"
                  />
                  {formData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={addItem}
              variant="outline"
              className="flex-1 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button
              type="button"
              onClick={() => setShowProductScanner(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Scan className="h-4 w-4 mr-2" />
              Scan Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Totals */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Invoice Totals
          </CardTitle>
          <CardDescription className="text-purple-100">
            Summary of charges
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or terms"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>${formData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Tax (10%):</span>
              <span>${formData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>${formData.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-8 py-3 bg-transparent">
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Update Invoice" : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
}

"use client";
import React, { useEffect, useState, useRef } from "react";
import { getOrdersByOderId } from "@/utils/orderService";
import Image from "next/image";
import { use } from "react"; // Import `use` from React
import { format } from "date-fns";

export default function Invoice({ params }) {
  // Unwrap the params using React.use()
  const { orderId } = use(params);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();
  const ticketRef = useRef();

  useEffect(() => {
    getOrdersByOderId(orderId).then((data) => {
      setOrder(data.data[0]);
      setLoading(false);
    });
  }, [orderId]);

  const handlePrintInvoice = () => {
    // Add a small delay to ensure the page is fully rendered
    setTimeout(() => {
      // Force the browser to show the print dialog
      const printContent = document.querySelector(".invoice-page");
      if (printContent) {
        // Create a new window for printing
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice #${order?.orderId}</title>
              <style>
                @page {
                  size: A4;
                  margin: 10mm;
                }
                body { 
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                }
                .invoice-page { 
                  width: 100%;
                  max-width: 210mm;
                  margin: 0 auto;
                }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                .text-right { text-align: right; }
                .text-center { text-align: center; }
                .font-bold { font-weight: bold; }
                .border-t { border-top: 1px solid #ddd; }
                .pt-4 { padding-top: 1rem; }
                .mt-4 { margin-top: 1rem; }
                .mb-4 { margin-bottom: 1rem; }
                .pb-4 { padding-bottom: 1rem; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .justify-end { justify-content: flex-end; }
                .w-64 { width: 16rem; }
                .text-sm { font-size: 0.875rem; }
                .text-lg { font-size: 1.125rem; }
                .text-xl { font-size: 1.25rem; }
                .text-2xl { font-size: 1.5rem; }
                .text-gray-500 { color: #6b7280; }
                .text-gray-600 { color: #4b5563; }
                .text-gray-900 { color: #111827; }
                .h-10 { height: 2.5rem; }
                .mb-4 { margin-bottom: 1rem; }
                .rounded-md { border-radius: 0.375rem; }
                .overflow-hidden { overflow: hidden; }
                .object-cover { object-fit: cover; }
                .ml-4 { margin-left: 1rem; }
                .whitespace-nowrap { white-space: nowrap; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .gap-8 { gap: 2rem; }
                .mb-8 { margin-bottom: 2rem; }
                .border-b { border-bottom: 1px solid #ddd; }
                .pb-6 { padding-bottom: 1.5rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .flex-shrink-0 { flex-shrink: 0; }
                .h-12 { height: 3rem; }
                .w-12 { width: 3rem; }
                .items-center { align-items: center; }
                .items-start { align-items: flex-start; }
                .text-xs { font-size: 0.75rem; }
                .uppercase { text-transform: uppercase; }
                .tracking-wider { letter-spacing: 0.05em; }
                .font-medium { font-weight: 500; }
                .font-semibold { font-weight: 600; }
                .divide-y > * + * { border-top: 1px solid #ddd; }
                .divide-y > *:first-child { border-top: none; }
                .toFixed { font-family: monospace; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback to regular print if the element is not found
        window.print();
      }
    }, 500);
  };

  const handlePrintTicket = () => {
    // Add a small delay to ensure the page is fully rendered
    setTimeout(() => {
      // Force the browser to show the print dialog
      const printContent = document.querySelector(".ticket-page");
      if (printContent) {
        // Create a new window for printing
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt #${order?.orderId}</title>
              <style>
                @page {
                  size: 80mm 297mm;
<<<<<<< HEAD
                  margin: 1mm;
=======
                  margin: 2mm;
>>>>>>> e0b3f8e2e3cfc9d83f2930a23c4a2db1f0cacc8e
                }
                body { 
                  font-family: 'Courier New', monospace;
                  margin: 0;
                  padding: 0;
                  width: 80mm;
                  font-size: 12px;
                }
                .ticket-page { 
                  width: 80mm;
                  padding: 5mm;
                }
                .ticket-header {
                  text-align: center;
                  margin-bottom: 10px;
                  border-bottom: 1px dashed #000;
                  padding-bottom: 10px;
                }
                .ticket-logo {
                  max-width: 60mm;
                  margin: 0 auto 10px;
                }
                .ticket-title {
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 5px;
                }
                .ticket-info {
                  margin-bottom: 10px;
                  font-size: 10px;
                }
                .ticket-items {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 10px;
                }
                .ticket-items th {
                  text-align: left;
                  border-bottom: 1px dashed #000;
                  padding: 5px 0;
                  font-size: 10px;
                }
                .ticket-items td {
                  padding: 3px 0;
                  font-size: 10px;
                }
                .ticket-total {
                  border-top: 1px dashed #000;
                  padding-top: 10px;
                  margin-top: 10px;
                }
                .ticket-total-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                }
                .ticket-total-row.final {
                  font-weight: bold;
                  font-size: 14px;
                }
                .ticket-footer {
                  text-align: center;
                  margin-top: 15px;
                  font-size: 9px;
                  border-top: 1px dashed #000;
                  padding-top: 10px;
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .font-bold { font-weight: bold; }
                .mb-2 { margin-bottom: 5px; }
                .mt-2 { margin-top: 5px; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback to regular print if the element is not found
        window.print();
      }
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Order not found</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 print:bg-white print:p-0"
      dir="ltr">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 print:shadow-none print:rounded-none">
        {/* Print Buttons - Hidden during printing */}
        <div className="flex justify-end gap-4 mb-6 print:hidden">
          <button
            onClick={handlePrintTicket}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Print Receipt
          </button>
          <button
            onClick={handlePrintInvoice}
            className="inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Invoice
          </button>
        </div>

        {/* Invoice Content - A4 Format */}
        <div ref={invoiceRef} className="invoice-page">
          {/* Invoice Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <img
                  src="/fashion/bacola-logo.avif"
                  className="h-10 mb-4"
                  alt="logo"
                />
                <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-6000">Order #{order.orderId}</p>
                <p className="text-gray-600">
                  Date: {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-semibold text-gray-900">
                  Grocery Store
                </h2>
                <p className="text-black">123 Business Street</p>
                <p className="text-black">City, Country</p>
                <p className="text-black">Phone: +1234567890</p>
                <p className="text-black">Email: contact@grocery.com</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bill To:
              </h3>
              <p className="text-black">{order?.user.name}</p>
              {order?.user.address && (
                <>
                  <p className="text-black">
                    {order?.user.address.ville},{" "}
                    {order?.user.address.codePostal}
                  </p>
                  <p className="text-black">
                    Phone: {order?.user.address.phone}
                  </p>
                </>
              )}
              <p className="text-black">Email: {order?.user.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Order Details:
              </h3>
              <p className="text-black">Status: {order.status}</p>
              <p className="text-black">
                Payment Method: {order.paymentMethod}
              </p>
              <p className="text-black">
                Payment Status: {order.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {order.orderItems.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden print:h-10 print:w-10">
                          <Image
                            src={item.product.colors[0]?.images[0]}
                            alt={item.product.productName}
                            className="h-12 w-12 object-cover print:h-10 print:w-10"
                            width={48}
                            height={48}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-900">
                            {item.product.productName}
                          </div>
                          <div className="text-sm text-gray-800">
                            {item.product.category?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-800">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-800">
                      {item.price} DT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-800">
                      {(item.price * item.qty).toFixed(2)} DT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-800">Subtotal:</span>
                  <span className="text-gray-900">{order.totalAmount} DT</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-800">Shipping:</span>
                  <span className="text-gray-900">
                    {order.shippingPrice} DT
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">{order.totalPrice} DT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-800 print:mt-4 border-t border-gray-200 pt-4">
            <p>
              © {new Date().getFullYear()} Grocery Store. All rights reserved.
            </p>
            <p className="mt-1">
              This invoice was generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Receipt Content - 80mm × 298mm Format */}
        <div ref={ticketRef} className="ticket-page hidden">
          <div className="ticket-header">
            <img
              src="/fashion/bacola-logo.avif"
              className="ticket-logo"
              alt="logo"
            />
            <div className="ticket-title">GROCERY STORE</div>
            <div className="ticket-info">
              <div>123 Business Street</div>
              <div>City, Country</div>
              <div>Phone: +1234567890</div>
              <div>Email: contact@grocery.com</div>
            </div>
            <div className="mb-2">
              <div className="font-bold">RECEIPT</div>
              <div>Order #{order.orderId}</div>
              <div>{format(new Date(order.createdAt), "PPP")}</div>
            </div>
          </div>

          <div className="ticket-info mb-2">
            <div className="font-bold">Customer:</div>
            <div>{order?.user.name}</div>
            {order.user.address && (
              <>
                <div>{order.user.address.adresse}</div>
                <div>
                  {order?.user.address.ville}, {order?.user.address.codePostal}
                </div>
                <div>Phone: {order?.user.address.phone}</div>
              </>
            )}
          </div>

          <table className="ticket-items text-black">
            <thead>
              <tr>
                <th>Item</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.product.productName}
                    <div className="text-xs text-gray-800">
                      {item.product.category?.name}
                    </div>
                  </td>
                  <td className="text-right text-black">{item.qty}</td>
                  <td className="text-right text-black">{item.price} DT</td>
                  <td className="text-right text-black">
                    {(item.price * item.qty).toFixed(2)} DT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ticket-total text-black">
            <div className="ticket-total-row">
              <span>Subtotal:</span>
              <span>{order.totalAmount} DT</span>
            </div>
            <div className="ticket-total-row">
              <span>Shipping:</span>
              <span>{order.shippingPrice} DT</span>
            </div>
            <div className="ticket-total-row final">
              <span>TOTAL:</span>
              <span>{order.totalPrice} DT</span>
            </div>
          </div>

          <div className="ticket-info mb-2">
            <div>Payment Method: {order.paymentMethod}</div>
            <div>Status: {order.status}</div>
            <div>Payment: {order.isPaid ? "Paid" : "Unpaid"}</div>
          </div>

          <div className="ticket-footer">
            <div>Thank you for shopping with us!</div>
            <div className="mt-2">
              © {new Date().getFullYear()} Grocery Store
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        name: String,
        qty: Number,
        price: Number,
      },
    ],
    total: { type: Number, required: true },
    invoiceSize: { type: String, enum: ["ticket", "A4"], required: true },
    pdfUrl: { type: String, required: true }, // Path where the PDF is saved
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);

export const createOrder = async (orderData) => {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
export const getOrdersById = async (orderId, page) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}?page=${page}&limit=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const DeleteOrder = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const getOrdersProducts = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/getOrderProducts/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const getOrdersByOderId = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/getOrderByOderId/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const getOrders = async (page, orderDate, status) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders?page=${page}&limit=8&orderDate=${orderDate}&status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const updateOrderStatus = async (orderId, status, paymentStatus) => {
  const orderData = {
    status: status,
    paymentStatus: paymentStatus,
  };
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData), // Pass the orderData,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};
export const generateInvoice = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/generateInvoice/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to download invoice");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${orderId}.pdf`; // Ensure this matches the expected filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading invoice:", error);
  }
};
export const updateOrderItems = async (orderId, orderItems) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/items`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderItems }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update order items");
    }
    return data;
  } catch (error) {
    console.error("Error updating order items:", error);
    throw error;
  }
};

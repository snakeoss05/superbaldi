export const isAdminRole = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.3:5000/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const getUserProfile = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.3:5000/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const updateUserProfile = async (id, updateData) => {
  try {
    const response = await fetch(
      `http://192.168.1.3:5000/api/users/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};

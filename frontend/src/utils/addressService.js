import axios from "axios";

export const createAddress = async (address, id) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/addresses/${id}`,
      address
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAddress = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/addresses/${user._id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error creating wishlist:", err);
    throw err;
  }
};
export const getAddresses = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/addresses/${id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error creating wishlist:", err);
    throw err;
  }
};

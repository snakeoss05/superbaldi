import axios from "axios";

export const createAddress = async (address, id) => {
  try {
    const response = await axios.post(
      `https://superbaldi-production.up.railway.app/api/addresses/${id}`,
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
      `https://superbaldi-production.up.railway.app/api/addresses/${user._id}`
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
      `https://superbaldi-production.up.railway.app/api/addresses/${id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error creating wishlist:", err);
    throw err;
  }
};

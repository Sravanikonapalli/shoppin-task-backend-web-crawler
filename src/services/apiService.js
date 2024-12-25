import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

export const startCrawler = async (domains) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/crawl`, { domains });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

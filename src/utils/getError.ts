import axios from "axios";

const getError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || "An unexpected error occurred",
      status: error.response?.status || 500,
    };
  }

  return {
    message: "An unexpected error occurred",
    status: 500,
  };
};

export default getError;

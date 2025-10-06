import API from "./api";

export const registerUser = async (username: string, email: string, password: string) => {
  const { data } = await API.post("/auth/register", { username, email, password });
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token); // Save token
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

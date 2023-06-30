import axios from "axios";

export const publicApi = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: import.meta.env.VITE_API_URL,
  headers: ({
    "Content-Type": "application/json",
  }),
});
export let privateApi;

export const setupPrivateApi = (token) => {
  privateApi = axios.create({
    // baseURL: "http://localhost:3333",
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//verifica se o token esta definido
// api.interceptors.request.use((config)=> {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
// });

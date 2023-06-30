import axios from "axios";

export const publicApi = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "http://to-do-list-api-dev.us-east-2.elasticbeanstalk.com/",
  headers: ({
    "Content-Type": "application/json",
  }),
});
export let privateApi;

export const setupPrivateApi = (token) => {
  privateApi = axios.create({
    // baseURL: "http://localhost:3333",
    baseURL: "http://to-do-list-api-dev.us-east-2.elasticbeanstalk.com/",
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

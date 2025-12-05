import axios from "axios";


const api=axios.create({
  baseURL: 'https://trip-manager-backend.onrender.com/api/v1',
});

api.interceptors.request.use(function(config){
    const token = localStorage.getItem('trip-access-token');

    if(token){
        config.headers['Authorization']='Bearer '+token;
    }
    return config;
    
},
function(error){
    if (error.response && error.response.status === 401) {
      console.log("Token expired or invalid. Logging out...");
      
      // 1. Delete the bad token
      localStorage.removeItem('trip-access-token');
      
      // 2. Force reload to kick user back to Login (The PrivateRoute will handle the rest)
      window.location.href = '/'; 
    }
    return Promise.reject(error);
});

export default api;
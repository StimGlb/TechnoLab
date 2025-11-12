// client/src/services/api.js
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // ← Nouveau port
});

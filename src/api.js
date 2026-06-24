const API_BASE_URL = import.meta.env.PROD
  ? 'https://api-hospital-3n18.onrender.com/api'
  : '/api';

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

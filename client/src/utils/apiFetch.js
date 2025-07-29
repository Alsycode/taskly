const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {} } = options;
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    throw new Error('Network error or invalid response');
  }
};
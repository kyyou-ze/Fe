const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://apikey.limenovel.my.id';

const buildUrl = (endpoint, params) => {
  const url = new URL(endpoint, API_BASE_URL);
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        url.searchParams.append(key, params[key]);
      }
    });
  }
  return url.toString();
};

const getToken = () => {
  return localStorage.getItem('token');
};

const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP Error ${response.status}`
      }));
      throw new Error(error.message || 'Something went wrong');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return response;
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};

export const api = {
  get: (endpoint, params) => {
    const url = buildUrl(endpoint, params);
    return fetchWithAuth(url, { method: 'GET' });
  },

  post: (endpoint, data) => {
    const url = buildUrl(endpoint);
    return fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: (endpoint, data) => {
    const url = buildUrl(endpoint);
    return fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch: (endpoint, data) => {
    const url = buildUrl(endpoint);
    return fetchWithAuth(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: (endpoint) => {
    const url = buildUrl(endpoint);
    return fetchWithAuth(url, { method: 'DELETE' });
  },

  uploadFile: (endpoint, formData) => {
    const url = buildUrl(endpoint);
    const token = getToken();
    
    return fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    }).then(async (res) => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(error.message || 'Upload failed');
      }
      return res.json();
    });
  },
};

export default api;

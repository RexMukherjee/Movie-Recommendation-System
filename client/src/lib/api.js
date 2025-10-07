const API_BASE_URL = 'http://localhost:5000/api';

// User Registration with better error handling
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Check if server is reachable
    if (!response.ok) {
      if (response.status === 0 || response.status === 500) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 5000.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration API error:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred. Please try again.'
    };
  }
}

// User Login with better error handling
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Check if server is reachable
    if (!response.ok) {
      if (response.status === 0 || response.status === 500) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 5000.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login API error:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred. Please try again.'
    };
  }
}
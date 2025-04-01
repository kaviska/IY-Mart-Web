export async function fetchDataJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const newUrl = 'https://iymart.jp/api/' + url;
    const token = localStorage.getItem('user-token');
    console.log("Sending Token:", token);

    const response = await fetch(newUrl, {
      ...options,
      headers: {
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),

        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '12|sHzF77bBqtOHccUbs5XsIbEQQaq0gJ58AubeAtELc573df0d', // Include token if available
        ...options.headers,
      },
    });

    if (response.headers.get('content-type')?.includes('application/json')) {
      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) {
        throw new Error(result.errors || 'Network response was not ok');
      }

      return result;
    } else {
      // Log the raw response text for debugging
      const rawText = await response.text();
      console.error("Unexpected response format (not JSON):", rawText);
      throw new Error('Unexpected response format (not JSON)');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
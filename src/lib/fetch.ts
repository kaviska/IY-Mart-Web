export async function fetchDataJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const newUrl= 'https://iymart.jp/api/' + url; // Prepend the base URL to the endpoint
    const response = await fetch(newUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const result = await response.json();
    
    console.log("Response:", result);

    if (!response.ok) {
      throw new Error(result.errors || 'Network response was not ok');
    }

   // const data = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
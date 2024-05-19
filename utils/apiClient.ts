const apiClient = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    if (contentType && contentType.includes('text/plain')) {
      return response.text();
    }
  
    // 如果需要处理其他类型，可以在这里添加逻辑
    return response;
  };
  
  export default apiClient;
  
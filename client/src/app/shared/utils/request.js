export const request = async (url, method = 'GET', body = null, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
			headers['Content-Type'] = 'application/json';
		}

		const response = await fetch(process.env.REACT_APP_API + url, { method, body, headers });
		const data = await response.json();
		
    if (!response.ok) {
			throw new Error(data.message || 'Something went wrong!');
    }

    return data;
  } catch (err) {
    throw err;
  }
};
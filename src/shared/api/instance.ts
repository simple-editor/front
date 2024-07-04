const fetchClient = async (url: string, options: RequestInit) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    ...options,
  });
};

export default fetchClient;

import { useEffect, useState, useCallback } from 'react';

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Something went wrong, failed to send request'
    );
  }

  return data;
};

export default function useHttp(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const clearData = () => {
    setData(initialValue);
  };

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  // This useEffect purpose is to make the http request without the user manual call
  // , only for GET methods.
  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

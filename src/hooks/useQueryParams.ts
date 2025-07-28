import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleMultipleParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handleParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const getParamValue = (key: string) => {
    return searchParams.get(key);
  };
  const useQueryParamsKey = (key: string) => {
    const obj = Object.fromEntries(searchParams.entries());
    return {
      queryKey: [key, JSON.stringify(obj)],
      queryString: new URLSearchParams(obj).toString(),
    };
  };
  return {
    handleParams,
    handleMultipleParams,
    queryParams: Object.fromEntries(searchParams.entries()),
    getParamValue,
    raw: searchParams,
    useQueryParamsKey,
  };
};

export default useQueryParams;

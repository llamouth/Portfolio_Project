import { useCallback } from "react";

const useEnterSubmit = (callback) => {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        callback();
      }
    }, [callback]);

  return handleKeyPress;
};

export default useEnterSubmit;
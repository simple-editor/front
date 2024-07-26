import { useEffect, useRef, useState } from "react";

const useLayoutSize = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [layoutSize, setLayoutSize] = useState({
    w: 0,
    h: 0,
  });
  useEffect(() => {
    if (parentRef.current) {
      const height = parentRef.current.offsetHeight;
      const width = parentRef.current.offsetWidth;

      setLayoutSize({ w: width, h: height });
    }
  }, [layoutSize]);

  return { layoutSize, parentRef };
};

export default useLayoutSize;

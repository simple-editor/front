import throttle from "lodash/throttle";
import { useEffect, useRef } from "react";
import useLayoutStore from "@/shared/store/layout-store";

const useLayoutResize = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { setWidth, setHeight, width, height } = useLayoutStore(
    (state) => state
  );
  useEffect(() => {
    const handleResize = throttle(() => {
      if (parentRef.current) {
        setWidth(parentRef.current.offsetWidth);
        setHeight(parentRef.current.offsetHeight);
      }
    }, 100);

    handleResize(); // 초기 사이즈 설정

    window.addEventListener("resize", handleResize); // 윈도우 리사이즈 이벤트에 핸들러 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 클린업
    };
  }, []);
  return {
    width,
    height,
    parentRef,
  };
};

export default useLayoutResize;

"use client";
import { debounce } from "@/utils/performance";
import { useEffect, useState } from "react";

/**
 * Hook to detect responsive breakpoints
 * @returns {Object} Current breakpoint information
 */
const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1920,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
      });
    }, 150);

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useResponsive;

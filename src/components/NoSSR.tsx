import React, { useState, useEffect } from "react";

interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const NoSSR: React.FC<NoSSRProps> = ({
  children,
  fallback = null, // Use null instead of div to avoid hydration mismatch
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default NoSSR;

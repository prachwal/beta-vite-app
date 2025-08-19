import React from "react";

// Debug component to help identify hydration issues
export const HydrationDebug: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    console.log("🔥 Client hydration complete");
  }, []);

  React.useEffect(() => {
    console.log("🎯 Environment check:", {
      isClient,
      hasWindow: typeof window !== "undefined",
      userAgent:
        typeof window !== "undefined" ? window.navigator?.userAgent : "N/A",
      timestamp: new Date().toISOString(),
    });
  }, [isClient]);

  return (
    <>
      {children}
      {/* Hidden debug info */}
      <div
        style={{
          display: "none",
        }}
        data-hydration-debug={JSON.stringify({
          isClient,
          timestamp: Date.now(),
        })}
      />
    </>
  );
};

export default HydrationDebug;

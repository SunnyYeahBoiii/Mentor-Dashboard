"use client";

import { useCallback, useEffect, useState } from "react";
import LoginModal from "./LoginModal";

interface AuthGateProps {
  children: (args: {
    isAuthenticated: boolean;
    onLogout: () => Promise<void>;
  }) => React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        credentials: "include",
      });
      const data = (await response.json()) as { authenticated?: boolean };
      setIsAuthenticated(Boolean(data.authenticated));
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
      credentials: "include",
    }).catch(() => undefined);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <p className="animate-pulse text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {children({ isAuthenticated, onLogout: handleLogout })}
      {!isAuthenticated ? <LoginModal onSuccess={handleLoginSuccess} /> : null}
    </>
  );
}

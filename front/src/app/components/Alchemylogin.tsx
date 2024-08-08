// Alchemylogin.tsx
"use client";
import React, { useEffect } from "react";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

interface AlchemyloginProps {
  onLoginStatusChange: (loggedIn: boolean) => void;
}

const Alchemylogin: React.FC<AlchemyloginProps> = ({ onLoginStatusChange }) => {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  useEffect(() => {
    onLoginStatusChange(!!user); // Call the callback with true if user is logged in, otherwise false
  }, [user, onLoginStatusChange]);

  return (
    <main className="flex flex-col items-center gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          You're logged in as {user.email ?? "anon"}.
          <button
            className="btn btn-primary mt-6"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
};

export default Alchemylogin;

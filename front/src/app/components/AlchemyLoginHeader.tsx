// Alchemylogin.tsx
"use client";
import React, { useEffect } from "react";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";


const AlchemyloginHeader: React.FC = ( ) => {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

//   useEffect(() => {
//     onLoginStatusChange(!!user); // Call the callback with true if user is logged in, otherwise false
//   }, [user, onLoginStatusChange]);

  return (
    <main className="flex flex-row items-center gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-row gap-2 font-semibold">
          You're logged in as {user.email ?? user.address.slice(0,8)}...
          <button
            className="btn btn-primary -mt-2"
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

export default AlchemyloginHeader;

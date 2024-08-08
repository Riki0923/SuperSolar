"use client";

import { useAuthModal, useLogout, useSignerStatus, useUser } from "@account-kit/react";
import { useEffect } from "react";
import MyOpSenderComponent from "./userop";
import Worldcoin from "./worldcoin/page";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  useEffect(() => {
    console.log("user is:", user)
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="text-5xl font-semibold text-semantic-accent-content">
        Welcome to SuperSolar <span className="ml-2">☀️</span>
      </div>
      {/* {signerStatus.isInitializing ? (
          <>Loading...</>
        ) : user ? (
          <div className="flex flex-col gap-2 p-2 mt-10">
            <p className="text-xl font-bold">Success!</p>
            You're logged in as {user.email ?? "anon"}.
            <button className="btn btn-primary mt-6" onClick={() => logout()}>
              Log out
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={openAuthModal}>
            Login
          </button>
        )}
        <MyOpSenderComponent /> */}
      {/* <Worldcoin/> */}
    </div>
  );
}

"use client";

import { useAuthModal, useLogout, useSignerStatus, useUser } from "@account-kit/react";
import { useEffect } from "react";
import MyOpSenderComponent from "./userop";
import Worldcoin from "./worldcoin/page";
import SunPicture from "./components/SunPicture";
import Technologies from "./components/technologies";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  useEffect(() => {
    console.log("user is:", user)
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-10">
      <div className="text-5xl font-semibold text-semantic-accent-content">
        Welcome to SuperSolar <span className="ml-2">☀️</span>
        
      </div>
      <p className="font-semibold">Where users can onboard for free and bring the solar community into Crypto!</p>
    <SunPicture/>
    <div className="text-xl font-semibold text-semantic-accent-content flex flex-col justify-centet items-center">Technologies used:
      <div className="flex flex-row justify-center items-center">
      <Technologies/>
      </div>
    </div>
    </div>
  );
}

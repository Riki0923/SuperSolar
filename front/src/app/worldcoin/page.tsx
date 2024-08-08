"use client";

import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "../worldcoin/api/verify";
import  WorldcoinIcon  from "../components/assets/WorldcoinIcon";

export default function WorldcoinComponent() {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const { setOpen } = useIDKit();

  const onSuccess = (result: ISuccessResult) => {
    window.alert(
      "Successfully verified with World ID! Your nullifier hash is: " +
        result.nullifier_hash
    );
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    );
    try {
      const data = await verify(result);
      if (data.success) {
        console.log("Successful response from backend:\n", JSON.stringify(data));
      } else {
        throw new Error(`Verification failed: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error handling proof:", error);
      window.alert("There was an error during verification. Please try again.");
    }
  };

  return (
    <div className="flex flex-row mt-24">
      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />

      <button
        className="bg-white text-black font-bold py-2 px-4 rounded-2xl transition duration-300 ease-in-out hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        onClick={() => setOpen(true)}

      >        <WorldcoinIcon/>
        Verify with World ID
      </button>
    </div>
  );
}

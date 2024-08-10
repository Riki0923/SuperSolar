"use client";

import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "../worldcoin/api/verify";
import WorldcoinIcon from "../components/assets/WorldcoinIcon";

interface WorldcoinComponentProps {
  onSuccess: () => void;
}

export default function WorldcoinComponent({ onSuccess }: WorldcoinComponentProps) {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const { setOpen } = useIDKit();

  const handleSuccess = (result: ISuccessResult) => {
    window.alert(
      "Successfully verified with World ID! Your nullifier hash is: " +
        result.nullifier_hash
    );

    onSuccess(); // Trigger the callback passed from the parent component
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
    <div className="items-center flex justify-center">
      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={handleSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />

      <button
        className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:shadow-lg hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setOpen(true)}
      >
        <WorldcoinIcon />
        Verify with World ID
      </button>
    </div>
  );
}

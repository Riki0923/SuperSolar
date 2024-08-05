import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
 
export default function MyOpSenderComponent() {
  const { client } = useSmartAccountClient({ type: "LightAccount" });
 
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    // optional parameter that will wait for the transaction to be mined before returning
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      // [optional] Do something with the hash and request
    },
    onError: (error) => {
      // [optional] Do something with the error
    },
  });
 
  return (
    <div>
      <button
        onClick={() =>
          sendUserOperation({
            uo: {
              target: "0xTARGET_ADDRESS",
              data: "0x",
              
            },
          })
        }
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Send UO"}
      </button>
    </div>
  );
}
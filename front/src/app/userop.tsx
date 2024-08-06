import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { ethers, Interface } from "ethers";
import MyContract from '../../../contracts/artifacts/contracts/Solar.sol/Solar.json'
 
export default function MyOpSenderComponent() {
  const { client } = useSmartAccountClient({ type: "LightAccount",  policyId: "51dd572f-22f6-4b3d-bfa4-3ffdb4e9571c", });
 
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    // optional parameter that will wait for the transaction to be mined before returning
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      console.log(hash, request)
    },
    onError: (error) => {
      console.log(error)
    },
  });

  const handleSendUserOperation = () => {
    const abi = MyContract.abi;
    const iface = new Interface(abi);
    const data = iface.encodeFunctionData("createSolar", []) as `0x${string}`;

    sendUserOperation({
      uo: {
        target: "0xA2C349eF7f36e8173b530DFaa760FE7a93612E11",
        data: data,
      },
    });
  }

 
  return (
    <div>
      <button
      onClick={handleSendUserOperation}
      disabled={isSendingUserOperation}
    >
        {isSendingUserOperation ? "Sending..." : "Send UO"}
      </button>
    </div>
  );
}
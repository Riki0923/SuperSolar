import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { baseSepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{"type":"email"}],[{"type":"injected"}]],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig({
  // if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
  // get this from the app config you create at https://dashboard.alchemy.com/accounts
  apiKey: "KqHun7oadIUzn1xuiV4xdR5OaWjkPphD",
  chain: baseSepolia,
  ssr: true, // set to false if you're not using server-side rendering
  policyId: "51dd572f-22f6-4b3d-bfa4-3ffdb4e9571c",
}, uiConfig);

export const queryClient = new QueryClient();
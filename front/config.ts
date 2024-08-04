import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { arbitrumSepolia } from "@account-kit/infra";
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
  chain: arbitrumSepolia,
  ssr: true, // set to false if you're not using server-side rendering
}, uiConfig);

export const queryClient = new QueryClient();
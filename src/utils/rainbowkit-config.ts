import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';
import { http } from 'wagmi';
export const config = getDefaultConfig({
  appName: 'wallet-connect',
  projectId: process.env.NEXT_PUBLIC_WEB3MODAL_PROJECT_ID as string,
  chains: [
    mainnet,
    sepolia,
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_URL),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_URL),
  },
  ssr: true,
});

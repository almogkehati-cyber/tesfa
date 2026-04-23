import { createConfig, http } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'),
  },
  ssr: true,
});

export const supportedChains = [polygonAmoy];

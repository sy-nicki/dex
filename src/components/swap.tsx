'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  Card,
  Setting,
  TokenChange,
  ShinyButton,
  CurrencyInputField,
} from '@/components';
import { ArrowDown } from 'lucide-react';
import { useState, useContext } from 'react';
import tokenList from '@/config/token-list.json';
import { SwapTokenContext, SwapTokenContextType } from '@/context/swap-context';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface Token {
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
}
const CustomBeatLoader = () => (
  <BeatLoader/>
);
export const Swap = () => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]); // TODO tokenOne 和 tokenTwo 不能一样
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);
  const { swapUpdatePrice, singleSwapToken } = useContext(SwapTokenContext) as SwapTokenContextType;

  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);

  const [maxSlippage, setMaxSlippage] = useState(0.1);
  const [transactionDeadline, setTransactionDeadline] = useState(30);
  const handleSlippageChange = (value: number) => {
    setMaxSlippage(value);
  };
  const handleDeadlineChange = (value: number) => {
    setTransactionDeadline(value);
  };

  const getSwapPrice = async (inputAmount: number) => {
    setLoading(true);
    setInputAmount(inputAmount);
    const outputAmount = await swapUpdatePrice(
      tokenOne,
      tokenTwo,
      inputAmount,
    );
    setOutputAmount(outputAmount);
    setLoading(false);
  };
  const handleTokenOneChange = async (newToken: Token) => {
    setTokenOne(newToken);
    if (inputAmount > 0) {
      await getSwapPrice(inputAmount)
    }
  };
  const handleTokenTwoChange =async (newToken: Token) => {
    setTokenTwo(newToken);
    if (inputAmount > 0) {
      await getSwapPrice(inputAmount)
    }
  };
  const handleConnectWallet = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  };
  const handleSwap = async ( ) => {
   const hash = await singleSwapToken(tokenOne,
      tokenTwo,
      inputAmount)
    console.log(hash)
  }
  return (
    <Tabs defaultValue="tab1" className="flex flex-col justify-center items-center">
      <TabsList>
        {/*<TabsTrigger value="tab1">Swap</TabsTrigger>*/}
      </TabsList>

      <TabsContent value="tab1" className="w-[400px]">
        <Card>
          <div className="flex justify-between mb-[30px]">
            <div className="font-bold text-[18px]">Swap</div>
            <div>
              <Setting  maxSlippage={maxSlippage}
                        onMaxSlippageChange={handleSlippageChange}
                        transactionDeadline={transactionDeadline}
                        onTransactionDeadlineChange={handleDeadlineChange}/>
            </div>
          </div>
          <div>
            <div className="inputs space-y-2 relative mb-[20px]">
              <CurrencyInputField
                field="input"
                getSwapPrice={getSwapPrice}
              />
              <CurrencyInputField
                field="output"
                value={outputAmount}
                spinner={CustomBeatLoader}
                loading={loading}
              />
              <div
                className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-[80%] bg-brand-25 rounded">
                <ArrowDown className="bg-blue-100 rounded m-[5px]" />
              </div>
              <div
                className="assetOne flex absolute right-[6px] top-[18px] bg-blue-100 rounded-full px-[8px] py-[4px] space-x-[4px] cursor-pointer">
                <TokenChange token={tokenOne} onTokenChange={handleTokenOneChange} />
              </div>

              <div
                className="assetTwo flex absolute right-[6px] bottom-[22px] bg-blue-100 rounded-full px-[8px] py-[4px] space-x-[4px] cursor-pointer">
                <TokenChange token={tokenTwo} onTokenChange={handleTokenTwoChange} />
              </div>
            </div>
            {isConnected ? (
              <ShinyButton
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                onClick={handleSwap}

              >
                Swap
              </ShinyButton>
            ) : (
              <ShinyButton
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </ShinyButton>
            )}
          </div>

        </Card>
      </TabsContent>

    </Tabs>

  );
};

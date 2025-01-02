'use client';
import React, { ReactNode }  from 'react';
import { ethers } from 'ethers';
import { Config , useClient, useWriteContract} from 'wagmi';
import { clientToProvider, getPoolInfo, getOutputQuote, fromReadableAmount } from '@/utils/contract-tools';
import { Pool, Route, Trade } from '@uniswap/v3-sdk';
import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import {
  SwapTokenAddress,
  SwapTokenABI,
  // UserStorageDataAddress,
  // userStorageDataABI,
  // IWETHABI,
} from '@/contract';
import { Token as TokenInterface} from '@/interfaces/Token.interface';

export interface SwapTokenContextType {
  swapUpdatePrice: (tokenIn: TokenInterface, tokenOut: TokenInterface, inputAmount: number) => Promise<number>;
  singleSwapToken: (tokenIn: TokenInterface, tokenOut: TokenInterface, inputAmount: number) => Promise<void>;
}
export const SwapTokenContext = React.createContext<SwapTokenContextType | undefined>(undefined);
export const SwapTokenContextProvider = ({ children }: { children: ReactNode }) => {
  // @typescript-eslint/no-explicit-any
  const { chain, transport }  = useClient<Config>() as { chain: { id: number; name: string; }; transport: unknown };

  const {  writeContractAsync } = useWriteContract();

  const provider = clientToProvider(chain, transport);

  const swapUpdatePrice = async (tokenIn: TokenInterface, tokenOut: TokenInterface, inputAmount: number) => {
    if (!chain) {
      // 处理没有获取到链的信息，可能是返回 `undefined` 的情况
      throw new Error("Chain information is unavailable");
    }
    // Token
    const tokenInInfo = new Token(chain.id, tokenIn.address, tokenIn.decimals, tokenIn.ticker, tokenIn.name);
    const tokenOutInfo = new Token(chain.id, tokenOut.address, tokenOut.decimals, tokenOut.ticker, tokenOut.name);

    // Pool
    const poolInfo = await getPoolInfo(provider, tokenInInfo, tokenOutInfo);
    const pool = new Pool(
      tokenInInfo,
      tokenOutInfo,
      3000,
      poolInfo.sqrtPriceX96.toString(),
      poolInfo.liquidity.toString(),
      poolInfo.tick,
    );
    // Route
    const swapRoute = new Route(
      [pool],
      tokenInInfo,
      tokenOutInfo,
    );
    const amountOut = await getOutputQuote(provider, swapRoute, tokenInInfo, inputAmount);
    const uncheckedTrade = Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(
        tokenInInfo,
        fromReadableAmount(
          Number(inputAmount),
          tokenInInfo.decimals,
        ).toString(),
      ),
      outputAmount: CurrencyAmount.fromRawAmount(
        tokenOutInfo,
        JSBI.BigInt(amountOut),
      ),
      tradeType: TradeType.EXACT_INPUT,
    });
    return Number(uncheckedTrade.swaps[0].outputAmount.toExact());
  };
  const singleSwapToken = async (tokenIn, tokenOut, inputAmount) => {
    const decimals0 = 18;
    const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

    await writeContractAsync({
      abi: SwapTokenABI,
      address: SwapTokenAddress,
      functionName: 'swapExactInputSingle',
      args: [tokenIn.address, tokenOut.address, amountIn],
    });
    // return hash

  };
  return (
    <SwapTokenContext.Provider
      value={{ swapUpdatePrice, singleSwapToken }}>
      {children}
    </SwapTokenContext.Provider>
  );
};



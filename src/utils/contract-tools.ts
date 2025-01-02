import { BigNumber, ethers, providers } from 'ethers';
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { computePoolAddress, SwapQuoter } from '@uniswap/v3-sdk';
import { QUOTER_CONTRACT_ADDRESS, V3_FACTORY } from '@/contract';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';

export function clientToProvider(chain, transport) {
  if (!chain || !transport) return undefined;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  return new providers.JsonRpcProvider(transport.url, network);
}


export async function getPoolInfo(provider, tokenInInfo, tokenOutInfo) {
  if (!provider) {
    throw new Error('No provider');
  }
  const currentPoolAddress = computePoolAddress({
    factoryAddress: V3_FACTORY,
    tokenA: tokenInInfo,
    tokenB: tokenOutInfo,
    fee: 3000,
  });
  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    provider,
  );
  const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

export function fromReadableAmount(
  amount: number,
  decimals: number,
): BigNumber {
  return ethers.utils.parseUnits(amount.toString(), decimals);
}
export async function getOutputQuote(provider, route, tokenInInfo, inputAmount) {
  if (!provider) {
    throw new Error('Provider required to get pool state');
  }
  const { calldata } = await SwapQuoter.quoteCallParameters(
    route,
    CurrencyAmount.fromRawAmount(
      tokenInInfo,
      fromReadableAmount(
        Number(inputAmount),
        tokenInInfo.decimals,
      ).toString(),
    ),
    TradeType.EXACT_INPUT,
    {
      useQuoterV2: true,
    },
  );
  const quoteCallReturnData = await provider.call({
    to: QUOTER_CONTRACT_ADDRESS,
    data: calldata,
  });
  return ethers.utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData);

}

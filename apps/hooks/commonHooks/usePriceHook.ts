import { useMutation } from '@tanstack/react-query'
import { ethers, BigNumber } from 'ethers'
import { getErc20Contract, getProvider, getSigner } from '../../common/helper'
import erc20Abi from '../../common/abis/erc20.json'
import {
  AlphaRouter,
  ChainId,
  SwapOptionsUniversalRouter,
  SwapType,
} from '@uniswap/smart-order-router'
import { TradeType, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import { infura_key1 } from '@/apps/common/keys'

type Props = {
  tokenIn: any
  tokenOut: any
  value: any
  type: any
}

export function usePriceHook() {
  async function generateRoute({
    tokenIn,
    tokenOut,
    value,
    type,
  }: Props): Promise<any> {
    try {
      const mainnet = `https://polygon-mainnet.infura.io/v3/${infura_key1}`
      const provider2 = new ethers.providers.JsonRpcProvider(mainnet)
      const router = new AlphaRouter({
        chainId: ChainId.POLYGON,
        provider: provider2,
      })
      console.log('router', router)

      const signer = await getSigner()
      if (!signer) return
      const address = await signer.getAddress()

      // const { contract, isLoading, error } = useContract(tokenIn);
      // console.log('contract', contract)

      const tokenInContract = await getErc20Contract(tokenIn)
      const tokenOutContract = await getErc20Contract(tokenOut)
      if (!tokenInContract || !tokenOutContract) return

      const tokenInDecimals: any = await tokenInContract.callStatic.decimals()
      const tokenOutDecimals: any = await tokenOutContract.callStatic.decimals()
      if (tokenInDecimals === undefined || tokenOutDecimals === undefined) {
        throw "Decimals Can't fetch"
      }

      const options: SwapOptionsUniversalRouter = {
        recipient: address,
        slippageTolerance: new Percent(50, 10_000),
        type: SwapType.UNIVERSAL_ROUTER,
      }

      const currencyIn = new Token(
        137,
        tokenInContract.address,
        tokenInDecimals
      )
      const currencyOut = new Token(
        137,
        tokenOutContract.address,
        tokenOutDecimals
      )

      const baseCurrency = type === 'exactIn' ? currencyIn : currencyOut
      const quoteCurrency = type === 'exactIn' ? currencyOut : currencyIn
      const amount = await CurrencyAmount.fromRawAmount(baseCurrency, value)

      const route = await router?.route(
        amount,
        quoteCurrency,
        type === 'exactIn' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
        options
      )
      return route
    } catch (error) {
      console.log('route-error', error)
    }
  }
  return useMutation(generateRoute)
}

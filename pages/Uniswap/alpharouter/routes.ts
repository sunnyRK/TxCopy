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
import { fromReadableAmount } from '../libs/conversion'
import { infura_key1 } from '@/pages/common/keys'

export async function generateRoute(
  tokenIn: any,
  tokenOut: any,
  value: any,
  type: any
) {
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

    const tokenInContract = await getErc20Contract(tokenIn)
    const tokenOutContract = await getErc20Contract(tokenOut)

    if (!tokenInContract || !tokenOutContract) return

    const tokenInDecimals = await tokenInContract.decimals()
    const tokenOutDecimals = await tokenOutContract.decimals()
    // console.log('tokenInDecimals', tokenInDecimals)
    // console.log('tokenOutDecimals', tokenOutDecimals)

    const options: SwapOptionsUniversalRouter = {
      recipient: address,
      slippageTolerance: new Percent(50, 10_000),
      type: SwapType.UNIVERSAL_ROUTER,
    }

    const currencyIn = new Token(137, tokenInContract.address, tokenInDecimals)
    const currencyOut = new Token(
      137,
      tokenOutContract.address,
      tokenOutDecimals
    )

    console.log(
      'fromReadableAmount',
      value.toString()
      // fromReadableAmount(10, 6).toString()
    )

    const baseCurrency = type === 'exactIn' ? currencyIn : currencyOut
    const quoteCurrency = type === 'exactIn' ? currencyOut : currencyIn
    const amount = await CurrencyAmount.fromRawAmount(baseCurrency, value)

    console.log('baseCurrency', baseCurrency)
    console.log('quoteCurrency', quoteCurrency)

    const route = await router?.route(
      amount,
      quoteCurrency,
      type === 'exactIn' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
      options
    )

    console.log('route', route)
    console.log('tokenPath', route?.route[0].tokenPath)
    console.log(
      'route.quote.toExact()',
      route?.quote.toExact(),
      route?.trade.swaps[0].outputAmount.toExact()
    )

    // const signer = await getSigner()
    // const res = await signer?.sendTransaction({
    //   to: UniversalRouter,
    //   data: route?.methodParameters?.calldata,
    //   value: route?.methodParameters?.value,
    // })

    return route
  } catch (error) {
    console.log('route-error', error)
  }
}

const checkIsPermit2Approved = async (
  token: string,
  from: any,
  spender: any,
  amount: any
) => {
  let provider = await getProvider()
  let signer = await getSigner()
  let tokenContract
  try {
    if (!provider) return
    if (!signer) return
    tokenContract = await new ethers.Contract(token, erc20Abi, signer)
    console.log('checkIsPermit2Approved-from++++', from, spender, tokenContract)
    const allowance = await tokenContract
      .connect(signer)
      .allowance(from, spender)
    console.log(
      'checkIsPermit2Approved-after++++',
      from,
      spender,
      tokenContract
    )
    console.log('checkIsPermit2Approved-allowance', token, allowance.toString())
    console.log('checkIsPermit2Approved-amount', amount.toString())
    if (BigNumber.from(allowance).gte(BigNumber.from(amount.toString()))) {
      console.log('ifBigNumber')
      return true
    } else {
      console.log('elseBigNumber')
      // return false
    }
    return false
  } catch (error) {
    console.log('PermitArpprove-Error: ', error, signer, tokenContract)
  }
}

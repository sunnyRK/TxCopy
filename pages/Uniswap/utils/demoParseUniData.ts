import { ethers, BigNumber, utils } from 'ethers'
import UniversalAbi from '../../common/abis/Universal_abi.json'
import { Permit2Address, swapCodes, UniversalRouter } from '../utils/constants'
import { network_name } from '../../common/constants'
import {
  getErc20Contract,
  getProvider,
  getSigner,
  getTransactionByBlockNumberAndIndexUsingExplorereUrl,
} from '../../common/helper'
import {
  // checkIsPermit2Approved,
  checkIsSpenderApprovedForPermit2,
  extractPathFromV3,
  getSignForPermitForPermit2,
  rearrangeSwapData,
} from './helper'
import { toast } from 'react-toastify'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { fetchQuotePrice } from './quotePrice'
import erc20Abi from '../../common/abis/erc20.json'

import {
  AlphaRouter,
  ChainId,
  SwapOptionsSwapRouter02,
  SwapOptionsUniversalRouter,
  SwapRoute,
  SwapType,
} from '@uniswap/smart-order-router'
import {
  TradeType,
  CurrencyAmount,
  Percent,
  Token,
  BigintIsh,
} from '@uniswap/sdk-core'
import web3 from 'web3'
// import { CurrentConfig } from '../libs/config'
import { fromReadableAmount } from '../libs/conversion'
import { infura_key1 } from '@/pages/common/keys'

export async function generateRoute() {
  // : Promise<SwapRoute | null>
  console.log('Hello')
  const web3Provider = new ethers.providers.InfuraProvider(
    'matic',
    infura_key1
  ) // Ropsten

  const mainnet =
    `https://polygon-mainnet.infura.io/v3/${infura_key1}`
  const provider2 = new ethers.providers.JsonRpcProvider(mainnet)
  let provider3 = new ethers.providers.Web3Provider(web3.givenProvider)

  const router = new AlphaRouter({
    chainId: ChainId.POLYGON,
    provider: provider2,
  })

  console.log('router', router)

  // const options: SwapOptionsSwapRouter02 = {
  //   recipient: '0xb50685c25485CA8C520F5286Bbbf1d3F216D6989',
  //   slippageTolerance: new Percent(50, 10_000),
  //   deadline: Math.floor(Date.now() / 1000 + 1800),
  //   type: SwapType.SWAP_ROUTER_02,
  // }

  const options: SwapOptionsUniversalRouter = {
    recipient: '0xb50685c25485CA8C520F5286Bbbf1d3F216D6989',
    slippageTolerance: new Percent(50, 10_000),
    // deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.UNIVERSAL_ROUTER,
    // simulate: {
    //   fromAddress: "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989"
    // }
  }

  const type = 'exactIn'

  const currencyIn = new Token(
    137,
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    18,
    'DAI',
    '(PoS) Dai Stablecoin'
  )
  const currencyOut = new Token(
    137,
    '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    18,
    'Aave',
    'Aave Token'
  )

  // const currencyOut = new Token(
  //   137,
  //   '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  //   6,
  //   'USDC',
  //   'USD Coin (PoS)'
  // )

  try {
    const route = await router.route(
      CurrencyAmount.fromRawAmount(
        currencyIn,
        fromReadableAmount(125, 18).toString()
      ),
      currencyOut,
      TradeType.EXACT_INPUT,
      options
    )

    console.log('route', route)
    console.log('tokenPath', route?.route[0].tokenPath)
    console.log('route.quote.toExact()', route?.quote.toExact())

    // const tokenApproval = await getTokenTransferApproval(currencyIn)

    // const res = await sendTransaction({
    //   data: route.methodParameters?.calldata,
    //   to: V3_SWAP_ROUTER_ADDRESS,
    //   value: route?.methodParameters?.value,
    // from: walletAddress,
    // maxFeePerGas: MAX_FEE_PER_GAS,
    // maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    // })

    const signer = await getSigner()

    // const res = await signer?.sendTransaction({
    //   to: UniversalRouter,
    //   data: route?.methodParameters?.calldata,
    //   value: route?.methodParameters?.value,
    // })
  } catch (error) {
    console.log('route-error', error)
  }

  // const baseCurrency = type === 'exactIn' ? currencyIn : currencyOut
  // const quoteCurrency = type === 'exactIn' ? currencyOut : currencyIn

  // const wei = ethers.utils.parseUnits('1', 18)
  // // const other: any = JSBI.BigInt(wei);

  // const amount = CurrencyAmount.fromRawAmount(currencyIn, other)

  // const swapRoute = await router.route(
  //   amount,
  //   quoteCurrency,
  //   type === 'exactIn' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
  //   /*swapConfig=*/ undefined,
  //   options
  // )

  // const route = await router.route(
  //   amount,
  //   currencyOut,
  //   TradeType.EXACT_INPUT,
  //   options
  // )

  // console.log('route', route)

  // return route
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
    tokenContract = new ethers.Contract(token, erc20Abi, signer)
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

export const checkSpenderAllowance = async (receipt: any) => {
  try {
    let signer = await getSigner()
    if (!signer) return
    let address = await signer.getAddress()

    const sig = 'Transfer(address,address,uint256)'
    const bytess = utils.toUtf8Bytes(sig)
    const bytessAfterKeccak = utils.keccak256(bytess)

    for (let i = 0; i < receipt.logs.length; i++) {
      if (receipt.logs[i].topics[0] === bytessAfterKeccak) {
        console.log('\n In If', receipt.logs.length, i)

        const token = receipt.logs[i].address.toString()
        const from = utils.defaultAbiCoder.decode(
          ['address'],
          receipt.logs[i].topics[1]
        )

        if (from.toString() === receipt.from.toString()) {
          console.log('from: ', from, receipt.from)
          const to = utils.defaultAbiCoder.decode(
            ['address'],
            receipt.logs[i].topics[2]
          )
          const value = utils.defaultAbiCoder.decode(
            ['uint256'],
            receipt.logs[i].data
          )
          const allowedForPermit2 = await checkIsPermit2Approved(
            token.toString(),
            address,
            Permit2Address,
            value
          )
          console.log('allowedForPermit2: ', allowedForPermit2)
          // // if not allowed then give approve
          if (!allowedForPermit2) {
            const tokenContract = await getErc20Contract(token.toString())
            const approveTx = await tokenContract
              ?.connect(signer)
              .approve(Permit2Address, BigNumber.from(value.toString()))
            await approveTx.wait()
          }
        }
      }
    }
  } catch (error) {
    console.log('chackBalanceAndAllwance-error-', error)
  }
}

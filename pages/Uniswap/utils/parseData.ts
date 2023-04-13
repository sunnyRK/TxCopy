import { ethers, BigNumber, utils } from 'ethers'
import UniversalAbi from '../../common/abis/Universal_abi.json'
import { Permit2Address, swapCodes } from '../utils/constants'
import { network_name } from '../../common/constants'
import {
  getErc20Contract,
  getProvider,
  getSigner,
  getTransactionByBlockNumberAndIndexUsingExplorereUrl,
} from '../../common/helper'
import {
  checkIsPermit2Approved,
  checkIsSpenderApprovedForPermit2,
  extractPathFromV3,
  getSignForPermitForPermit2,
  rearrangeSwapData,
} from './helper'
import { toast } from 'react-toastify'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { fetchQuotePrice } from './quotePrice'

import {
  AlphaRouter,
  ChainId,
  SwapOptionsSwapRouter02,
  SwapOptionsUniversalRouter,
  SwapRoute,
  SwapType,
} from '@uniswap/smart-order-router'
import { TradeType, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import web3 from 'web3'

export const checkSpenderAllowance = async (receipt: any) => {
  try {
    console.log('ParseData')
  } catch (error) {
    console.log('checkSpenderAllowanceNew-error', error)
  }
}

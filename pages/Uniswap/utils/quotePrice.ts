import { BigNumber, ethers } from 'ethers'
// import { CurrentConfig } from '../libs/config'
import { computePoolAddress } from '@uniswap/v3-sdk'
import Quoter from '../../common/abis/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import IUniswapV3FactoryABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from '../libs/constants'
// import { getProvider } from '../libs/providers'
import { toReadableAmount, fromReadableAmount } from '../libs/conversion'
import { getProvider, getSigner } from '@/pages/common/helper'
import { ADDRESS_ZERO, UniV3FactoryAddress } from './constants'
import { parseEther } from 'ethers/lib/utils'

export const fetchQuotePrice = async (
  amountIn: any,
  paths: any,
  index: any
) => {
  const provider = await getProvider()

  const signer = await getSigner()
  // try {
  if (!signer) return
  if (!provider) return

  console.log('fetchQuotePrice-paths: ', paths)

  const univ3Factory = new ethers.Contract(
    UniV3FactoryAddress,
    IUniswapV3FactoryABI.abi,
    signer
  )
  if (!univ3Factory) {
    console.log('univ3Factory-notmade', univ3Factory)
    return
  }

  const fees = ['1000', '3000', '5000', '10000']
  let price: any = BigNumber.from(0)
  if (index == 1) {
    price = parseEther('999999999999999999999999999999999999')
  }
  console.log('v3pool-pool:')

  for (let i = 0; i < 4; i++) {
    const pool = await univ3Factory.getPool(paths[0], paths[1], fees[i])
    console.log('v3pool-pool: ', pool)

    if (ADDRESS_ZERO !== pool) {
      console.log('pool: ', pool)
      let newprice = await quote(paths, amountIn, fees[i], index)
      console.log('pool-newprice: ', newprice.toString())

      if (index == 0) {
        if (price.lt(newprice)) {
          price = newprice
        }
      } else if (index == 1) {
        if (price.gt(newprice)) {
          price = newprice
        }
      }
    }
    console.log('pool-lastPrice: ', price.toString())
  }
  return price
  // } catch (error) {
  //   console.log('uniV3Factory-error', error, signer)
  // }
}

export async function quote(
  path: any,
  amount: any,
  fee: any,
  index: any
): Promise<any> {
  const signer = await getSigner()
  // try {
  if (!signer) {
    console.log('signer-unib3-notmade', signer)
    return
  }
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    signer
  )
  if (!quoterContract) {
    console.log('quoterContract-notmade', quoterContract)
    return
  }
  console.log('pool-path', path, amount, fee)
  let quotedAmountOut
  console.log('initial-quotedAmountOut', quotedAmountOut)
  if (index == 0) {
    // quotedAmountOut = await quoterContract.callStatic.quoteExactInput(
    //   '0x2791bca1f2de4661ed88a30c99a7a9449aa841740001f40d500b1d8e8ef31e21c99d1db9a6444d3adf1270000bb89c2c5fd7b07e95ee044ddeba0e97a665f142394f',
    //   amount
    // )
    quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
      path[0],
      path[1],
      fee,
      amount, // amountIn
      0
    )
  } else if (index == 1) {
    quotedAmountOut = await quoterContract.callStatic.quoteExactOutputSingle(
      path[0],
      path[1],
      fee,
      amount, // amountOut
      0
    )
  }
  console.log('pool-quotedAmountOut', quotedAmountOut.toString())
  return quotedAmountOut
  // } catch (error) {
  //   console.log('quote-error', error, signer)
  // }
}

export async function quote2(path: any, amount: any): Promise<any> {
  const signer = await getSigner()
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    signer
  )
  console.log('pool-path', path, amount)

  let quotedAmountOut = amount
  console.log('initial-quotedAmountOut', quotedAmountOut)
  quotedAmountOut = await quoterContract.callStatic.quoteExactInput(
    path,
    amount
  )
  console.log('pool-quotedAmountOut', quotedAmountOut.toString())
  return quotedAmountOut
}

export async function oldquote(): Promise<string> {
  const signer = await getSigner()
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    signer
  )
  //   const poolConstants = await getPoolConstants()
  //   console.log('poolConstants', poolConstants, CurrentConfig.tokens.amountIn)

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    '3000',
    BigNumber.from('25000000'),
    // poolConstants.token1,
    // poolConstants.fee,
    // fromReadableAmount(
    //   1, 6
    // ).toString(),
    0
  )
  console.log('quotedAmountOut', quotedAmountOut.toString())

  const quotedAmountOut2 =
    await quoterContract.callStatic.quoteExactInputSingle(
      '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      '1000',
      BigNumber.from('25000000'),
      // poolConstants.token1,
      // poolConstants.fee,
      // fromReadableAmount(
      //   1, 6
      // ).toString(),
      0
    )
  console.log('quotedAmountOut2', quotedAmountOut2.toString())

  const quotedAmountOut3 =
    await quoterContract.callStatic.quoteExactInputSingle(
      '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      '10000',
      BigNumber.from('25000000'),
      // poolConstants.token1,
      // poolConstants.fee,
      // fromReadableAmount(
      //   1, 6
      // ).toString(),
      0
    )
  console.log('quotedAmountOut3', quotedAmountOut3.toString())
  return quotedAmountOut3
}

// async function getPoolConstants(): Promise<{
//   token0: string
//   token1: string
//   fee: number
// }> {
//   const currentPoolAddress = computePoolAddress({
//     factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
//     tokenA: CurrentConfig.tokens.in,
//     tokenB: CurrentConfig.tokens.out,
//     fee: CurrentConfig.tokens.poolFee,
//   })

//   const poolContract = new ethers.Contract(
//     currentPoolAddress,
//     IUniswapV3PoolABI.abi,
//     getProvider()
//   )
//   const [token0, token1, fee] = await Promise.all([
//     poolContract.token0(),
//     poolContract.token1(),
//     poolContract.fee(),
//   ])

//   return {
//     token0,
//     token1,
//     fee,
//   }
// }

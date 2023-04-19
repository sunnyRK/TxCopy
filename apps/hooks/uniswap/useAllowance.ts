import { BigNumber } from 'ethers'
import React from 'react'

export default function useAllowance() {
  const allowance = React.useRef<Promise<BigNumber>>()
  const getAllowance = async (token: any, address: any, spender: any) => {
    const allowanceGiven = await token?.callStatic.allowance(address, spender)
    console.log('allowanceGiven:', allowanceGiven.toString())
    allowance.current = allowanceGiven
  }
  return {
    allowance,
    getAllowance,
  }
}

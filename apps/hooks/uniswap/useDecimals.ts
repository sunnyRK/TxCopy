import { BigNumber } from 'ethers'
import React from 'react'

export default function useDecimals() {
  const decimals = React.useRef<Promise<BigNumber>>()
  const getDecimals = async (token: any) => {
    const decimal = await token?.callStatic.decimals()
    console.log('decimals:', decimal.toString())
    decimals.current = decimal
  }
  return {
    decimals,
    getDecimals,
  }
}

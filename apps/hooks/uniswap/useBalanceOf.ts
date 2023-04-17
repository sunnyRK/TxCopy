import { BigNumber } from "ethers";
import React from "react";

export default function useBalanceOf() {
    const balance = React.useRef<Promise<BigNumber>>();
    const getBalanceOf = async (token: any, address: any) => {
      const tokenInBalance = await token?.callStatic.balanceOf(address)
      console.log('tokenInBalance:', tokenInBalance.toString())
      balance.current = tokenInBalance
    };
    return {
      balance,
      getBalanceOf
    };
}
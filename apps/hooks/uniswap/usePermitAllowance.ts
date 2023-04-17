import { BigNumber } from "ethers";
import React from "react";

export default function usePermitAllowance() {
    const permit2allowance = React.useRef<Promise<BigNumber>>();
    const getPermitAlloance = async (permit: any, token: any, address: any, spender: any) => {
      const allowanceGiven = await permit?.callStatic.allowance(address, token, spender)
      console.log('allowanceGiven:', allowanceGiven.toString())
      permit2allowance.current = allowanceGiven
    };
    return {
      permit2allowance,
      getPermitAlloance
    };
}
import { BigNumber, ethers } from 'ethers'

const READABLE_FORM_LEN = 4

export function fromReadableAmount(
  amount: number,
  decimals: number
): BigNumber {
  console.log(ethers.utils.parseUnits(amount.toString(), decimals).toString())
  return ethers.utils.parseUnits(amount.toString(), decimals)
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  return ethers.utils
    .formatUnits(rawAmount, decimals)
    .slice(0, READABLE_FORM_LEN)
}

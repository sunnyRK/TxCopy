import { ethers } from 'ethers'
import { getProvider, makeContract } from '../helper'

export const ValidContracts = [
  {
    key: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
    value: 'aave_v2_matic',
  },
]

export const ContractMetaData = {
  aave_v2_matic: {
    chainName: 'polygon',
    chainId: '137',
    contractAddress: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
  },
}

export const ContractTokenData = [
  {
    key: 'aave_v2_matic',
    data: [
      {
        signature: '0x69328dec',
        sigData: {
          signature: 'withdraw(address,uint256,address)',
          tokenIn: 0,
          amountIn: 1,
          checkBalance: {
            needToCheck: true,
            method: 'getReserveData(address)',
            params: 'tokenIn',
            returnIndex: 7,
          },
          checkAllowance: {
            needToCheck: false,
          },
        },
      },
    ],
  },
]

export const getContractKey = async (contractAddress: any) => {
  try {
    const obj = ValidContracts.find((o) => o.key === contractAddress)
    return obj
  } catch (error) {
    console.log('contractKey-error', error)
  }
}

export const getContractMetadata = (key: any) => {
  try {
    // @ts-ignore
    const obj = ContractMetaData[key]
    return obj
  } catch (error) {
    console.log('contractMetadata-error', error)
  }
}

export const getSigData = (key: any, signature: any) => {
  try {
    // @ts-ignore
    const obj: any = ContractTokenData.find((o) => o.key === key)
    const sigData = obj.data.find((o: any) => o.signature === signature)
    return sigData.sigData
  } catch (error) {
    console.log('contractSigdata-error', error)
  }
}

export const checkBalance = async (
  data: any,
  contractAddress: any,
  address: any
) => {
  try {
    // @ts-ignore
    const abi = [`function` + ' ' + data.method]
    const abiInterface = new ethers.utils.Interface(abi)
    const contract = await makeContract(contractAddress, abiInterface)
    if (!contract) return
    return contract.balanceOf(address)
  } catch (error) {
    console.log('checkBalance-error', error)
  }
}

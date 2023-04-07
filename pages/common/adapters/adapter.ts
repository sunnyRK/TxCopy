import { ethers } from 'ethers'
import { getProvider } from '../helper'

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

export const checkBalance = (data: any, contractAddress: any) => {
  try {
    // @ts-ignore
    // const provider = await getProvider();
    // const abi = [`function` + ' ' + data.method]
    // const abiInterface = new ethers.utils.Interface(abi)
    // const contract = new ethers.Contract(contractAddress, abiInterface, provider);
    // const index =
    // const getToken = await
    // const datas = abiInterface.encodeFunctionData(
    //     data.method,
    //     decodedInput.args
    //     // ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', '106000000', "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989", 0]
    // )
  } catch (error) {
    console.log('checkBalance-error', error)
  }
}

// contract {
//     => deposit
//         tokenIn

// }

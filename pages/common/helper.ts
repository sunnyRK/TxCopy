import axios from 'axios'
import web3 from 'web3'
import { BigNumber, ethers } from 'ethers'
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import erc20Abi from './abis/erc20.json'
import { ETHERSCAN_API_KEY, POLYGON_ETHERSCAN_API_KEY } from '@/pages/keys'

export const getAbiUsingExplorereUrl = async (network: string, toAddress: string) => {
  try {
    let URL
    if (network === 'mainnet') {
      URL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${toAddress}&apikey=${ETHERSCAN_API_KEY}`
    } else if (network === 'polygon') {
      URL = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${toAddress}&apikey=${POLYGON_ETHERSCAN_API_KEY}`
    }
    if (!URL) return
    const resABI = await axios.get(URL)
    return JSON.parse(resABI.data.result)
  } catch (error) {
    console.log('GetABI-Error: ', error)
  }
}

export const getTransactionByBlockNumberAndIndexUsingExplorereUrl = async (
  network: string,
  txBlockNumber: string,
  txIndex: string
) => {
  try {
    let URL
    if (network === 'mainnet') {
      URL = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${txBlockNumber}&index=${txIndex}&apikey=${ETHERSCAN_API_KEY}`
    } else if (network === 'polygon') {
      URL = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${txBlockNumber}&index=${txIndex}&apikey=${POLYGON_ETHERSCAN_API_KEY}`
    }
    if (!URL) return
    const resDATA = await axios.get(URL)
    return resDATA.data.result
  } catch (error) {
    console.log('TxBlockAndIndex-Error: ', error)
  }
}

export const checkIsPermit2Approved = async (token: string, from: any, spender: any, amount: any) => {
  try {
    const tokenContract = await getErc20Contract(token)
    if (!tokenContract) return
    const allowance = await tokenContract.allowance(from, spender)
    if (BigNumber.from(allowance).gte(BigNumber.from(amount.toString()))) {
      return true
    }
    return false
  } catch (error) {
    console.log('PermitArpprove-Error: ', error)
  }
}

export const getErc20Contract = async (token: string) => {
  try {
    let provider = await getProvider()
    if (!provider) return
    const tokenContract = new ethers.Contract(token, erc20Abi, provider)
    return tokenContract
  } catch (error) {
    console.log('Erc20Contract-Error: ', error)
  }
}

export const makeContract = async (contractAddress: string, abi: any) => {
  try {
    let provider = await getProvider()
    if (!provider) return
    const contract = new ethers.Contract(contractAddress, abi, provider)
    return contract
  } catch (error) {
    console.log('Erc20Contract-Error: ', error)
  }
}

export const getProvider = async () => {
  try {
    let provider = new ethers.providers.Web3Provider(web3.givenProvider)
    return provider
  } catch (error) {
    console.log('Erc20Contract-Error: ', error)
  }
}

export const getSigner = async () => {
  try {
    let provider = await getProvider()
    if (!provider) return
    const signer = await provider.getSigner()
    return signer
  } catch (error) {
    console.log('Erc20Contract-Error: ', error)
  }
}

export const checkIfContractIsProxy = async (abi: any, contratAddress: any) => {
  try {
    let provider = await getProvider()
    if (!provider) return
    let currentImplAddress
    let isProxy: boolean = false

    if (
      abi.filter(function (e: any) {
        return e.name === 'upgradeTo'
      }).length > 0
    ) {
      currentImplAddress = await getImplementationAddress(provider, contratAddress)
      isProxy = true
    } else {
      currentImplAddress = contratAddress
      isProxy = false
    }
    return {
      isProxy: isProxy,
      currentImplAddress: currentImplAddress,
    }
  } catch (error) {
    console.log('IfContractProxy-Error: ', error)
  }
}

export const getDeadline = async (extra: any) => {
  try {
    const deadline = BigNumber.from(Math.floor(Date.now() / 1000)).add(extra)
    return deadline.toString()
  } catch (error) {
    console.log('deadline-Error: ', error)
  }
}

export const getDeadlineAfterMinus = async (extra: any) => {
  try {
    const deadline = BigNumber.from(Math.floor(Date.now() / 1000)).sub(extra)
    return deadline.toString()
  } catch (error) {
    console.log('deadline-Error: ', error)
  }
}

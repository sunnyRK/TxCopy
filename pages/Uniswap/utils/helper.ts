import axios from 'axios'
import web3 from 'web3'
import { BigNumber, ethers } from 'ethers'
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import Permit2Abi from '../../common/abis/Permit2.json'
import erc20Abi from '../../common/abis/erc20.json'
import { ABI_DEFINITION, CommandType, Permit2Address, RouterCommand, swapCodes } from './constants'
import { ETHERSCAN_API_KEY, POLYGON_ETHERSCAN_API_KEY } from '@/pages/keys'
import { PermitSingle } from '@/pages/Uniswap/utils/constants'
import { encodePathExactInput, getPermitSignature } from './permit2'
import { defaultAbiCoder } from 'ethers/lib/utils'

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
    console.log('allowance++1', amount.toString())
    const tokenContract = await getErc20Contract(token)
    console.log('allowance++1', amount.toString())
    if (!tokenContract) return
    console.log('allowance++1', amount.toString())
    const allowance = await tokenContract.allowance(from, spender)
    console.log('allowance++', allowance.toString(), amount.toString())
    if (BigNumber.from(allowance).gte(BigNumber.from(amount.toString()))) {
      return true
    }
    return false
  } catch (error) {
    console.log('PermitArpprove-Error: ', error)
  }
}

export const checkIsSpenderApprovedForPermit2 = async (from: any, token: string, spender: any, amount: any) => {
  try {
    const permit2 = await makeContract(Permit2Address, Permit2Abi.abi)
    if (!permit2) return
    const allowance = await permit2.allowance(from, token, spender)
    if (allowance.amount.gte(BigNumber.from(amount.toString()))) {
      const currentDeadline = await getDeadline(120)
      console.log('currentDeadline', currentDeadline)
      console.log('allowance.expiration', allowance.expiration)

      if (BigNumber.from(allowance.expiration).gte(BigNumber.from(currentDeadline))) {
        return true
      }
    }

    return false
  } catch (error) {
    console.log('SpenderPermitArpprove-Error: ', error)
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

export const parseInput = async (data: any, argsInBytes: any, universalRouter: any) => {
  try {
    let signer = await getSigner()
    if (!signer) return
    let address = await signer.getAddress()
    let token0 = data.path[0]
    let amountIn = data.amountIn

    let commands = '0x'
    let inputs = []

    const allowedForPermit2 = await checkIsPermit2Approved(token0, address, Permit2Address, amountIn)
    console.log('allowedForPermit2: ', allowedForPermit2)

    // if not allowed then give approve
    if (!allowedForPermit2) {
      const tokenContract = await getErc20Contract(token0)
      const approveTx = await tokenContract?.connect(signer).approve(Permit2Address, amountIn)
      await approveTx.wait()
    }

    const allowedForRouter = await checkIsSpenderApprovedForPermit2(address, token0, universalRouter, amountIn)
    console.log('allowedForRouter: ', allowedForRouter)
    if (!allowedForRouter) {
      console.log('allowedForRouter', allowedForRouter)
      const command = await getSignForPermit(data, universalRouter)
      if (!command) return
      console.log('command--', command)
      inputs.push(command.encodedInput)
      commands = commands.concat(command.type.toString(16).padStart(2, '0'))
    }

    console.log('inputs-1: ', inputs)

    if (argsInBytes[1].length > 1) {
      inputs.push(argsInBytes[1][1])
    } else {
      inputs.push(argsInBytes[1][0])
    }
    console.log('inputs-2: ', inputs)
    console.log('commands-2: ', commands)

    // const newInputs = await createCommand(data.function, data.)
    // commands = commands.concat(swapCodes[data.function]);

    const swapCommand = await rearrangeSwapData(data)
    console.log('swapCommand-2: ', swapCommand)

    if (!swapCommand) return
    commands = commands.concat(swapCommand.type.toString(16).padStart(2, '0'))

    const deadline = await getDeadline(1800)

    console.log('inputs: ', inputs)
    console.log('commands: ', commands)
    console.log('deadline: ', deadline)

    return { inputs, commands, deadline }
  } catch (error) {
    console.log('parseInput-Error: ', error)
  }
}

export const getSignForPermit = async (data: any, universalRouter: any) => {
  try {
    let provider = new ethers.providers.Web3Provider(web3.givenProvider)
    const signer: any = provider.getSigner()
    const permit: PermitSingle = {
      details: {
        token: data.path[0],
        amount: BigNumber.from(data.amountIn), // weth amount
        expiration: BigNumber.from('0'), // expiration of 0 is block.timestamp
        nonce: BigNumber.from('0'), // this is his first trade
      },
      spender: universalRouter,
      sigDeadline: BigNumber.from(await getDeadline(1000)),
    }

    const permit2 = await makeContract(Permit2Address, Permit2Abi.abi)
    const sig = await getPermitSignature(permit, signer, permit2)

    // const path = encodePathExactInput([data.path[0], data.path[1]])

    return await createCommand(CommandType.PERMIT2_PERMIT, [permit, sig])
    // return [ command.type.toString(16).padStart(2, '0'), command.encodedInput];
    // console.log('command.encodedInput', command.type.toString(16).padStart(2, '0'), command.encodedInput);
    // commands = commands.concat(command.type.toString(16).padStart(2, '0'))

    // console.log('Uni-sig', sig, path);
  } catch (error) {
    console.log('signPermit-Error: ', error)
  }
}

export const rearrangeSwapData = async (data: any) => {
  try {
    let swapCommand
    let makeSwapData
    let commandType
    const path = encodePathExactInput(data.path)
    console.log('path', path)

    if (data.function === 'V3_SWAP_EXACT_IN') {
      console.log('path-1')
      makeSwapData = [
        data.recipient,
        data.amountIn,
        data.amountOut,
        path,
        // ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
        data.payerIsUser,
      ]
      console.log('path-2')
      commandType = CommandType.V3_SWAP_EXACT_IN
      console.log('path-3')
    } else if (data.function === 'V3_SWAP_EXACT_OUT') {
      makeSwapData = [data.recipient, data.amountIn, data.amountOut, path, data.payerIsUser]
      commandType = CommandType.V3_SWAP_EXACT_OUT
    } else if (data.function === 'V2_SWAP_EXACT_IN') {
      makeSwapData = [data.recipient, data.amountIn, data.amountOut, data.path, data.payerIsUser]
      commandType = CommandType.V2_SWAP_EXACT_IN
    } else if (data.function === 'V2_SWAP_EXACT_OUT') {
      makeSwapData = [data.recipient, data.amountIn, data.amountOut, data.path, data.payerIsUser]
      commandType = CommandType.V2_SWAP_EXACT_OUT
    }

    console.log('makeSwapData', makeSwapData)
    console.log('commandType', commandType)

    if (!makeSwapData) return
    if (commandType === undefined) return

    console.log('makeSwapData', makeSwapData)
    console.log('commandType', commandType)

    swapCommand = await createCommand(commandType, makeSwapData)
    console.log('swapCommand', swapCommand)
    return swapCommand
  } catch (error) {
    console.log('swapData-Error: ', error)
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

export function createCommand(type: CommandType, parameters: any[]): RouterCommand {
  const encodedInput = defaultAbiCoder.encode(ABI_DEFINITION[type], parameters)
  return { type, encodedInput }
}

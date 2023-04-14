import { BigNumber, ethers } from 'ethers'
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import Permit2Abi from '../../common/abis/Permit2.json'
import {
  ABI_DEFINITION,
  CommandType,
  Permit2Address,
  RouterCommand,
} from './constants'
import { PermitSingle } from '@/pages/Uniswap/utils/constants'
import { encodePathExactInput, getPermitSignature } from './permit2'
import { defaultAbiCoder } from 'ethers/lib/utils'
import {
  getDeadline,
  getErc20Contract,
  getProvider,
  getSigner,
  makeContract,
} from '@/pages/common/helper'
import erc20Abi from '../../common/abis/erc20.json'

export const checkPermit2Approve = async (token: any, amount: any) => {
  try {
    let signer = await getSigner()
    if (!signer) return
    let address = await signer.getAddress()

    const allowedForPermit2 = await checkIsPermit2Approved(
      token.toString(),
      address,
      Permit2Address,
      amount
    )
    console.log('allowedForPermit2: ', allowedForPermit2)

    if (allowedForPermit2 === undefined) {
      throw "allownace can't fetch"
    } else {
      // if not allowed then give approve
      if (!allowedForPermit2) {
        const tokenContract = await getErc20Contract(token)
        const approveTx = await tokenContract
          ?.connect(signer)
          .approve(Permit2Address, BigNumber.from(amount))
        await approveTx.wait()
      }
      return true
    }
    return
  } catch (error) {
    console.log('checkPermit2Approve-error: ', error)
    return undefined
  }
}

export const checkSpenderSign = async (
  token: any,
  spender: any,
  amount: any
) => {
  try {
    let signer = await getSigner()
    if (!signer) return
    let address = await signer.getAddress()

    const allowedForRouter = await checkIsSpenderApprovedForPermit2(
      address,
      token,
      spender,
      amount
    )
    console.log('allowedForRouter: ', allowedForRouter)
    if (allowedForRouter === undefined) {
      throw "Permit2 allownace can't fetch"
    } else {
      let command = null
      if (!allowedForRouter) {
        command = await getSignForPermitForPermit2(
          {
            contractAddress: token.toString(),
            amountIn: BigNumber.from(amount),
          },
          spender
        )
        if (!command) return
      }
      return command
    }
  } catch (error) {
    console.log('checkSpenderSign-error: ', error)
    return undefined
  }
}

export const checkIsPermit2Approved = async (
  token: string,
  from: any,
  spender: any,
  amount: any
) => {
  let provider = await getProvider()
  let signer = await getSigner()
  let tokenContract
  try {
    if (!provider) return
    if (!signer) return
    tokenContract = await getErc20Contract(token)
    if (!tokenContract) return

    console.log('signer: ', signer)
    console.log('tokenContract: ', tokenContract)
    console.log('from: ', spender)
    console.log('spender: ', spender)
    const allowance = await tokenContract
      ?.connect(signer)
      .allowance(from, spender)
    console.log('allowance: ', allowance)

    if (BigNumber.from(allowance).gte(BigNumber.from(amount.toString()))) {
      return true
    }
    return false
  } catch (error) {
    console.log('PermitArpprove-Error: ', error, signer, tokenContract)
  }
}

export const checkIsSpenderApprovedForPermit2 = async (
  from: any,
  token: string,
  spender: any,
  amount: any
) => {
  let provider = await getProvider()
  let signer = await getSigner()
  try {
    if (!provider) return
    if (!signer) return

    const permit2 = await makeContract(Permit2Address, Permit2Abi.abi)
    if (!permit2) return

    const allowance = await permit2
      ?.connect(signer)
      .allowance(from, token, spender)
    if (allowance.amount.gte(BigNumber.from(amount.toString()))) {
      const currentDeadline = await getDeadline(120)
      if (
        BigNumber.from(allowance.expiration).gte(
          BigNumber.from(currentDeadline)
        )
      ) {
        return true
      }
    }
    return false
  } catch (error) {
    console.log('SpenderPermitArpprove-Error: ', error, signer)
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
      currentImplAddress = await getImplementationAddress(
        provider,
        contratAddress
      )
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

export const getSignForPermitForPermit2 = async (
  data: any,
  universalRouter: any
) => {
  try {
    let signer = await getSigner()
    if (!signer) return
    const deadline: any = await getDeadline(BigNumber.from('100000000'))
    const permit: PermitSingle = {
      details: {
        token: data.contractAddress,
        amount: BigNumber.from(data.amountIn), // weth amount
        expiration: deadline,
        nonce: BigNumber.from('0'), // this is his first trade
      },
      spender: universalRouter,
      sigDeadline: BigNumber.from(await getDeadline(1800)),
    }

    const permit2 = await makeContract(Permit2Address, Permit2Abi.abi)
    if (!permit2) return
    const sig = await getPermitSignature(permit, signer, permit2)

    // const path = encodePathExactInput([data.path[0], data.path[1]])
    const commands = await createCommand(CommandType.PERMIT2_PERMIT, [
      permit,
      sig,
    ])
    return commands
  } catch (error) {
    console.log('getSignForPermitForPermit2-Error: ', error)
  }
}

export const rearrangeSwapData = async (data: any, fees: any) => {
  try {
    let swapCommand
    let makeSwapData
    let commandType
    let path
    if (data.path) {
      path = await encodePathExactInput(data.path, fees)
      console.log('path', data.path, path)
    } else {
      path = data.path
      console.log('else-path', data.path, path)
    }

    if (data.function === 'V3_SWAP_EXACT_IN') {
      makeSwapData = [
        data.recipient,
        data.amountIn,
        data.amountOut,
        path,
        data.payerIsUser,
      ]
      commandType = CommandType.V3_SWAP_EXACT_IN
    } else if (data.function === 'V3_SWAP_EXACT_OUT') {
      makeSwapData = [
        data.recipient,
        data.amountOut,
        data.amountIn,
        path,
        data.payerIsUser,
      ]
      commandType = CommandType.V3_SWAP_EXACT_OUT
    } else if (data.function === 'V2_SWAP_EXACT_IN') {
      makeSwapData = [
        data.recipient,
        data.amountIn,
        data.amountOut,
        path,
        data.payerIsUser,
      ]
      commandType = CommandType.V2_SWAP_EXACT_IN
    } else if (data.function === 'V2_SWAP_EXACT_OUT') {
      makeSwapData = [
        data.recipient,
        data.amountIn,
        data.amountOut,
        path,
        data.payerIsUser,
      ]
      commandType = CommandType.V2_SWAP_EXACT_OUT
    } else if (data.function === 'WRAP_ETH') {
      makeSwapData = [data.recipient, data.amountIn]
      commandType = CommandType.WRAP_ETH
    } else if (data.function === 'UNWRAP_WETH') {
      makeSwapData = [data.recipient, 0]
      commandType = CommandType.UNWRAP_WETH
    }
    console.log('makeSwapData-1', makeSwapData)
    console.log('commandType-1', commandType)

    if (!makeSwapData) {
      alert('!makeSwapData')
      return
    }
    if (commandType === undefined) {
      alert('!commandType')
      return
    }

    // console.log('makeSwapData', makeSwapData)
    // console.log('commandType', commandType)

    swapCommand = await createCommand(commandType, makeSwapData)
    return swapCommand
  } catch (error) {
    console.log('swapData-Error: ', error)
  }
}

export function extractPathFromV3(fullPath: any, reverse = false) {
  const fullPathWithoutHexSymbol = fullPath.substring(2)
  console.log('fullPathWithoutHexSymbol', fullPathWithoutHexSymbol)
  let path = []
  let currentAddress = ''
  for (let i = 0; i < fullPathWithoutHexSymbol.length; i++) {
    currentAddress += fullPathWithoutHexSymbol[i]
    if (currentAddress.length === 40) {
      path.push('0x' + currentAddress)
      i = i + 6
      currentAddress = ''
    }
  }
  if (reverse) {
    return path.reverse()
  }
  return path
}

export function createCommand(
  type: CommandType,
  parameters: any[]
): RouterCommand {
  console.log('parameters', parameters)
  const encodedInput = defaultAbiCoder.encode(ABI_DEFINITION[type], parameters)
  return { type, encodedInput }
}

// export const addCommand = async (
//   type: CommandType,
//   parameters: any[],
//   allowRevert = false
// ) => {
//   let commands = ''
//   let inputs = []

//   let command = createCommand(type, parameters)
//   inputs.push(command.encodedInput)
//   if (allowRevert) {
//     if (!REVERTIBLE_COMMANDS.has(command.type)) {
//       throw new Error(
//         `command type: ${command.type} cannot be allowed to revert`
//       )
//     }
//     command.type = command.type | ALLOW_REVERT_FLAG
//   }

//   commands = commands.concat(command.type.toString(16).padStart(2, '0'))
// }

// export const parseInput = async (
//   data: any,
//   argsInBytes: any,
//   universalRouter: any
// ) => {
//   try {
//     let signer = await getSigner()
//     if (!signer) return
//     let address = await signer.getAddress()
//     let token0 = data.path[0]
//     let amountIn = data.amountIn

//     let commands = '0x'
//     let inputs = []

//     const allowedForPermit2 = await checkIsPermit2Approved(
//       token0,
//       address,
//       Permit2Address,
//       amountIn
//     )
//     console.log('allowedForPermit2: ', allowedForPermit2)

//     // if not allowed then give approve
//     if (!allowedForPermit2) {
//       const tokenContract = await getErc20Contract(token0)
//       const approveTx = await tokenContract
//         ?.connect(signer)
//         .approve(Permit2Address, amountIn)
//       await approveTx.wait()
//     }

//     const allowedForRouter = await checkIsSpenderApprovedForPermit2(
//       address,
//       token0,
//       universalRouter,
//       amountIn
//     )
//     if (!allowedForRouter) {
//       const command = await getSignForPermit(data, universalRouter)
//       if (!command) return
//       inputs.push(command.encodedInput)
//       commands = commands.concat(command.type.toString(16).padStart(2, '0'))
//     }

//     if (argsInBytes[1].length > 1) {
//       inputs.push(argsInBytes[1][1])
//     } else {
//       inputs.push(argsInBytes[1][0])
//     }

//     const swapCommand = await rearrangeSwapData(data)
//     console.log('swapCommand-2: ', swapCommand)

//     if (!swapCommand) return
//     commands = commands.concat(swapCommand.type.toString(16).padStart(2, '0'))

//     const deadline = await getDeadline(1800)

//     console.log('inputs: ', inputs)
//     console.log('commands: ', commands)
//     console.log('deadline: ', deadline)

//     return { inputs, commands, deadline }
//   } catch (error) {
//     console.log('parseInput-Error: ', error)
//   }
// }

// export const getSignForPermit = async (data: any, universalRouter: any) => {
//   try {
//     let provider = new ethers.providers.Web3Provider(web3.givenProvider)
//     const signer: any = provider.getSigner()
//     const permit: PermitSingle = {
//       details: {
//         token: data.path[0],
//         amount: BigNumber.from(data.amountIn), // weth amount
//         expiration: BigNumber.from('0'), // expiration of 0 is block.timestamp
//         nonce: BigNumber.from('0'), // this is his first trade
//       },
//       spender: universalRouter,
//       sigDeadline: BigNumber.from(await getDeadline(1000)),
//     }

//     const permit2 = await makeContract(Permit2Address, Permit2Abi.abi)
//     const sig = await getPermitSignature(permit, signer, permit2)
//     // const path = encodePathExactInput([data.path[0], data.path[1]])

//     return await createCommand(CommandType.PERMIT2_PERMIT, [permit, sig])
//   } catch (error) {
//     console.log('signPermit-Error: ', error)
//   }
// }

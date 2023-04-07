import { ethers, BigNumber } from 'ethers'
import axios from 'axios'
import web3 from 'web3'
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import { defaultAbiCoder } from 'ethers/lib/utils'
import UniversalAbi from '../Universal_abi.json'
import Permit2Abi from '../Permit2.json'
import { encodePathExactInput, getPermitSignature, PermitSingle } from '../permit2'
import {
  checkIfContractIsProxy,
  getAbiUsingExplorereUrl,
  getProvider,
  getSigner,
  getTransactionByBlockNumberAndIndexUsingExplorereUrl,
  parseInput,
} from './utils/helper'
import { getTransactionByBlockNumberAndIndex } from '../demo_events'
import {
  ABI_DEFINITION,
  ALLOW_REVERT_FLAG,
  CommandType,
  REVERTIBLE_COMMANDS,
  RouterCommand,
  swapCodes,
} from './utils/constants'
import { network_name } from '../common/constants'
import { checkBalanceAndAllowance } from '../common/helper'
import { toast } from 'react-toastify'

export function extractPathFromV3(fullPath: any, reverse = false) {
  const fullPathWithoutHexSymbol = fullPath.substring(2)
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

export const parseTx = async (receipt: any) => {
  try {
    const txIndex = BigNumber.from(receipt.transactionIndex).toHexString()
    const zeroX = '0x'
    const txBlockNumber = zeroX.concat(receipt.blockNumber.toString(16))
    const txData = await getTransactionByBlockNumberAndIndexUsingExplorereUrl(network_name, txBlockNumber, txIndex)
    console.log('Uni-p-txData-: ', txData)

    const abiCoder = new ethers.utils.AbiCoder()

    let universalInteface = new ethers.utils.Interface(UniversalAbi)
    const parsedTx = universalInteface.parseTransaction({ data: txData.input })
    console.log('Uni-p-parsedTx-: ', parsedTx)

    let commandsSplit = parsedTx.args[0].substring(2).match(/.{1,2}/g)
    console.log('Uni-p-commandsSplit-: ', commandsSplit)

    let foundFunction
    let inputForFunction: any
    commandsSplit.forEach((commandCode: any, index: any) => {
      console.log('Uni-p-commandCode++', commandCode)
      const currentIndex = Object.keys(swapCodes).indexOf(commandCode)
      console.log('Uni-p-currentIndex++', currentIndex)
      console.log('Uni-p-Indexer++', parsedTx.args[1], commandsSplit.indexOf(commandCode))

      if (currentIndex !== -1) {
        console.log('Uni-p-commandCode-Inside', commandCode)
        foundFunction = commandCode
        inputForFunction = parsedTx.args[1][commandsSplit.indexOf(commandCode)]
      }

      if (currentIndex === 4) {
        console.log('Uni-p-currentIndex-4:', commandCode)
        // foundFunction = commandCode;
        // inputForFunction = parsedTx.args[1][commandsSplit.indexOf(commandCode)];
      }
    })

    console.log('Uni-p-foundFunction', foundFunction)
    console.log('Uni-p-inputForFunction', inputForFunction)

    if (!foundFunction) return
    if (!inputForFunction) return

    console.log('Uni-p-Passed++++++++')

    let decoded
    switch (swapCodes[foundFunction]) {
      case 'V3_SWAP_EXACT_IN': //"exactInput" FNC 11
        decoded = abiCoder.decode(['address', 'uint256', 'uint256', 'bytes', 'bool'], inputForFunction)
        console.log('decoded[1].toString()', decoded[1].toString())
        return {
          function: swapCodes[foundFunction],
          recipient: decoded[0],
          amountIn: decoded[1].toString(),
          amountOut: decoded[2].toString(),
          path: extractPathFromV3(decoded[3]),
          payerIsUser: decoded[4],
        }
      case 'V3_SWAP_EXACT_OUT': //exactOutputSingle FNC 9
        decoded = abiCoder.decode(['address', 'uint256', 'uint256', 'bytes', 'bool'], inputForFunction)
        return {
          function: swapCodes[foundFunction],
          recipient: decoded[0],
          amountIn: decoded[2].toString(),
          amountOut: decoded[1].toString(),
          path: extractPathFromV3(decoded[3], true), // because exact output swaps are executed in reverse order, in this case tokenOut is actually tokenIn
          payerIsUser: decoded[4],
        }
      case 'V2_SWAP_EXACT_IN':
        decoded = abiCoder.decode(['address', 'uint256', 'uint256', 'address[]', 'bool'], inputForFunction)
        return {
          function: swapCodes[foundFunction],
          recipient: decoded[0],
          amountIn: decoded[1].toString(),
          amountOut: decoded[2].toString(),
          path: decoded[3],
          payerIsUser: decoded[4],
        }
      case 'V2_SWAP_EXACT_OUT':
        decoded = abiCoder.decode(['address', 'uint256', 'uint256', 'address[]', 'bool'], inputForFunction)
        return {
          data: inputForFunction,
          function: swapCodes[foundFunction],
          recipient: decoded[0],
          amountIn: decoded[2].toString(),
          amountOut: decoded[1].toString(),
          path: decoded[3],
          payerIsUser: decoded[4],
        }
      default:
        console.info('No parseable execute function found in input.')
        return undefined
    }
  } catch (error) {
    console.log('parseTx-error', error)
  }
}

export const getSignForPermit = async () => {
  let provider = new ethers.providers.Web3Provider(web3.givenProvider)
  const signer: any = provider.getSigner()
  const permit: PermitSingle = {
    details: {
      token: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      amount: BigNumber.from('100000000'),
      expiration: 0, // expiration of 0 is block.timestamp
      nonce: 0, // this is his first trade
    },
    spender: '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
    sigDeadline: BigNumber.from('1790550279'),
  }

  const permit2 = new ethers.Contract('0x000000000022D473030F116dDEE9F6B43aC78BA3', Permit2Abi.abi, signer)

  const sig = await getPermitSignature(permit, signer, permit2)

  const path = encodePathExactInput([
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  ])

  let command = createCommand(CommandType.PERMIT2_PERMIT, [permit, sig])
  // return command.encodedInput
  console.log('command.encodedInput', command.type.toString(16).padStart(2, '0'), command.encodedInput)
  // commands = commands.concat(command.type.toString(16).padStart(2, '0'))

  console.log('Uni-sig', sig, path)
}

export function createCommand(type: CommandType, parameters: any[]): RouterCommand {
  const encodedInput = defaultAbiCoder.encode(ABI_DEFINITION[type], parameters)
  return { type, encodedInput }
}

export const addCommand = async (type: CommandType, parameters: any[], allowRevert = false) => {
  let commands = ''
  let inputs = []

  let command = createCommand(type, parameters)
  inputs.push(command.encodedInput)
  if (allowRevert) {
    if (!REVERTIBLE_COMMANDS.has(command.type)) {
      throw new Error(`command type: ${command.type} cannot be allowed to revert`)
    }
    command.type = command.type | ALLOW_REVERT_FLAG
  }

  commands = commands.concat(command.type.toString(16).padStart(2, '0'))
}

export const getUniversalRouter = async (txHash: string, onlycheck: any) => {
  try {
    // const infura_key = process.env.NEXT_PUBLIC_POLYGON_INFURA_API_KEY;
    // let provider = new ethers.providers.InfuraProvider("mainnet", infura_key)
    let provider = new ethers.providers.Web3Provider(web3.givenProvider)
    const signer = provider.getSigner()
    const receipt: any = await provider.getTransactionReceipt(txHash)
    console.log('Uni-receipt: ', receipt)
    let currentImplAddress = receipt?.to
    let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to)
    console.log('Uni-abi: ', abi)
    let abiInterface = new ethers.utils.Interface(abi)
    console.log('Uni-abiInterface: ', abiInterface)

    if (
      abi.filter(function (e: any) {
        return e.name === 'upgradeTo'
      }).length > 0
    ) {
      console.log('Uni-getting Implementation')
      currentImplAddress = await getImplementationAddress(provider, receipt?.to)
      console.log('Uni-currentImplAddress', currentImplAddress)
      abi = await getAbiUsingExplorereUrl(network_name, currentImplAddress)
      console.log('Uni-newAbi: ', abi)
      abiInterface = new ethers.utils.Interface(abi)
      console.log('Uni-updated-interface: ', abiInterface)
    }

    const tx = await provider.getTransaction(txHash)
    let decodedInput = abiInterface.parseTransaction({ data: tx.data, value: tx.value })
    console.log('Uni-decodedInput-: ', decodedInput)

    let ABI = [`function` + ' ' + decodedInput.signature]
    console.log('Uni-ABI-: ', ABI)

    let iface = new ethers.utils.Interface(ABI)

    const parseData = await parseTx(receipt)
    console.log('Uni-parseData', parseData)

    // const datasss = await abiInterface.getSighash("execute");
    // console.log("decodedInput.args: ", decodedInput.args[2]);

    // const parameters = decodedInput.functionFragment.inputs.map((type) => {
    //   return {
    //     "type" : type.type
    //   }
    // });
    // console.log("parameters: ", parameters);
    // console.log('decodedInput.args', decodedInput.args);

    // const decoder = new InputDataDecoder(abi);
    // const result = decoder.decodeData(decodedInput.args[1]);
    // const decoder = new ethers.utils.AbiCoder(abi);

    // const decoded = decoder.decode(["address", "uint256", "uint256", "bytes", "bool"], decodedInput.args[1][1]);

    // const decoded = decoder.coerceFunc("bytes", decodedInput.args[1][1])

    // const data = erc20Coder.decodeFunction(decodedInput.args[1])
    // console.log('decoded', decoded);
    console.log('Uni-p-decodedInput.args[0]: ', decodedInput.args[1][1])

    const datas = iface.encodeFunctionData(decodedInput.name, decodedInput.args)
    console.log('Uni-p-datas: ', datas)

    if (!onlycheck) {
      const copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
      })
      toast.success(`Tx done successfully.`)
      console.log('Uni-p-copyTx', copyTx)
    }
    return decodedInput
  } catch (error) {
    toast.error(`Something went wrong.`)
    console.log('Uni-p-error-', error)
  }
}

export const makeTx = async (txHash: string, onlycheck: any) => {
  try {
    const provider = await getProvider()
    const signer = await getSigner()

    if (!provider) return
    if (!signer) return

    const receipt: any = await provider.getTransactionReceipt(txHash)
    let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to)
    const { isProxy, currentImplAddress }: any = await checkIfContractIsProxy(abi, receipt.to)
    const toAddress = currentImplAddress
    if (isProxy) {
      abi = await getAbiUsingExplorereUrl(network_name, toAddress)
    }
    let abiInterface = new ethers.utils.Interface(abi)
    const txInfo = await provider.getTransaction(txHash)
    let decodedInput = abiInterface.parseTransaction({ data: txInfo.data, value: txInfo.value })

    // shrink abi & abiInterface to specific function only
    abi = [`function` + ' ' + decodedInput.signature]
    abiInterface = new ethers.utils.Interface(abi)
    console.log('Uni-abiInterface: ', abiInterface)

    const parseData = await parseTx(receipt)
    console.log('Uni-parseData: ', parseData)

    const inputs = await parseInput(parseData, decodedInput.args, toAddress)
    console.log('Uni-p-inputs: ', inputs)

    // await checkBalanceAndAllowance(receipt)

    const datas = abiInterface.encodeFunctionData(decodedInput.name, [
      inputs?.commands,
      inputs?.inputs,
      inputs?.deadline,
    ])
    console.log('Uni-p-datas: ', datas)

    let copyTx
    if (!onlycheck) {
      copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
      })
      toast.success(`Tx done successfully.`)
      console.log('Uni-p-copyTx', copyTx)
    }
    return {
      txInfo: txInfo,
      txCallData: decodedInput,
    }
  } catch (error) {
    toast.error(`Something went wrong.`)
    console.log('makeTx-Error: ', error)
  }
}

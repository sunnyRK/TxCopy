import { ethers, BigNumber } from 'ethers'
import axios from 'axios'
import web3 from 'web3'
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import { parseEther, defaultAbiCoder } from 'ethers/lib/utils'
import UniversalAbi from './Universal_abi.json'
import Permit2Abi from './Permit2.json'
import { encodePathExactInput, getPermitSignature, PermitSingle } from './permit2'

export enum CommandType {
  V3_SWAP_EXACT_IN = 0x00,
  V3_SWAP_EXACT_OUT = 0x01,
  PERMIT2_TRANSFER_FROM = 0x02,
  PERMIT2_PERMIT_BATCH = 0x03,
  SWEEP = 0x04,
  TRANSFER = 0x05,
  PAY_PORTION = 0x06,

  V2_SWAP_EXACT_IN = 0x08,
  V2_SWAP_EXACT_OUT = 0x09,
  PERMIT2_PERMIT = 0x0a,
  WRAP_ETH = 0x0b,
  UNWRAP_WETH = 0x0c,
  PERMIT2_TRANSFER_FROM_BATCH = 0x0d,
  BALANCE_CHECK_ERC20 = 0x0e,

  // NFT-related command types
  SEAPORT = 0x10,
  LOOKS_RARE_721 = 0x11,
  NFTX = 0x12,
  CRYPTOPUNKS = 0x13,
  LOOKS_RARE_1155 = 0x14,
  OWNER_CHECK_721 = 0x15,
  OWNER_CHECK_1155 = 0x16,
  SWEEP_ERC721 = 0x17,

  X2Y2_721 = 0x18,
  SUDOSWAP = 0x19,
  NFT20 = 0x1a,
  X2Y2_1155 = 0x1b,
  FOUNDATION = 0x1c,
  SWEEP_ERC1155 = 0x1d,
  ELEMENT_MARKET = 0x1e,

  EXECUTE_SUB_PLAN = 0x20,
  SEAPORT_V1_4 = 0x21,
  APPROVE_ERC20 = 0x22,
}

const ALLOW_REVERT_FLAG = 0x80

const REVERTIBLE_COMMANDS = new Set<CommandType>([
  CommandType.SEAPORT,
  CommandType.SEAPORT_V1_4,
  CommandType.NFTX,
  CommandType.LOOKS_RARE_721,
  CommandType.LOOKS_RARE_1155,
  CommandType.X2Y2_721,
  CommandType.X2Y2_1155,
  CommandType.FOUNDATION,
  CommandType.SUDOSWAP,
  CommandType.NFT20,
  CommandType.EXECUTE_SUB_PLAN,
  CommandType.CRYPTOPUNKS,
  CommandType.ELEMENT_MARKET,
])

const PERMIT_STRUCT =
  '((address token,uint160 amount,uint48 expiration,uint48 nonce) details, address spender, uint256 sigDeadline)'

const PERMIT_BATCH_STRUCT =
  '((address token,uint160 amount,uint48 expiration,uint48 nonce)[] details, address spender, uint256 sigDeadline)'

const PERMIT2_TRANSFER_FROM_STRUCT = '(address from,address to,uint160 amount,address token)'
const PERMIT2_TRANSFER_FROM_BATCH_STRUCT = PERMIT2_TRANSFER_FROM_STRUCT + '[]'

const ABI_DEFINITION: { [key in CommandType]: string[] } = {
  // Batch Reverts
  [CommandType.EXECUTE_SUB_PLAN]: ['bytes', 'bytes[]'],

  // Permit2 Actions
  [CommandType.PERMIT2_PERMIT]: [PERMIT_STRUCT, 'bytes'],
  [CommandType.PERMIT2_PERMIT_BATCH]: [PERMIT_BATCH_STRUCT, 'bytes'],
  [CommandType.PERMIT2_TRANSFER_FROM]: ['address', 'address', 'uint160'],
  [CommandType.PERMIT2_TRANSFER_FROM_BATCH]: [PERMIT2_TRANSFER_FROM_BATCH_STRUCT],

  // Uniswap Actions
  [CommandType.V3_SWAP_EXACT_IN]: ['address', 'uint256', 'uint256', 'bytes', 'bool'],
  [CommandType.V3_SWAP_EXACT_OUT]: ['address', 'uint256', 'uint256', 'bytes', 'bool'],
  [CommandType.V2_SWAP_EXACT_IN]: ['address', 'uint256', 'uint256', 'address[]', 'bool'],
  [CommandType.V2_SWAP_EXACT_OUT]: ['address', 'uint256', 'uint256', 'address[]', 'bool'],

  // Token Actions and Checks
  [CommandType.WRAP_ETH]: ['address', 'uint256'],
  [CommandType.UNWRAP_WETH]: ['address', 'uint256'],
  [CommandType.SWEEP]: ['address', 'address', 'uint256'],
  [CommandType.SWEEP_ERC721]: ['address', 'address', 'uint256'],
  [CommandType.SWEEP_ERC1155]: ['address', 'address', 'uint256', 'uint256'],
  [CommandType.TRANSFER]: ['address', 'address', 'uint256'],
  [CommandType.PAY_PORTION]: ['address', 'address', 'uint256'],
  [CommandType.BALANCE_CHECK_ERC20]: ['address', 'address', 'uint256'],
  [CommandType.OWNER_CHECK_721]: ['address', 'address', 'uint256'],
  [CommandType.OWNER_CHECK_1155]: ['address', 'address', 'uint256', 'uint256'],
  [CommandType.APPROVE_ERC20]: ['address', 'uint256'],

  // NFT Markets
  [CommandType.SEAPORT]: ['uint256', 'bytes'],
  [CommandType.SEAPORT_V1_4]: ['uint256', 'bytes'],
  [CommandType.NFTX]: ['uint256', 'bytes'],
  [CommandType.LOOKS_RARE_721]: ['uint256', 'bytes', 'address', 'address', 'uint256'],
  [CommandType.LOOKS_RARE_1155]: ['uint256', 'bytes', 'address', 'address', 'uint256', 'uint256'],
  [CommandType.X2Y2_721]: ['uint256', 'bytes', 'address', 'address', 'uint256'],
  [CommandType.X2Y2_1155]: ['uint256', 'bytes', 'address', 'address', 'uint256', 'uint256'],
  [CommandType.FOUNDATION]: ['uint256', 'bytes', 'address', 'address', 'uint256'],
  [CommandType.SUDOSWAP]: ['uint256', 'bytes'],
  [CommandType.NFT20]: ['uint256', 'bytes'],
  [CommandType.CRYPTOPUNKS]: ['uint256', 'address', 'uint256'],
  [CommandType.ELEMENT_MARKET]: ['uint256', 'bytes'],
}

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
const POLYGON_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_POLYGON_ETHERSCAN_API_KEY
const URL2 = `https://api.etherscan.io/api
                ?module=proxy
                &action=eth_getTransactionByBlockNumberAndIndex
                &tag=0xC6331D
                &index=0x11A
                &apikey=${ETHERSCAN_API_KEY}
              `

const swapCodes = {
  '00': 'V3_SWAP_EXACT_IN',
  '01': 'V3_SWAP_EXACT_OUT',
  '08': 'V2_SWAP_EXACT_IN',
  '09': 'V2_SWAP_EXACT_OUT',
  '0a': 'PERMIT2_PERMIT',
}

function extractPathFromV3(fullPath: any, reverse = false) {
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
    const txData = await getTransactionByBlockNumberAndIndex(txBlockNumber, txIndex)
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
      // token: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // usdc
      // amount: BigNumber.from("100000000"), // usdc amount
      token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // weth
      amount: parseEther('0.008'), // weth amount
      expiration: 0, // expiration of 0 is block.timestamp
      nonce: 0, // this is his first trade
    },
    spender: '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
    sigDeadline: BigNumber.from('1790550279'),
  }

  const permit2 = new ethers.Contract('0x000000000022D473030F116dDEE9F6B43aC78BA3', Permit2Abi.abi, signer)

  console.log('signer1', signer.address)
  console.log('signer2', signer._address)
  console.log('signer3', await signer.getAddress())

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

export type RouterCommand = {
  type: CommandType
  encodedInput: string
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
    // console.log('Math.floor(Date.now() / 1000)', Math.floor(Date.now() / 1000));
    // const infura_key = process.env.NEXT_PUBLIC_POLYGON_INFURA_API_KEY;
    // let provider = new ethers.providers.InfuraProvider("mainnet", infura_key)
    let provider = new ethers.providers.Web3Provider(web3.givenProvider)
    const signer = provider.getSigner()

    const receipt: any = await provider.getTransactionReceipt(txHash)
    console.log('Uni-receipt: ', receipt)
    let currentImplAddress = receipt?.to
    let abi = await getAbiURL(receipt?.to)
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
      abi = await getAbiURL(currentImplAddress)
      console.log('Uni-newAbi: ', abi)
      abiInterface = new ethers.utils.Interface(abi)
      console.log('Uni-updated-interface: ', abiInterface)
    }

    const tx = await provider.getTransaction(txHash)
    let decodedInput = abiInterface.parseTransaction({ data: tx.data, value: tx.value })
    console.log('Uni-decodedInput-: ', decodedInput)
    let ABI = [`function` + ' ' + decodedInput.signature]
    console.log('Uni-ABI-: ', ABI)

    // const parseData = await parseTx(receipt);
    // console.log('Uni-parseData', parseData, parseData?.path[0]);

    let iface = new ethers.utils.Interface(ABI)
    const datas = iface.encodeFunctionData(decodedInput.name, decodedInput.args)
    console.log('Uni-p-datas: ', datas)

    if (!onlycheck) {
      const copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
      })
      console.log('Uni-p-copyTx', copyTx)
    }
    return decodedInput
    return ''
  } catch (error) {
    console.log('Uni-p-error-', error)
  }
}

export const getNewEvent = async (txHash: string, onlycheck: any) => {
  try {
    // const infura_key = process.env.NEXT_PUBLIC_POLYGON_INFURA_API_KEY;
    // let provider = new ethers.providers.InfuraProvider("mainnet", infura_key)
    let provider = new ethers.providers.Web3Provider(web3.givenProvider)
    const signer = provider.getSigner()
    const receipt: any = await provider.getTransactionReceipt(txHash)
    console.log('aave-receipt: ', receipt)
    let currentImplAddress = receipt?.to
    let abi = await getAbiURL(receipt?.to)
    console.log('aave-abi: ', abi)
    let abiInterface = new ethers.utils.Interface(abi)
    console.log('aave-abiInterface: ', abiInterface)

    if (
      abi.filter(function (e: any) {
        return e.name === 'upgradeTo'
      }).length > 0
    ) {
      console.log('aave-getting Implementation')
      currentImplAddress = await getImplementationAddress(provider, receipt?.to)
      console.log('aave-currentImplAddress', currentImplAddress)
      abi = await getAbiURL(currentImplAddress)
      console.log('aave-newAbi: ', abi)
      abiInterface = new ethers.utils.Interface(abi)
      console.log('aave-updated-interface: ', abiInterface)
    }

    const tx = await provider.getTransaction(txHash)
    let decodedInput = abiInterface.parseTransaction({ data: tx.data, value: tx.value })
    console.log('aave-decodedInput-: ', decodedInput)

    let ABI = [`function` + ' ' + decodedInput.signature]
    console.log('aave-ABI-: ', ABI)

    let iface = new ethers.utils.Interface(ABI)

    const datas = iface.encodeFunctionData(
      decodedInput.name,
      decodedInput.args
      // ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', '106000000', "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989", 0]
    )
    console.log('aave-datas', datas)

    if (!onlycheck) {
      const copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
      })
      console.log('aave-copyTx', copyTx)
    }
    return decodedInput
  } catch (error) {
    console.log('aave-error-', error)
  }
}

export const getData = async () => {
  const CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  const URL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${POLYGON_ETHERSCAN_API_KEY}`

  const data = await axios.get(URL)
  console.log('getData: ', data)
}

export const getTransactionByBlockNumberAndIndex = async (txBlockNumber: any, txIndex: any) => {
  try {
    const URL = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${txBlockNumber}&index=${txIndex}&apikey=${ETHERSCAN_API_KEY}`

    // const URL = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${txBlockNumber}&index=${txIndex}&apikey=${POLYGON_ETHERSCAN_API_KEY}`;
    // const URL = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${toAddress}&apikey=${POLYGON_ETHERSCAN_API_KEY}`;
    const resDATA = await axios.get(URL)
    // return JSON.parse(resABI.data);
    return resDATA.data.result
  } catch (error) {
    console.log('getTransactionByBlockNumberAndIndex-error', error)
    return
  }
}

export const getAbiURL = async (toAddress: any) => {
  try {
    const URL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${toAddress}&apikey=${ETHERSCAN_API_KEY}`
    // const URL = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${toAddress}&apikey=${POLYGON_ETHERSCAN_API_KEY}`;
    const resABI = await axios.get(URL)
    return JSON.parse(resABI.data.result)
  } catch (error) {
    console.log('getAbiURL-error', error)
    return
  }
}

export const mempool = async () => {
  const provider = new ethers.providers.WebSocketProvider(
    `wss://mainnet.infura.io/ws/v3/${process.env.NEXT_PUBLIC_PROJECT_ID_mempool_3}`
  )
  console.log('calling websocket')
  provider.on('completed', async (tx) => {
    try {
      const txInfo = await provider.getTransaction(tx)
      if (txInfo?.to == '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B') {
        console.log(txInfo)
        // await getNewEvent(txInfo?.hash)
      }
    } catch (error) {
      console.log('no data to show', error)
    }
  })
}

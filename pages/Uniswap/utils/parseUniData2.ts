import { ethers, BigNumber as EthersBigNumber, utils } from 'ethers'
import BigNumber from 'bignumber.js'
import UniversalAbi from '../../common/abis/Universal_abi.json'
import { Permit2Address, swapCodes } from '../utils/constants'
import { network_name } from '../../common/constants'
import {
  getErc20Contract,
  getSigner,
  getTransactionByBlockNumberAndIndexUsingExplorereUrl,
} from '../../common/helper'
import {
  checkIsPermit2Approved,
  checkIsSpenderApprovedForPermit2,
  extractPathFromV3,
  getSignForPermitForPermit2,
  rearrangeSwapData,
} from './helper'
import { toast } from 'react-toastify'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { fetchQuotePrice, quote, quote2 } from './quotePrice'
BigNumber.config({ DECIMAL_PLACES: 5 })
BigNumber.config({ ROUNDING_MODE: 0 })
BigNumber.config({ EXPONENTIAL_AT: 2 })

const TransferSig = 'Transfer(address,address,uint256)'
const DpositSig = 'Deposit(address,uint256)'
const PermitBytesSig =
  '0xc6a377bfc4eb120024a8ac08eef205be16b817020812c73223e81d1bdb9708ec'

const getTransferSig = async (sig: any) => {
  try {
    const bytess = utils.toUtf8Bytes(sig)
    const bytessAfterKeccak = utils.keccak256(bytess)
    return bytessAfterKeccak
  } catch (error) {
    console.log('getTransferSig-error: ', error)
  }
}

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

    // if not allowed then give approve
    if (!allowedForPermit2) {
      const tokenContract = await getErc20Contract(token.toString())
      const approveTx = await tokenContract
        ?.connect(signer)
        .approve(Permit2Address, EthersBigNumber.from(amount))
      await approveTx.wait()
    }
  } catch (error) {
    console.log('checkPermit2Approve-error: ', error)
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

    console.log('address: ', address)
    console.log('token: ', token)
    console.log('spender: ', spender)
    console.log('amount: ', amount)

    const allowedForRouter = await checkIsSpenderApprovedForPermit2(
      address,
      token,
      spender,
      amount
    )
    console.log('allowedForRouter: ', allowedForRouter)

    let command
    if (!allowedForRouter) {
      command = await getSignForPermitForPermit2(
        {
          contractAddress: token.toString(),
          amountIn: EthersBigNumber.from(amount),
        },
        spender
      )
      if (!command) return
      console.log('command', command)
    }
    return command
  } catch (error) {
    console.log('checkSpenderSign-error: ', error)
  }
}

const checkForPermit2Event = async (receipt: any, i: any /** logindex */) => {
  try {
    const from = utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[i].topics[1]
    )
    const token: any = utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[i].topics[2]
    )
    const spender = utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[i].topics[3]
    )
    const value = utils.defaultAbiCoder.decode(
      ['uint160', 'uint48', 'uint48'],
      receipt.logs[i].data
    )
    console.log('permit-values', from, token, spender, value.toString())

    if (
      from.toString().toLowerCase() === receipt.from.toString().toLowerCase() &&
      spender.toString().toLowerCase() === receipt.to.toString().toLowerCase()
    ) {
      await checkPermit2Approve(token, value)
      return await checkSpenderSign(token, receipt.to, value) // return command
    }
  } catch (error) {
    console.log('checkForTransferEvent-error', error)
  }
}

const checkForTransferEvent = async (receipt: any, i: any /** logindex */) => {
  try {
    const token = receipt.logs[i].address.toString()
    const from = utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[i].topics[1]
    )
    const to = utils.defaultAbiCoder.decode(
      ['address'],
      receipt.logs[i].topics[2]
    )
    const value = utils.defaultAbiCoder.decode(
      ['uint256'],
      receipt.logs[i].data
    )
    if (
      from.toString().toLowerCase() === receipt.from.toString().toLowerCase()
    ) {
      await checkPermit2Approve(token, value)
      return await checkSpenderSign(token, receipt.to, value) // return command
    }
  } catch (error) {
    console.log('checkForTransferEvent-error', error)
  }
}

export const checkSpenderAllowance = async (receipt: any) => {
  let id: any
  let depositWETH: EthersBigNumber = EthersBigNumber.from(0)
  try {
    let signer = await getSigner()
    if (!signer) return
    let address = await signer.getAddress()

    let commands = '0x'
    let inputs: any = []

    const sig = 'Transfer(address,address,uint256)'
    const bytess = utils.toUtf8Bytes(sig)
    const DpositSig = 'Deposit(address,uint256)'
    const DpositSigbytess = utils.toUtf8Bytes(DpositSig)
    const bytessAfterKeccak = utils.keccak256(bytess)
    const DpositSigbytessAfterKeccak = utils.keccak256(DpositSigbytess)
    const bytessAfterKeccakForPermit =
      '0xc6a377bfc4eb120024a8ac08eef205be16b817020812c73223e81d1bdb9708ec'
    const tokensApproved: any = []

    // for (let i = 0; i < receipt.logs.length; i++) {
    //   if (receipt.logs[i].topics[0] === bytessAfterKeccakForPermit) {
    //     console.log('\n')
    //     const token: any = utils.defaultAbiCoder.decode(['address'],receipt.logs[i].topics[2])[0]
    //     if (tokensApproved.includes(token)) {
    //       continue
    //     }
    //     const command = await checkForPermit2Event(receipt, i)
    //     if (command) {
    //       console.log('command-1', command)
    //       inputs.push(command.encodedInput)
    //       commands = commands.concat(
    //         command.type.toString(16).padStart(2, '0')
    //       )
    //     }
    //     tokensApproved.push(token)
    //   } else if (receipt.logs[i].topics[0] === bytessAfterKeccak) {
    //     console.log('\n')

    //     const token = receipt.logs[i].address.toString()
    //     if (tokensApproved.includes(token)) {
    //       continue
    //     }
    //     const command = await checkForTransferEvent(receipt, i)
    //     if (command) {
    //       console.log('command-1', command)
    //       inputs.push(command.encodedInput)
    //       commands = commands.concat(
    //         command.type.toString(16).padStart(2, '0')
    //       )
    //     }
    //     tokensApproved.push(token)
    //   }
    // } // end of logs for loop

    // check swaps
    const zeroX = '0x'
    const txIndex = EthersBigNumber.from(receipt.transactionIndex).toHexString()
    const txBlockNumber = zeroX.concat(receipt.blockNumber.toString(16))
    const txData = await getTransactionByBlockNumberAndIndexUsingExplorereUrl(
      network_name,
      txBlockNumber,
      txIndex
    )
    const abiCoder = new ethers.utils.AbiCoder()
    let universalInteface = new ethers.utils.Interface(UniversalAbi)
    const parsedTx = universalInteface.parseTransaction({ data: txData.input })
    let commandsSplit = parsedTx.args[0].substring(2).match(/.{1,2}/g)
    let foundFunction: any
    let inputForFunction: any

    for (let i = 0; i < commandsSplit.length; i++) {
      let commandCode = commandsSplit[i]
      const currentIndex = Object.keys(swapCodes).indexOf(commandCode)

      if (currentIndex !== -1) {
        foundFunction = commandCode
        inputForFunction = parsedTx.args[1][commandsSplit.indexOf(commandCode)]

        if (!foundFunction) return
        if (!inputForFunction) return

        let decoded
        let makeSwapData
        switch (swapCodes[foundFunction]) {
          case 'V3_SWAP_EXACT_IN': //"exactInput" FNC 11
            decoded = abiCoder.decode(
              ['address', 'uint256', 'uint256', 'bytes', 'bool'],
              inputForFunction
            )
            console.log('V3_SWAP_EXACT_IN: ', decoded.toString())

            const amountOutprice = await fetchQuotePrice(
              decoded[1].toString(),
              extractPathFromV3(decoded[3]),
              0
            )
            // const amountOutprice = await quote2(
            //   '0x2791bca1f2de4661ed88a30c99a7a9449aa841740001f40d500b1d8e8ef31e21c99d1db9a6444d3adf1270000bb89c2c5fd7b07e95ee044ddeba0e97a665f142394f',
            //   decoded[1].toString()
            // )
            console.log('amountOutprice: ', amountOutprice.toString())

            const token_excatInput = extractPathFromV3(decoded[3])[0]
            console.log('token_excatInput: ', token_excatInput.toString())

            await checkPermit2Approve(
              token_excatInput,
              amountOutprice.toString()
            )
            console.log('amountOutprice-after')

            const command_excatInput = await checkSpenderSign(
              token_excatInput,
              receipt.to,
              amountOutprice.toString()
            ) // return command
            if (command_excatInput) {
              console.log('command_excatInput-1', command_excatInput)
              inputs.push(command_excatInput.encodedInput)
              commands = commands.concat(
                command_excatInput.type.toString(16).padStart(2, '0')
              )
            }

            makeSwapData = {
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountIn: decoded[1].toString(),
              amountOut: amountOutprice,
              path: extractPathFromV3(decoded[3]),
              payerIsUser: decoded[4],
            }
            break
          case 'V3_SWAP_EXACT_OUT': //exactOutputSingle FNC 9
            decoded = abiCoder.decode(
              ['address', 'uint256', 'uint256', 'bytes', 'bool'],
              inputForFunction
            )
            console.log('V3_SWAP_EXACT_OUT: ', decoded.toString())
            const amountInprice = await fetchQuotePrice(
              decoded[1].toString(),
              extractPathFromV3(decoded[3]),
              1
            )
            console.log('amountInprice: ', amountInprice.toString())

            const token_excatOutPut = extractPathFromV3(decoded[3])[1]
            await checkPermit2Approve(token_excatOutPut, amountInprice)
            const command_excatOutPut = await checkSpenderSign(
              token_excatOutPut,
              receipt.to,
              amountInprice
            ) // return command
            if (command_excatOutPut) {
              console.log('command_excatOutPut-1', command_excatOutPut)
              inputs.push(command_excatOutPut.encodedInput)
              commands = commands.concat(
                command_excatOutPut.type.toString(16).padStart(2, '0')
              )
            }

            // const allowedForPermit2 = await checkIsPermit2Approved(
            //   extractPathFromV3(decoded[3])[1].toString(),
            //   address,
            //   Permit2Address,
            //   amountInprice
            // )
            // console.log('allowedForPermit2ForAmountIn: ', allowedForPermit2)

            // // if not allowed then give approve
            // if (!allowedForPermit2) {
            //   const tokenContract = await getErc20Contract(extractPathFromV3(decoded[3])[1].toString())
            //   const approveTx = await tokenContract
            //     ?.connect(signer)
            //     .approve(Permit2Address, EthersBigNumber.from(amountInprice.toString()))
            //   await approveTx.wait()
            // }

            // const allowedForRouterForAmountIn = await checkIsSpenderApprovedForPermit2(
            //   address,
            //   extractPathFromV3(decoded[3])[1].toString(),
            //   receipt.to,
            //   amountInprice.toString()
            // )
            // console.log('allowedForRouterForAmountIn: ', allowedForRouterForAmountIn)

            // if (!allowedForRouterForAmountIn) {
            //   const command = await getSignForPermitForPermit2(
            //     {
            //       contractAddress: extractPathFromV3(decoded[3])[1].toString().toString(),
            //       amountIn: EthersBigNumber.from(amountInprice.toString()),
            //     },
            //     receipt.to
            //   )
            //   if (!command) return
            //   inputs.push(command.encodedInput)
            //   commands = commands.concat(
            //     command.type.toString(16).padStart(2, '0')
            //   )
            // }
            // console.log('allowedForRouterForAmountIn-inputs-after-permit', commands, inputs)

            makeSwapData = {
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountOut: decoded[1].toString(),
              amountIn: amountInprice,
              path: extractPathFromV3(decoded[3]), // because exact output swaps are executed in reverse order, in this case tokenOut is actually tokenIn
              payerIsUser: decoded[4],
            }
            break
          case 'V2_SWAP_EXACT_IN':
            decoded = abiCoder.decode(
              ['address', 'uint256', 'uint256', 'address[]', 'bool'],
              inputForFunction
            )
            console.log('V2_SWAP_EXACT_IN: ', decoded)
            makeSwapData = {
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountIn: decoded[1].toString(),
              amountOut: decoded[2].toString(),
              path: decoded[3],
              payerIsUser: decoded[4],
            }
            break
          case 'V2_SWAP_EXACT_OUT':
            decoded = abiCoder.decode(
              ['address', 'uint256', 'uint256', 'address[]', 'bool'],
              inputForFunction
            )
            console.log('V2_SWAP_EXACT_OUT: ', decoded)
            makeSwapData = {
              data: inputForFunction,
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountIn: decoded[2].toString(),
              amountOut: decoded[1].toString(),
              path: decoded[3],
              payerIsUser: decoded[4],
            }
            break
          case 'WRAP_ETH':
            decoded = abiCoder.decode(['address', 'uint256'], inputForFunction)
            console.log('WRAP_ETH: ', decoded)
            makeSwapData = {
              data: inputForFunction,
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountIn: decoded[1].toString(),
            }
            depositWETH = EthersBigNumber.from(decoded[1].toString())
            break
          case 'UNWRAP_WETH':
            decoded = abiCoder.decode(['address', 'uint256'], inputForFunction)
            console.log('UNWRAP_WETH: ', decoded)
            makeSwapData = {
              data: inputForFunction,
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountMinimum: decoded[1].toString(),
            }
            break
          default:
            console.info('No parseable execute function found in input.')
            makeSwapData = undefined
            break
        }
        let swapCommand
        if (makeSwapData !== undefined) {
          swapCommand = await rearrangeSwapData(makeSwapData)
          console.log('swapCommand: ', swapCommand)
        }
        if (swapCommand) {
          inputs.push(swapCommand.encodedInput)
          commands = commands.concat(
            swapCommand.type.toString(16).padStart(2, '0')
          )
        }
      }
    }
    return { commands, inputs, value: depositWETH }
  } catch (error) {
    toast.update(id, {
      render: 'Approve Error',
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    })
    console.log('chackBalanceAndAllwance-error-', error)
  }
}

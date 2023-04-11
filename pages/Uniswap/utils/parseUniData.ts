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
import { fetchQuotePrice } from './quotePrice'
BigNumber.config({ DECIMAL_PLACES: 5 })
BigNumber.config({ ROUNDING_MODE: 0 })
BigNumber.config({ EXPONENTIAL_AT: 2 })

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
    const bytessAfterKeccak = utils.keccak256(bytess)

    const DpositSig = 'Deposit(address,uint256)'
    const DpositSigbytess = utils.toUtf8Bytes(DpositSig)
    const DpositSigbytessAfterKeccak = utils.keccak256(DpositSigbytess)
    console.log('DpositSigbytessAfterKeccak', DpositSigbytessAfterKeccak)

    const bytessAfterKeccakForPermit =
      '0xc6a377bfc4eb120024a8ac08eef205be16b817020812c73223e81d1bdb9708ec'

    const tokensApproved: any = []

    for (let i = 0; i < receipt.logs.length; i++) {
      if (receipt.logs[i].topics[0] === bytessAfterKeccakForPermit) {
        console.log('\n')
        const from = utils.defaultAbiCoder.decode(
          ['address'],
          receipt.logs[i].topics[1]
        )[0]
        const token: any = utils.defaultAbiCoder.decode(
          ['address'],
          receipt.logs[i].topics[2]
        )[0]
        const spender = utils.defaultAbiCoder.decode(
          ['address'],
          receipt.logs[i].topics[3]
        )[0]
        const value = utils.defaultAbiCoder.decode(
          ['uint160', 'uint48', 'uint48'],
          receipt.logs[i].data
        )[0]
        console.log(
          'permit-values',
          from,
          receipt.from,
          token,
          spender,
          value.toString()
        )

        if (tokensApproved.includes(token[0])) {
          continue
        }
        console.log(
          'tokensApproved.includes(token)-1',
          token,
          tokensApproved,
          tokensApproved.includes(token)
        )

        if (
          from.toString().toLowerCase() ===
            receipt.from.toString().toLowerCase() &&
          spender.toString().toLowerCase() ===
            receipt.to.toString().toLowerCase()
        ) {
          console.log('permit-logs', receipt.logs[i])

          const allowedForPermit2 = await checkIsPermit2Approved(
            token.toString(),
            address,
            Permit2Address,
            value
          )
          console.log('allowedForPermit2: ', allowedForPermit2)

          // if not allowed then give approve
          if (!allowedForPermit2) {
            const tokenContract = await getErc20Contract(token.toString())
            const approveTx = await tokenContract
              ?.connect(signer)
              .approve(Permit2Address, EthersBigNumber.from(value.toString()))
            await approveTx.wait()
          }

          const allowedForRouter = await checkIsSpenderApprovedForPermit2(
            address,
            token.toString(),
            receipt.to,
            value.toString()
          )
          console.log('allowedForRouter: ', allowedForRouter)

          if (!allowedForRouter) {
            const command = await getSignForPermitForPermit2(
              {
                contractAddress: token.toString(),
                amountIn: EthersBigNumber.from(value.toString()),
              },
              receipt.to
            )
            if (!command) return
            inputs.push(command.encodedInput)
            commands = commands.concat(
              command.type.toString(16).padStart(2, '0')
            )
          }
          console.log('inputs-after-permit', commands, inputs)
        }
        tokensApproved.push(token[0])
      } else if (receipt.logs[i].topics[0] === bytessAfterKeccak) {
        console.log('\n Hello')

        const token = receipt.logs[i].address.toString()

        if (tokensApproved.includes(token)) {
          continue
        }

        const from = utils.defaultAbiCoder.decode(
          ['address'],
          receipt.logs[i].topics[1]
        )

        if (
          from.toString().toLowerCase() ===
          receipt.from.toString().toLowerCase()
        ) {
          const to = utils.defaultAbiCoder.decode(
            ['address'],
            receipt.logs[i].topics[2]
          )
          const value = utils.defaultAbiCoder.decode(
            ['uint256'],
            receipt.logs[i].data
          )

          const allowedForPermit2 = await checkIsPermit2Approved(
            token.toString(),
            address,
            Permit2Address,
            value
          )
          console.log('allowedForPermit2: ', allowedForPermit2)

          // if not allowed then give approve
          if (!allowedForPermit2) {
            const tokenContract = await getErc20Contract(token.toString())
            const approveTx = await tokenContract
              ?.connect(signer)
              .approve(Permit2Address, EthersBigNumber.from(value.toString()))
            await approveTx.wait()
          }

          const allowedForRouter = await checkIsSpenderApprovedForPermit2(
            address,
            token.toString(),
            receipt.to,
            value.toString()
          )
          console.log('allowedForRouter: ', allowedForRouter)

          if (!allowedForRouter) {
            const command = await getSignForPermitForPermit2(
              {
                contractAddress: token.toString(),
                amountIn: EthersBigNumber.from(value.toString()),
              },
              receipt.to
            )
            if (!command) return
            inputs.push(command.encodedInput)
            commands = commands.concat(
              command.type.toString(16).padStart(2, '0')
            )
          }
          console.log('inputs-after-permit', commands, inputs)
          tokensApproved.push(token)

          // const contract = await getErc20Contract(contractAddress)
          // if (!contract) return

          // const allowance = await contract.allowance(receipt.from, receipt.to)
          // console.log('allowance', allowance.toString())

          // const tokenBalance = await contract.balanceOf(receipt.from)
          // console.log('tokenBalance', tokenBalance.toString())

          // if (EthersBigNumber.from(allowance).lt(value.toString())) {
          //   console.log('need allownace')
          //   const signer = await getSigner()
          //   if (!signer) return

          //   // approve with toast pending
          //   id = toast.loading('Approve Pending...')
          //   const tx = await contract
          //     .connect(signer)
          //     .approve(receipt.to, EthersBigNumber.from(value.toString()))
          //   await tx.wait()
          //   toast.update(id, {
          //     render: 'Approved',
          //     type: 'success',
          //     isLoading: false,
          //     autoClose: 5000,
          //   })
          // }

          // if (EthersBigNumber.from(tokenBalance).lt(value.toString())) {
          //   console.log('not enough Balance')
          //   toast.error(`Not enough Balance for this tx`)
          //   return
          // }
        }
      }
    } // end of logs for loop

    ///////

    // check swaps
    const txIndex = EthersBigNumber.from(receipt.transactionIndex).toHexString()
    const zeroX = '0x'
    const txBlockNumber = zeroX.concat(receipt.blockNumber.toString(16))
    const txData = await getTransactionByBlockNumberAndIndexUsingExplorereUrl(
      network_name,
      txBlockNumber,
      txIndex
    )
    //   console.log('Uni-p-txData-: ', txData)

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
            console.log('amountOutprice: ', amountOutprice.toString())
            makeSwapData = {
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountIn: decoded[1].toString(),
              // amountOut: EthersBigNumber.from(0),
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
            console.log(
              'amountInprice: ',
              amountInprice.toString(),
              extractPathFromV3(decoded[3])[0].toString()
            )

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

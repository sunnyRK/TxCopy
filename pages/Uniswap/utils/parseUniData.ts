import { ethers, BigNumber, utils } from 'ethers'
import UniversalAbi from '../../common/abis/Universal_abi.json'
import {
  ADDRESS_THIS,
  CommandType,
  MSG_SENDER,
  swapCodes,
} from '../utils/constants'
import { network_name } from '../../common/constants'
import {
  getErc20Contract,
  getSigner,
  getTransactionByBlockNumberAndIndexUsingExplorereUrl,
} from '../../common/helper'
import {
  extractPathFromV3,
  rearrangeSwapData,
  checkPermit2Approve,
  checkSpenderSign,
  createCommand,
} from './helper'
import { toast } from 'react-toastify'
import { parseEther } from 'ethers/lib/utils'
import { generateRoute } from '../alpharouter/routes'

export const checkSpenderAllowance = async (receipt: any, onlycheck: any) => {
  let id: any
  let depositWETH: BigNumber = BigNumber.from(0)
  try {
    let commands = '0x'
    let inputs: any = []

    let signer = await getSigner()
    if (!signer) return
    let address = await signer.getAddress()

    const sig = 'Transfer(address,address,uint256)'
    const bytess = utils.toUtf8Bytes(sig)
    const bytessAfterKeccak = utils.keccak256(bytess)
    const DpositSig = 'Deposit(address,uint256)'
    const DpositSigbytess = utils.toUtf8Bytes(DpositSig)
    const DpositSigbytessAfterKeccak = utils.keccak256(DpositSigbytess)

    const WithdrawBytesAfterKeccak =
      '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65'

    let amountIn: BigNumber = BigNumber.from('0')
    let tokenIn
    let tokenOut
    let isWrapEth: any = false
    let isUnWrapEth: any = false

    for (let i = 0; i < receipt.logs.length; i++) {
      if (DpositSigbytessAfterKeccak === receipt.logs[i].topics[0]) {
        isWrapEth = true
        const value = utils.defaultAbiCoder.decode(
          ['uint256'],
          receipt.logs[i].data
        )
        console.log('\n')
        amountIn = amountIn.add(value.toString())
        tokenIn = receipt.logs[i].address.toString()
        // console.log('tokenIn:', tokenIn.toString())
        // console.log('amountIn:', amountIn.toString())

        const makeSwapData = [ADDRESS_THIS, amountIn]
        const commandType = CommandType.WRAP_ETH

        const swapCommand = await createCommand(commandType, makeSwapData)
        if (swapCommand) {
          inputs.push(swapCommand.encodedInput)
          commands = commands.concat(
            swapCommand.type.toString(16).padStart(2, '0')
          )
        }
        // console.log('commands:', commands.toString())
        // console.log('inputs:', inputs.toString())

        depositWETH = amountIn
      }

      if (bytessAfterKeccak === receipt.logs[i].topics[0]) {
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
          from.toString().toLowerCase() ===
          receipt.from.toString().toLowerCase()
        ) {
          console.log('\n')
          // console.log('token:', token.toString())
          // console.log('from:', from.toString())
          // console.log('receipt.from:', receipt.from.toString())
          // console.log('value:', value.toString())
          amountIn = amountIn.add(value.toString())
          tokenIn = receipt.logs[i].address.toString()
        } else if (
          to.toString().toLowerCase() === receipt.from.toString().toLowerCase()
        ) {
          tokenOut = receipt.logs[i].address.toString()
        }
      }

      if (WithdrawBytesAfterKeccak === receipt.logs[i].topics[0]) {
        isUnWrapEth = true
        tokenOut = receipt.logs[i].address.toString()
      }
    }
    // console.log('amountIn:', amountIn.toString())
    // console.log('tokenIn:', tokenIn.toString())
    // console.log('tokenOut:', tokenOut.toString())

    const tokenInContract = await getErc20Contract(tokenIn)
    const tokenOutContract = await getErc20Contract(tokenOut)

    const tokenInBalance = await tokenInContract?.balanceOf(address)

    if (tokenInBalance === undefined) {
      throw 'Balance cant fetch'
    }

    if (!tokenInBalance.gte(amountIn)) {
      alert('Not enough balance you have')
      throw 'Not enough balance you have'
    }

    const route: any = await generateRoute(
      tokenIn,
      tokenOut,
      amountIn.toString(),
      'exactIn'
    )
    if (route === undefined) {
      console.log('route error')
      throw 'route error'
      // return undefined
    }
    // const amountOutprice: any = route?.quote.toExact().toString()

    const isPermit2Approved = await checkPermit2Approve(
      tokenIn,
      amountIn.toString()
    )

    if (isPermit2Approved === undefined) {
      console.log('isPermit2Approved error', isPermit2Approved)
      throw 'isPermit2Approved error'
      // return undefined
    }
    console.log('isPermit2Approved Done', isPermit2Approved)

    const command = await checkSpenderSign(
      tokenIn,
      receipt.to,
      amountIn.toString()
    )

    if (command === undefined) {
      // console.log('checkSpenderSign-command error');
      throw 'checkSpenderSign error'
      // return undefined
    }
    console.log('checkSpenderSign-command Done', command)

    if (command) {
      inputs.push(command.encodedInput)
      commands = commands.concat(command.type.toString(16).padStart(2, '0'))
    }
    // console.log('commands:', commands.toString())
    // console.log('inputs:', inputs.toString())

    for (let i = 0; i < route?.route.length; i++) {
      // console.log('for loop index: ', i, route?.route.length)
      const tokenInDecimals = await tokenInContract?.decimals()
      const tokenOutDecimals = await tokenOutContract?.decimals()

      console.log('tokenInDecimals: ', tokenInDecimals.toString())
      console.log('tokenOutDecimals: ', tokenOutDecimals.toString())

      if (tokenInDecimals === undefined || !tokenOutDecimals === undefined) {
        console.log('tokenInDecimals error', tokenInDecimals)
        console.log('tokenOutDecimals error', tokenOutDecimals)
        // return undefined
        throw 'decimals error for tokens'
      }

      const amountInprice: any = route?.trade.swaps[i].inputAmount.toExact()
      const amountOutprice: any = route?.trade.swaps[i].outputAmount.toExact()
      let _amountInprice = ethers.utils.parseUnits(
        amountInprice,
        tokenInDecimals
      )
      let _amountOutprice = ethers.utils.parseUnits(
        amountOutprice,
        tokenOutDecimals
      )
      const tokenPath: any = route?.route[i].tokenPath
      // console.log('route', route)
      // console.log('tokenPath', route?.route[0].tokenPath, paths, tokenPath.length)
      // console.log('route.quote.toExact()', route?.quote.toExact())

      let totalFees: BigNumber = BigNumber.from('0')
      let fees: any = []
      for (let j = 0; j < route.trade.routes[i].pools?.length; j++) {
        totalFees = totalFees.add(
          BigNumber.from(route.trade.routes[i].pools[j].fee)
        )
        fees.push(route.trade.routes[i].pools[j].fee)
      }

      // console.log('tokenInDecimals: ', tokenInDecimals.toString())
      // console.log('tokenOutDecimals: ', tokenOutDecimals.toString())

      console.log(
        '_amountInprice: ',
        amountInprice.toString(),
        _amountInprice.toString()
      )
      // console.log(
      //   '_amountOutprice: ',
      //   amountOutprice.toString(),
      //   _amountOutprice.toString()
      // )
      // console.log('totalFees+', totalFees.toString())

      _amountOutprice = _amountOutprice.sub(
        _amountOutprice.mul(totalFees).div(1e6)
      )
      console.log('_amountOutprice-afterFees: ', _amountOutprice.toString())

      let newPath: any = []
      for (let j = 0; j < tokenPath?.length; j++) {
        newPath.push(route?.route[i].tokenPath[j].address)
      }
      // console.log('newPath-after: ', newPath)

      const makeSwapData = {
        function: swapCodes['00'],
        recipient: isUnWrapEth ? ADDRESS_THIS : MSG_SENDER,
        amountIn: _amountInprice.toString(),
        amountOut: _amountOutprice.toString(),
        path: newPath,
        payerIsUser: isWrapEth ? false : true,
      }

      let swapCommand
      if (makeSwapData !== undefined) {
        swapCommand = await rearrangeSwapData(makeSwapData, fees)
        console.log('swapCommand: ', swapCommand)
      }
      if (swapCommand) {
        inputs.push(swapCommand.encodedInput)
        commands = commands.concat(
          swapCommand.type.toString(16).padStart(2, '0')
        )
      }
    }

    if (isUnWrapEth) {
      const makeSwapData = [MSG_SENDER, 0]
      const commandType = CommandType.UNWRAP_WETH

      const swapCommand = await createCommand(commandType, makeSwapData)
      if (swapCommand) {
        inputs.push(swapCommand.encodedInput)
        commands = commands.concat(
          swapCommand.type.toString(16).padStart(2, '0')
        )
      }
      // console.log('commands-UNWRAP_WETH:', commands.toString())
      // console.log('inputs-UNWRAP_WETH:', inputs.toString())
    }

    console.log('commands-2:', commands.toString())
    console.log('inputs-2:', inputs.toString())

    // // check swaps
    // const txIndex = BigNumber.from(receipt.transactionIndex).toHexString()
    // const zeroX = '0x'
    // const txBlockNumber = zeroX.concat(receipt.blockNumber.toString(16))
    // const txData = await getTransactionByBlockNumberAndIndexUsingExplorereUrl(
    //   network_name,
    //   txBlockNumber,
    //   txIndex
    // )

    // const abiCoder = new ethers.utils.AbiCoder()
    // let universalInteface = new ethers.utils.Interface(UniversalAbi)
    // const parsedTx = universalInteface.parseTransaction({ data: txData.input })
    // let commandsSplit = parsedTx.args[0].substring(2).match(/.{1,2}/g)
    // console.log('parsedTx: ', parsedTx)
    // console.log('parsedTx-0: ', parsedTx.args[1][0])
    // console.log('parsedTx-1: ', parsedTx.args[1][1])
    // console.log('commandsSplit: ', commandsSplit)

    // let decoded
    // decoded = abiCoder.decode(
    //   ['address', 'uint256', 'uint256', 'bytes', 'bool'],
    //   parsedTx.args[1][0]
    // )
    // console.log('V3_SWAP_EXACT_IN-1: ', decoded.toString())

    // decoded = abiCoder.decode(['address', 'uint256'], parsedTx.args[1][0])
    // console.log('WRAP_WETH-1: ', decoded.toString())

    // decoded = abiCoder.decode(
    //   ['address', 'uint256', 'uint256', 'bytes', 'bool'],
    //   parsedTx.args[1][0]
    // )
    // console.log('V3_SWAP_EXACT_IN-2: ', decoded.toString())

    // decoded = abiCoder.decode(['address', 'uint256'], parsedTx.args[1][1])
    // console.log('UNWRAP_WETH-1: ', decoded.toString())

    // let foundFunction: any
    // let inputForFunction: any

    // for (let i = 0; i < commandsSplit.length; i++) {
    //   let commandCode = commandsSplit[i]
    //   const currentIndex = Object.keys(swapCodes).indexOf(commandCode)

    //   if (currentIndex !== -1) {
    //     console.log('commandsSplit: ', commandsSplit)
    //     foundFunction = commandCode
    //     inputForFunction = parsedTx.args[1][commandsSplit.indexOf(commandCode)]

    //     if (!foundFunction) return
    //     if (!inputForFunction) return

    //     let decoded
    //     let makeSwapData
    //     switch (swapCodes[foundFunction]) {
    //       case 'V3_SWAP_EXACT_IN': //"exactInput" FNC 11
    //         decoded = abiCoder.decode(
    //           ['address', 'uint256', 'uint256', 'bytes', 'bool'],
    //           inputForFunction
    //         )
    //         console.log('V3_SWAP_EXACT_IN: ', decoded.toString())
    //         console.log('decoded[1].toString(): ', decoded[1].toString())
    //         const paths = extractPathFromV3(decoded[3])
    //         // const amountIns = ethers.utils.parseUnits('40', 6)

    //         const erc20 = await getErc20Contract(paths[0])

    //         const route: any = await generateRoute(
    //           paths[0],
    //           paths[paths.length - 1],
    //           decoded[1].toString(),
    //           // amountIns,
    //           'exactIn'
    //         )
    //         const amountOutprice: any = route?.quote.toExact().toString()

    //         await checkPermit2Approve(
    //           paths[0],
    //           // amountIns
    //           decoded[1].toString()
    //         )
    //         const command = await checkSpenderSign(
    //           paths[0],
    //           receipt.to,
    //           decoded[1].toString()
    //           // amountIns
    //         )
    //         if (command) {
    //           inputs.push(command.encodedInput)
    //           commands = commands.concat(
    //             command.type.toString(16).padStart(2, '0')
    //           )
    //         }

    //         for (let i = 0; i < route?.route.length; i++) {
    //           console.log('for loop index: ', i, route?.route.length)
    //           const amountInDecimals = await erc20?.decimals()
    //           const amountInprice: any = route?.trade.swaps[i].inputAmount.toExact()
    //           const amountOutprice: any = route?.trade.swaps[i].outputAmount.toExact()
    //           let _amountInprice = ethers.utils.parseUnits(amountInprice, amountInDecimals)
    //           let _amountOutprice = parseEther(amountOutprice)
    //           const tokenPath: any = route?.route[i].tokenPath
    //           // console.log('route', route)
    //           // console.log('tokenPath', route?.route[0].tokenPath, paths, tokenPath.length)
    //           // console.log('route.quote.toExact()', route?.quote.toExact())

    //           let totalFees: BigNumber = BigNumber.from('0')
    //           for (let j = 0; j < route.trade.routes[i].pools?.length; j++) {
    //             totalFees = totalFees.add(
    //               BigNumber.from(route.trade.routes[i].pools[j].fee)
    //             )
    //           }

    //           console.log('amountInDecimals: ', amountInDecimals.toString())
    //           console.log('_amountInprice: ', amountInprice.toString(), _amountInprice.toString())
    //           console.log('_amountOutprice: ', amountOutprice.toString(), _amountOutprice.toString())
    //           console.log('totalFees+', totalFees.toString())

    //           _amountOutprice = _amountOutprice.sub(
    //             _amountOutprice.mul(totalFees).div(1e6)
    //           )
    //           console.log('_amountOutprice-afterFees: ', _amountOutprice.toString())

    //           let newPath: any = []
    //           for (let j = 0; j < tokenPath?.length; j++) {
    //             newPath.push(route?.route[i].tokenPath[j].address)
    //           }
    //           console.log('newPath-after: ', newPath)

    //           makeSwapData = {
    //             function: swapCodes[foundFunction],
    //             recipient: decoded[0],
    //             // amountIn: decoded[1].toString(),
    //             amountIn: _amountInprice.toString(),
    //             // amountOut: BigNumber.from(0).toString(),
    //             amountOut: _amountOutprice.toString(),
    //             path: newPath,
    //             // path: extractPathFromV3(decoded[3]),
    //             payerIsUser: decoded[4],
    //           }

    //           let swapCommand
    //           if (makeSwapData !== undefined) {
    //             swapCommand = await rearrangeSwapData(makeSwapData)
    //             console.log('swapCommand: ', swapCommand)
    //           }
    //           if (swapCommand) {
    //             inputs.push(swapCommand.encodedInput)
    //             commands = commands.concat(
    //               swapCommand.type.toString(16).padStart(2, '0')
    //             )
    //           }
    //         }
    //         break
    //       case 'V3_SWAP_EXACT_OUT': //exactOutputSingle FNC 9
    //         decoded = abiCoder.decode(
    //           ['address', 'uint256', 'uint256', 'bytes', 'bool'],
    //           inputForFunction
    //         )
    //         console.log('V3_SWAP_EXACT_OUT: ', decoded.toString())

    //         const paths_forOut = extractPathFromV3(decoded[3])

    //         const route_forOut: any = await generateRoute(
    //           paths_forOut[paths_forOut.length - 1],
    //           paths_forOut[0],
    //           decoded[1].toString(),
    //           'exactOut'
    //         )
    //         let _amountInprice: any = route_forOut?.quote.toExact().toString()
    //         _amountInprice = ethers.utils.parseUnits(_amountInprice, '6')
    //         console.log('_amountInprice+: ', _amountInprice.toString())

    //         await checkPermit2Approve(
    //           paths_forOut[paths_forOut.length - 1],
    //           _amountInprice
    //         )
    //         const command_forOut = await checkSpenderSign(
    //           paths_forOut[paths_forOut.length - 1],
    //           receipt.to,
    //           _amountInprice
    //         ) // return command
    //         if (command_forOut) {
    //           inputs.push(command_forOut.encodedInput)
    //           commands = commands.concat(
    //             command_forOut.type.toString(16).padStart(2, '0')
    //           )
    //         }

    //         for (let i = 0; i < route_forOut?.route.length; i++) {
    //           // const amountOutprice: any = route?.quote.toExact().toString()
    //           // let _amountOutprice = parseEther(amountOutprice)
    //           const tokenPath: any = route_forOut?.route[i].tokenPath
    //           // console.log('route', route)
    //           // console.log('tokenPath', route?.route[0].tokenPath, paths, tokenPath.length)
    //           // console.log('route.quote.toExact()', route?.quote.toExact())

    //           // _amountInprice = _amountInprice.add(
    //           //   _amountInprice.mul(5000).div(1e6)
    //           // )
    //           let _amountInprice_Single: any =
    //             route?.trade.swaps[0].outputAmount.toExact()
    //           _amountInprice_Single = _amountInprice_Single.add(
    //             _amountInprice_Single.mul(5000).div(1e6)
    //           )
    //           console.log(
    //             '_amountInprice-after: ',
    //             _amountInprice_Single.toString()
    //           )

    //           let newPath: any = []
    //           for (let j = 0; j < tokenPath?.length; j++) {
    //             newPath.push(route_forOut?.route[0].tokenPath[j].address)
    //           }
    //           newPath.reverse()
    //           console.log(
    //             'newPath-after: ',
    //             newPath.toString(),
    //             extractPathFromV3(decoded[3])
    //           )

    //           makeSwapData = {
    //             function: swapCodes[foundFunction],
    //             recipient: decoded[0],
    //             amountOut: decoded[1].toString(),
    //             amountIn: _amountInprice_Single.toString(),
    //             path: newPath,
    //             // amountIn: ethers.utils.parseUnits('18', '6'),
    //             // path: extractPathFromV3(decoded[3]), // because exact output swaps are executed in reverse order, in this case tokenOut is actually tokenIn
    //             payerIsUser: decoded[4],
    //           }
    //           console.log('newPath-makeSwapData: ', newPath.toString())

    //           let swapCommand
    //           if (makeSwapData !== undefined) {
    //             swapCommand = await rearrangeSwapData(makeSwapData)
    //             console.log('swapCommand: ', swapCommand)
    //           }
    //           if (swapCommand) {
    //             inputs.push(swapCommand.encodedInput)
    //             commands = commands.concat(
    //               swapCommand.type.toString(16).padStart(2, '0')
    //             )
    //           }
    //         }

    //         // makeSwapData = {
    //         //   function: swapCodes[foundFunction],
    //         //   recipient: decoded[0],
    //         //   amountOut: decoded[1].toString(),
    //         //   amountIn: amountInprice,
    //         //   path: extractPathFromV3(decoded[3]), // because exact output swaps are executed in reverse order, in this case tokenOut is actually tokenIn
    //         //   payerIsUser: decoded[4],
    //         // }
    //         break
    //       case 'V2_SWAP_EXACT_IN':
    //         decoded = abiCoder.decode(
    //           ['address', 'uint256', 'uint256', 'address[]', 'bool'],
    //           inputForFunction
    //         )
    //         console.log('V2_SWAP_EXACT_IN: ', decoded)
    //         makeSwapData = {
    //           function: swapCodes[foundFunction],
    //           recipient: decoded[0],
    //           amountIn: decoded[1].toString(),
    //           amountOut: decoded[2].toString(),
    //           path: decoded[3],
    //           payerIsUser: decoded[4],
    //         }

    //         let swapCommand_v2in
    //         if (makeSwapData !== undefined) {
    //           swapCommand_v2in = await rearrangeSwapData(makeSwapData)
    //           console.log('swapCommand_v2in: ', swapCommand_v2in)
    //         }
    //         if (swapCommand_v2in) {
    //           inputs.push(swapCommand_v2in.encodedInput)
    //           commands = commands.concat(
    //             swapCommand_v2in.type.toString(16).padStart(2, '0')
    //           )
    //         }

    //         break
    //       case 'V2_SWAP_EXACT_OUT':
    //         decoded = abiCoder.decode(
    //           ['address', 'uint256', 'uint256', 'address[]', 'bool'],
    //           inputForFunction
    //         )
    //         console.log('V2_SWAP_EXACT_OUT: ', decoded)
    //         makeSwapData = {
    //           data: inputForFunction,
    //           function: swapCodes[foundFunction],
    //           recipient: decoded[0],
    //           amountIn: decoded[2].toString(),
    //           amountOut: decoded[1].toString(),
    //           path: decoded[3],
    //           payerIsUser: decoded[4],
    //         }
    //         let swapCommand_v2out
    //         if (makeSwapData !== undefined) {
    //           swapCommand_v2out = await rearrangeSwapData(makeSwapData)
    //           console.log('swapCommand_v2out: ', swapCommand_v2out)
    //         }
    //         if (swapCommand_v2out) {
    //           inputs.push(swapCommand_v2out.encodedInput)
    //           commands = commands.concat(
    //             swapCommand_v2out.type.toString(16).padStart(2, '0')
    //           )
    //         }
    //         break
    //       case 'WRAP_ETH':
    //         decoded = abiCoder.decode(['address', 'uint256'], inputForFunction)
    //         console.log('WRAP_ETH: ', decoded)
    //         makeSwapData = {
    //           data: inputForFunction,
    //           function: swapCodes[foundFunction],
    //           recipient: decoded[0],
    //           amountIn: decoded[1].toString(),
    //         }
    //         depositWETH = BigNumber.from(decoded[1].toString())

    //         let swapCommand_wrap
    //         if (makeSwapData !== undefined) {
    //           swapCommand_wrap = await rearrangeSwapData(makeSwapData)
    //           console.log('swapCommand_wrap: ', swapCommand_wrap)
    //         }
    //         if (swapCommand_wrap) {
    //           inputs.push(swapCommand_wrap.encodedInput)
    //           commands = commands.concat(
    //             swapCommand_wrap.type.toString(16).padStart(2, '0')
    //           )
    //         }

    //         break
    //       case 'UNWRAP_WETH':
    //         decoded = abiCoder.decode(['address', 'uint256'], inputForFunction)
    //         console.log('UNWRAP_WETH: ', decoded)
    //         makeSwapData = {
    //           data: inputForFunction,
    //           function: swapCodes[foundFunction],
    //           recipient: decoded[0],
    //           amountMinimum: decoded[1].toString(),
    //         }
    //         let swapCommand_unwrap
    //         if (makeSwapData !== undefined) {
    //           swapCommand_unwrap = await rearrangeSwapData(makeSwapData)
    //           console.log('swapCommand_unwrap: ', swapCommand_unwrap)
    //         }
    //         if (swapCommand_unwrap) {
    //           inputs.push(swapCommand_unwrap.encodedInput)
    //           commands = commands.concat(
    //             swapCommand_unwrap.type.toString(16).padStart(2, '0')
    //           )
    //         }
    //         break
    //       default:
    //         console.info('No parseable execute function found in input.')
    //         makeSwapData = undefined
    //         break
    //     }
    //     // if (inputs.length > 0) {
    //     //   break;
    //     // }
    //   }
    // }
    return { commands, inputs, value: depositWETH }
  } catch (error) {
    toast.update(id, {
      render: 'Approve Error',
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    })
    console.log('chackBalanceAndAllwance-error-', error.message)
    return undefined
  }
}

// export async function generateRoute(): Promise<SwapRoute | null> {
//   const router = new AlphaRouter({
//     chainId: ChainId.POLYGON,
//     provider: new ethers.providers.Web3Provider(web3.givenProvider),
//   })

//   // const options: SwapOptionsSwapRouter02 = {
//   //   recipient: "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989",
//   //   slippageTolerance: new Percent(50, 10_000),
//   //   deadline: Math.floor(Date.now() / 1000 + 1800),
//   //   type: SwapType.SWAP_ROUTER_02,
//   // }

//   const options: SwapOptionsUniversalRouter = {
//     // recipient: "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989",
//     slippageTolerance: new Percent(50, 10_000),
//     // deadline: Math.floor(Date.now() / 1000 + 1800),
//     type: SwapType.UNIVERSAL_ROUTER,
//     simulate: {
//       fromAddress: "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989"
//     }
//   }

//   const route = await router.route(
//     CurrencyAmount.fromRawAmount(
//       CurrentConfig.tokens.in,
//       fromReadableAmount(
//         CurrentConfig.tokens.amountIn,
//         CurrentConfig.tokens.in.decimals
//       ).toString()
//     ),
//     CurrentConfig.tokens.out,
//     TradeType.EXACT_INPUT,
//     options
//   )

//   console.log('route', route)

//   return route
// }

export const checkSpenderAllowance2 = async (receipt: any, onlycheck: any) => {
  let id: any
  let depositWETH: BigNumber = BigNumber.from(0)
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

    // for (let i = 0; i < receipt.logs.length; i++) {
    //   // if (receipt.logs[i].topics[0] === bytessAfterKeccakForPermit) {
    //   //   console.log('\n')
    //   //   const from = utils.defaultAbiCoder.decode(
    //   //     ['address'],
    //   //     receipt.logs[i].topics[1]
    //   //   )[0]
    //   //   const token: any = utils.defaultAbiCoder.decode(
    //   //     ['address'],
    //   //     receipt.logs[i].topics[2]
    //   //   )[0]
    //   //   const spender = utils.defaultAbiCoder.decode(
    //   //     ['address'],
    //   //     receipt.logs[i].topics[3]
    //   //   )[0]
    //   //   const value = utils.defaultAbiCoder.decode(
    //   //     ['uint160', 'uint48', 'uint48'],
    //   //     receipt.logs[i].data
    //   //   )[0]
    //   //   console.log(
    //   //     'permit-values',
    //   //     from,
    //   //     receipt.from,
    //   //     token,
    //   //     spender,
    //   //     value.toString()
    //   //   )

    //   //   if (tokensApproved.includes(token[0])) {
    //   //     continue
    //   //   }
    //   //   console.log(
    //   //     'tokensApproved.includes(token)-1',
    //   //     token,
    //   //     tokensApproved,
    //   //     tokensApproved.includes(token)
    //   //   )

    //   //   if (
    //   //     from.toString().toLowerCase() ===
    //   //       receipt.from.toString().toLowerCase() &&
    //   //     spender.toString().toLowerCase() ===
    //   //       receipt.to.toString().toLowerCase()
    //   //   ) {
    //   //     console.log('permit-logs', receipt.logs[i])

    //   //     const allowedForPermit2 = await checkIsPermit2Approved(
    //   //       token.toString(),
    //   //       address,
    //   //       Permit2Address,
    //   //       value
    //   //     )
    //   //     console.log('allowedForPermit2: ', allowedForPermit2)

    //   //     // if not allowed then give approve
    //   //     if (!allowedForPermit2) {
    //   //       const tokenContract = await getErc20Contract(token.toString())
    //   //       const approveTx = await tokenContract
    //   //         ?.connect(signer)
    //   //         .approve(Permit2Address, BigNumber.from(value.toString()))
    //   //       await approveTx.wait()
    //   //     }

    //   //     const allowedForRouter = await checkIsSpenderApprovedForPermit2(
    //   //       address,
    //   //       token.toString(),
    //   //       receipt.to,
    //   //       value.toString()
    //   //     )
    //   //     console.log('allowedForRouter: ', allowedForRouter)

    //   //     if (!allowedForRouter) {
    //   //       const command = await getSignForPermitForPermit2(
    //   //         {
    //   //           contractAddress: token.toString(),
    //   //           amountIn: BigNumber.from(value.toString()),
    //   //         },
    //   //         receipt.to
    //   //       )
    //   //       if (!command) return
    //   //       inputs.push(command.encodedInput)
    //   //       commands = commands.concat(
    //   //         command.type.toString(16).padStart(2, '0')
    //   //       )
    //   //     }
    //   //     console.log('inputs-after-permit', commands, inputs)
    //   //   }
    //   //   tokensApproved.push(token[0])
    //   // } else
    //   if (receipt.logs[i].topics[0] === bytessAfterKeccak) {
    //     console.log('\n Hello')

    //     const token = receipt.logs[i].address.toString()

    //     if (tokensApproved.includes(token)) {
    //       continue
    //     }

    //     const from = utils.defaultAbiCoder.decode(
    //       ['address'],
    //       receipt.logs[i].topics[1]
    //     )

    //     if (
    //       from.toString().toLowerCase() ===
    //       receipt.from.toString().toLowerCase()
    //     ) {
    //       const to = utils.defaultAbiCoder.decode(
    //         ['address'],
    //         receipt.logs[i].topics[2]
    //       )
    //       const value = utils.defaultAbiCoder.decode(
    //         ['uint256'],
    //         receipt.logs[i].data
    //       )

    //       const allowedForPermit2 = await checkIsPermit2Approved(
    //         token.toString(),
    //         address,
    //         Permit2Address,
    //         value
    //       )
    //       console.log('allowedForPermit2: ', allowedForPermit2)

    //       // if not allowed then give approve
    //       if (!allowedForPermit2) {
    //         const tokenContract = await getErc20Contract(token.toString())
    //         const approveTx = await tokenContract
    //           ?.connect(signer)
    //           .approve(Permit2Address, BigNumber.from(value.toString()))
    //         await approveTx.wait()
    //       }

    //       const allowedForRouter = await checkIsSpenderApprovedForPermit2(
    //         address,
    //         token.toString(),
    //         receipt.to,
    //         value.toString()
    //       )
    //       console.log('allowedForRouter: ', allowedForRouter)

    //       if (!allowedForRouter && !onlycheck) {
    //         const command = await getSignForPermitForPermit2(
    //           {
    //             contractAddress: token.toString(),
    //             amountIn: BigNumber.from(value.toString()),
    //           },
    //           receipt.to
    //         )
    // if (!command) return
    // inputs.push(command.encodedInput)
    // commands = commands.concat(
    //   command.type.toString(16).padStart(2, '0')
    // )
    //       }
    //       console.log('inputs-after-permit', commands, inputs)
    //       tokensApproved.push(token)

    //       // const contract = await getErc20Contract(contractAddress)
    //       // if (!contract) return

    //       // const allowance = await contract.allowance(receipt.from, receipt.to)
    //       // console.log('allowance', allowance.toString())

    //       // const tokenBalance = await contract.balanceOf(receipt.from)
    //       // console.log('tokenBalance', tokenBalance.toString())

    //       // if (BigNumber.from(allowance).lt(value.toString())) {
    //       //   console.log('need allownace')
    //       //   const signer = await getSigner()
    //       //   if (!signer) return

    //       //   // approve with toast pending
    //       //   id = toast.loading('Approve Pending...')
    //       //   const tx = await contract
    //       //     .connect(signer)
    //       //     .approve(receipt.to, BigNumber.from(value.toString()))
    //       //   await tx.wait()
    //       //   toast.update(id, {
    //       //     render: 'Approved',
    //       //     type: 'success',
    //       //     isLoading: false,
    //       //     autoClose: 5000,
    //       //   })
    //       // }

    //       // if (BigNumber.from(tokenBalance).lt(value.toString())) {
    //       //   console.log('not enough Balance')
    //       //   toast.error(`Not enough Balance for this tx`)
    //       //   return
    //       // }
    //     }
    //   }
    // } // end of logs for loop

    ///////

    // check swaps
    const txIndex = BigNumber.from(receipt.transactionIndex).toHexString()
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

            const paths = extractPathFromV3(decoded[3])
            const route = await generateRoute(
              paths[0],
              paths[paths.length - 1],
              decoded[1].toString()
            )
            const amountOutprice: any = route?.quote.toExact().toString()
            const tokenPath: any = route?.route[0].tokenPath
            if (!tokenPath) return
            console.log('route', route)
            console.log(
              'tokenPath',
              route?.route[0].tokenPath,
              paths,
              tokenPath.length
            )
            console.log('route.quote.toExact()', route?.quote.toExact())

            let newPath: any = []
            for (let i = 0; i < tokenPath?.length; i++) {
              console.log(
                'route?.route[0].tokenPath[i].address',
                route?.route[0].tokenPath[i].address
              )
              newPath.push(route?.route[0].tokenPath[i].address)
            }
            console.log('newPath', newPath)
            console.log('oldPath', extractPathFromV3(decoded[3]))

            console.log('price+++____+++', route?.quote.toFixed().toString())

            const _amountOutprice = parseEther(amountOutprice)
            console.log('_amountOutprice+++_', _amountOutprice)

            await checkPermit2Approve(paths[0], decoded[1].toString())
            const command = await checkSpenderSign(
              paths[0],
              receipt.to,
              decoded[1].toString()
            ) // return command
            if (command) {
              inputs.push(command.encodedInput)
              commands = commands.concat(
                command.type.toString(16).padStart(2, '0')
              )
            }

            // console.log('parseEther(BigNumber.from(amountOutprice).toString())', parseEther(BigNumber.from(amountOutprice).toString()));

            makeSwapData = {
              function: swapCodes[foundFunction],
              recipient: decoded[0],
              amountIn: decoded[1].toString(),
              amountOut: parseEther('17'),
              // amountOut: BigNumber.from(0),
              // amountOut: parseEther(BigNumber.from(amountOutprice).toString()),
              // amountOut: ethers.utils.parseUnits(BigNumber.from(amountOutprice?.toString()), 18),
              // path: extractPathFromV3(decoded[3]),
              path: newPath,
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
            //     .approve(Permit2Address, BigNumber.from(amountInprice.toString()))
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
            //       amountIn: BigNumber.from(amountInprice.toString()),
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
            depositWETH = BigNumber.from(decoded[1].toString())
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

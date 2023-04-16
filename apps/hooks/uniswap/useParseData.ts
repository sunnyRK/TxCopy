import { useMutation } from '@tanstack/react-query'
import { ethers, BigNumber, utils } from 'ethers'
import {
  ADDRESS_THIS,
  CommandType,
  MSG_SENDER,
  swapCodes,
} from '../../Uniswap/utils/constants'
import { getErc20Contract, getSigner } from '../../common/helper'
import {
  rearrangeSwapData,
  checkPermit2Approve,
  checkSpenderSign,
  createCommand,
} from '../../Uniswap/utils/helper'
import { toast } from 'react-toastify'
import { usePriceHook } from '../commonHooks/usePriceHook'

type Props = {
  receipt: any
  onlyCheck: any
}

// async function readbalance(tokenIn: any, _address: any, provider: any) {
//   try {
//     console.log('readbalance-tokenIn: ', tokenIn)
//     console.log('readbalance-_address: ', _address)
//     console.log('readbalance-provider: ', provider)

//     const tokenInContract = new ethers.Contract(tokenIn, erc20ABI, provider)
//     const tokenInBalance = await tokenInContract.callStatic.balanceOf(_address.address)
//     console.log('readbalance-tokenInBalance: ', tokenInBalance)

//     return tokenInBalance
//   } catch (error) {
//     console.log('readbalance-error', error);
//   }
//  }

export function useParseData() {
  const { mutateAsync: generateRoute } = usePriceHook()

  async function checkSpenderAllowance({ receipt, onlyCheck }: Props): Promise<any> {
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

          const makeSwapData = [ADDRESS_THIS, amountIn]
          const commandType = CommandType.WRAP_ETH

          const swapCommand = await createCommand(commandType, makeSwapData)
          if (swapCommand) {
            inputs.push(swapCommand.encodedInput)
            commands = commands.concat(
              swapCommand.type.toString(16).padStart(2, '0')
            )
          }
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
            amountIn = amountIn.add(value.toString())
            tokenIn = receipt.logs[i].address.toString()
          } else if (
            to.toString().toLowerCase() ===
            receipt.from.toString().toLowerCase()
          ) {
            tokenOut = receipt.logs[i].address.toString()
          }
        }

        if (WithdrawBytesAfterKeccak === receipt.logs[i].topics[0]) {
          isUnWrapEth = true
          tokenOut = receipt.logs[i].address.toString()
        }
      }

      console.log('balance-fetch')

      const tokenInContract = await getErc20Contract(tokenIn)
      const tokenOutContract = await getErc20Contract(tokenOut)

      if (!tokenInContract || !tokenOutContract) {
        throw 'tokenInContract & tokenOutContract not working'
      }

      // const tokenInBalance = await readbalance(tokenIn, address, provider)
      const tokenInBalance = await tokenInContract.callStatic.balanceOf(address)
      console.log('tokenInBalance:', tokenInBalance.toString())

      // if (tokenInBalance === undefined) {
      //   throw 'Balance cant fetch'
      // }

      const route: any = await generateRoute({
        tokenIn,
        tokenOut,
        value: amountIn.toString(),
        type: 'exactIn',
      })

      if (route === undefined) {
        console.log('route error')
        throw 'route error'
      }
      const amountOutprice: any = route?.quote.toExact().toString()
      console.log('amountOutprice',amountOutprice.toString())

      const tokenInDecimals = await tokenInContract.callStatic.decimals()
      console.log('tokenInDecimals-1',tokenInDecimals.toString())

      const tokenOutDecimals = await tokenOutContract.callStatic.decimals()
      console.log('tokenOutDecimals-2',tokenInDecimals.toString())

      console.log('tokenInDecimals: ', tokenInDecimals.toString())
      console.log('tokenOutDecimals: ', tokenOutDecimals.toString())

      if (tokenInDecimals === undefined || !tokenOutDecimals === undefined) {
        console.log('tokenInDecimals error', tokenInDecimals)
        console.log('tokenOutDecimals error', tokenOutDecimals)
        throw 'decimals error for tokens'
      }
      console.log('hello1')

      let isEnoughBalance: boolean = true
      if (!BigNumber.from(tokenInBalance.toString()).gte(BigNumber.from(amountIn))) {
        console.log('hello2')
        isEnoughBalance = false
      }
      console.log('hello3')

      if (onlyCheck) {
        console.log('hello4')
        // const tokenInSymbol = await tokenInContract?.callStatic.symbol(address)
        // const tokenoutSymbol = await tokenInContract?.callStatic.symbol(address)
        let _tokenInBalance = ethers.utils.parseUnits(
          tokenInBalance.toString(),
          tokenInDecimals
        )
        // let _tokenOutBalance = ethers.utils.parseUnits(
        //   amountOutprice,
        //   tokenOutDecimals
        // )
        return {
          // tokenInSymbol,
          // tokenoutSymbol,
          _tokenInBalance,
          amountOutprice
        }
      }
      console.log('hello5')

      if (!isEnoughBalance) {
        console.log('hello6')
          alert('Not enough balance you have')
        throw 'Not enough balance you have'
      }

      if (!onlyCheck) {
        console.log('hello7')
      const isPermit2Approved = await checkPermit2Approve(
        tokenIn,
        amountIn.toString()
      )

      if (isPermit2Approved === undefined) {
        console.log('isPermit2Approved error', isPermit2Approved)
        throw 'isPermit2Approved error'
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
      }
      console.log('checkSpenderSign-command Done', command)

      if (command) {
        inputs.push(command.encodedInput)
        commands = commands.concat(command.type.toString(16).padStart(2, '0'))
      }

      for (let i = 0; i < route?.route.length; i++) {

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
      return { commands, inputs, value: depositWETH }
      }

    } catch (error) {
      toast.update(id, {
        render: 'Approve Error',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
      console.log('chackBalanceAndAllwance-error-', error)
      return undefined
    }
  }
  return useMutation(checkSpenderAllowance)
}

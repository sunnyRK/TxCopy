import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { chainId, network_name } from '../common/constants'
import { toast } from 'react-toastify'
import {
  getAbiUsingExplorereUrl,
  getDeadline,
  getProvider,
  getSigner,
} from '../common/helper'
import { checkIfContractIsProxy } from '../common/helper'
import { UniversalRouter } from '../Uniswap/utils/constants'
import { useParseData } from './uniswap/useParseData'

type Props = {
  txHash: string
  onlyCheck: boolean
}

export function useUniversalRouter() {
  const { mutateAsync: checkSpenderAllowance } = useParseData()
  async function makeTx({ txHash, onlyCheck }: Props): Promise<any> {
    try {
      const provider = await getProvider()
      const signer = await getSigner()

      const txInfo = await provider?.getTransaction(txHash)
      if (txInfo?.chainId !== chainId) {
        toast.error('only polygon tx enable for now')
        toast.error(`select from: ${UniversalRouter}`)
        throw 'wrong chainId'
      }

      const receipt: any = await provider?.getTransactionReceipt(txHash)
      console.log('Uni-receipt', receipt)

      if (receipt.to !== UniversalRouter) {
        toast.error('only universal router address tx enables')
        toast.error(`select from: ${UniversalRouter}`)
        throw 'Tx failed'
      }

      let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to)

      const { isProxy, currentImplAddress }: any = await checkIfContractIsProxy(
        abi,
        receipt.to
      )
      const toAddress = currentImplAddress
      if (isProxy) {
        abi = await getAbiUsingExplorereUrl(network_name, toAddress)
      }
      let abiInterface = new ethers.utils.Interface(abi)

      let decodedInput = abiInterface.parseTransaction({
        data: txInfo.data,
        value: txInfo.value,
      })
      console.log('Uni-decodedInput: ', decodedInput)

      // shrink abi & abiInterface to specific function only
      abi = [`function` + ' ' + decodedInput.signature]
      abiInterface = new ethers.utils.Interface(abi)

      if (!onlyCheck) {
        const inputs = await checkSpenderAllowance({ receipt, onlyCheck })
        console.log('Uni-inputs: ', inputs)

        if (!inputs?.commands && !inputs?.inputs) {
          throw 'Tx failed'
        }

        let datas
        if (decodedInput.args.length === 3) {
          const deadlines = await getDeadline(1800)
          datas = abiInterface.encodeFunctionData(decodedInput.name, [
            inputs?.commands,
            inputs?.inputs,
            deadlines,
          ])
        } else {
          datas = abiInterface.encodeFunctionData(decodedInput.name, [
            inputs?.commands,
            inputs?.inputs,
          ])
        }

        if (!datas || datas == '0x') {
          toast.error(`UniV3-Something went wrong.`)
          return
        }

        let copyTx
        copyTx = await signer?.sendTransaction({
          to: receipt.to,
          data: datas,
          value: inputs.value,
        })
        await copyTx?.wait()
        toast.success(`UniV3 Tx done successfully.`)
        console.log('UnicopyTx', copyTx)
      }
      return {
        txInfo: txInfo,
        txCallData: decodedInput,
      }
    } catch (error) {
      toast.error(`Univ3 Tx failed`)
      console.log('Uni-makeTx-Error: ', error)
    }
  }
  return useMutation(makeTx)
}

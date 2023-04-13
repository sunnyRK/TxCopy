import { ethers } from 'ethers'
import { checkIfContractIsProxy } from './utils/helper'
import { network_name } from '../common/constants'
import { toast } from 'react-toastify'
import {
  getAbiUsingExplorereUrl,
  getDeadline,
  getProvider,
  getSigner,
} from '../common/helper'
import { checkSpenderAllowance } from './utils/parseUniData'
import { parseEther } from 'ethers/lib/utils'

export const makeTx = async (txHash: string, onlycheck: any) => {
  try {
    console.log('Uni-txHash', txHash)
    const provider = await getProvider()
    const signer = await getSigner()

    if (!provider) return
    if (!signer) return

    const receipt: any = await provider.getTransactionReceipt(txHash)
    console.log('Uni-receipt', receipt)

    let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to)
    // console.log('Uni-abi', abi)

    const { isProxy, currentImplAddress }: any = await checkIfContractIsProxy(
      abi,
      receipt.to
    )
    const toAddress = currentImplAddress
    // console.log('Uni-toAddress', toAddress)

    if (isProxy) {
      abi = await getAbiUsingExplorereUrl(network_name, toAddress)
    }
    let abiInterface = new ethers.utils.Interface(abi)
    // console.log('Uni-abiInterface', abiInterface)

    const txInfo = await provider.getTransaction(txHash)
    // console.log('Uni-txInfo', txInfo)

    let decodedInput = abiInterface.parseTransaction({
      data: txInfo.data,
      value: txInfo.value,
    })
    console.log('Uni-decodedInput: ', decodedInput)

    // shrink abi & abiInterface to specific function only
    abi = [`function` + ' ' + decodedInput.signature]
    abiInterface = new ethers.utils.Interface(abi)

    // await generateRoute()

    const inputs = await checkSpenderAllowance(receipt, onlycheck)
    console.log('Uni-inputs: ', inputs)

    if (!inputs?.commands && !inputs?.inputs) return

    const deadlines = await getDeadline(1800)
    const datas = abiInterface.encodeFunctionData(decodedInput.name, [
      inputs?.commands,
      inputs?.inputs,
      deadlines,
    ])

    let copyTx
    if (!onlycheck) {
      copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
        value: inputs.value,
      })
      toast.success(`UniV3 Tx done successfully.`)
      console.log('UnicopyTx', copyTx)
    }
    return {
      txInfo: txInfo,
      txCallData: decodedInput,
    }
  } catch (error) {
    toast.error(`UniV3-Something went wrong.`)
    console.log('Uni-makeTx-Error: ', error)
  }
}

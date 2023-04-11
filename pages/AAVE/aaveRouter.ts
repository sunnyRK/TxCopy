import { ethers } from 'ethers'
import {
  getProvider,
  getSigner,
  getAbiUsingExplorereUrl,
  checkIfContractIsProxy,
  checkBalanceAndAllowance,
} from '../common/helper'
import { network_name } from '../common/constants'
import { toast } from 'react-toastify'

export const makeAaveTx = async (txHash: string, onlycheck: any) => {
  try {
    const provider = await getProvider()
    const signer = await getSigner()

    if (!provider) return
    if (!signer) return

    const receipt: any = await provider.getTransactionReceipt(txHash)
    console.log('receipt', receipt)

    let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to)
    const { isProxy, currentImplAddress }: any = await checkIfContractIsProxy(
      abi,
      receipt.to
    )
    const toAddress = currentImplAddress
    console.log('toAddress', toAddress.toString())

    if (isProxy) {
      abi = await getAbiUsingExplorereUrl(network_name, toAddress)
    }
    let abiInterface = new ethers.utils.Interface(abi)
    const txInfo = await provider.getTransaction(txHash)
    console.log('txInfo', txInfo)

    let decodedInput = abiInterface.parseTransaction({
      data: txInfo.data,
      value: txInfo.value,
    })
    console.log('decodedInput', decodedInput)

    // shrink abi & abiInterface to specific function only
    abi = [`function` + ' ' + decodedInput.signature]
    abiInterface = new ethers.utils.Interface(abi)
    console.log('Uni-abiInterface: ', abiInterface)

    await checkBalanceAndAllowance(receipt)

    const datas = abiInterface.encodeFunctionData(
      decodedInput.name,
      decodedInput.args
    )
    console.log('encodeData', datas)

    if (!onlycheck) {
      const copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
      })
      toast.success(`Tx done successfully.`)
      console.log('copyTx', copyTx)
    }
    return {
      txInfo: txInfo,
      txCallData: decodedInput,
    }
  } catch (error) {
    toast.error(`Something went wrong.`)
    console.log('makeAaveTx-error-', error)
  }
}

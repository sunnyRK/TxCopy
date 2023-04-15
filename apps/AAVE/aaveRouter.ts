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
  let decodedInput
  try {
    const provider = await getProvider()
    const signer = await getSigner()

    if (!provider) return
    if (!signer) return
    const address = await signer.getAddress()

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

    decodedInput = abiInterface.parseTransaction({
      data: txInfo.data,
      value: txInfo.value,
    })
    console.log('decodedInput', decodedInput)

    let inputParams: any = []
    for (let i = 0; i < decodedInput.args.length; i++) {
      if (decodedInput.args[i] === receipt.from) {
        inputParams[i] = address
      } else {
        inputParams[i] = decodedInput.args[i]
      }
    }
    console.log('inputParams', inputParams)

    // shrink abi & abiInterface to specific function only
    abi = [`function` + ' ' + decodedInput.signature]
    abiInterface = new ethers.utils.Interface(abi)
    console.log('Uni-abiInterface: ', abiInterface)

    if (!onlycheck) {
      await checkBalanceAndAllowance(receipt)

      const datas = abiInterface.encodeFunctionData(
        decodedInput.name,
        // decodedInput.args
        inputParams
      )
      console.log('encodeData', datas)

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
    if (decodedInput) {
      toast.error("You can't perform " + decodedInput?.name + ' operation')
    } else {
      toast.error(`Something went wrong. Please try again`)
    }
    console.log('makeAaveTx-error-', error)
  }
}

import { ethers, BigNumber, utils } from 'ethers'
import axios from 'axios'
import web3 from 'web3'
import { getImplementationAddress } from '@openzeppelin/upgrades-core'
import { parseEther, defaultAbiCoder } from 'ethers/lib/utils'
import { ETHERSCAN_API_KEY, POLYGON_ETHERSCAN_API_KEY } from '../keys'
import {
  getProvider,
  getSigner,
  getAbiUsingExplorereUrl,
  checkIfContractIsProxy,
  getErc20Contract,
} from '../common/helper'
import { network_name } from '../common/constants'
import { toast } from 'react-toastify'

export const makeAaveTx = async (txHash: string, onlycheck: any) => {
  try {
    toast.success(`Posted successfully.`)
    const provider = await getProvider()
    const signer = await getSigner()

    if (!provider) return
    if (!signer) return

    const receipt: any = await provider.getTransactionReceipt(txHash)
    console.log('receipt', receipt)

    let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to)
    const { isProxy, currentImplAddress }: any = await checkIfContractIsProxy(abi, receipt.to)
    const toAddress = currentImplAddress
    console.log('toAddress', toAddress.toString())

    if (isProxy) {
      abi = await getAbiUsingExplorereUrl(network_name, toAddress)
    }
    let abiInterface = new ethers.utils.Interface(abi)
    const txInfo = await provider.getTransaction(txHash)
    console.log('txInfo', txInfo)

    let decodedInput = abiInterface.parseTransaction({ data: txInfo.data, value: txInfo.value })
    console.log('decodedInput', decodedInput)
    console.log('decodedInput', decodedInput.args[1])

    // shrink abi & abiInterface to specific function only
    abi = [`function` + ' ' + decodedInput.signature]
    abiInterface = new ethers.utils.Interface(abi)
    console.log('Uni-abiInterface: ', abiInterface)

    await chackBalanceAndAllwance(receipt)

    const datas = abiInterface.encodeFunctionData(
      decodedInput.name,
      decodedInput.args
      // ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', '106000000', "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989", 0]
    )
    console.log('datas', datas)

    if (!onlycheck) {
      const copyTx = await signer.sendTransaction({
        to: receipt.to,
        data: datas,
      })
      console.log('copyTx', copyTx)
    }
    return {
      txInfo: txInfo,
      txCallData: decodedInput,
    }
  } catch (error) {
    console.log('makeAaveTx-error-', error)
  }
}

const chackBalanceAndAllwance = async (receipt: any) => {
  try {
    const sig = 'Transfer(address,address,uint256)'

    const bytess = utils.toUtf8Bytes(sig)
    console.log('bytess', bytess)

    const bytessAfterKeccak = utils.keccak256(bytess)
    console.log('bytessAfterKeccak', bytessAfterKeccak)

    for (let i = 0; i < receipt.logs.length; i++) {
      if (receipt.logs[i].topics[0] === bytessAfterKeccak) {
        console.log('\n')

        const contractAddress = receipt.logs[i].address.toString()

        console.log('EventHash: ', i, receipt.logs[i].topics[0])

        console.log('TokenAddress', receipt.logs[i].address.toString())

        const from = utils.defaultAbiCoder.decode(['address'], receipt.logs[i].topics[1])
        console.log('from', from.toString())
        console.log('receipt.from', receipt.from.toString())

        if (from.toString().toLowerCase() === receipt.from.toString().toLowerCase()) {
          console.log('from', from.toString())

          const to = utils.defaultAbiCoder.decode(['address'], receipt.logs[i].topics[2])
          console.log('to', to.toString())

          const value = utils.defaultAbiCoder.decode(['uint256'], receipt.logs[i].data)
          console.log('value', value.toString())

          const contract = await getErc20Contract(contractAddress)
          if (!contract) return

          const allowance = await contract.allowance(receipt.from, receipt.to)
          console.log('allowance', allowance.toString())

          const tokenBalance = await contract.balanceOf(receipt.from)
          console.log('tokenBalance', tokenBalance.toString())

          if (BigNumber.from(allowance).lt(value.toString())) {
            console.log('need allownace')
            const signer = await getSigner()
            if (!signer) return
            await contract.connect(signer).approve(receipt.to, BigNumber.from(value.toString()))
          }

          if (BigNumber.from(tokenBalance).lt(value.toString())) {
            console.log('not enough Balance')
            return
          }
        }
      }
    }
    console.log('\n')
  } catch (error) {
    console.log('chackBalanceAndAllwance-error-', error)
  }
}

import { useAppStore } from '@/apps/store/appStore'
import { ThirdwebSDK, useContract, useContractRead } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import erc20Abi from '../apps/common/abis/erc20.json'

type erc20Props = {
  _contractAddress: any
  _address: any
  _spender: any
}

export function Erc20TokenIn({
  _contractAddress,
  _address,
  _spender,
}: erc20Props) {
  const [erc20, setErc20] = useState<any>()
  const { setDecimalIn, setBalanceIn, setAllowanceIn } = useAppStore(
    (state) => state
  )

  // const {
  //   contract,
  //   isLoading: isContractLoading,
  //   error
  // } = useContract(_contractAddress)

  const {
    data: decimalData,
    isLoading: isDecimalLoading,
    error: decimalError,
    refetch: getDecimal,
  } = useContractRead(erc20, 'decimals')

  const {
    data: balanceOfData,
    isLoading: isBalanceOfLoading,
    error: balanceOfError,
    refetch: getBalanceOf,
  } = useContractRead(erc20, 'balanceOf', [_address])

  const {
    data: allowanceData,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch: getAllowance,
  } = useContractRead(erc20, 'allowance', [_address, _spender])

  const fetchErc20Data = async () => {
    try {
      const decimalData = await getDecimal()
      const balanceOfData = await getBalanceOf()
      const allownaceData = await getAllowance()
      console.log('fetchErc20DataIn...')
      console.log('decimalData: ', decimalData.data)
      console.log('balanceOfData: ', balanceOfData.data)
      console.log('allownaceData: ', allownaceData.data)
      setDecimalIn(decimalData.data)
      setBalanceIn(balanceOfData.data)
      setAllowanceIn(allownaceData.data)
    } catch (error) {
      console.log('fetchErc20Data-error', error)
    }
  }

  useEffect(() => {
    console.log('loading Erc20TokenIn', erc20, _contractAddress)
    // if (!isContractLoading && contract) {
    if (erc20) {
      console.log('inside Erc20TokenIn')
      fetchErc20Data()
    } else {
      console.log('not loaded yet Erc20TokenIn')
    }
  }, [erc20])

  useEffect(() => {
    const fetchContract = async () => {
      const sdk = new ThirdwebSDK('polygon')
      const contract = await sdk.getContract(_contractAddress, erc20Abi)
      if (contract) setErc20(contract)
    }
    fetchContract()
  }, [])

  if (!_contractAddress) return null

  return <></>
}

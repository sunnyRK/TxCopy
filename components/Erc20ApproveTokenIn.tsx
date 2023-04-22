import { useAppStore } from '@/apps/store/appStore'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { useEffect } from 'react'

type erc20ApproveProps = {
  _contractAddress: any
  _spender: any
  _amount: any
}

export function Erc20ApproveTokenIn({
  _contractAddress,
  _spender,
  _amount,
}: erc20ApproveProps) {
  const { contract, isLoading: isContractLoading } =
    useContract(_contractAddress)

  const { mutateAsync, isLoading: isContractWrite } = useContractWrite(
    contract,
    'approve'
  )

  const doApprove = async () => {
    try {
      await mutateAsync(_spender, _amount)
    } catch (error) {
      console.log('fetchErc20Data-error', error)
    }
  }

  useEffect(() => {
    console.log('loading Erc20ApproveTokenIn', contract)
    if (!isContractLoading && !isContractWrite && contract) {
      doApprove()
    } else {
      console.log('not loaded yet approve')
    }
  }, [isContractLoading, isContractWrite])

  if (!_contractAddress) return null

  return <></>
}

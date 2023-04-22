import { useAppStore } from '@/apps/store/appStore'
import { useContractRead } from '@thirdweb-dev/react'
import { useEffect } from 'react'

type permitProps = {
  _permitAddress: any
  _token: any
  _address: any
  _spender: any
}

export function PermitComponent({
  _permitAddress,
  _token,
  _address,
  _spender,
}: permitProps) {

  // console.log('_permitAddress++++', _permitAddress, _token, _address, _spender)

  const { 
    setPermit2Allowance, 
    setPermit2Expiry, 
    setpermit2Nonce 
  } = useAppStore((state) => state)

  const { data, isLoading, error, refetch } = useContractRead(
    _permitAddress,
    'allowance',
    [_address, _token, _spender]
  )

  const fetchPermitData = async () => {
    try {
      const allownaceData = await refetch()
      console.log('fetchPermitData...')
      console.log('fetchPermitData-allownaceData: ', allownaceData)
      setPermit2Allowance(allownaceData.data[0])
      setPermit2Expiry(allownaceData.data[1])
      setpermit2Nonce(allownaceData.data[2])
    } catch (error) {
      console.log('fetchPermitData-error', error)
    }
  }

  // useEffect(() => {
  //   console.log('fetchPermitData-contractType ', contractType)
  //   console.log('fetchPermitData-permitContract ', permitContract)
  //   console.log('!__pIsLoading', !__pIsLoading, permitContract, !contractTypeLoading)
  //   if (!__pIsLoading && permitContract && !contractTypeLoading) {
  //     console.log('fetchPermitData-loading ')
  //     fetchPermitData()
  //   } else {
  //     console.log('fetchPermitData-not loaded yet, permitData')
  //   }
  // }, [__pIsLoading, contractTypeLoading, permitContract])

  useEffect(() => {
    console.log('fetchPermitData-_permitAddress ', _permitAddress)
    if (_permitAddress) {
      console.log('fetchPermitData-loading ')
      fetchPermitData()
    } else {
      console.log('fetchPermitData-not loaded yet, permitData')
    }
  }, [_permitAddress])

  if (!_permitAddress) return null

  return <></>
}

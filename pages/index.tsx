import {
  Button,
  Header,
  Icon,
  Input,
  Label,
  List,
  Message,
} from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { makeAaveTx } from '../apps/AAVE/aaveRouter'
import { useUniversalRouter } from '../apps/hooks/useUniversalRouter'
import {
  useAddress,
  useNetworkMismatch,
  useNetwork,
  ConnectWallet,
  useSwitchChain,
  useConnect,
  useContract,
  useContractRead,
  useContractType,
  useContractWrite,
} from '@thirdweb-dev/react'
import { getProvider } from '../apps/common/helper'
import { Permit2Address, UniversalRouter } from '../apps/Uniswap/utils/constants'
import { toast } from 'react-toastify'
import { usePriceHook } from '@/apps/hooks/commonHooks/usePriceHook'
import { BigNumber } from 'ethers'
import { useAppStore } from '@/apps/store/appStore'

const contractAddresses: any = [
  '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf', // Aave: Lending Pool V2 Polygon
  '0xF25212E676D1F7F89Cd72fFEe66158f541246445', // Compound Polygon
]

type permitProps = {
  _permitAddress: any
  _token: any
  _address: any
  _spender: any
}

type erc20Props = {
  _contractAddress: any
  _address: any
  _spender: any
}

function PermitComponent({ _permitAddress, _token, _address, _spender }: permitProps) {
  const { setPermit2Allowance } = useAppStore((state) => state)  
  const {
    data,
    isLoading,
    error,
    refetch
  } = useContractRead(_permitAddress, 'allowance', [_address, _token, _spender])

  const fetchPermitData = async () => {
    try {
      const allownaceData = await refetch()
      console.log('fetchPermitData...')
      console.log('fetchPermitData-allownaceData: ', allownaceData)
      setPermit2Allowance(allownaceData.data[0])
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

function Erc20TokenIn({ _contractAddress, _address, _spender }: erc20Props) {
  const { 
    tokenIn, 
    setDecimalIn, 
    setBalanceIn, 
    setAllowanceIn 
  } = useAppStore((state) => state)

  const { 
    contract, 
    isLoading: isContractLoading, 
    error 
  } = useContract(_contractAddress)

  const {
    data: decimalData,
    isLoading: isDecimalLoading,
    error: decimalError,
    refetch: getDecimal,
  } = useContractRead(contract, 'decimals')

  const {
    data: balanceOfData,
    isLoading: isBalanceOfLoading,
    error: balanceOfError,
    refetch: getBalanceOf
  } = useContractRead(contract, 'balanceOf', [_address])

  const {
    data: allowanceData,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch: getAllowance
  } = useContractRead(contract, 'allowance', [_address, _spender])

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
    console.log('loading')
    if (!isContractLoading && contract) {
      fetchErc20Data()
    } else {
      console.log('not loaded yet')
    }
  }, [isContractLoading])

  if (!_contractAddress) return null

  return <></>
}

function Erc20TokenOut({ _contractAddress, _address, _spender }: erc20Props) {
  const { 
    tokenOut, 
    setDecimalOut, 
    setBalanceOut, 
    setAllowanceOut 
  } = useAppStore((state) => state)

  const { 
    contract, 
    isLoading: isContractLoading, 
    error 
  } = useContract(_contractAddress)

  const {
    data: decimalData,
    isLoading: isDecimalLoading,
    error: decimalError,
    refetch: getDecimal,
  } = useContractRead(contract, 'decimals')

  const {
    data: balanceOfData,
    isLoading: isBalanceOfLoading,
    error: balanceOfError,
    refetch: getBalanceOf
  } = useContractRead(contract, 'balanceOf', [_address])

  const {
    data: allowanceData,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch: getAllowance
  } = useContractRead(contract, 'allowance', [_address, _spender])

  const fetchErc20Data = async () => {
    try {
      const decimalData = await getDecimal()
      const balanceOfData = await getBalanceOf()
      const allownaceData = await getAllowance()
      console.log('fetchErc20DataOut...')
      console.log('decimalData: ', decimalData.data)
      console.log('balanceOfData: ', balanceOfData.data)
      console.log('allownaceData: ', allownaceData.data)
      setDecimalOut(decimalData.data)
      setBalanceOut(balanceOfData.data)
      setAllowanceOut(allownaceData.data)
    } catch (error) {
      console.log('fetchErc20Data-error', error)
    }
  }

  useEffect(() => {
    console.log('loading')
    if (!isContractLoading && contract) {
      fetchErc20Data()
    } else {
      console.log('not loaded yet')
    }
  }, [isContractLoading])

  if (!_contractAddress) return null

  return <></>
}

type erc20ApproveProps = {
  _contractAddress: any
  _spender: any
  _amount: any
}
function Erc20ApproveTokenIn({ _contractAddress, _spender, _amount }: erc20ApproveProps) {
  const { 
    tokenIn, 
    setDecimalIn, 
    setBalanceIn, 
    setAllowanceIn 
  } = useAppStore((state) => state)

  const { 
    contract, 
    isLoading: isContractLoading
  } = useContract(_contractAddress)

  const { 
    mutateAsync, 
    isLoading,
  } = useContractWrite(
    contract, 
    "approve"
  );

  const doApprove = async () => {
    try {
      await mutateAsync(_spender, _amount)
    } catch (error) {
      console.log('fetchErc20Data-error', error)
    }
  }

  useEffect(() => {
    console.log('loading')
    if (!isContractLoading && contract) {
      doApprove()
    } else {
      console.log('not loaded yet')
    }
  }, [isContractLoading])

  if (!_contractAddress) return null

  return <></>
}



export default function Home() {
  const switchChain = useSwitchChain()
  const address = useAddress() // Detect the connected address
  const isOnWrongNetwork = useNetworkMismatch() // Detect if the user is on the wrong network
  // @ts-ignore
  const [, switchNetwork] = useNetwork()

  const [tokenIn, setTokenIn] = useState<any>('')
  const [tokenOut, setTokenOut] = useState<any>('')
  const [amountIn, setAmountIn] = useState<any>('')
  const [isWrapEth, setIsWrapEth] = useState<any>(false)
  const [isUnWrapEth, setIsUnWrapEth] = useState<any>(false)
  const [permit2, setPermitContract] = useState<any>()

  // const [balanceTokenIn, setBalanceTokenIn] = useState<any>('')
  // const [decimalsTokenIn, setDecimalsTokenIn] = useState<any>('')
  // const [allowanceTokenIn, setAllowanceTokenIn] = useState<any>('')
  // const [balanceTokenOut, setBalanceTokenOut] = useState<any>('')
  // const [decimalsTokenOut, setDecimalsTokenOut] = useState<any>('')
  // const [allowanceTokenOut, setAllowanceTokenOut] = useState<any>('')

  const [confirmDisabled, setCofirmDisabled] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [txhash, setTxhash] = useState('')
  const [data, setData] = useState()
  const [chainId, setChainId] = useState('')
  const [contractAddress, setContractAddress] = useState()
  const [functionName, setFunctionName] = useState()
  const [signature, setFunctionSignature] = useState()
  const [tx, setCopyTrade] = useState()
  const [isEnoughBalance, setEnoghBalance] = useState<any>(undefined)

  const { mutateAsync: makeTx } = useUniversalRouter()
  const { mutateAsync: generateRoute } = usePriceHook()

  const { permit2Allowance }: any = useAppStore((state) => state)
  const zTokenIn: any = useAppStore((state) => state.tokenIn)
  const zTokenOut: any = useAppStore((state) => state.tokenOut)
  const zDecimalIn: any = useAppStore((state) => state.decimalIn)
  const zDecimalOut: any = useAppStore((state) => state.decimalOut)
  const zbalanceIn: any = useAppStore((state) => state.balanceIn)
  const zbalanceOut: any = useAppStore((state) => state.balanceIn)
  const zallowIn: any = useAppStore((state) => state.allowanceIn)
  const zallowOut: any = useAppStore((state) => state.allowanceOut)
  const zpermitAllowOut: any = useAppStore((state) => state.permit2Allowance)

  // useEffect(() => {
  //   if (tokenIn && tokenOut) {
  //     const fetchData = async () => {
  //       const decimalsIn = await tokenIn.callStatic.decimals()
  //       const balanceOfIn = await tokenIn.callStatic.balanceOf(
  //         '0xb50685c25485CA8C520F5286Bbbf1d3F216D6989'
  //       )
  //       const allowanceIn = await tokenIn.callStatic.allowance(
  //         '0xb50685c25485CA8C520F5286Bbbf1d3F216D6989',
  //         '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5'
  //       )
  //       setBalanceTokenIn(balanceOfIn)
  //       setDecimalsTokenIn(decimalsIn)
  //       setAllowanceTokenIn(allowanceIn)
  //       console.log('useEffect-tokenIn', decimalsIn, balanceOfIn, allowanceIn)

  //       const decimalsOut = await tokenOut.callStatic.decimals()
  //       const balanceOfOut = await tokenOut.callStatic.balanceOf(
  //         '0xb50685c25485CA8C520F5286Bbbf1d3F216D6989'
  //       )
  //       const allowanceOut = await tokenOut.callStatic.allowance(
  //         '0xb50685c25485CA8C520F5286Bbbf1d3F216D6989',
  //         '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5'
  //       )
  //       setBalanceTokenOut(balanceOfOut)
  //       setDecimalsTokenOut(decimalsOut)
  //       setAllowanceTokenOut(allowanceOut)

  //       console.log(
  //         'useEffect-tokenIn',
  //         decimalsOut,
  //         balanceOfOut,
  //         allowanceOut
  //       )
  //     }
  //     fetchData()
  //   }
  // }, [tokenIn, tokenOut])

  useEffect(() => {
    if (zDecimalIn && zDecimalOut && zbalanceIn) {
      const fetchData = async () => {
        if (BigNumber.from(zbalanceIn).gt(0)) {
          if (BigNumber.from(amountIn).gt(0)) {
              const route: any = await generateRoute({
                tokenIn: tokenIn.address,
                tokenOut: tokenOut.address,
                value: amountIn.toString(),
                type: 'exactIn',
                decimalIn: zDecimalIn,
                decimalOut: zDecimalOut,
              })
              console.log('route-index', route)
            if (!BigNumber.from(zbalanceIn.toString()).gte(BigNumber.from(amountIn))) {
              setEnoghBalance(false)
            } else {
              setEnoghBalance(true)
            }
          }
        } else {
          console.log('zero balance you have')
        }
      }
      fetchData()
    }
  }, [zDecimalIn, zDecimalOut, zbalanceIn])

  useEffect(() => {
    if (isEnoughBalance) {
      const fetchData = async () => {
        try {
          if (!zallowIn) {
            
          }
        } catch (error) {
          console.log('error for approve')
        }
      }
      fetchData()
    }
  }, [isEnoughBalance])

  useEffect(() => {
    if (permit2Allowance) {
      console.log('z++1-zDecimalIn', zDecimalIn);
      console.log('z++1-zDecimalOut',zDecimalOut);
      console.log('z++1-zbalanceIn',zbalanceIn);
      console.log('z++1-zbalanceOut',zbalanceOut);
      console.log('z++1-zallowIn',zallowIn);
      console.log('z++1-zallowOut',zallowOut);
      console.log('z++1-zpermitAllowOut',zpermitAllowOut);
    } else {
      console.log('z++1 not yet', zallowIn);
    }
  }, [permit2Allowance])

  const handleInputForUniswap = async (_txhash: any, _isInput: boolean) => {
    try {
      if (_isInput) {
        resetInputs()
      }
      if (!_txhash) {
        console.log('txhash is invalid')
        setCofirmDisabled(false)
        return
      }

      if (!_isInput) {
        setConfirmLoading(true)
      } else {
        setCofirmDisabled(true)
      }

      setTxhash(_txhash)

      const provider = await getProvider()
      if (!provider) return

      const receipt: any = await provider.getTransactionReceipt(_txhash)
      console.log('receipt-', receipt)

      let txdata: any
      if (receipt.to === UniversalRouter) {
        console.log('UniTrade')
        txdata = await makeTx({
          txHash: _txhash,
          onlyCheck: _isInput ? true : false,
          setTokenIn,
          setTokenOut,
          setAmountIn,
          setIsWrapEth,
          setIsUnWrapEth,
          setPermitContract
        })
      } else if ((await contractAddresses).includes(receipt.to)) {
        console.log('OtherTrade')
        txdata = await makeAaveTx(_txhash, _isInput ? true : false)
      } else {
        toast.error('This Trade is not supported')
        if (!_isInput) setConfirmLoading(false)
        else setCofirmDisabled(false)
        return
      }

      if (!_isInput) {
        setConfirmLoading(false)
      } else {
        setCofirmDisabled(false)
      }

      if (!txdata) {
        return
      }

      const { txInfo, txCallData } = txdata
      if (!txInfo || !txCallData) return

      setChainId(getChainId(txInfo.chainId))
      setContractAddress(txInfo.to)
      setFunctionName(txCallData.name)
      setFunctionSignature(txCallData.signature)
      setData(txCallData)
    } catch (error) {
      console.log('handleInput-error', error)
      if (!_isInput) {
        setConfirmLoading(false)
      } else {
        setCofirmDisabled(false)
      }
    }
  }

  const resetInputs = () => {
    setTokenIn('')
    setTokenOut('')
    setAmountIn('')
    setIsWrapEth('')
    setIsUnWrapEth('')
    // setBalanceTokenIn(undefined)
    // setDecimalsTokenIn(undefined)
    // setAllowanceTokenIn(undefined)
    // setBalanceTokenOut(undefined)
    // setDecimalsTokenOut(undefined)
    // setAllowanceTokenOut(undefined)
    setChainId('')
    setContractAddress(undefined)
    setFunctionName(undefined)
    setFunctionSignature(undefined)
    setData(undefined)
  }

  const getChainId = (chainId: number) => {
    switch (chainId) {
      case 137:
        return 'Polygon'
      case 1:
        return 'Mainnet'
      case 10:
        return 'Optimism'
      case 42161:
        return 'Arbitrum'
      case 80001:
        return 'Mumbai'
      default:
        return 'Unknown'
    }
  }

  // const handleInputForUniswap = async (_txhash: any, _isInput: boolean) => {
  //   try {

  //     if (_isInput) {
  //       setTokenIn('')
  //       setTokenOut('')
  //       setAmountIn('')
  //       setIsWrapEth('')
  //       setIsUnWrapEth('')

  //       setBalanceTokenIn(undefined)
  //       setDecimalsTokenIn(undefined)
  //       setAllowanceTokenIn(undefined)

  //       setBalanceTokenOut(undefined)
  //       setDecimalsTokenOut(undefined)
  //       setAllowanceTokenOut(undefined)

  //       setChainId('')
  //       setContractAddress(undefined)
  //       setFunctionName(undefined)
  //       setFunctionSignature(undefined)
  //       setData(undefined)
  //     }

  //     if (!_txhash) {
  //       console.log('txhash is invalid')
  //       setCofirmDisabled(false)

  //       return
  //     }
  //     if (!_isInput) setConfirmLoading(true)
  //     else setCofirmDisabled(true)
  //     setTxhash(_txhash)

  //     const provider = await getProvider()
  //     if (!provider) return

  //     const receipt: any = await provider.getTransactionReceipt(_txhash)
  //     console.log('receipt-', receipt)

  //     let txdata: any
  //     if (receipt.to === UniversalRouter) {
  //       console.log('UniTrade')
  //       txdata = await makeTx({
  //         txHash: _txhash,
  //         onlyCheck: _isInput ? true : false,
  //         setTokenIn,
  //         setTokenOut,
  //         setAmountIn,
  //         setIsWrapEth,
  //         setIsUnWrapEth
  //       })
  //     } else if ((await contractAddresses).includes(receipt.to)) {
  //       console.log('OtherTrade')
  //       txdata = await makeAaveTx(
  //         _txhash,
  //         _isInput ? true : false,
  //       )
  //     } else {
  //       toast.error('This Trade is not supported')
  //       if (!_isInput) setConfirmLoading(false)
  //       else setCofirmDisabled(false)
  //       return
  //     }
  //     if (!_isInput) setConfirmLoading(false)
  //     else setCofirmDisabled(false)
  //     if (!txdata) {
  //       return
  //     }
  //     const txInfo = txdata.txInfo
  //     const txCallData = txdata.txCallData
  //     if (!txInfo) return
  //     if (!txCallData) return

  //     if (txInfo.chainId == 137) {
  //       setChainId('Polygon')
  //     } else if (txInfo.chainId == 1) {
  //       setChainId('Mainnet')
  //     } else if (txInfo.chainId == 10) {
  //       setChainId('Optimism')
  //     } else if (txInfo.chainId == 42161) {
  //       setChainId('Arbitrum')
  //     } else if (txInfo.chainId == 80001) {
  //       setChainId('Mumbai')
  //     } else {
  //       setChainId('Unknown')
  //     }
  //     setContractAddress(txInfo.to)
  //     setFunctionName(txCallData.name)
  //     setFunctionSignature(txCallData.signature)
  //     setData(txCallData)
  //   } catch (error) {
  //     console.log('handleInput-error', error)
  //     if (!_isInput) setConfirmLoading(false)
  //     else setCofirmDisabled(false)
  //   }
  // }

  return (
    <>
      <div
        style={{
          margin: '100px',
        }}
      >
        {tokenIn.address && 
          <Erc20TokenIn 
            _contractAddress={tokenIn.address} 
            _address={address}
            _spender={Permit2Address}
          />
        }

        {tokenOut.address && 
          <Erc20TokenOut 
            _contractAddress={tokenOut.address} 
            _address={address}
            _spender={Permit2Address}
          />
        }

        {tokenIn.address && permit2 && 
          <PermitComponent
            _permitAddress={permit2} 
            _token={tokenIn.address} 
            _address={address}
            _spender={UniversalRouter}
          />
        }

        <Header as="h3" textAlign="left">
          {isOnWrongNetwork ? (
            <Button color="red" onClick={() => switchNetwork?.(137)}>
              Switch Network
            </Button>
          ) : (
            <ConnectWallet theme="light" btnTitle="Connect Wallet" />
          )}
        </Header>
        <Message>
          <Message.Header>CopyTrade For Univ3 Universal Router</Message.Header>
        </Message>
        <Input
          fluid
          icon="search"
          placeholder="Paste TxHash"
          onChange={(e: any) => handleInputForUniswap(e.target.value, true)}
          style={{
            height: '50px',
          }}
        >
          <input />
          <Button
            disabled={confirmDisabled}
            loading={confirmLoading}
            style={{
              marginLeft: '5px',
              height: '50px',
            }}
            color="blue"
            onClick={(e: any) => handleInputForUniswap(txhash, false)}
          >
            Confirm Tx
          </Button>
        </Input>

        {tx && <a href={`{https://polygonscan.com/tx/${tx}}`}>View Tx: {tx}</a>}

        <Message info>
          <h2>
            Transaction, Contract and network metadata for trade you want to
            perform
          </h2>

          <List
            divided
            selection
            style={{ marginRight: '20%', wordWrap: 'break-word' }}
          >
            <List.Item>
              <Label color="green" horizontal>
                Network
              </Label>
              <span style={{ color: 'black' }}>{chainId}</span>
            </List.Item>
            <List.Item>
              <Label color="green" horizontal>
                Contract Address
              </Label>
              <span style={{ color: 'black' }}>{contractAddress}</span>
            </List.Item>
            <List.Item>
              <Label color="green" horizontal>
                Function Name
              </Label>
              <span style={{ color: 'black' }}>{functionName}</span>
            </List.Item>
            <List.Item>
              <Label color="green" horizontal>
                Function Signature
              </Label>
              <span style={{ color: 'black' }}>{signature}</span>
            </List.Item>

            <h2>Input Parameters</h2>

            {/* @ts-ignore */}
            {data?.args &&
              // @ts-ignore
              data.args.map((key: any, index: any) => {
                return (
                  <>
                    <List.Item key={index}>
                      <Label color="blue" horizontal>
                        {/* @ts-ignore */}
                        {data?.functionFragment?.inputs[index].name}
                      </Label>
                      <span style={{ color: 'black' }}>{key.toString()}</span>
                    </List.Item>
                  </>
                )
              })}
          </List>
        </Message>

        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '16px',
            fontSize: '18px',
            marginRight: '20px',
            marginBottom: '20px',
          }}
        >
          <a href="https://twitter.com/RadadiyaSunny" target="_blank">
            <Icon name="twitter"></Icon> sunnyrk.eth
          </a>
        </div>
      </div>
    </>
  )
}

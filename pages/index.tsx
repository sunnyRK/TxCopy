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
  useSwitchChain
} from '@thirdweb-dev/react'
import { getProvider } from '../apps/common/helper'
import {
  Permit2Address,
  UniversalRouter,
} from '../apps/Uniswap/utils/constants'
import { toast } from 'react-toastify'
import { usePriceHook } from '@/apps/hooks/commonHooks/usePriceHook'
import { BigNumber } from 'ethers'
import { useAppStore } from '@/apps/store/appStore'
import { PermitComponent } from '@/components/PermitComponent'
import { Erc20TokenOut } from '@/components/Erc20TokenOut'
import { Erc20TokenIn } from '@/components/Erc20TokenIn'
import { Erc20ApproveTokenIn } from '@/components/Erc20ApproveTokenIn'
import { signTx } from '@/apps/Uniswap/utils/helper'
import { useParseData, useParseData2 } from '@/apps/hooks/uniswap/useParseData'

const contractAddresses: any = [
  '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf', // Aave: Lending Pool V2 Polygon
  '0xF25212E676D1F7F89Cd72fFEe66158f541246445', // Compound Polygon
]

export default function Home() {
  const switchChain = useSwitchChain()
  const address = useAddress() // Detect the connected address
  const isOnWrongNetwork = useNetworkMismatch() // Detect if the user is on the wrong network
  // @ts-ignore
  const [, switchNetwork] = useNetwork()

  // const [tokenIn, setTokenIn] = useState<any>()
  // const [tokenOut, setTokenOut] = useState<any>()
  const [amountIn, setAmountIn] = useState<any>()
  const [isWrapEth, setIsWrapEth] = useState<any>(false)
  const [isUnWrapEth, setIsUnWrapEth] = useState<any>(false)
  const [permit2, setPermitContract] = useState<any>()

  const [confirmDisabled, setCofirmDisabled] = useState<any>(false)
  const [confirmLoading, setConfirmLoading] = useState<any>(false)
  const [txhash, setTxhash] = useState<any>()
  const [data, setData] = useState<any>()
  const [chainId, setChainId] = useState<any>()
  const [contractAddress, setContractAddress] = useState<any>()
  const [functionName, setFunctionName] = useState<any>()
  const [signature, setFunctionSignature] = useState<any>()
  const [tx, setCopyTrade] = useState<any>()
  const [isEnoughBalance, setEnoghBalance] = useState<any>(undefined)

  const [routes, setRoute] = useState<any>()
  const [isNeedApprove, setNeedApprove] = useState<any>(false)
  const [isNeedPermitApprove, setNeedPermitApprove] = useState<any>(false)

  const { mutateAsync: makeTx } = useUniversalRouter()
  const { mutateAsync: generateRoute } = usePriceHook()

  const { 
    permit2Allowance,
    tokenIn,
    tokenOut,
    setTokenIn,
    setTokenOut,
    setDecimalIn,
    setDecimalOut,
    setBalanceIn,
    setBalanceOut,
    setAllowanceIn,
    setAllowanceOut,
    setPermit2Allowance,
    setPermit2Expiry,
    setpermit2Nonce,
  }: any = useAppStore((state) => state)

  const zTokenIn: any = useAppStore((state) => state.tokenIn)
  const zTokenOut: any = useAppStore((state) => state.tokenOut)
  const zDecimalIn: any = useAppStore((state) => state.decimalIn)
  const zDecimalOut: any = useAppStore((state) => state.decimalOut)
  const zbalanceIn: any = useAppStore((state) => state.balanceIn)
  const zbalanceOut: any = useAppStore((state) => state.balanceIn)
  const zallowIn: any = useAppStore((state) => state.allowanceIn)
  const zallowOut: any = useAppStore((state) => state.allowanceOut)
  const zpermitAllowOut: any = useAppStore((state) => state.permit2Allowance)
  const zpermitExpiry: any = useAppStore((state) => state.expiry)
  const zpermitNonce: any = useAppStore((state) => state.nonce)

  const { mutateAsync: checkSpenderAllowance } = useParseData2()

  useEffect(() => {
    console.log('useEffect called-1')
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
            setRoute(route)
            if (
              !BigNumber.from(zbalanceIn.toString()).gte(
                BigNumber.from(amountIn)
              )
            ) {
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
    console.log('useEffect called-2')
    if (isEnoughBalance && routes) {
      console.log('isEnoughBalance', isEnoughBalance)
      const fetchData = async () => {
        try {
          if (zallowIn) {
            if (
              BigNumber.from(zallowIn).lt(BigNumber.from(amountIn.toString()))
            ) {
              setNeedApprove(true)
            }
          }
          if (zpermitAllowOut) {
            console.log('Permit zpermitAllowOut = ', zpermitAllowOut.toString())
            console.log('Permit amountIn = ', amountIn.toString())
            let commands = '0x'
            let inputs: any = []
            if (
              BigNumber.from(zpermitAllowOut).lt(
                BigNumber.from(amountIn.toString())
              )
            ) {
              const command = await signTx(
                tokenIn.address,
                UniversalRouter,
                amountIn,
                zpermitNonce
              )
              console.log('Permit command = ', command)
              if (command === undefined) {
                throw 'checkSpenderSign error'
              }

              if (command) {
                inputs.push(command.encodedInput)
                commands = commands.concat(
                  command.type.toString(16).padStart(2, '0')
                )
              }
            }

            await checkSpenderAllowance({
              route: routes,
              amountIn,
              tokenInDecimals: zDecimalIn,
              tokenOutDecimals: zDecimalOut,
              isUnWrapEth,
              isWrapEth,
              commands,
              inputs,
            })
          }
        } catch (error) {
          console.log('error for approve')
        }
      }
      fetchData()
    }
  }, [isEnoughBalance])

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
          setAmountIn,
          setIsWrapEth,
          setIsUnWrapEth,
          setPermitContract,
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
    setAmountIn(null)
    setIsWrapEth(null)
    setIsUnWrapEth(null)
    setChainId(null)
    setContractAddress(null)
    setFunctionName(null)
    setFunctionSignature(null)
    setData(null)

    setTokenIn()
    setTokenOut()
    setDecimalIn()
    setDecimalOut()
    setBalanceIn()
    setBalanceOut()
    setAllowanceIn()
    setAllowanceOut()
    setPermit2Allowance()
    setPermit2Expiry()
    setpermit2Nonce()
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

  return (
    <>
      <div
        style={{
          margin: '100px',
        }}
      >
        {tokenIn && (
          <Erc20TokenIn
            _contractAddress={tokenIn.address}
            _address={address}
            _spender={Permit2Address}
          />
        )}

        {tokenOut && (
          <Erc20TokenOut
            _contractAddress={tokenOut.address}
            _address={address}
            _spender={Permit2Address}
          />
        )}

        {tokenIn && permit2 && (
          <PermitComponent
            _permitAddress={permit2}
            _token={tokenIn.address}
            _address={address}
            _spender={UniversalRouter}
          />
        )}

        {isNeedApprove && (
          <Erc20ApproveTokenIn
            _contractAddress={tokenIn.address}
            _spender={Permit2Address}
            _amount={amountIn}
          />
        )}

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

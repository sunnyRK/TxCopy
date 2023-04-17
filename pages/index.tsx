import { Button, Header, Icon, Input, Label, List, Message, } from 'semantic-ui-react'
import { useState } from 'react'
import { makeAaveTx } from '../apps/AAVE/aaveRouter'
import { useUniversalRouter } from '../apps/hooks/useUniversalRouter'
import {
  useAddress,
  useNetworkMismatch,
  useNetwork,
  ConnectWallet,
  useSwitchChain,
} from '@thirdweb-dev/react'
import { getProvider } from '../apps/common/helper'
import { UniversalRouter } from '../apps/Uniswap/utils/constants'
import { toast } from 'react-toastify'

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

  const [confirmDisabled, setCofirmDisabled] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [txhash, setTxhash] = useState('')
  const [data, setData] = useState()
  const [chainId, setChainId] = useState('')
  const [contractAddress, setContractAddress] = useState<Promise<any>>()
  const [functionName, setFunctionName] = useState()
  const [signature, setFunctionSignature] = useState()
  const [tx, setCopyTrade] = useState()
  const { mutateAsync: makeTx } = useUniversalRouter()

  const handleInputForUniswap = async (_txhash: any, _isInput: boolean) => {
    try {

      if (_isInput) {
        setChainId('')
        setContractAddress(undefined)
        setFunctionName(undefined)
        setFunctionSignature(undefined)
        setData(undefined)
      }

      if (!_txhash) {
        console.log('txhash is invalid')
        setCofirmDisabled(false)

        return
      }
      if (!_isInput) setConfirmLoading(true)
      else setCofirmDisabled(true)
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
        })
      } else if ((await contractAddresses).includes(receipt.to)) {
        console.log('OtherTrade')
        txdata = await makeAaveTx(
          _txhash, 
          _isInput ? true : false,
        )
      } else {
        toast.error('This Trade is not supported')
        if (!_isInput) setConfirmLoading(false)
        else setCofirmDisabled(false)
        return
      }
      if (!_isInput) setConfirmLoading(false)
      else setCofirmDisabled(false)
      if (!txdata) {
        return
      }
      const txInfo = txdata.txInfo
      const txCallData = txdata.txCallData
      if (!txInfo) return
      if (!txCallData) return

      if (txInfo.chainId == 137) {
        setChainId('Polygon')
      } else if (txInfo.chainId == 1) {
        setChainId('Mainnet')
      } else if (txInfo.chainId == 10) {
        setChainId('Optimism')
      } else if (txInfo.chainId == 42161) {
        setChainId('Arbitrum')
      } else if (txInfo.chainId == 80001) {
        setChainId('Mumbai')
      } else {
        setChainId('Unknown')
      }
      setContractAddress(txInfo.to)
      setFunctionName(txCallData.name)
      setFunctionSignature(txCallData.signature)
      setData(txCallData)
    } catch (error) {
      console.log('handleInput-error', error)
      if (!_isInput) setConfirmLoading(false)
      else setCofirmDisabled(false)
    }
  }

  return (
    <>
      <div
        style={{
          margin: '100px',
        }}
      >
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

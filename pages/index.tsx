import { Button, Input, Label, List, Message } from 'semantic-ui-react'
import { useState } from 'react'
import { makeTx } from './Uniswap/UniversalRouter'
import { makeAaveTx } from './AAVE/aaveRouter'

export default function Home() {
  const [txhash, setTxhash] = useState('')
  const [data, setData] = useState()
  const [chainId, setChainId] = useState('')
  const [contractAddress, setContractAddress] = useState()
  const [functionName, setFunctionName] = useState()
  const [signature, setFunctionSignature] = useState()
  const [tx, setCopyTrade] = useState()

  const handleRecieptForUniswap = async () => {
    try {
      // const { txInfo, txCallData, copyTx }: any =
      await makeTx(txhash, false)
      // setCopyTrade(copyTx);
    } catch (error) {
      console.log('handleReciept-error', error)
    }
  }

  const handleInputForUniswap = async (_txhash: any) => {
    try {
      console.log('_txhash', _txhash)
      if (!_txhash) return
      setTxhash(_txhash)
      const { txInfo, txCallData }: any = await makeTx(_txhash, true)
      console.log('txCallData', txCallData.args)

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
    }
  }

  const handleRecieptForAAVE = async () => {
    try {
      await makeAaveTx(txhash, false)
    } catch (error) {
      console.log('handleReciept-error', error)
    }
  }

  const handleInputForAAVE = async (_txhash: any) => {
    try {
      if (!_txhash) return
      console.log('txhash: ', _txhash)

      setTxhash(_txhash)

      const { txInfo, txCallData }: any = await makeAaveTx(_txhash, true)
      console.log('txCallData', txCallData.args)

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
    }
  }

  return (
    <>
      <div
        style={{
          margin: '100px',
        }}
      >
        <Message>
          <Message.Header>CopyTrade For Univ3</Message.Header>
        </Message>
        {/* <h4>
          Uniswap:
          0xbdb2a51f0535dcd14e555825f5378d06165fb45109b6cd6cf41e49b7b87e5dfc
          0xad896387533d3e718922d6e584b10a9429cdf633b141841df7ac422f2271ac37
          0xb7974cad68110635e39319523c30a10b990b37a902716636f855683597a3ded5
        </h4> */}
        <Input
          fluid
          icon="search"
          placeholder="Paste TxHash"
          onChange={(e: any) => handleInputForUniswap(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button color="blue" onClick={handleRecieptForUniswap}>
            Confirm Tx
          </Button>
        </div>

        {tx && <a href={`{https://polygonscan.com/tx/${tx}}`}>View Tx: {tx}</a>}

        <h2>PasteHash - CopyTrade</h2>
        {/* <h4>
          Compound:
          0x52819a3aca9fd842d63adcfb5cc628dc097e01e11a9e9d99370a81ea3627bdb0
        </h4> */}
        <Input
          fluid
          icon="search"
          placeholder="Paste TxHash"
          onChange={(e: any) => handleInputForAAVE(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button color="green" onClick={handleRecieptForAAVE}>
            Tx Aave
          </Button>
        </div>

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
                    {/* @ts-ignore */}
                    {/* {data?.functionFragment?.inputs[index].name} :{' '}
                        {key.toString()} */}

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

        {/* <div style={{ marginRight: '20%', wordWrap: 'break-word' }}>
          <h2>Chain Info</h2>
          <h3>{chainId}</h3>
          <h2>Contract Info</h2>
          <h3>{contractAddress}</h3>

          <h2>Function Info</h2>
          <h3>Function Name: {functionName}</h3>
          <h3>Function Signature: {signature}</h3>

          <h2>Params Info</h2> */}

        {/* @ts-ignore */}
        {/* {data?.args &&
            // @ts-ignore
            data.args.map((key: any, index: any) => {
              return (
                <div key={index}>
                  <h5> */}
        {/* @ts-ignore */}
        {/* {data?.functionFragment?.inputs[index].name} :{' '}
                    {key.toString()}
                  </h5>
                </div>
              )
            })}
        </div> */}
      </div>
    </>
  )
}

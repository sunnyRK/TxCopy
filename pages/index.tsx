import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Button, Grid, Input, Segment } from 'semantic-ui-react'
import { getData, getNewEvent, getSignForPermit, getUniversalRouter, mempool } from '@/pages/demo_events'
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import web3 from 'web3'
import { makeTx } from './Uniswap/UniversalRouter'
import { makeAaveTx } from './AAVE/aaveRouter'
import { getContractMetadata, getSigData } from './common/adapters/adapter'

export default function Home() {
  const [txhash, setTxhash] = useState('')
  const [data, setData] = useState()
  const [chainId, setChainId] = useState('')
  const [contractAddress, setContractAddress] = useState()
  const [functionName, setFunctionName] = useState()
  const [signature, setFunctionSignature] = useState()

  const [args, setArgs] = useState([])

  // const signer = useSigner();
  const handleRecieptForUniswap = async () => {
    try {
      // const data = await getUniversalRouter(txhash, false);
      await makeTx(txhash, false)
      // await getSignForPermit();
    } catch (error) {
      console.log('handleReciept-error', error)
    }
  }

  const handleInputForUniswap = async (_txhash: any) => {
    try {
      setTxhash(_txhash)
      setArgs([])

      // const _data: any = await getUniversalRouter(_txhash, true)
      // // await makeTx(txhash, false)
      // setData(_data)
      // setArgs(_data.args)

      // // await getSignForPermit();


      const { txInfo, txCallData }: any = await makeTx(_txhash, true)
      console.log('txCallData', txCallData.args)

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
      setArgs(txCallData.args)

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
      setArgs([])

      // const _data = await getContractMetadata('aave_v2_matic');
      // const _data = await getSigData('aave_v2_matic', "0x69328dec");

      const { txInfo, txCallData }: any = await makeAaveTx(_txhash, true)
      console.log('txCallData', txCallData.args)

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
      setArgs(txCallData.args)
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
        <h2>PasteHash - CopyTrade</h2>
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
          <Button color="green" onClick={handleRecieptForUniswap}>
            Tx Uniswap
          </Button>
        </div>

        <h2>PasteHash - CopyTrade</h2>
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

        <div>
          <>0xbdb2a51f0535dcd14e555825f5378d06165fb45109b6cd6cf41e49b7b87e5dfc</>
          <h4>0x52819a3aca9fd842d63adcfb5cc628dc097e01e11a9e9d99370a81ea3627bdb0</h4>

          <h2>Chain Info</h2>
          <h3>{chainId}</h3>
          <h2>Contract Info</h2>
          <h3>{contractAddress}</h3>

          <h2>Function Info</h2>
          <h3>Function Name: {functionName}</h3>
          <h3>Function Signature: {signature}</h3>

          <h2>Params Info</h2>

          {/* @ts-ignore */}
          {data?.args &&
            data.args.map((key: any, index: any) => {
              return (
                <div key={index}>
                  <h6>
                    {/* @ts-ignore */}
                    {data?.functionFragment?.inputs[index].name} : {key.toString()}
                  </h6>
                </div>
              )
            })}

          {/* {data &&
            Object.keys(data).map((key, index) => {
              return (
                <div key={index}>
                  <h4>
                    {key} {index}
                    {key == 'name' ? 'Function Name' + ' : ' + data[key] : ''}
                    {key == 'value' ? 'Value in Gas' + ' : ' + data[key] : ''}
                  </h4>
                </div>
              )
            })} */}
        </div>
      </div>
    </>
  )
}

// display: "flex",
// height: "200px",
// border: "3px solid green",

// key.map((value: any, index: any) => {
//   {value}
// })

import { useQueryHook } from '@/apps/hooks/commonQueryHook/useQueryHook'
import { mempool } from '@/apps/Uniswap/utils/helper'
import { Tooltip } from '@nextui-org/react'
import icons from '@/utils/icons.json'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'

const shorten = (text: any) => {
  return (
    text.substring(0, 4) + '...' + text.substring(text.length - 4, text.length)
  )
}

const Transactions = ({}) => {
  const { isLoading, isError, data: useQueryData, error }: any = useQueryHook()
  console.log('useQueryData: ', useQueryData)
  return (
    <div>
      <h2 className="text-2xl py-2 border-b border-gray-600">
        Recent Transactions
      </h2>
      <div className="overflow-y-auto h-[400px]">
        {!isLoading && useQueryData && 
          useQueryData.swaps.map((txnItem: any) => (
            <TransactionItem key={txnItem.id} {...txnItem} />
          ))}
      </div>
    </div>
  )
}

const getTime = ({ timestamp }: any) => {
  const d = new Date(timestamp)
  console.log(d)
  return d.toString()
}

const handleCopyKey = (key: any) => {
  navigator.clipboard.writeText(key).then(
    function () {
      console.log('Copying to clipboard was successful!')
    },
    function (err) {
      console.error('Async: Could not copy text: ', err)
    }
  )
}

export default Transactions

const TransactionItem = ({
  timestamp,
  amountIn,
  amountOut,
  tokenIn,
  tokenOut,
  hash,
  from,
  blockNumber,
  to,
}: any) => {
  return (
    <div className="w-[95%]  bg-[#ffffff]/5 px-4 py-6 rounded-xl my-2 relative">
      <div className="absolute left-[2%] top-[50%]">
        <Tooltip content="Copy to clipboard" rounded color="invert">
          <p
            className=" h-10 w-10 rounded-full z-10 bg-[#8a46ff]/30 text-3xl flex justify-center items-center cursor-pointer"
            style={{ transform: 'translateY(-50%)' }}
            onClick={() => handleCopyKey(hash)}
          >
            &#x2398;
          </p>
        </Tooltip>
      </div>

      <div className="flex justify-between">
        <p className="text-xs bg-[#8a46ff]/30 px-2 py-1 rounded-sm">
          {/* {getTime(timestamp)} */}
          {timestamp}{' '}
        </p>
        <Tooltip content="View on PolygonScan" rounded color="invert">
          <a
            href={`https://polygonscan.com/tx/${hash}`}
            target="blank"
            rel="noreferrer"
            className="text-xs bg-[#8a46ff]/30 px-2 py-1 rounded-sm"
          >
            &#128279;
          </a>
        </Tooltip>
      </div>
      <div className="flex w-[80%] md:w-[60%] mx-auto my-2 justify-between line py-2">
        <div className="text-center">
          <div className="h-[30px] w-[30px] my-1  flex item-center justify-center relative bg-[#fff] rounded-full mx-auto ">
            <Image
              // @ts-ignore
              src={icons[tokenIn.symbol]}
              alt={tokenIn.symbol}
              width={18}
              height={18}
              className="object-contain"
            />
          </div>

          <p className="text-sm py-1">{tokenIn.symbol}</p>
          <p>{(amountIn / 10 ** tokenIn.decimals).toFixed(4)}</p>
        </div>
        <div className="text-center ">
          <div className="h-[30px] w-[30px] my-1  flex item-center justify-center relative bg-[#fff] rounded-full mx-auto ">
            <Image
              // @ts-ignore
              src={icons[tokenOut.symbol]}
              width={18}
              height={18}
              alt={tokenOut.symbol}
              className="object-contain"
            />
          </div>
          <p className="text-sm">{tokenOut.symbol}</p>
          <p>{(amountOut / 10 ** tokenOut.decimals).toFixed(4)}</p>
        </div>
      </div>
      <div className="flex justify-center md:justify-between text-xs flex-wrap gap-2">
        <Tooltip content={from} rounded color="invert">
          <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
            <span className="font-semibold">From:</span> {shorten(from)}
          </p>
        </Tooltip>
        <Tooltip content={to} rounded color="invert">
          <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
            To: {shorten(to)}
          </p>
        </Tooltip>
        <Tooltip content={hash} rounded color="invert">
          <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
            <span className="font-semibold">TxHash:</span> {shorten(hash)}
          </p>
        </Tooltip>

        <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
          <span className="font-semibold">Block:</span> {blockNumber}
        </p>

        <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
          <span className="font-semibold">Network:</span> Polygon
        </p>
      </div>
    </div>
  )
}

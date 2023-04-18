import icons from '@/utils/icons.json'
import Image from 'next/image'

const txns = [
  {
    id: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac-391',
    from: '0xb50685c25485ca8c520f5286bbbf1d3f216d6989',
    hash: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac',
    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
    timestamp: '1681119302',
    amountIn: '60000000000000',
    amountOut: '101592756625387405',
    logIndex: 395,
    blockNumber: 16811193,
    tokenIn: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    tokenOut: {
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
    },
  },
  {
    id: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac-395',
    from: '0xb50685c25485ca8c520f5286bbbf1d3f216d6989',
    hash: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac',
    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
    timestamp: '1681119302',
    amountIn: '60000000000000',
    amountOut: '101592756625387405',
    logIndex: 395,
    blockNumber: 16811193,
    tokenIn: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    tokenOut: {
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
    },
  },
  {
    id: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac-315',
    from: '0xb50685c25485ca8c520f5286bbbf1d3f216d6989',
    hash: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac',
    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
    timestamp: '1681119302',
    amountIn: '60000000000000',
    amountOut: '101592756625387405',
    logIndex: 395,
    blockNumber: 16811193,
    tokenIn: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    tokenOut: {
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
    },
  },
  {
    id: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac-325',
    from: '0xb50685c25485ca8c520f5286bbbf1d3f216d6989',
    hash: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac',
    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
    timestamp: '1681119302',
    amountIn: '60000000000000',
    amountOut: '101592756625387405',
    logIndex: 395,
    blockNumber: 16811193,
    tokenIn: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    tokenOut: {
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
    },
  },
  {
    id: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac-390',
    from: '0xb50685c25485ca8c520f5286bbbf1d3f216d6989',
    hash: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac',
    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
    timestamp: '1681119302',
    amountIn: '60000000000000',
    amountOut: '101592756625387405',
    logIndex: 395,
    blockNumber: 16811193,
    tokenIn: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    tokenOut: {
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
    },
  },
  {
    id: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac-385',
    from: '0xb50685c25485ca8c520f5286bbbf1d3f216d6989',
    hash: '0x00ed4625a5763118f20a9c21085dea14f5965f6a8682a524ac40ddb2fbce10ac',
    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5',
    timestamp: '1681119302',
    amountIn: '60000000000000',
    amountOut: '101592756625387405',
    logIndex: 395,
    blockNumber: 16811193,
    tokenIn: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    tokenOut: {
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
    },
  },
]

const shorten = (text: any) => {
  return (
    text.substring(0, 4) + '...' + text.substring(text.length - 4, text.length)
  )
}

const Transactions = () => {
  return (
    <div>
      <h2 className="text-2xl py-2 border-b border-gray-600">
        Recent Transactions
      </h2>
      <div className="overflow-y-auto h-[400px]">
        {txns.map((txnItem) => (
          <TransactionItem key={txnItem.id} {...txnItem} />
        ))}
      </div>
    </div>
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
    <div className="w-full  bg-[#ffffff]/5 px-4 py-6 rounded-xl my-2 ">
      <div className="flex justify-between">
        <p className="text-xs bg-[#8a46ff]/30 px-2 py-1 rounded-sm">
          {new Date(timestamp * 1000).toLocaleTimeString()}
        </p>

        <a href="" className="text-xs bg-[#8a46ff]/30 px-2 py-1 rounded-sm">
          &#128279;
        </a>
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
          <p>{(amountIn / 10 ** 18).toFixed(4)}</p>
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
          <p>{(amountOut / 10 ** 18).toFixed(4)}</p>
        </div>
      </div>
      <div className="flex justify-center md:justify-between text-xs flex-wrap gap-2">
        <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
          <span className="font-semibold">From:</span> {shorten(from)}
        </p>
        <p className="px-2 py-1 rounded-full bg-[#8a46ff]">To: {shorten(to)}</p>
        <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
          <span className="font-semibold">TxHash:</span> {shorten(hash)}
        </p>
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

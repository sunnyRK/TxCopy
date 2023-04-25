import { Tooltip } from '@nextui-org/react';
import { useEffect } from 'react';
import { useAppStore } from '@/utils/appStore';

const shorten = (text: any) => {
    return (
        text.substring(0, 4) +
        '...' +
        text.substring(text.length - 4, text.length)
    );
};

export const TransactionDetails = ({}) => {
    const {
        protcolName,
        contractAddress,
        action,
        tokenIn,
        tokenOut,
        decimalIn,
        decimalOut,
        balanceIn,
        amountIn,
        amountOut,
        allowanceIn,
        permit2Allowance,
        expiry,
        nonce
    }: any = useAppStore((state) => state);

    useEffect(() => {
        console.log('protcolName++++', protcolName);
    }, [protcolName]);

    return (
        <div>
            <h2 className="text-2xl py-2 border-b border-gray-600">
                Transaction Details
            </h2>
            <h2 className="bg-[#8a46ff]/20  p-4  rounded-lg my-2">
                Copy and paste tx to see its details
            </h2>
            {!protcolName ? (
                <></>
            ) : (
                <>
                    <div className="overflow-y-auto h-[400px]">
                        <div className="w-[95%]  bg-[#ffffff]/5 px-4 py-6 rounded-xl my-2 relative">
                            {/* <div className="absolute left-[2%] top-[50%]">
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
                            */}

                            <div className="flex justify-center md:justify-between text-xs flex-wrap gap-2">
                                <Tooltip
                                    content={contractAddress}
                                    rounded
                                    color="invert"
                                >
                                    <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
                                        <span className="font-semibold">
                                            Protocol Name:
                                        </span>{' '}
                                        {protcolName}
                                    </p>
                                </Tooltip>
                                <Tooltip
                                    content={action}
                                    rounded
                                    color="invert"
                                >
                                    <p className="px-2 py-1 rounded-full bg-[#8a46ff]">
                                        <span className="font-semibold">
                                            Action:
                                        </span>{' '}
                                        {action}
                                    </p>
                                </Tooltip>
                            </div>
                            <div className="flex w-[80%] md:w-[60%] mx-auto my-2 justify-between line py-2">
                                <div className="text-center">
                                    <div className="h-[30px] w-[30px] my-1  flex item-center justify-center relative bg-[#fff] rounded-full mx-auto ">
                                        {/* <Image
                                            // @ts-ignore
                                            src={icons[tokenIn.symbol]}
                                            alt={tokenIn.symbol}
                                            width={18}
                                            height={18}
                                            className="object-contain"
                                        /> */}
                                    </div>

                                    <p className="text-sm py-1">{tokenIn}</p>
                                    <p>
                                        {(amountIn / 10 ** decimalIn).toFixed(
                                            4
                                        )}
                                    </p>
                                </div>
                                <div className="text-center ">
                                    <div className="h-[30px] w-[30px] my-1  flex item-center justify-center relative bg-[#fff] rounded-full mx-auto ">
                                        {/* <Image
                                            // @ts-ignore
                                            src={icons[tokenOut.symbol]}
                                            width={18}
                                            height={18}
                                            alt={tokenOut.symbol}
                                            className="object-contain"
                                        /> */}
                                    </div>
                                    <p className="text-sm">{tokenOut}</p>
                                    <p>
                                        {(amountOut / 10 ** decimalOut).toFixed(
                                            4
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-between text-xs flex-wrap gap-2"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

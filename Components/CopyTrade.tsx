import { useUniversalRouter } from '@/apps/hooks/useUniversalRouter';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { contractAddresses } from '@/utils/default';
import { getProvider } from '@/apps/common/helper';
import { UniversalRouter } from '@/apps/Uniswap/utils/constants';
import { makeAaveTx } from '@/apps/AAVE/aaveRouter';
import { toast } from 'react-toastify';
import { Tooltip } from '@nextui-org/react';

const DataItem = ({ label, value, short }: any) => {
    return (
        <div className="flex justify-between bg-black p-2 px-4 rounded-lg">
            <p>{label}</p>
            <Tooltip content={value} rounded color="invert">
                <p className="text-[#8a46ff]">{!short ? value : short}</p>
            </Tooltip>
        </div>
    );
};

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setTxhash: Dispatch<SetStateAction<string>>;
    txhash: string;
}

const CopyTrade: FC<Props> = ({ setIsLoading, txhash, setTxhash }) => {
    const [confirmDisabled, setCofirmDisabled] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [data, setData] = useState();
    const [chainId, setChainId] = useState('');
    const [contractAddress, setContractAddress] = useState<any>();
    const [functionName, setFunctionName] = useState();
    const [signature, setFunctionSignature] = useState<any>();
    const [tx, setCopyTrade] = useState();
    const { mutateAsync: makeTx } = useUniversalRouter();

    const handleInputForUniswap = async (_txhash: any, _isInput: boolean) => {
        try {
            setIsLoading(true);
            if (_isInput) {
                setChainId('');
                setContractAddress(undefined);
                setFunctionName(undefined);
                setFunctionSignature(undefined);
                setData(undefined);
            }

            if (!_txhash) {
                console.log('txhash is invalid');
                setTxhash('');
                setCofirmDisabled(false);

                return;
            }
            if (!_isInput) setConfirmLoading(true);
            else setCofirmDisabled(true);
            setTxhash(_txhash);

            const provider = await getProvider();
            if (!provider) return;

            const receipt: any = await provider.getTransactionReceipt(_txhash);
            console.log('receipt-', receipt);

            let txdata: any;
            if (receipt.to === UniversalRouter) {
                console.log('UniTrade');
                txdata = await makeTx({
                    txHash: _txhash,
                    onlyCheck: _isInput ? true : false
                });
            } else if ((await contractAddresses).includes(receipt.to)) {
                console.log('OtherTrade');
                txdata = await makeAaveTx(_txhash, _isInput ? true : false);
            } else {
                toast.error('This Trade is not supported');
                if (!_isInput) setConfirmLoading(false);
                else setCofirmDisabled(false);
                return;
            }
            if (!_isInput) setConfirmLoading(false);
            else setCofirmDisabled(false);
            if (!txdata) {
                return;
            }
            const txInfo = txdata.txInfo;
            const txCallData = txdata.txCallData;
            if (!txInfo) return;
            if (!txCallData) return;

            if (txInfo.chainId == 137) {
                setChainId('Polygon');
            } else if (txInfo.chainId == 1) {
                setChainId('Mainnet');
            } else if (txInfo.chainId == 10) {
                setChainId('Optimism');
            } else if (txInfo.chainId == 42161) {
                setChainId('Arbitrum');
            } else if (txInfo.chainId == 80001) {
                setChainId('Mumbai');
            } else {
                setChainId('Unknown');
            }
            setContractAddress(txInfo.to);
            setFunctionName(txCallData.name);
            setFunctionSignature(txCallData.signature);
            setData(txCallData);
        } catch (error) {
            console.log('handleInput-error', error);
            if (!_isInput) setConfirmLoading(false);
            else setCofirmDisabled(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        handleInputForUniswap(text, true);
    };

    return (
        <>
            <div className="flex items-stretch w-full my-2">
                <input
                    placeholder="Paste TxHash"
                    value={txhash}
                    className="w-[90%] outline-none rounded-l-lg px-4 py-2 text-black"
                    onChange={(e: any) =>
                        handleInputForUniswap(e.target.value, true)
                    }
                />

                <button
                    className="w-[10%] rounded-r-lg bg-white border-l border-gray-200 text-[#8a46ff] text-3xl font-bold flex justify-center"
                    onClick={handlePaste}
                >
                    <Tooltip content="Paste Clipboard" rounded color="invert">
                        &#x2398;
                    </Tooltip>
                </button>
            </div>
            {tx && (
                <a href={`{https://polygonscan.com/tx/${tx}}`}>View Tx: {tx}</a>
            )}

            <div>
                <h2 className="bg-[#8a46ff]/20  p-4  rounded-lg my-2">
                    Transaction, Contract and network metadata for trade you
                    want to perform
                </h2>

                <div className="flex flex-col gap-2 my-2">
                    <DataItem label="Network" value={chainId} />
                    <DataItem
                        label="Contract Address"
                        value={contractAddress}
                        short={
                            contractAddress &&
                            contractAddress?.substring(0, 4) +
                                '...' +
                                contractAddress?.substring(
                                    contractAddress?.length - 4,

                                    contractAddress?.length
                                )
                        }
                    />
                    <DataItem label="Function Name" value={functionName} />
                    <DataItem
                        label="Function Signature"
                        value={signature}
                        short={
                            signature?.length > 30
                                ? signature?.substring(0, 27) + '...'
                                : signature
                        }
                    />
                </div>

                <div className="bg-black text-white px-4 py-2 rounded-lg">
                    <h2>Input Parameters</h2>
                    <div className="w-full overflow-x-auto p-2  bg-[#ffffff10] rounded-lg">
                        {/* @ts-ignore */}
                        {data?.args &&
                            // @ts-ignore
                            data.args.map((key: any, index: any) => {
                                return (
                                    <>
                                        <pre key={index}>
                                            {/* @ts-ignore */}
                                            {
                                                data?.functionFragment?.inputs[
                                                    index
                                                ].name
                                            }{' '}
                                            {key.toString()}
                                        </pre>
                                    </>
                                );
                            })}
                    </div>
                </div>

                <div className="button__container">
                    {contractAddress ? (
                        <button
                            disabled={confirmDisabled}
                            className="bg-[#8a46ff] py-2  w-full text-center rounded-lg  mt-4"
                            onClick={(e: any) =>
                                handleInputForUniswap(txhash, false)
                            }
                        >
                            Confirm
                        </button>
                    ) : (
                        <button
                            disabled={confirmDisabled}
                            className="bg-[#8a46ff] py-2  w-full text-center rounded-lg  mt-4"
                            onClick={(e: any) =>
                                handleInputForUniswap(txhash, false)
                            }
                        >
                            Get Details
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default CopyTrade;

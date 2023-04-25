import { ethers, utils } from 'ethers';
import {
    getProvider,
    getSigner,
    getAbiUsingExplorereUrl,
    checkIfContractIsProxy,
    checkBalanceAndAllowance
} from '../common/helper';
import { network_name } from '../common/constants';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '@/utils/appStore';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import ERC20_ABI from '../common/abis/erc20_2.json';
import { useErc20Data } from '../hooks/commonHooks/useErc20Hooks';

type Props = {
    txHash: string;
    onlyCheck: boolean;
    protcolName: any;
};

export function useLendingRoutes() {
    const { mutateAsync: getErc20Data } = useErc20Data();
    const {
        setProtocolName,
        setContract,
        setActionName,
        setTokenIn,
        setTokenOut,
        setDecimalIn,
        setDecimalOut,
        setBalanceIn,
        setAmountIn,
        setAmountOut,
        setAllowanceIn,
        setPermit2Allowance,
        setPermit2Expiry,
        setpermit2Nonce
    }: any = useAppStore((state) => state);
    async function makeLendingTx({
        txHash,
        onlyCheck,
        protcolName
    }: Props): Promise<any> {
        let decodedInput;
        try {
            const provider = await getProvider();
            const signer = await getSigner();

            if (!provider) return;
            if (!signer) return;
            const address = await signer.getAddress();

            const receipt: any = await provider.getTransactionReceipt(txHash);
            console.log('receipt', receipt);

            let abi = await getAbiUsingExplorereUrl(network_name, receipt?.to);
            const { isProxy, currentImplAddress }: any =
                await checkIfContractIsProxy(abi, receipt.to);
            const toAddress = currentImplAddress;
            console.log('toAddress', toAddress.toString());

            if (isProxy) {
                abi = await getAbiUsingExplorereUrl(network_name, toAddress);
            }
            let abiInterface = new ethers.utils.Interface(abi);
            const txInfo = await provider.getTransaction(txHash);
            console.log('txInfo', txInfo);

            decodedInput = abiInterface.parseTransaction({
                data: txInfo.data,
                value: txInfo.value
            });
            console.log('decodedInput', decodedInput);

            let inputParams: any = [];
            for (let i = 0; i < decodedInput.args.length; i++) {
                if (decodedInput.args[i] === receipt.from) {
                    inputParams[i] = address;
                } else {
                    inputParams[i] = decodedInput.args[i];
                }
            }
            console.log('inputParams', inputParams);

            // shrink abi & abiInterface to specific function only
            abi = [`function` + ' ' + decodedInput.signature];
            abiInterface = new ethers.utils.Interface(abi);
            console.log('Uni-abiInterface: ', abiInterface);

            setProtocolName(protcolName);
            setContract(toAddress);
            setActionName(decodedInput.name);
            // setTokenIn(erc20tokenIndata?.symbol)
            // setTokenOut(erc20tokenOutdata?.symbol)
            // setDecimalIn(erc20tokenIndata?.decimals)
            // setDecimalOut(erc20tokenOutdata?.decimals)
            // setBalanceIn(erc20tokenIndata?.balance)
            // setAmountIn(amountIn)
            // setAmountOut(tempAmountOutprice)
            // setAllowanceIn(erc20tokenIndata?.allowance)
            // setPermit2Allowance()
            // setPermit2Expiry()
            // setpermit2Nonce()

            await checkTxDetails(receipt);

            if (!onlyCheck) {
                await checkBalanceAndAllowance(receipt);

                const datas = abiInterface.encodeFunctionData(
                    decodedInput.name,
                    // decodedInput.args
                    inputParams
                );
                console.log('encodeData', datas);

                const copyTx = await signer.sendTransaction({
                    to: receipt.to,
                    data: datas
                });
                toast.success(`Tx done successfully.`);
                console.log('copyTx', copyTx);
            }
            return {
                txInfo: txInfo,
                txCallData: decodedInput
            };
        } catch (error) {
            if (decodedInput) {
                toast.error(
                    "You can't perform " + decodedInput?.name + ' operation'
                );
            } else {
                toast.error(`Something went wrong. Please try again`);
            }
            console.log('makeAaveTx-error-', error);
        }
    }

    // For other trade not for uni trade
    async function checkTxDetails(receipt: any) {
        let id: any;
        try {
            const sig = 'Transfer(address,address,uint256)';

            const bytess = utils.toUtf8Bytes(sig);
            console.log('bytess', bytess);

            const bytessAfterKeccak = utils.keccak256(bytess);
            console.log('bytessAfterKeccak', bytessAfterKeccak);

            for (let i = 0; i < receipt.logs.length; i++) {
                if (receipt.logs[i].topics[0] === bytessAfterKeccak) {
                    console.log('\n');

                    const contractAddress = receipt.logs[i].address.toString();
                    const from = utils.defaultAbiCoder.decode(
                        ['address'],
                        receipt.logs[i].topics[1]
                    );

                    const to = utils.defaultAbiCoder.decode(
                        ['address'],
                        receipt.logs[i].topics[2]
                    );
                    console.log('to', to.toString());

                    if (
                        from.toString().toLowerCase() ===
                        receipt.from.toString().toLowerCase()
                    ) {
                        const erc20tokenIndata = await getErc20Data({
                            token: contractAddress,
                            address: receipt.from,
                            spender: receipt.to
                        });

                        const value = utils.defaultAbiCoder.decode(
                            ['uint256'],
                            receipt.logs[i].data
                        );
                        console.log('value', value.toString());
                        setTokenIn(erc20tokenIndata?.symbol);
                        setDecimalIn(erc20tokenIndata?.decimals);
                        setBalanceIn(erc20tokenIndata?.balance);
                        setAmountIn(value);
                        setAllowanceIn(erc20tokenIndata?.allowance);
                    } else if (
                        to.toString().toLowerCase() ===
                        receipt.from.toString().toLowerCase()
                    ) {
                        const erc20tokenOutdata = await getErc20Data({
                            token: contractAddress,
                            address: receipt.from,
                            spender: receipt.to
                        });

                        const value = utils.defaultAbiCoder.decode(
                            ['uint256'],
                            receipt.logs[i].data
                        );
                        console.log('value', value.toString());
                        setTokenOut(erc20tokenOutdata?.symbol);
                        setDecimalOut(erc20tokenOutdata?.decimals);
                        setAmountOut(value);
                    }
                }
            }
            console.log('\n');
        } catch (error) {
            toast.update(id, {
                render: 'Approve Error',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            });
            console.log('chackBalanceAndAllwance-error-', error);
        }
    }

    return useMutation(makeLendingTx);
}

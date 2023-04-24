import { useMutation } from '@tanstack/react-query';
import { ethers, BigNumber, utils } from 'ethers';
import {
    ADDRESS_THIS,
    CommandType,
    MSG_SENDER,
    Permit2Address,
    swapCodes
} from '../../Uniswap/utils/constants';
import { getProvider, getSigner } from '../../common/helper';
import {
    rearrangeSwapData,
    checkPermit2Approve,
    checkSpenderSign,
    createCommand
} from '../../Uniswap/utils/helper';
import { toast } from 'react-toastify';
import { usePriceHook } from '../commonHooks/usePriceHook';
import { ThirdwebSDK } from '@thirdweb-dev/react';
import ERC20_ABI from '../../common/abis/erc20_2.json';
import { useErc20Data } from '../commonHooks/useErc20Hooks';

type Props = {
    receipt: any;
    onlyCheck: any;
};

export function useParseData() {
    const { mutateAsync: generateRoute } = usePriceHook();
    const { mutateAsync: getErc20Data } = useErc20Data();

    async function checkSpenderAllowance({
        receipt,
        onlyCheck
    }: Props): Promise<any> {
        let id: any;
        let depositWETH: BigNumber = BigNumber.from(0);
        try {
            let commands = '0x';
            let inputs: any = [];
            let provider = await getProvider();
            let signer = await getSigner();
            if (!signer || !provider) return;
            let address = await signer.getAddress();

            const sig = 'Transfer(address,address,uint256)';
            const bytess = utils.toUtf8Bytes(sig);
            const bytessAfterKeccak = utils.keccak256(bytess);
            const DpositSig = 'Deposit(address,uint256)';
            const DpositSigbytess = utils.toUtf8Bytes(DpositSig);
            const DpositSigbytessAfterKeccak = utils.keccak256(DpositSigbytess);

            const WithdrawBytesAfterKeccak =
                '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65';

            let amountIn: BigNumber = BigNumber.from('0');
            let tokenIn;
            let tokenOut;
            let isWrapEth: any = false;
            let isUnWrapEth: any = false;

            for (let i = 0; i < receipt.logs.length; i++) {
                if (DpositSigbytessAfterKeccak === receipt.logs[i].topics[0]) {
                    isWrapEth = true;
                    const value = utils.defaultAbiCoder.decode(
                        ['uint256'],
                        receipt.logs[i].data
                    );
                    console.log('\n');
                    amountIn = amountIn.add(value.toString());
                    tokenIn = receipt.logs[i].address.toString();

                    const makeSwapData = [ADDRESS_THIS, amountIn];
                    const commandType = CommandType.WRAP_ETH;

                    const swapCommand = await createCommand(
                        commandType,
                        makeSwapData
                    );
                    if (swapCommand) {
                        inputs.push(swapCommand.encodedInput);
                        commands = commands.concat(
                            swapCommand.type.toString(16).padStart(2, '0')
                        );
                    }
                    depositWETH = amountIn;
                }

                if (bytessAfterKeccak === receipt.logs[i].topics[0]) {
                    const token = receipt.logs[i].address.toString();
                    const from = utils.defaultAbiCoder.decode(
                        ['address'],
                        receipt.logs[i].topics[1]
                    );
                    const to = utils.defaultAbiCoder.decode(
                        ['address'],
                        receipt.logs[i].topics[2]
                    );
                    const value = utils.defaultAbiCoder.decode(
                        ['uint256'],
                        receipt.logs[i].data
                    );
                    if (
                        from.toString().toLowerCase() ===
                        receipt.from.toString().toLowerCase()
                    ) {
                        amountIn = amountIn.add(value.toString());
                        tokenIn = receipt.logs[i].address.toString();
                    } else if (
                        to.toString().toLowerCase() ===
                        receipt.from.toString().toLowerCase()
                    ) {
                        tokenOut = receipt.logs[i].address.toString();
                    }
                }

                if (WithdrawBytesAfterKeccak === receipt.logs[i].topics[0]) {
                    isUnWrapEth = true;
                    tokenOut = receipt.logs[i].address.toString();
                }
            }

            const erc20tokenIndata = await getErc20Data({
                token: tokenIn,
                address: address,
                spender: Permit2Address
            });
            const erc20tokenOutdata = await getErc20Data({
                token: tokenIn,
                address: address,
                spender: Permit2Address
            });

            const tokenInBalance = erc20tokenIndata?.balance;
            const tokenInDecimals = erc20tokenIndata?.decimals;
            const tokenOutDecimals = erc20tokenOutdata?.decimals;
            console.log('tokenInBalance: ', tokenInBalance?.toString());
            console.log('tokenInDecimals: ', tokenInDecimals.toString());
            console.log('tokenOutDecimals: ', tokenOutDecimals.toString());

            const route: any = await generateRoute({
                tokenIn,
                tokenOut,
                value: amountIn.toString(),
                type: 'exactIn'
            });

            const amountOutprice: any = route?.quote.toExact().toString();
            console.log('amountOutprice', amountOutprice.toString());

            let isEnoughBalance: boolean = true;
            if (
                !BigNumber.from(tokenInBalance.toString()).gte(
                    BigNumber.from(amountIn)
                )
            ) {
                isEnoughBalance = false;
            }

            if (onlyCheck) {
                let _tokenInBalance = ethers.utils.parseUnits(
                    tokenInBalance.toString(),
                    tokenInDecimals
                );
                return {
                    _tokenInBalance,
                    amountOutprice
                };
            }

            if (!isEnoughBalance) {
                alert('Not enough balance you have');
                throw 'Not enough balance you have';
            }

            if (!onlyCheck) {
                const isPermit2Approved = await checkPermit2Approve(
                    tokenIn,
                    amountIn.toString()
                );

                if (isPermit2Approved === undefined) {
                    throw 'isPermit2Approved error';
                }

                const command = await checkSpenderSign(
                    tokenIn,
                    receipt.to,
                    amountIn.toString()
                );

                if (command === undefined) {
                    throw 'checkSpenderSign error';
                }

                if (command) {
                    inputs.push(command.encodedInput);
                    commands = commands.concat(
                        command.type.toString(16).padStart(2, '0')
                    );
                }

                for (let i = 0; i < route?.route.length; i++) {
                    const amountInprice: any =
                        route?.trade.swaps[i].inputAmount.toExact();
                    const amountOutprice: any =
                        route?.trade.swaps[i].outputAmount.toExact();
                    let _amountInprice = ethers.utils.parseUnits(
                        amountInprice,
                        tokenInDecimals
                    );
                    let _amountOutprice = ethers.utils.parseUnits(
                        amountOutprice,
                        tokenOutDecimals
                    );
                    const tokenPath: any = route?.route[i].tokenPath;

                    let totalFees: BigNumber = BigNumber.from('0');
                    let fees: any = [];
                    for (
                        let j = 0;
                        j < route.trade.routes[i].pools?.length;
                        j++
                    ) {
                        totalFees = totalFees.add(
                            BigNumber.from(route.trade.routes[i].pools[j].fee)
                        );
                        fees.push(route.trade.routes[i].pools[j].fee);
                    }

                    console.log(
                        '_amountInprice: ',
                        amountInprice.toString(),
                        _amountInprice.toString()
                    );

                    _amountOutprice = _amountOutprice.sub(
                        _amountOutprice.mul(totalFees).div(1e6)
                    );
                    console.log(
                        '_amountOutprice-afterFees: ',
                        _amountOutprice.toString()
                    );

                    let newPath: any = [];
                    for (let j = 0; j < tokenPath?.length; j++) {
                        newPath.push(route?.route[i].tokenPath[j].address);
                    }
                    // console.log('newPath-after: ', newPath)

                    const makeSwapData = {
                        function: swapCodes['00'],
                        recipient: isUnWrapEth ? ADDRESS_THIS : MSG_SENDER,
                        amountIn: _amountInprice.toString(),
                        amountOut: _amountOutprice.toString(),
                        path: newPath,
                        payerIsUser: isWrapEth ? false : true
                    };

                    let swapCommand;
                    if (makeSwapData !== undefined) {
                        swapCommand = await rearrangeSwapData(
                            makeSwapData,
                            fees
                        );
                        console.log('swapCommand: ', swapCommand);
                    }
                    if (swapCommand) {
                        inputs.push(swapCommand.encodedInput);
                        commands = commands.concat(
                            swapCommand.type.toString(16).padStart(2, '0')
                        );
                    }
                }

                if (isUnWrapEth) {
                    const makeSwapData = [MSG_SENDER, 0];
                    const commandType = CommandType.UNWRAP_WETH;

                    const swapCommand = await createCommand(
                        commandType,
                        makeSwapData
                    );
                    if (swapCommand) {
                        inputs.push(swapCommand.encodedInput);
                        commands = commands.concat(
                            swapCommand.type.toString(16).padStart(2, '0')
                        );
                    }
                }

                console.log('commands-2:', commands.toString());
                console.log('inputs-2:', inputs.toString());
                return { commands, inputs, value: depositWETH };
            }
        } catch (error) {
            toast.update(id, {
                render: 'Approve Error',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            });
            console.log('chackBalanceAndAllwance-error-', error);
            return undefined;
        }
    }
    return useMutation(checkSpenderAllowance);
}

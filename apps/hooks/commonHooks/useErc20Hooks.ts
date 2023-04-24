import { useMutation } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import ERC20_ABI from '../../common/abis/erc20_2.json';
import Permit2_ABI from '../../common/abis/Permit2.json';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Permit2Address } from '@/apps/Uniswap/utils/constants';

type ContractByNetwork = {
    network: string;
    contractAddress: string;
    abi: any;
};

type ERC20 = {
    token: string;
    address?: string;
    spender?: string;
};

type ERC20ReturnData = {
    name: any;
    symbol: any;
    decimals: any;
    totalSupply: any;
    balance: any;
    allowance?: any;
};

type Permit2Allownace = {
    allownaceAmount: BigNumber;
    expiration: any;
    nonce: any;
};

async function getContractByNetwork({
    network,
    contractAddress,
    abi
}: ContractByNetwork): Promise<any> {
    try {
        const sdk = await new ThirdwebSDK(network);
        const thirdwebContract = await sdk.getContract(contractAddress, abi);
        return thirdwebContract;
    } catch (error) {
        console.log('ContractByNetwork-error', error);
    }
}

async function getErc20({ token }: ERC20): Promise<any> {
    try {
        const erc20 = await getContractByNetwork({
            network: 'polygon',
            contractAddress: token,
            abi: ERC20_ABI
        });
        return erc20;
    } catch (error) {
        console.log('ERC20-error', error);
    }
}

async function getErc20Data({
    token,
    address,
    spender
}: ERC20): Promise<ERC20ReturnData | undefined> {
    try {
        if (!address || !spender) throw 'Invalid addresses';
        const erc20 = await getErc20({ token });
        const [name, symbol, decimals, totalSupply, balance, allowance] =
            await Promise.all([
                erc20.call('name'),
                erc20.call('symbol'),
                erc20.call('decimals'),
                erc20.call('totalSupply'),
                erc20.call('balanceOf', [address]),
                erc20.call('allowance', [address, spender])
            ]);
        return { name, symbol, decimals, totalSupply, balance, allowance };
    } catch (error) {
        console.log('ERC20Data-error', error);
    }
}

async function getPermit2Contract(): Promise<any> {
    try {
        const permit2 = await getContractByNetwork({
            network: 'polygon',
            contractAddress: Permit2Address,
            abi: Permit2_ABI.abi
        });
        return permit2;
    } catch (error) {
        console.log('Permit2Contract-error', error);
    }
}

async function getPermit2Data({
    token,
    address,
    spender
}: ERC20): Promise<Permit2Allownace | undefined> {
    try {
        if (!address || !spender) throw 'Invalid addresses';
        const permit2 = await getPermit2Contract();
        const [allowance] = await Promise.all([
            permit2.call('allowance', [address, token, spender])
        ]);
        return {
            allownaceAmount: allowance.amount,
            expiration: allowance.expiration,
            nonce: allowance.nonce
        };
    } catch (error) {
        console.log('Permit2Data-error', error);
    }
}

export function useErc20() {
    return useMutation(getErc20);
}

export function useErc20Data() {
    return useMutation(getErc20Data);
}
export function usePermit2Contract() {
    return useMutation(getPermit2Contract);
}
export function usePermit2Data() {
    return useMutation(getPermit2Data);
}

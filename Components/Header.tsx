import {
    ConnectWallet,
    useAddress,
    useNetwork,
    useNetworkMismatch,
    useSwitchChain
} from '@thirdweb-dev/react';
import Image from 'next/image';

const Header = () => {
    const switchChain = useSwitchChain();
    const address = useAddress(); // Detect the connected address
    const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on the wrong network
    // @ts-ignore
    const [, switchNetwork] = useNetwork();
    return (
        <div className="fixed top-0 w-full right-0  py-0 z-10  bg-[#8a46ff]">
            <div className="container mx-auto flex items-center justify-between">
                <div className="h-20 w-[200px] relative">
                    <Image
                        src="/logo.png"
                        alt="DeFiLens CopyTrade"
                        fill
                        className="object-contain"
                    />
                </div>
                <div>
                    {isOnWrongNetwork ? (
                        <button
                            className="rounded-lg bg-[#FF0000] text-[#ffffff] p-3"
                            onClick={() => switchNetwork?.(137)}
                        >
                            Switch Network
                        </button>
                    ) : (
                        <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

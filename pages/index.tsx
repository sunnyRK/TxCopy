import Header from '@/components/Header';
import CopyTrade from '@/components/CopyTrade';
import Loader from '@/components/Loader';
import { useState } from 'react';
import Footer from '@/components/Footer';
import Transaction from '@/components/Transactions';
import { TransactionDetails } from '@/components/TransactionDetails';

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [txhash, setTxhash] = useState<string>('');
    return (
        <>
            <Header />
            <div className="container mx-auto my-10 mt-28">
                <div className="text-center">
                    <h1 className="text-4xl text-[#fff] py-3 pb-6 font-semibold uppercase">
                        CopyTrade For On-Chain Data
                    </h1>
                </div>

                <div className="flex-col md:flex-row flex gap-4 items-start">
                    <div className="w-full md:w-[60%] bg-[#ffffff10] p-6 rounded-lg">
                        <CopyTrade
                            setIsLoading={setIsLoading}
                            txhash={txhash}
                            setTxhash={setTxhash}
                        />
                    </div>
                    <div className="w-full md:w-[40%] bg-[#ffffff10] p-6 rounded-lg">
                        <TransactionDetails />
                    </div>
                </div>
                <div className="w-full md:w-[100%] bg-[#ffffff10] p-6 rounded-lg my-10">
                    <Transaction />
                </div>
            </div>

            <Footer />

            {isLoading && <Loader />}
        </>
    );
}

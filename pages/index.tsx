import Header from '@/Components/Header';
import CopyTrade from '@/Components/CopyTrade';
import Loader from '@/Components/Loader';
import { useState } from 'react';
import Footer from '@/Components/Footer';
import Transaction from '@/Components/Transactions';
import {TransactionDetails} from '@/Components/TransactionDetails';

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [txhash, setTxhash] = useState<string>('');
    return (
        <>
            <Header />
            <div className="container mx-auto my-10 mt-28">
                <div className="text-center">
                    <h1 className="text-4xl text-[#fff] py-3 pb-6 font-semibold uppercase">
                        CopyTrade For Univ3 Universal Router
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

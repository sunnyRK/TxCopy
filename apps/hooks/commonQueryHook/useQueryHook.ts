import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useAddress } from '@thirdweb-dev/react';
import { SwapsDocument } from '@/query/generated';

export const useQueryHook = () => {
    const _address = useAddress();
    return useQuery({
        queryKey: ['uni_swap_v3_polygon'],
        queryFn: async () =>
            request(
                'https://api.thegraph.com/subgraphs/name/steegecs/uniswap-v3-polygon',
                SwapsDocument,
                {
                    to: '0x4c60051384bd2d3c01bfc845cf5f4b44bcbe9de5'
                }
            ),
        enabled: !!_address
    });
};

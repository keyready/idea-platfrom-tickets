import { Ticket } from '../model/types/Ticket';

import { rtkApi } from '@/shared/api/rtkApi';
import { Filters } from '@/entities/Filters';

const TicketsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], Filters>({
            query: (filters) => {
                const { currency, price, destination, origin, stops } = filters;

                let baseUrl = '/api/tickets?_sort=price,stops';

                if (destination && destination !== 'ANY') {
                    baseUrl += `&destination=${destination}`;
                }

                if (origin && origin !== 'ANY') {
                    baseUrl += `&origin=${origin}`;
                }

                if (price?.length) {
                    const localPrice: number[] = [price[0], price[1]];
                    if (currency === 'EUR') {
                        localPrice[0] = price[0] * 109;
                        localPrice[1] = price[1] * 109;
                    }
                    if (currency === 'USD') {
                        localPrice[0] = price[0] * 103;
                        localPrice[1] = price[1] * 103;
                    }

                    baseUrl += `&price_gte=${localPrice[0]}&price_lte=${localPrice[1]}${
                        stops === 'all' ? '' : `&stops=${stops}`
                    }`;
                } else {
                    baseUrl += `${stops === 'all' ? '' : `&stops=${stops}`}`;
                }

                return {
                    url: baseUrl,
                };
            },
        }),
    }),
});

export const useTickets = TicketsApi.useGetTicketsQuery;

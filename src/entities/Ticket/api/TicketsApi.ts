import { Filters, Ticket } from '../model/types/Ticket';

import { rtkApi } from '@/shared/api/rtkApi';

const TicketsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], Filters>({
            query: (filters) => {
                const { price, stops } = filters;

                return {
                    url: `/api/tickets?stops_get=${stops}`,
                };
            },
        }),
    }),
});

export const useTickets = TicketsApi.useGetTicketsQuery;

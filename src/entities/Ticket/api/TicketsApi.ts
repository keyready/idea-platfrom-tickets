import { rtkApi } from '@/shared/api/rtkApi';
import { Ticket } from '@/entities/Ticket';

const TicketsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], void>({
            query: () => ({
                url: `/api/tickets`,
            }),
        }),
    }),
});

export const useTickets = TicketsApi.useGetTicketsQuery;

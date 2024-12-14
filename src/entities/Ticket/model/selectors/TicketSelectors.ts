import { StateSchema } from '@/app/providers/StoreProvider';

export const getTicketData = (state: StateSchema) => state.ticket?.data;
export const getTicketIsLoading = (state: StateSchema) => state.ticket?.isLoading;
export const getTicketError = (state: StateSchema) => state.ticket?.error;

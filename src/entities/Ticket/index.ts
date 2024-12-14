export type { Ticket } from './model/types/Ticket';
export type { TicketSchema } from './model/types/TicketSchema';
export { TicketActions, TicketReducer } from './model/slice/TicketSlice';
export { useTickets } from './api/TicketsApi';
export {
    getTicketData,
    getTicketIsLoading,
    getTicketError,
} from './model/selectors/TicketSelectors';

export { TicketsList } from './ui/TicketsList/TicketsList';

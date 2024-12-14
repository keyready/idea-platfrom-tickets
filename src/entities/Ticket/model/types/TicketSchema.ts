import { Ticket } from './Ticket';

export interface TicketSchema {
    data?: Ticket;
    isLoading: boolean;
    error?: string;
}

import { useTickets } from '../../api/TicketsApi';

import { classNames } from '@/shared/lib/classNames';
import { TicketCard } from '@/entities/Ticket/ui/TicketCard/Ticket';
import { VStack } from '@/shared/ui/Stack';

interface TicketsListProps {
    className?: string;
}

export const TicketsList = (props: TicketsListProps) => {
    const { className } = props;

    const { data: tickets, isLoading: isTicketsLoading } = useTickets();

    if (isTicketsLoading) {
        return (
            <div>
                <h1>Загрузка данных....</h1>
            </div>
        );
    }

    if (!tickets && !isTicketsLoading) {
        return (
            <div>
                <h1>Упс... Билетов не найдено</h1>
            </div>
        );
    }

    return (
        <VStack maxW gap="24px" className={classNames('', {}, [className])}>
            {tickets?.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </VStack>
    );
};

import { useSelector } from 'react-redux';
import { RiEmotionSadLine } from '@remixicon/react';

import { useTickets } from '../../api/TicketsApi';
import { TicketCard } from '../TicketCard/Ticket';

import { FiltersBlock, getFiltersData } from '@/entities/Filters';
import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

interface TicketsListProps {
    className?: string;
}

export const TicketsList = (props: TicketsListProps) => {
    const { className } = props;

    const filters = useSelector(getFiltersData);

    const {
        data: tickets,
        isLoading: isTicketsLoading,
        isFetching: isTicketsFetching,
    } = useTickets(filters);

    if (isTicketsLoading || isTicketsFetching) {
        return (
            <HStack gap="24px" maxW className="relative" align="start">
                <FiltersBlock />
                <VStack maxW gap="24px">
                    {new Array(5).fill(0).map(() => (
                        <Skeleton width="100%" height={225} />
                    ))}
                </VStack>
            </HStack>
        );
    }

    if (!tickets?.length && !isTicketsLoading) {
        return (
            <HStack gap="24px" maxW className="relative" align="start">
                <FiltersBlock />
                <VStack gap="24px" className="h-full" justify="center" align="center" maxW flexGrow>
                    <h1 className="text-white text-nowrap text-center text-3xl">
                        Упс... Билетов не найдено <RiEmotionSadLine className="inline" size={64} />
                    </h1>
                    <h2 className="text-white text-nowrap text-center text-xl">
                        Попробуйте изменить параметры поиска
                    </h2>
                </VStack>
            </HStack>
        );
    }

    return (
        <HStack gap="24px" maxW className="relative" align="start">
            <FiltersBlock />
            <VStack maxW gap="24px" className={classNames('', {}, [className])}>
                {tickets?.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </VStack>
        </HStack>
    );
};

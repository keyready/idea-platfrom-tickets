import { useEffect, useState } from 'react';

import { useTickets } from '../../api/TicketsApi';
import { Filters } from '../../model/types/Ticket';
import { TicketCard } from '../TicketCard/Ticket';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useParams } from '@/shared/lib/hooks/useParams';

interface TicketsListProps {
    className?: string;
}

export const TicketsList = (props: TicketsListProps) => {
    const { className } = props;

    const [filter, setFilter] = useState<Filters>({
        price: [0, 50000],
        stops: 'all',
        currency: 'RUB',
    });

    const { data: tickets, isLoading: isTicketsLoading } = useTickets(filter);

    const { getParamValue } = useParams();

    useEffect(() => {
        const currency = getParamValue('currency');
        const stops = getParamValue('stops');
        const price = getParamValue('price');

        console.log(currency, stops, price);

        if (currency) {
            setFilter((prevState) => ({ ...prevState, currency: currency.toString() }));
        }
        if (stops) {
            setFilter((prevState) => ({ ...prevState, stops: stops.toString() }));
        }
        if (price) {
            const priceRange = price
                .toString()
                .split(',')
                .map((pr) => Number(pr));

            setFilter((prevState) => ({ ...prevState, price: priceRange }));
        }
    }, []);

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
        <HStack gap="24px" maxW className="relative" align="start">
            <FiltersBlock />
            <VStack maxW gap="24px" className={classNames('', {}, [className])}>
                {tickets?.map((ticket) => (
                    <TicketCard currency={filter.currency} key={ticket.id} ticket={ticket} />
                ))}
            </VStack>
        </HStack>
    );
};

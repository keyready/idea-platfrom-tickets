import { memo, useCallback } from 'react';
import { Button, Image } from '@nextui-org/react';
import { RiPlaneFill } from '@remixicon/react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames';
import { Ticket } from '@/entities/Ticket';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getFilteredCurrency } from '@/entities/Filters';

interface TicketCardProps {
    className?: string;
    ticket: Ticket;
}

export const TicketCard = memo((props: TicketCardProps) => {
    const { className, ticket } = props;

    const currency = useSelector(getFilteredCurrency);

    const convertCurrency = useCallback(
        (rubCurrency: number) => {
            // конвертация по курсу $1 = 103 руб, 1 eur = 109 руб

            switch (currency) {
                case 'USD':
                    return `$${(rubCurrency / 103).toFixed(2)}`;
                case 'EUR':
                    return `€${(rubCurrency / 109).toFixed(2)}`;
                default:
                    return `${rubCurrency.toLocaleString('ru-RU')}₽`;
            }
        },
        [currency],
    );

    const normalizeCountForm = useCallback((number: number, words_arr: string[]) => {
        number = Math.abs(number);
        if (Number.isInteger(number)) {
            const options = [2, 0, 1, 1, 1, 2];
            return `${number} ${
                words_arr[
                    number % 100 > 4 && number % 100 < 20
                        ? 2
                        : options[number % 10 < 5 ? number % 10 : 5]
                ]
            }`;
        }
        return `${number} ${words_arr[1]}`;
    }, []);

    return (
        <HStack
            gap="48px"
            maxW
            className={classNames('py-10 px-5 bg-white rounded-md', {}, [className])}
        >
            <VStack gap="12px" align="center">
                <Image
                    className="w-80"
                    alt={ticket.carrier}
                    src={`/carriers/${ticket.carrier.toLowerCase()}-logo.webp`}
                />
                <Button color="secondary" className="py-8 px-10 rounded-sm">
                    <VStack align="center">
                        <p>Купить</p>
                        <p className="text-l block">за {convertCurrency(ticket.price)}</p>
                    </VStack>
                </Button>
            </VStack>
            <VStack maxW justify="start" align="center" className="h-full py-5" flexGrow>
                <HStack gap="24px" justify="between" className="w-4/5">
                    <VStack>
                        <h1 className="text-black text-3xl mb-5 ">{ticket.arrival_time}</h1>
                        <h1 className="text-black leading-none text-m text-nowrap">
                            {ticket.origin}, {ticket.origin_name}
                        </h1>
                        <HStack maxW>
                            <h1 className="opacity-50 text-black text-nowrap leading-none text-m">
                                {new Date(ticket.departure_date).toLocaleString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                })}
                                ,
                            </h1>
                            <h1 className="opacity-50 text-black text-nowrap leading-none text-m">
                                {new Date(ticket.departure_date)
                                    .toLocaleString('ru-RU', {
                                        weekday: 'short',
                                    })
                                    .toUpperCase()}
                            </h1>
                        </HStack>
                    </VStack>

                    <div className="w-full relative">
                        <p className="text-black uppercase text-s absolute bottom-0 -translate-y-2/4 -translate-x-2/4 left-2/4">
                            {ticket.stops
                                ? normalizeCountForm(ticket.stops, [
                                      'пересадка',
                                      'пересадки',
                                      'пересадок',
                                  ])
                                : 'без пересадок'}
                        </p>
                        <div className="w-full h-1 bg-secondary rounded-md" />
                        <RiPlaneFill
                            size={48}
                            className="text-secondary absolute rotate-90 -right-2 top-2/4 -translate-y-2/4"
                        />
                    </div>

                    <VStack>
                        <h1 className="text-black text-3xl mb-5 ">{ticket.departure_time}</h1>
                        <h1 className="text-black leading-none text-m text-nowrap">
                            {ticket.destination}, {ticket.destination_name}
                        </h1>
                        <HStack maxW>
                            <h1 className="opacity-50 text-black text-nowrap leading-none text-m">
                                {new Date(ticket.arrival_date).toLocaleString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                })}
                                ,
                            </h1>
                            <h1 className="opacity-50 text-black text-nowrap leading-none text-m">
                                {new Date(ticket.arrival_date)
                                    .toLocaleString('ru-RU', {
                                        weekday: 'short',
                                    })
                                    .toUpperCase()}
                            </h1>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </HStack>
    );
});

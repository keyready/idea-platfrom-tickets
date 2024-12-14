import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Radio,
    RadioGroup,
    Slider,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiArrowDownLine } from '@remixicon/react';
import { useDebounce } from 'use-debounce';

import { Currency, Destinations, Filters } from '../../model/types/Filters';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useParams } from '@/shared/lib/hooks/useParams';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { FiltersActions } from '@/entities/Filters';

interface FiltersBlockProps {
    className?: string;
}

export const FiltersBlock = (props: FiltersBlockProps) => {
    const { className } = props;

    const [selectedCurrency, setSelectedCurrency] = useState<Currency>('RUB');
    const [selectedStopsCount, setSelectedStopsCount] = useState<string>('all');
    const [selectedAmountRange, setSelectedAmountRange] = useState<number[]>([0, 35000]);
    const [selectedArrival, setSelectedArrival] = useState(new Set(['ANY']));
    const [selectedDestination, setSelectedDestination] = useState(new Set(['ANY']));

    const dispatch = useAppDispatch();

    const [debouncedFilters] = useDebounce<Filters>(
        {
            currency: selectedCurrency as Currency,
            stops: selectedStopsCount.toString(),
            price: selectedAmountRange,
            destination: Array.from(selectedDestination)[0],
            origin: Array.from(selectedArrival)[0],
        },
        500,
    );

    const { setParams, getParamValue, getParams } = useParams();

    useEffect(() => {
        const currency = getParamValue('currency');
        const stops = getParamValue('stops');
        const price = getParamValue('price');
        const destination = getParamValue('destination');
        const arrival = getParamValue('arrival');

        if (currency) {
            setSelectedCurrency(currency as Currency);
        }
        if (destination) {
            setSelectedStopsCount(destination.toString());
        }
        if (arrival) {
            setSelectedStopsCount(arrival.toString());
        }
        if (stops) {
            setSelectedStopsCount(stops.toString());
        }
        if (price) {
            const priceRange = price
                .toString()
                .split(',')
                .map((pr) => Number(pr));
            setSelectedAmountRange(priceRange);
        }
    }, []);

    useEffect(() => {
        setParams({
            stops: debouncedFilters?.stops || 'all',
            currency: debouncedFilters?.currency || '',
            destination: debouncedFilters?.destination || '',
            origin: debouncedFilters?.origin || '',
            price: debouncedFilters.price?.join(',') || '',
        });

        dispatch(FiltersActions.setFilters(debouncedFilters));
    }, [debouncedFilters]);

    const handleDisableFilters = useCallback(() => {
        dispatch(
            FiltersActions.setFilters({
                price: [0, 35000],
                stops: 'all',
                currency: 'RUB',
                destination: 'ANY',
                origin: 'ANY',
            }),
        );
        setSelectedCurrency('RUB');
        setSelectedStopsCount('all');
        setSelectedArrival(new Set(['ANY']));
        setSelectedDestination(new Set(['ANY']));
        setSelectedAmountRange([0, 35000]);
    }, [dispatch]);

    const getUpperCurrencyPrice = useMemo(() => {
        switch (selectedCurrency) {
            case 'USD':
                return 35000 / 103;
            case 'EUR':
                return 35000 / 109;
            default:
                return 35000;
        }
    }, [selectedCurrency]);

    const labelsMap: Record<Destinations, string> = useMemo(
        () => ({
            ANY: 'Любой',
            TLV: 'Тель-Авив',
            UFA: 'Уфа',
            LRN: 'Ларнака',
            VVO: 'Владивосток',
        }),
        [],
    );

    const selectedArrivalValue = Array.from(selectedArrival)[0];
    const selectedDestinationValue = Array.from(selectedDestination)[0];

    return (
        <VStack
            gap="24px"
            className={classNames('bg-white sticky top-0 p-5 rounded-md', {}, [className])}
        >
            <VStack maxW>
                <p className="text-m uppercase text-black">Валюта</p>
                <ButtonGroup>
                    <Button
                        color={selectedCurrency === 'RUB' ? 'secondary' : 'default'}
                        onClick={() => setSelectedCurrency('RUB')}
                    >
                        RUB
                    </Button>
                    <Button
                        color={selectedCurrency === 'USD' ? 'secondary' : 'default'}
                        onClick={() => setSelectedCurrency('USD')}
                    >
                        USD
                    </Button>
                    <Button
                        color={selectedCurrency === 'EUR' ? 'secondary' : 'default'}
                        onClick={() => setSelectedCurrency('EUR')}
                    >
                        EUR
                    </Button>
                </ButtonGroup>
            </VStack>

            <VStack maxW>
                <p className="text-m uppercase text-black">количество пересадок</p>
                <RadioGroup
                    value={selectedStopsCount}
                    onValueChange={(ev) => setSelectedStopsCount(ev)}
                >
                    <Radio color="secondary" value="all">
                        Все
                    </Radio>
                    <Radio color="secondary" value="0">
                        Без пересадок
                    </Radio>
                    <Radio color="secondary" value="1">
                        1 пересадка
                    </Radio>
                    <Radio color="secondary" value="2">
                        2 пересадки
                    </Radio>
                    <Radio color="secondary" value="3">
                        3 пересадки
                    </Radio>
                    <Radio color="secondary" value="4">
                        4 пересадки
                    </Radio>
                </RadioGroup>
            </VStack>

            <VStack maxW>
                <p className="text-m uppercase text-black">стоимость</p>
                <Slider
                    value={selectedAmountRange}
                    onChange={(value) => setSelectedAmountRange(value as number[])}
                    classNames={{
                        label: 'text-black',
                        value: 'text-black',
                    }}
                    color="secondary"
                    showTooltip
                    defaultValue={[0, 35000]}
                    formatOptions={{
                        style: 'currency',
                        currency: selectedCurrency,
                        maximumSignificantDigits: 3,
                    }}
                    maxValue={getUpperCurrencyPrice}
                    minValue={0}
                />
            </VStack>

            <VStack maxW>
                <p className="text-m uppercase text-black">Вылет из</p>
                <ButtonGroup className="w-full" color="secondary">
                    <Button className="w-full text-left">
                        {labelsMap[selectedArrivalValue as Destinations]}
                    </Button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly>
                                <RiArrowDownLine size={18} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Вылет из"
                            selectedKeys={selectedArrival}
                            selectionMode="single"
                            onSelectionChange={(ev) =>
                                setSelectedArrival(new Set([ev.currentKey as string]))
                            }
                        >
                            <DropdownItem key="ANY">{labelsMap.ANY}</DropdownItem>
                            <DropdownItem key="TLV">{labelsMap.TLV}</DropdownItem>
                            <DropdownItem key="UFA">{labelsMap.UFA}</DropdownItem>
                            <DropdownItem key="LRN">{labelsMap.LRN}</DropdownItem>
                            <DropdownItem key="VVO">{labelsMap.VVO}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ButtonGroup>
            </VStack>
            <VStack maxW>
                <p className="text-m uppercase text-black">Назначение</p>
                <ButtonGroup className="w-full" color="secondary">
                    <Button className="w-full text-left">
                        {labelsMap[selectedDestinationValue as Destinations]}
                    </Button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly>
                                <RiArrowDownLine size={18} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Вылет из"
                            selectedKeys={selectedDestination}
                            selectionMode="single"
                            onSelectionChange={(ev) =>
                                setSelectedDestination(new Set([ev.currentKey as string]))
                            }
                        >
                            <DropdownItem key="ANY">{labelsMap.ANY}</DropdownItem>
                            <DropdownItem key="TLV">{labelsMap.TLV}</DropdownItem>
                            <DropdownItem key="UFA">{labelsMap.UFA}</DropdownItem>
                            <DropdownItem key="LRN">{labelsMap.LRN}</DropdownItem>
                            <DropdownItem key="VVO">{labelsMap.VVO}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ButtonGroup>
            </VStack>

            <Button onClick={handleDisableFilters} className="self-end" size="sm" color="danger">
                <h1 className="text-m uppercase">сбросить</h1>
            </Button>
        </VStack>
    );
};

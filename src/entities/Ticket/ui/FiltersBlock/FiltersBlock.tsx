import { Button, ButtonGroup, Radio, RadioGroup, Slider } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useParams } from '@/shared/lib/hooks/useParams';

type Currency = 'RUB' | 'EUR' | 'USD';

interface FiltersBlockProps {
    className?: string;
}

export const FiltersBlock = (props: FiltersBlockProps) => {
    const { className } = props;

    const [selectedCurrency, setSelectedCurrency] = useState<Currency>('RUB');
    const [selectedStopsCount, setSelectedStopsCount] = useState<string>('all');
    const [selectedAmountRange, setSelectedAmountRange] = useState<number[]>([0, 50000]);

    const { setParams, getParamValue, getParams } = useParams();

    useEffect(() => {
        const currency = getParamValue('currency');
        const stops = getParamValue('stops');
        const price = getParamValue('price');

        if (currency) {
            setSelectedCurrency(currency as Currency);
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
            stops: selectedStopsCount,
            currency: selectedCurrency,
            price: `${selectedAmountRange[0].toString()},${selectedAmountRange[1].toString()}`,
        });
    }, [selectedCurrency, selectedStopsCount, selectedAmountRange]);

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
                    defaultValue={[0, 50000]}
                    formatOptions={{
                        style: 'currency',
                        currency: selectedCurrency,
                        maximumSignificantDigits: 3,
                    }}
                    maxValue={50000}
                    minValue={0}
                    step={1000}
                />
            </VStack>
        </VStack>
    );
};

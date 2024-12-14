export type Currency = 'RUB' | 'EUR' | 'USD';

export interface Filters {
    price?: number[];
    currency?: Currency;
    stops?: string;
}

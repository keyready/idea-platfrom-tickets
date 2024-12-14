export type Currency = 'RUB' | 'EUR' | 'USD';
export type Destinations = 'ANY' | 'TLV' | 'UFA' | 'LRN' | 'VVO';
export interface Filters {
    price?: number[];
    currency?: Currency;
    stops?: string;
    destination?: string;
    origin?: string;
}

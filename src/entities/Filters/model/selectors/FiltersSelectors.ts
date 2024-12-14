import { Filters } from '../types/Filters';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getFiltersData = (state: StateSchema) =>
    state.filters?.data ||
    ({
        currency: 'RUB',
        stops: 'all',
        price: [0, 35000],
    } as Filters);
export const getFilteredCurrency = (state: StateSchema) => state.filters.data?.currency || 'RUB';
export const getFiltersIsLoading = (state: StateSchema) => state.filters?.isLoading;
export const getFiltersError = (state: StateSchema) => state.filters?.error;

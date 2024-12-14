import { Filters } from './Filters';

export interface FiltersSchema {
    data?: Filters;
    isLoading: boolean;
    error?: string;
}

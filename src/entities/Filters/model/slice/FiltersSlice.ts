import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FiltersSchema } from '../types/FiltersSchema';
import { Filters } from '../types/Filters';

const initialState: FiltersSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const FiltersSlice = createSlice({
    name: 'FiltersSlice',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
            state.data = { ...state.data, ...action.payload };
        },
    },
});

export const { actions: FiltersActions } = FiltersSlice;
export const { reducer: FiltersReducer } = FiltersSlice;

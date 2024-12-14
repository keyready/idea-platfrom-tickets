import { createSlice } from '@reduxjs/toolkit';

import { TicketSchema } from '../types/TicketSchema';

const initialState: TicketSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const TicketSlice = createSlice({
    name: 'TicketSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const { actions: TicketActions } = TicketSlice;
export const { reducer: TicketReducer } = TicketSlice;

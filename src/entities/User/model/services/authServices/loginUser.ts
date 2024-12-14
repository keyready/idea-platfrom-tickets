import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { User } from '../../types/User';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const loginUser = createAsyncThunk<string, User, ThunkConfig<string>>(
    'User/loginUser',
    async (newUser, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/auth/login', newUser);

            if (response.status > 300) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.error || 'Произошла ошибка');
        }
    },
);

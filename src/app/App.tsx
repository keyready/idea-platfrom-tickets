import { Suspense } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames';
import { AppRouter } from '@/app/providers/AppRouter';
import { Toaster } from '@/widgets/Toaster';
import { Navbar } from '@/widgets/Navbar';

export const App = () => {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <div className={classNames('app', {}, [])}>
                <Suspense fallback="">
                    <Navbar />
                    <AppRouter />
                    <Toaster />
                </Suspense>
            </div>
        </NextUIProvider>
    );
};

import { useNavigate } from 'react-router-dom';

import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { TicketsList } from '@/entities/Ticket';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <TicketsList />
        </Page>
    );
};

export default MainPage;

import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { TicketsList } from '@/entities/Ticket';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <TicketsList />
    </Page>
);

export default MainPage;

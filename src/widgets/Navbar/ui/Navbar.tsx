import classes from './Navbar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    return (
        <HStack
            className={classNames(classes.Navbar, {}, [className])}
            align="center"
            justify="between"
            gap="64px"
        >
            <AppLink className="text-l" to={RoutePath.main}>
                IDEA Platform's Tickets Shop
            </AppLink>
            <h1>created by keyready</h1>
        </HStack>
    );
};

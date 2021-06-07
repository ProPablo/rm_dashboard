import * as React from 'react';
import { AppBar, Layout, MenuProps } from 'react-admin';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { Typography, useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
// import { withRouter } from 'react-router-dom';
import MapIcon from '@material-ui/icons/Map';
import AboutIcon from '@material-ui/icons/Info';
import { useAppBarStyles } from './AppTheme';

const Menu = ({ onMenuClick, logout }: MenuProps) => {
    const isXSmall = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
    const open = useSelector((state: any) => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div>
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/map"
                primaryText="Map"
                leftIcon={<MapIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            <MenuItemLink
                to="/about"
                primaryText="About"
                leftIcon={<AboutIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {isXSmall && logout}
        </div>
    );
}

const MyAppBar = (props: any) => {
    const classes = useAppBarStyles();
    return (
        <div>
            <span className={classes.spacer} />
            <AppBar {...props} className={classes.appBarTitle}>
                <Typography
                    variant="h5"
                    color="inherit"

                    className={classes.title}
                >
                    Display Information and Guidance System - Management Portal
                </Typography>
            </AppBar>
            <Typography
                variant="h5"
                color="inherit"

                className={classes.tabTitle}
                id="react-admin-title"
            />

        </div>

    );
};

export const AppLayout = (props: any) => <Layout {...props} appBar={MyAppBar} menu={Menu} />;

import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';

export const AppLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

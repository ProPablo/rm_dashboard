import ChevronLeft from '@material-ui/icons/ChevronLeft';
import React from 'react';
import { EditActionsProps, ListButton, TopToolbar } from 'react-admin';
import './App.css';

export const ResourceActions = ({ basePath, data }: EditActionsProps) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    </TopToolbar>
  );
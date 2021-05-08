import ChevronLeft from '@material-ui/icons/ChevronLeft';
import React from 'react';
import { EditActionsProps, ImageField, ImageInput, ListButton, TopToolbar } from 'react-admin';
import './App.css';
import { useListStyles } from './AppTheme';



export const ResourceActions = ({ basePath, data }: EditActionsProps) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    </TopToolbar>
);


export const ConditionalThumbnailEdit = (formData: any) => {
    const classes = useListStyles();
    return (
        <div>
            <ImageInput source="InputMedia" label="Thumbnail" labelSingle={!!formData.thumbnail ? "Replace image" : "Drag an image into here"} accept="image/*" maxSize={1000000}>
                <ImageField source="src" title="title" />
            </ImageInput>
            <img src={formData.thumbnail} className={classes.editImage} />
        </div>
    )
}
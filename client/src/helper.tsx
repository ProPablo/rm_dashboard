import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-final-form';
import { Button } from '@material-ui/core';
import { EditActionsProps, ImageField, ImageInput, ListButton, TopToolbar, useNotify } from 'react-admin';
import './App.css';
import { useListStyles } from './AppTheme';
import DeleteIcon from "@material-ui/icons/Delete";

export const ResourceActions = ({ basePath, data }: EditActionsProps) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    </TopToolbar>
);

export const ConditionalThumbnailEdit = (formData: any) => {
    const classes = useListStyles();
    const form = useForm();
    const notify = useNotify();
    const OnClearThumbnail = () => {
        form.change('thumbnail', undefined)
        notify("Thumbnail cleared")
    }
    const OnBadThumbnail = () => {
        notify("Invalid thumbnail, size limit may be exceeded");
    }
    return (
        <div>
            
            <ImageInput source="InputMedia" label="Thumbnail" labelSingle={!!formData.thumbnail ? "Replace image" : "Drag an image into here"} accept="image/*" maxSize={1000000} options={{onDropRejected: OnBadThumbnail}}>
                <ImageField source="src" title="title"/>
            </ImageInput>
            {!!formData.thumbnail && <div className={classes.thumbnail}>
                <div className={classes.thumbnailHead}>Current Thumbnail</div>
                <img src={formData.thumbnail} className={classes.editImage}/>
                <Button variant='contained' startIcon={<DeleteIcon/>} title="Clear Thumbnail" onClick={OnClearThumbnail} className={classes.button}>Clear Thumbnail</Button>
            </div>}
        </div>
    )
}

export function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

//reactdnd
export const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
import { useEffect, useState } from "react";
import { TextInput } from "react-admin";
import { useMouseMove } from "./useMouseMove";
import { makeStyles, Typography, Button, Box, TextField as MuiTextField, Grid } from '@material-ui/core';
import { useForm, useField } from 'react-final-form';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrows';

export interface DragNumberProps {
    name: string
}

const useStyles = makeStyles(theme => ({
    dragNumeric: {
        display: "flex",
        border: "1px solid #CCC",
        alignItems: "center",
        borderRadius: 4,
        fontFamily: "sans-serif",
        width: 250,
        margin: "20px auto"
    },
    dragNumericInput: {
        flexGrow: 1,
        margin: "2px 2px"
    },
    dragNumericIcon: {
        margin: "0px 15px",
        cursor: "ew-resize"
    },
    goodbye: {
        display: "none"
    }
}));

export const DragNumber = ({ name }: DragNumberProps) => {
    const styles = useStyles();
    const form = useForm();
    var formdata = form.getState().values;
    const mouse = useMouseMove();
    const [startPoint, setStartPoint] = useState<null | number>(null);
    const [startValue, setStartValue] = useState<number>(formdata[name]);

    function onStart(e: React.MouseEvent) {
        setStartPoint(mouse.x);
        setStartValue(formdata[name]);
        document.body.style.cursor = "ew-resize"
    }

    useEffect(() => {
        if (startPoint === null) return;
        // console.log("mouseHold")
        const newVal = (mouse.x - startPoint) + startValue;
        form.change(name, newVal);
    }, [startPoint, startValue, mouse])

    function onEnd(e: MouseEvent) {
        setStartPoint(null);
        setStartPoint(null);
        document.body.style.cursor = "auto"
    }

    function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        form.change(name, e.target.value);
    }

    useEffect(() => {
        document.addEventListener('mouseup', onEnd);
        return () => {
            document.removeEventListener('mouseup', onEnd);
        }
    }, [])

    return (
        <div className={styles.dragNumeric}>
            <TextInput source={name} disabled className={styles.goodbye} />
            <CompareArrowsSharpIcon className={styles.dragNumericIcon} onMouseDown={onStart} />
            <MuiTextField className={styles.dragNumericInput} type="number" id={`dragnum-${name}`} label={name} value={formdata[name]} onChange={onTextChange} />
        </div>
    )
}
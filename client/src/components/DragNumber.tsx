import { useEffect, useState } from "react";
import { TextField, TextInput } from "react-admin";
import { useMouseMove } from "./useMouseMove";
import { makeStyles, Typography, Button, Box, TextField as MuiTextField, Grid } from '@material-ui/core';
import { useForm } from 'react-final-form';
import { useField, Field } from 'react-final-form';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrows';

export interface DragNumberProps {
    name: string,
    max?: number,
    min?: number,
}

const useStyles = makeStyles(theme => ({
    dragNumeric: {
        display: "flex",
        // border: "1px solid #CCC",
        alignItems: "center",
        fontFamily: "sans-serif",
        width: 250,
        margin: "20px auto"
    },
    dragNumericInput: {
        flexGrow: 1,
        margin: "2px 2px",
    },
    dragNumericIcon: {
        transition: '0.3s',
        '&:hover': {
            color: "white",
            backgroundColor: "#92202C"
        },
        marginRight: "10px",
        cursor: "ew-resize",
        border: "1px solid #CCC",
        padding: "10px",
        borderRadius: 4,
    },
    numberInput: {
        margin: '1rem 0 1rem',
        width: '100%',
        padding: '12px',
        boxSizing: 'border-box',
    },
    goodbye: {
        display: "none"
    }
}));

function clamp(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
}

export const DragNumber = (props: DragNumberProps) => {
    const styles = useStyles();
    const form = useForm();
    
    var formdata = form.getState().values;
    const mouse = useMouseMove();
    const [startPoint, setStartPoint] = useState<null | number>(null);
    const [startValue, setStartValue] = useState<number>(0);

    function onStart(e: React.MouseEvent) {
        setStartPoint(mouse.x);
        setStartValue(formdata[props.name]);
        document.body.style.cursor = "ew-resize"
    }

    useEffect(() => {
        if (startPoint === null || startValue == null) return;
        console.log("mouseHold")
        let newVal = (mouse.x - startPoint) + startValue;
        if (props.min != null && props.max != null) {
            newVal = clamp(newVal, props.min, props.max)
        }
        form.change(props.name, newVal);
    }, [startPoint, startValue, mouse])

    function onEnd(e: MouseEvent) {
        setStartPoint(null);
        document.body.style.cursor = "auto"
    }

    function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("text changed", e.target.value);
        form.change(props.name, e.target.value);
    }

    useEffect(() => {
        document.addEventListener('mouseup', onEnd);
        return () => {
            document.removeEventListener('mouseup', onEnd);
        }
    }, [])

    // useEffect(()=> {
    //     if (startValue != null) return;
    //     setStartValue([formdata[name])
    // }, [formdata[name], startValue])

    return (
        <div className={styles.dragNumeric}>
            {/* this is to prevent number hopping - KEEP THIS */}
            <TextField source={props.name} className={styles.goodbye} />
            <CompareArrowsSharpIcon className={styles.dragNumericIcon} onMouseDown={onStart} />
            {/* <input type="number" value={form.getState().values[name]} onChange={onTextChange} ></input> */}
            <Field name={props.name} component="input" type="number" placeholder="0" className={styles.numberInput}/>
            {/* <MuiTextField className={styles.dragNumericInput} type="number" id={`dragnum-${name}`} label={name} value={formdata[name]} onChange={onTextChange} /> */}
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { Title, TextField, TextInput, SimpleForm } from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import { SERVER_URL } from '../constants';
import { useForm, SubmitHandler } from 'react-hook-form'; 

// state - variables set through setState instead of normal assignment 
interface AboutState {
    companyName: string,
    streetName: string,
    addressDetails: string,
    phone: string,
    email: string,
    rssi: string,
    beaconTimeout: string,
}
interface AboutProps { // children do not get write access, props cannot change
    version: string // you can still parse in setVersion if you want to give write 'access' 
}

export const AboutPage = (props: AboutProps) => {
    const { register, handleSubmit } = useForm();
    const classes = useAboutStyles();
    const handleFetch = async () => { // asynchronous function return promise
        const result = await fetch(`${SERVER_URL}/about`);  // can await promise, to get actual value
        const jsonResult = await result.json();
        setInfo(jsonResult);
    }
    const onSubmit:any = async (data: any) => {
        const res = await fetch(`${SERVER_URL}/about`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(await res.json());
    }
    //const [count, setCount] = useState(0); // [variable, function] useState(initial) - constructor, creates the two STATEFUL variables. always returns array
    const [info, setInfo] = useState<AboutState|null>(null);
    // state is like an equals sign
    // you cannot mutate stateful components directly
    useEffect(() => {
        handleFetch(); // what the function is actually doing
    }, []) // dependency array, if nothing runs on render

    return (
        <>
            <Title title="About" />
            <div className={classes.card}>
                <h1>Settings</h1>
                <div className={classes.settingsContainer}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{backgroundColor:"#F2F3F9"}}>
                        <label className={classes.formLabel}>Beacon RSSI Threshold: </label>
                        {/* TODO: validation, success message */}
                        <input placeholder={info?.rssi} className={classes.formInput} type="number" {...register("rssi")}/><br/>
                        <label className={classes.formLabel}>Beacon Timeout Window: </label>
                        <input placeholder={info?.beaconTimeout} className={classes.formInput} type="number" {...register("beaconTimeout")}/><br/>
                        <input className={classes.formButton} type="submit"/>
                    </form>
                </div>
            </div>
            {!!info &&
                <div className={classes.card}>
                    <h1>{info.companyName}</h1>
                    <div className={classes.aboutContainer}>
                        <p><strong>Street Name:</strong> {info.streetName}</p>
                        <p><strong>Address:</strong> {info.addressDetails}</p>
                        <p><strong>Phone:</strong> {info.phone}</p>
                        <p><strong>Email:</strong> {info.email}</p>
                    </div>
                </div>
            }
        </>
    );
}

const useAboutStyles = makeStyles({
    card: {
        overflow: 'hidden',
        margin: '2rem',
        padding: '1rem 0 0 0',
        backgroundColor: '#F2F3F9',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.5)',
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
        }
    },
    aboutContainer: {
        margin: '4vw',
        borderRadius: '0.5rem',
        backgroundColor: '#E9EAEE',
        padding: '1rem 15vw 1rem 15vw',
    },
    settingsContainer: {
        margin: '0.5vw',
        borderRadius: '0.5rem',
        backgroundColor: '#F2F3F9',
        padding: '1rem 15vw 1rem 15vw',
    },
    formInput: {
        margin: '1rem 0 1rem',
        width: '100%',
        padding: '12px 20px',
        boxSizing: 'border-box',
    },
    formLabel: {
        fontWeight: "bold",
    },
    formButton: {
        fontSize: '17px',
        fontWeight: 'bold',
        borderRadius: '0.25rem',
        borderColor: '#92202C',
        backgroundColor: '#92202C',
        color: 'white',
        margin: '1rem 0 1rem',
        padding: '1vh 10vw 1vh 10vw',
        "&:hover": {
            backgroundColor: "#710901"
        }
    }, 
})


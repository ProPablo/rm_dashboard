import React, { useEffect, useState } from "react";
import { Title } from "react-admin";
import { SERVER_URL } from '../constants';
// state - variables set through setState instead of normal assignment 

interface AboutProps { // children do not get write access, props cannot change
    version: string // you can still parse in setVersion if you want to give write 'access' 
}

export const AboutPage = (props: AboutProps) => {
    //const [count, setCount] = useState(0); // [variable, function] useState(initial) - constructor, creates the two STATEFUL variables. always returns array
    const [info, setInfo] = useState(null);
    // state is like an equals sign
    // you cannot mutate stateful components directly
    const handleFetch = async () => { // asynchronous function return promise
        const result = await fetch(`${SERVER_URL}/about`);  // can await promise, to get actual value
        const jsonResult = await result.json();
        setInfo(jsonResult);
    }
    useEffect(() => {
        handleFetch(); // what the function is actually doing
    }, []) // dependency array, if nothing runs on render

    return (
        <div>
            <Title title="About" />
            <p>{JSON.stringify(info, null, 2)} {props.version}</p>
        </div>
    );
}


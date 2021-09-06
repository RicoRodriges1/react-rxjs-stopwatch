import React, { useRef, useEffect } from 'react';
import { fromEvent } from "rxjs";
import { map, buffer, filter, debounceTime } from "rxjs/operators";


function BtnComponent({ start, pause, reset, resume, stop, status }) {

    const ref = useRef(null);
    useEffect(() => {
        const mouse$ = fromEvent(ref.current, 'click');
        const buff$ = mouse$.pipe(debounceTime(250));
        const click$ = mouse$.pipe(
            buffer(buff$),
            map(list => {
                return list.length;
            }),
            filter(x => x === 2),
        )
        click$.subscribe(pause)
    })
    function startstyle(status) {
        if (status === 0) {
            return { display: 'inline' }
        } else return { display: 'none' }
    }
    function runstyle(status) {
        if (status === 1) {
            return { display: 'inline' }
        } return { display: 'none' }
    }
    function pausestyle(status) {
        if (status === 2) {
            return { display: 'inline' }
        } return { display: 'none' }
    }

    return (
        <div className="btns">
            <div style={startstyle(status)}>
                <button onClick={start}>Start/Stop</button>
            </div>
            <div style={runstyle(status)}>
                <button onClick={stop}>Start/Stop</button>
                <button ref={ref} >Wait</button>
                <button onClick={reset}>Reset</button>
            </div>
            <div style={pausestyle(status)}>
                <button onClick={resume}>Start/Stop</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default BtnComponent;
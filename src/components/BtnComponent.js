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
                <button className="stopwatch-btn stopwatch-btn-blu"
                    onClick={start}>Start/Stop</button>
            </div>




            <div style={runstyle(status)}>
                <button className="stopwatch-btn stopwatch-btn-red"
                    onClick={stop}>Start/Stop</button>

                <button className="stopwatch-btn stopwatch-btn-red"
                    ref={ref} >Wait</button>

                <button className="stopwatch-btn stopwatch-btn-yel"
                    onClick={reset}>Reset</button>
            </div>



            <div style={pausestyle(status)}>
                <button className="stopwatch-btn stopwatch-btn-blu"
                    onClick={resume}>Start/Stop</button>

                <button className="stopwatch-btn stopwatch-btn-yel"
                    onClick={reset}>Reset</button>
            </div>


        </div>
    );
}

export default BtnComponent;
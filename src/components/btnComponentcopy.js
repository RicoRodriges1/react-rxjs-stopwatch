import React, { useRef, useEffect } from 'react';
import { fromEvent } from "rxjs";
import { map, buffer, filter, debounce, subscribe } from "rxjs/operators";

function BtnComponent({ start, pause, reset, resume, stop, status }) {
    
    const ref = useRef(null);
    useEffect(() => {
        const clickStream = fromEvent(ref.current, 'click')
            .subscribe(() => {
                console.log('сюда нада функцію паузи');
            })
        return () => clickStream.unsubscribe();
    }, [])

    return (
        <div>
            {(status === 0) ?
                <div>
                    <button  className="stopwatch-btn stopwatch-btn-blu"
                        onClick={start}>Start/Stop</button> 
                    <button className="stopwatch-btn stopwatch-btn-red"
                         ref={ref} style={{display: "none"}}>Wait</button>
                </div> : ""

            }

            {(status === 1) ?
                <div>
                    <button className="stopwatch-btn stopwatch-btn-red"
                        onClick={stop}>Start/Stop</button>

                    <button className="stopwatch-btn stopwatch-btn-red"
                        onClick={pause} ref={ref} >Wait</button>

                    <button className="stopwatch-btn stopwatch-btn-yel"
                        onClick={reset}>Reset</button>
                </div> : ""
            }

            {(status === 2) ?
                <div>
                    <button className="stopwatch-btn stopwatch-btn-blu"
                        onClick={resume}>Start/Stop</button>

                    <button className="stopwatch-btn stopwatch-btn-yel"
                        onClick={reset}>Reset</button>
                </div> : ""
            }

        </div>
    );
}

export default BtnComponent;
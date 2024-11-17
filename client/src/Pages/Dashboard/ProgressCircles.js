import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from "./ProgressProvider";
function ProgressCircles ( { percentage, text, color } )
{
    return (
        <div> <ProgressProvider valueStart={ 0 } valueEnd={ percentage }>
            { ( percentage ) => (
                <CircularProgressbarWithChildren
                    value={ percentage }
                    styles={ buildStyles( {
                        rotation: 0,
                        strokeLinecap: 'round',
                        textSize: '16px',
                        pathTransitionDuration: 1,
                        pathColor: `rgba(255, 255, 255, ${ ( percentage + 10 ) / 100 })`,
                        textColor: color,
                        trailColor: color,
                    } ) }
                >
                    <div className="flex flex-col items-center justify-center text-2xl" style={ { color: color } }>
                        <div>{ percentage }%</div>
                        <div>{ text }</div>
                    </div>
                </CircularProgressbarWithChildren>
            ) }
        </ProgressProvider>
        </div>
    );
}

export default ProgressCircles;
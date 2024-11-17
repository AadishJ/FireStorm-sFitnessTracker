import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
function Boxes ( { src, name, value } )
{
    
    const percentage = 66;
    return (
        <div className='w-64 h-64'>
            <CircularProgressbar
                value={ percentage }
                text={ `${ percentage }%` }
                styles={ buildStyles( {
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 1,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',

                    // Text size
                    textSize: '16px',

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(62, 152, 199, ${ percentage / 100 })`,
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                } ) }
            />;
 {/* <div className="w-64 h-64 border-8 border-brightPurple relative box-content rounded-full flex items-center justify-center">
                    <div className="flex items-end text-white font-roboto">
                        <img src={ src } alt="" className="mr-4" />
                        <div>
                            <div>{name}</div>
                        <div>{ value }</div>
                        </div>
                    </div>
                </div> */}
        </div>
    );
}

export default Boxes;
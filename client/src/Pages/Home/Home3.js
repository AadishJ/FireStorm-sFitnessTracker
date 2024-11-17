import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import computer from "../../Assets/Images/Computer-removebg-preview.png"

function Home3 ()
{
    const controls = useAnimation();
    const [ ref, inView ] = useInView( { triggerOnce: true } );

    useEffect( () =>
    {
        if ( inView )
        {
            controls.start( { opacity: 1, y: 0 } );
        }
    }, [ controls, inView ] );

    return (
        <div className="">
            <div className="bg-newPurple w-full h-80 mt-52 flex items-center justify-between">
                <div className="flex flex-col items-center justify-start w-5/12 ml-20 gap-2">
                    <div className="font-outfit font-semibold text-4xl text-white mt-4">
                        We make your fitness journey
                    </div>
                    <div className="font-outfit font-semibold text-4xl text-anotherPurple">
                        simple and effective
                    </div>
                    <div className="flex text-center font-roboto text-2xl text-white mt-6 leading-relaxed">Elevate your fitness journey with our portal, where you can seamlessly track your gym, yoga, and cardio workouts while receiving detailed and accurate performance insights to help you improve every step of the way.</div>
                </div>
                <div>
                    <motion.img
                        ref={ ref }
                        src={ computer }
                        alt=""
                        initial={ { opacity: 0, y: 30 } }
                        animate={ controls }
                        transition={ { duration: .9, delay: 0.3 } }
                        className="w-9/12"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home3;
import { useEffect } from "react";
import GymEditor from "./GymEditor";
import { TbXboxX } from "react-icons/tb";
import YogaEditor from "./YogaEditor";
import DietEditor from "./DietEditor";
import CardioEditor from "./CardioEditor";

function EditorSetup ({type,id,exercise,handleClose,editor,setEditor})
{
    const num = type === "gym" ? 0 : type === "yoga" ? 1 : type === "diet" ? 2 : 3;
    const render = () =>
    {
        if ( editor[ 0 ] )
        {
            return <GymEditor id={ id } exerciseName={ exercise } />
        }
        else if ( editor[ 1 ] )
        {
            return <YogaEditor id={ id } exercise={exercise} />
        }
        else if ( editor[ 2 ] )
        {
            return <DietEditor id={ id } exercise={exercise} />
        }
        else if ( editor[ 3 ] )
        {
            return <CardioEditor id={ id } exercise={ exercise } />
        } else
        {
            return null;
        }
    }
    useEffect( () =>
    {
        if ( editor[num] )
        {
            document.body.style.overflow = 'hidden';
        } else
        {
            document.body.style.overflow = 'auto';
        }
        return () =>
        {
            document.body.style.overflow = 'auto';
        };
    }, [ editor,num ] );
    if ( !editor[num] ) return null;

    return (
        <div>
        <div className="fixed inset-0 flex items-center justify-center z-50 text-white font-roboto">
            <div className="absolute inset-0 bg-black opacity-30" onClick={ handleClose }></div>
            <div className="bg-anotherPurple p-8 rounded-lg shadow-lg z-10 relative">
                <button onClick={ handleClose } className="absolute right-0 top-0"><TbXboxX className='w-7 h-7' /></button>
                        {render()}
                </div>
        </div>
    </div>
    );
}

export default EditorSetup;
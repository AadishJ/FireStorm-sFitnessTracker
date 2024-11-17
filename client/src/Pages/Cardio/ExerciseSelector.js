import React, { useEffect } from 'react';
import SelectorForm from './SelectorForm';
import { TbXboxX } from "react-icons/tb";

function ExerciseSelector ( { isOpen, setIsOpen, formData, setFormData, setExerciseAdded, exerciseAdded} )
{
    const handleClose = () =>
    {
        formData.types = '';
        formData.exercise = '';
        formData.hr = '';
        formData.min = '';
        formData.sec = '';
        formData.sets = '';
        setIsOpen( false );
    };
    useEffect( () =>
    {
        if ( isOpen )
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
    }, [ isOpen ] );
    if ( !isOpen ) return null;


    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50 text-white font-roboto">
                <div className="absolute inset-0 bg-black opacity-30" onClick={ handleClose }></div>
                <div className="bg-anotherPurple p-8 rounded-lg shadow-lg z-10 relative">
                    <button onClick={ handleClose } className="absolute right-0 top-0"><TbXboxX className='w-7 h-7'/></button>
                    <SelectorForm setFormData={ setFormData } formData={ formData } setIsOpen={ setIsOpen } setExerciseAdded={ setExerciseAdded} exerciseAdded={exerciseAdded} />
                </div>
            </div>
        </div>
    );
}

export default ExerciseSelector;
import React, { useEffect } from 'react';
import SelectorForm from './SelectorForm';
import { TbXboxX } from "react-icons/tb";

function FoodSelector ( { isOpen, setIsOpen, formData, setFormData, setFoodAdded, foodAdded} )
{
    const handleClose = () =>
    {
        formData.meal = '';
        formData.food = '';
        formData.quanity = '0';
        formData.calorie = '0';
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
                    <SelectorForm setFormData={ setFormData } formData={ formData } setIsOpen={ setIsOpen } setFoodAdded={ setFoodAdded} foodAdded={foodAdded} />
                </div>
            </div>
        </div>
    );
}

export default FoodSelector;
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

function Card ( { thing, image } )
{
    return (
        <div>
            <div className="flex flex-col gap-4 items-center flex-wrap">
                <Link to={ `/${ thing.toLowerCase() }` }>
            <motion.img 
        src={image} 
        alt="image"
        initial={{ y: 300, opacity: 0 }}  
        animate={{ y: 0, opacity: 1 }}    
        transition={{ duration: 0.4 }}    
        className="w-96 hover:cursor-pointer rounded-lg"         
        />
        </Link>
                <Link to={ `/${ thing.toLowerCase() }` }>
                <motion.button
      className="bg-customBrown w-56 h-14 relative rounded-full text-customBeige hover:bg-customBeige hover:text-customBrown border-2 hover:border-customBrown z-10"
      initial={{ opacity: 0, y: 20 }} // Start off invisible and slightly below
      animate={{ opacity: 1, y: 0 }}   // Animate to full visibility and original position
      transition={{ delay: 0.4, duration: 0.25 }} // Delay of 0.5s, duration of 0.25s
    >
      {thing}
                        </motion.button>
                    </Link>
            </div>
        </div>
    );
}

export default Card;
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Home1({handleScroll}) {
    const words = ["Better.", "Healthier.", "Simpler.", "Easier."];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, [words.length]);

    const TextAnimation = () => {
        return (
            <AnimatePresence>
                <motion.div
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 25 }}    // Start slightly below
                    animate={{ opacity: 1, y: 0 }}     // Animate to original position
                    exit={{ opacity: 0, y: -20 }}      // Exit with slight upward motion
                    transition={{
                        opacity: { duration: 1.5, ease: "easeInOut" }, // Smooth fade-out
                        y: { duration: 1.5, ease: "easeInOut" }       // Smooth upward motion
                    } }
                    className='absolute'
                >
                    {words[currentWordIndex]}
                </motion.div>
            </AnimatePresence>
        );
    }
    
    return (
        <div>
            <div className="text-white mx-40 mt-32 text-7xl">
                Making your Life
            </div>
            <div className="text-textPurple mx-40 mt-10 text-7xl">
                {TextAnimation()}
            </div>
            <div onClick={handleScroll} className="bg-brightPurple rounded-full mt-40 mx-40 text-white text-2xl font-outfit w-44 h-16 flex justify-center items-center hover:cursor-pointer hover:bg-backPurple hover:border-brightPurple hover:border-2">
                Learn More
            </div>
        </div>
    );
}

export default Home1;
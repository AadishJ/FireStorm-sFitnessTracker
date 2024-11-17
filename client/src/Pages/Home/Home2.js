import dumbell from "../../Assets/Images/Dumbell2-removebg-preview.png";
import { motion } from "framer-motion";

function Home2 ()
{
  return (
    <div className="relative mt-44 w-80 ml-20 bg-backPurple">
      <div className="absolute inset-0 blur-3xl filter bg-profilePurple rounded-full"></div>
      <motion.img
        src={ dumbell }
        alt=""
        initial={ { opacity: 0, y: 50, rotateZ: 0 } }
        animate={ { opacity: 1, y: 0, rotateZ: 360 } }
        transition={ { duration: 1 } }
        className="relative"
      />
    </div>
  );
}

export default Home2;

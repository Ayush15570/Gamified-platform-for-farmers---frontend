import React from "react";
import { motion } from "framer-motion";

const Achievements = ({ completedPractices }) => {
  return (
    <section className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
        Achievements
      </h2>

      <div className="
        flex flex-wrap gap-3 sm:gap-4 
        max-h-[180px] overflow-y-auto 
        pr-2
      ">
        {completedPractices
          .filter((p) => p.practiceId)
          .map((p) => (
            <motion.div
              key={p._id}
              title={p.practiceId.title} // tooltip for long names
              className="
                bg-lime-400 text-black 
                px-3 sm:px-4 py-2 
                rounded-full shadow-md font-semibold 
                max-w-full 
                text-sm sm:text-base 
                truncate cursor-default
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {p.practiceId.title}
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default Achievements;

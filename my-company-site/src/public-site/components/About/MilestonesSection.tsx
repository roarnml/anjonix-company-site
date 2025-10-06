import React from "react";
import { motion } from "framer-motion";

interface Milestone {
  id: number;
  text: string;
}

interface MilestonesSectionProps {
  milestones: Milestone[];
}

const MilestonesSection: React.FC<MilestonesSectionProps> = ({ milestones }) => {
  return (
    <section className="mb-16">
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Milestones & Reach
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {milestones.map((milestone) => (
          <motion.div
            key={milestone.id}
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md hover:bg-blue-50 transition cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: milestone.id * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-800 text-lg font-medium">{milestone.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MilestonesSection;

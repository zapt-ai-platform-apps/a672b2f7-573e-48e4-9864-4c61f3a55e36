import React from 'react';
import SquadCard from './SquadCard';
import type { Squad } from '../../../types/GameTypes';
import { motion } from 'framer-motion';

interface SquadListProps {
  squads: Squad[];
  onSelect: (squad: Squad) => void;
  onEdit: (squad: Squad) => void;
  selectedSquad: Squad | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export default function SquadList({ squads, onSelect, onEdit, selectedSquad }: SquadListProps): JSX.Element {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {squads.map((squad) => (
        <motion.div key={squad.id} variants={itemVariants}>
          <SquadCard
            squad={squad}
            isSelected={selectedSquad?.id === squad.id}
            onSelect={onSelect}
            onEdit={onEdit}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
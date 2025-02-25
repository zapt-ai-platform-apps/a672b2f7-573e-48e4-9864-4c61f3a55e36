import React from 'react';
import { Feature } from './Feature';
import {
  ManageSubstitutionsIcon,
  TrackPlayTimeIcon,
  SquadManagementIcon,
  MatchAnalyticsIcon,
  GoalRecordingIcon,
  IntuitiveInterfaceIcon,
} from './featuresIcons';

// Re-export the Feature type
export type { Feature } from './Feature';

export const featuresData: Feature[] = [
  {
    id: 1,
    title: "Manage Substitutions",
    description: "Effortlessly track and manage player rotations to ensure fair play time for everyone on your team.",
    icon: ManageSubstitutionsIcon,
  },
  {
    id: 2,
    title: "Track Play Time",
    description: "Monitor each player's game time with precision to ensure fair distribution and optimal team performance.",
    icon: TrackPlayTimeIcon,
  },
  {
    id: 3,
    title: "Squad Management",
    description: "Create and manage multiple squads, making team organization simple and efficient for different matches.",
    icon: SquadManagementIcon,
  },
  {
    id: 4,
    title: "Match Analytics",
    description: "Get insights into player performance, game time distribution, and team statistics after each match.",
    icon: MatchAnalyticsIcon,
  },
  {
    id: 5,
    title: "Goal Recording",
    description: "Track goals scored during the match, recording scorers and creating comprehensive match summaries.",
    icon: GoalRecordingIcon,
  },
  {
    id: 6,
    title: "Intuitive Interface",
    description: "Enjoy a user-friendly experience with a clean, responsive design that works on all your devices.",
    icon: IntuitiveInterfaceIcon,
  },
];
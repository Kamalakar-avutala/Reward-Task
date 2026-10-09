export interface Bonus {
  conditionCode: string;
  description: string;
  points: number;
}

export interface RewardRule {
  id: number;
  name: string;
  interviewType: string;
  interviewRound: string;
  basePoints: number;
  bonuses: Bonus[];
  enabled: boolean;
  effectiveFrom: string;
  effectiveTo: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export const rewardRules: RewardRule[] = [
  {
    id: 1,
    name: "Technical Interview - Round 1",
    interviewType: "Technical",
    interviewRound: "Round 1",
    basePoints: 100,

    bonuses: [
      {
        conditionCode: "COMPLETED_ON_TIME",
        description: "Interview completed within scheduled time",
        points: 25,
      },
    ],

    enabled: true,
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-12-31",
    createdBy: "Admin",
    createdAt: "2026-01-02",
  },

  {
    id: 2,
    name: "Technical Interview - Round 2",
    interviewType: "Technical",
    interviewRound: "Round 2",
    basePoints: 150,

    bonuses: [
      {
        conditionCode: "FEEDBACK_WITHIN_24_HOURS",
        description: "Candidate feedback submitted within 24 hours",
        points: 50,
      },
    ],

    enabled: true,
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-12-31",
    createdBy: "Admin",
    createdAt: "2026-01-02",
  },

  {
    id: 3,
    name: "HR Interview",
    interviewType: "HR",
    interviewRound: "HR Round",
    basePoints: 75,

    bonuses: [
      {
        conditionCode: "NO_RESCHEDULE",
        description: "Interview completed without rescheduling",
        points: 25,
      },
    ],

    enabled: true,
    effectiveFrom: "2026-02-01",
    effectiveTo: "2026-12-31",
    createdBy: "Admin",
    createdAt: "2026-02-01",
  },

  {
    id: 4,
    name: "Managerial Interview",
    interviewType: "Managerial",
    interviewRound: "Managerial Round",
    basePoints: 125,

    bonuses: [
      {
        conditionCode: "FEEDBACK_SAME_DAY",
        description: "Feedback submitted on the same day",
        points: 30,
      },
    ],

    enabled: true,
    effectiveFrom: "2026-01-15",
    effectiveTo: "2026-12-31",
    createdBy: "Admin",
    createdAt: "2026-01-15",
  },

  {
    id: 5,
    name: "Final Interview",
    interviewType: "Technical",
    interviewRound: "Final Round",
    basePoints: 200,

    bonuses: [
      {
        conditionCode: "COMPLETED_SUCCESSFULLY",
        description: "Final interview completed successfully",
        points: 75,
      },
    ],

    enabled: false,
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-06-30",
    createdBy: "Admin",
    createdAt: "2026-01-01",
  },
];
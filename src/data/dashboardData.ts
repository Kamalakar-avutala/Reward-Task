export const userDashboardData = {
  userId: 1,

  summary: {
    totalEarned: 3250,
    totalRedeemed: 1000,
    availablePoints: 2250,
  },

  pointsOverTime: [
    {
      month: "Jan",
      points: 250,
    },
    {
      month: "Feb",
      points: 450,
    },
    {
      month: "Mar",
      points: 300,
    },
    {
      month: "Apr",
      points: 550,
    },
    {
      month: "May",
      points: 400,
    },
    {
      month: "Jun",
      points: 350,
    },
    {
      month: "Jul",
      points: 300,
    },
    {
      month: "Aug",
      points: 400,
    },
    {
      month: "Sep",
      points: 250,
    },
  ],

  recentTransactions: [
    {
      id: "TXN002",
      type: "Earned",
      points: 200,
      reason: "Technical Round 2 interview completed",
      date: "2026-09-03",
    },
    {
      id: "TXN005",
      type: "Redeemed",
      points: -500,
      reason: "Amazon Gift Card redeemed",
      date: "2026-09-07",
    },
    {
      id: "TXN001",
      type: "Earned",
      points: 125,
      reason: "Technical Round 1 interview completed",
      date: "2026-09-01",
    },
  ],

  recentRedemptions: [
    {
      id: "RED001",
      rewardName: "Amazon Gift Card",
      pointsUsed: 500,
      status: "Completed",
      date: "2026-09-07",
    },
  ],
};


export const adminDashboardData = {
  summary: {
    totalPointsIssued: 15950,
    totalPointsRedeemed: 3800,
    outstandingPoints: 12150,
    pendingRedemptions: 2,
  },

  monthlySummary: [
    {
      month: "Jan",
      pointsIssued: 1200,
      pointsRedeemed: 300,
    },
    {
      month: "Feb",
      pointsIssued: 1500,
      pointsRedeemed: 500,
    },
    {
      month: "Mar",
      pointsIssued: 1800,
      pointsRedeemed: 400,
    },
    {
      month: "Apr",
      pointsIssued: 1400,
      pointsRedeemed: 600,
    },
    {
      month: "May",
      pointsIssued: 2000,
      pointsRedeemed: 300,
    },
    {
      month: "Jun",
      pointsIssued: 1700,
      pointsRedeemed: 450,
    },
    {
      month: "Jul",
      pointsIssued: 1900,
      pointsRedeemed: 500,
    },
    {
      month: "Aug",
      pointsIssued: 2200,
      pointsRedeemed: 450,
    },
    {
      month: "Sep",
      pointsIssued: 2250,
      pointsRedeemed: 300,
    },
  ],

  topUsers: [
    {
      userId: 3,
      name: "Arjun Kumar",
      totalEarned: 4100,
    },
    {
      userId: 5,
      name: "Vikram Singh",
      totalEarned: 3600,
    },
    {
      userId: 1,
      name: "Rahul Sharma",
      totalEarned: 3250,
    },
    {
      userId: 2,
      name: "Priya Reddy",
      totalEarned: 2800,
    },
    {
      userId: 4,
      name: "Sneha Patel",
      totalEarned: 2200,
    },
  ],

  pendingRedemptions: [
    {
      id: "RED003",
      userName: "Vikram Singh",
      rewardName: "Food Voucher",
      pointsUsed: 400,
      status: "Pending",
      date: "2026-09-11",
    },
    {
      id: "RED005",
      userName: "Sneha Patel",
      rewardName: "Movie Ticket",
      pointsUsed: 300,
      status: "Pending",
      date: "2026-09-13",
    },
  ],
};

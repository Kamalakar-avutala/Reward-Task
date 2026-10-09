
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../components/pages/auth/Login";

import AdminDashboard from "../components/pages/admin/AdminDashboard";
import RewardRules from "../components/pages/admin/RewardRules";
import RewardCatalogue from "../components/pages/admin/RewardCatalogue";
import AuditReports from "../components/pages/admin/AuditReports";

import UserDashboard from "../components/pages/user/UserDashboard";
import PointsTransactions from "../components/pages/user/Transactions";
import Rewards from "../components/pages/user/Rewards";
import RedemptionHistory from "../components/pages/user/RedemptionHistory";

import PageLayout from "../components/layout/PageLayout";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRole="Admin" />}>

        <Route
          element={<PageLayout />}
        >
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

         <Route
          path="/admin/reward-rules"
          element={<RewardRules />}
        />

        <Route
          path="/admin/rewards"
          element={<RewardCatalogue />}
        />
        <Route
          path="/admin/audit-reports"
          element={<AuditReports />}
        />
        </Route>
      </Route>

      {/* User */}
      <Route element={<ProtectedRoute allowedRole="User" />}>
      <Route
          element={<PageLayout />}
        >
        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />

       <Route
          path="/user/transactions"
          element={<PointsTransactions />}
        />

        <Route
          path="/user/rewards"
          element={<Rewards />}
        />

        <Route
          path="/user/redemptions"
          element={<RedemptionHistory />}
        /> 
        </Route>
      </Route>

      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;

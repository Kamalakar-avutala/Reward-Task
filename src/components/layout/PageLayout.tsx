import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-grow-1">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default PageLayout;

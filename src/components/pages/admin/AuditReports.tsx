import { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PageHeader from "../../common/PageHeader";
import SummaryCard from "../../common/SummaryCard";
import SearchFilter from "../../common/SearchFilter";
import DataTable from "../../common/DataTable";
import StatusBadge from "../../common/StatusBadge";
import AppPagination from "../../common/Pagination";

import FormDateInput from "../../common/forms/FormDateInput";

import type { AuditLog } from "../../../types/auditLog";
import { auditLogs as initialAuditLogs } from "../../../data/auditLogs";

const AuditReports = () => {
  const [logs] = useState<AuditLog[]>(initialAuditLogs);

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  const moduleOptions = useMemo(() => {
    const modules = [...new Set(logs.map((log) => log.module))];

    return modules.map((module) => ({
      value: module,
      label: module,
    }));
  }, [logs]);

  const actionOptions = useMemo(() => {
    const actions = [...new Set(logs.map((log) => log.action))];

    return actions.map((action) => ({
      value: action,
      label: action,
    }));
  }, [logs]);

  const userOptions = useMemo(() => {
    const users = [...new Set(logs.map((log) => log.userName))];

    return users.map((user) => ({
      value: user,
      label: user,
    }));
  }, [logs]);

  const filteredLogs = useMemo(() => {
    const searchText = search.toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        log.userName.toLowerCase().includes(searchText) ||
        log.userId.toLowerCase().includes(searchText) ||
        log.module.toLowerCase().includes(searchText) ||
        log.action.toLowerCase().includes(searchText) ||
        log.description.toLowerCase().includes(searchText);

      const matchesModule =
        !moduleFilter || log.module === moduleFilter;

      const matchesAction =
        !actionFilter || log.action === actionFilter;

      const matchesUser =
        !userFilter || log.userName === userFilter;

      const logDate = log.timestamp.substring(0, 10);

      const matchesFromDate =
        !fromDate || logDate >= fromDate;

      const matchesToDate =
        !toDate || logDate <= toDate;

      return (
        matchesSearch &&
        matchesModule &&
        matchesAction &&
        matchesUser &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [
    logs,
    search,
    moduleFilter,
    actionFilter,
    userFilter,
    fromDate,
    toDate,
  ]);

  const totalPages = Math.ceil(
    filteredLogs.length / recordsPerPage
  );

  const paginatedLogs = useMemo(() => {
    const startIndex =
      (currentPage - 1) * recordsPerPage;

    return filteredLogs.slice(
      startIndex,
      startIndex + recordsPerPage
    );
  }, [filteredLogs, currentPage]);

  const successfulActivities = filteredLogs.filter(
    (log) => log.status === "Success"
  ).length;

  const failedActivities = filteredLogs.filter(
    (log) => log.status === "Failed"
  ).length;

  const pointsActivities = filteredLogs.filter(
    (log) => log.module === "Points"
  ).length;

  const redemptionActivities = filteredLogs.filter(
    (log) => log.module === "Redemption"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setModuleFilter("");
    setActionFilter("");
    setUserFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleModuleChange = (value: string) => {
    setModuleFilter(value);
    setCurrentPage(1);
  };

  const handleActionChange = (value: string) => {
    setActionFilter(value);
    setCurrentPage(1);
  };

  const handleUserChange = (value: string) => {
    setUserFilter(value);
    setCurrentPage(1);
  };

  const handleFromDateChange = (value: string) => {
    setFromDate(value);
    setCurrentPage(1);
  };

  const handleToDateChange = (value: string) => {
    setToDate(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      key: "timestamp",
      header: "Date & Time",
      render: (log: AuditLog) => (
        <span className="text-nowrap">
          {log.timestamp}
        </span>
      ),
    },
    {
      key: "userName",
      header: "User",
      render: (log: AuditLog) => (
        <div>
          <div className="fw-semibold">{log.userName}</div>
          <small className="text-muted">
            {log.userId}
          </small>
        </div>
      ),
    },
    {
      key: "module",
      header: "Module",
    },
    {
      key: "action",
      header: "Action",
      render: (log: AuditLog) => (
        <span className="fw-semibold">
          {log.action}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "status",
      header: "Status",
      render: (log: AuditLog) => (
        <StatusBadge status={log.status} />
      ),
    },
  ];

  return (
    <div className="container-fluid py-3">
      <PageHeader
        title="Audit & Reports"
        description="Review system activities, point transactions and reward operations."
      />

      <Row className="g-3 mb-4">
        <Col md={3}>
          <SummaryCard
            title="Total Activities"
            value={filteredLogs.length}
            icon="📋"
            description="Filtered activities"
          />
        </Col>

        <Col md={3}>
          <SummaryCard
            title="Successful"
            value={successfulActivities}
            icon="✅"
            description="Successful activities"
          />
        </Col>

        <Col md={3}>
          <SummaryCard
            title="Failed"
            value={failedActivities}
            icon="❌"
            description="Failed activities"
          />
        </Col>

        <Col md={3}>
          <SummaryCard
            title="Redemptions"
            value={redemptionActivities}
            icon="🎁"
            description="Redemption activities"
          />
        </Col>
      </Row>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <SearchFilter
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search user, module, action..."
            filters={[
              {
                label: "Module",
                value: moduleFilter,
                options: moduleOptions,
                onChange: handleModuleChange,
              },
              {
                label: "Action",
                value: actionFilter,
                options: actionOptions,
                onChange: handleActionChange,
              },
              {
                label: "User",
                value: userFilter,
                options: userOptions,
                onChange: handleUserChange,
              },
            ]}
            onReset={resetFilters}
          />

          <Row className="g-3 mb-4">
            <Col md={3}>
              <FormDateInput
                label="From Date"
                value={fromDate}
                max={toDate || undefined}
                onChange={handleFromDateChange}
              />
            </Col>

            <Col md={3}>
              <FormDateInput
                label="To Date"
                value={toDate}
                min={fromDate || undefined}
                onChange={handleToDateChange}
              />
            </Col>
          </Row>

          <div className="mb-3 text-muted">
            Showing{" "}
            <strong>{filteredLogs.length}</strong>{" "}
            audit record(s)
          </div>

          <DataTable
            columns={columns}
            data={paginatedLogs}
            rowKey={(log) => log.id}
            emptyMessage="No audit records found."
          />

          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card.Body>
      </Card>

      <Row className="g-3">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="text-muted small">
                Points Activities
              </div>
              <h4 className="mb-0">{pointsActivities}</h4>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="text-muted small">
                Redemption Activities
              </div>
              <h4 className="mb-0">
                {redemptionActivities}
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AuditReports;
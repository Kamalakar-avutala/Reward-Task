import { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import PageHeader from "../../../components/common/PageHeader";
import SearchFilter from "../../../components/common/SearchFilter";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";
import AppPagination from "../../../components/common/Pagination";

import type { PointTransaction } from "../../../types/transaction";
import { pointTransactions } from "../../../data/pointTransactions";

const Transactions = () => {
  const [transactions] =
    useState<PointTransaction[]>(pointTransactions);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    const searchText = search.toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.transactionId
          .toLowerCase()
          .includes(searchText) ||
        transaction.source
          .toLowerCase()
          .includes(searchText) ||
        transaction.description
          .toLowerCase()
          .includes(searchText);

      const matchesType =
        !typeFilter || transaction.type === typeFilter;

      const matchesStatus =
        !statusFilter || transaction.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    transactions,
    search,
    typeFilter,
    statusFilter,
  ]);

  const totalPages = Math.ceil(
    filteredTransactions.length / recordsPerPage
  );

  const paginatedTransactions = useMemo(() => {
    const startIndex =
      (currentPage - 1) * recordsPerPage;

    return filteredTransactions.slice(
      startIndex,
      startIndex + recordsPerPage
    );
  }, [filteredTransactions, currentPage]);

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const columns = [
    {
      key: "transactionId",
      header: "Transaction ID",
      render: (transaction: PointTransaction) => (
        <span className="fw-semibold">
          {transaction.transactionId}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "type",
      header: "Type",
      render: (transaction: PointTransaction) => (
        <Badge
          bg={
            transaction.type === "Credit"
              ? "success"
              : transaction.type === "Debit"
              ? "danger"
              : "warning"
          }
        >
          {transaction.type}
        </Badge>
      ),
    },
    {
      key: "points",
      header: "Points",
      render: (transaction: PointTransaction) => (
        <span
          className={
            transaction.type === "Credit"
              ? "text-success fw-semibold"
              : "text-danger fw-semibold"
          }
        >
          {transaction.type === "Credit" ? "+" : "-"}
          {transaction.points.toLocaleString()}
        </span>
      ),
    },
    {
      key: "balanceAfter",
      header: "Balance",
      render: (transaction: PointTransaction) => (
        <span>
          {transaction.balanceAfter.toLocaleString()}
        </span>
      ),
    },
    {
      key: "source",
      header: "Source",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "status",
      header: "Status",
      render: (transaction: PointTransaction) => (
        <StatusBadge status={transaction.status} />
      ),
    },
  ];

  return (
    <div className="container-fluid my-3">
      <PageHeader
        title="Point Transactions"
        description="View your reward point earning, redemption and reversal history."
      />

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <SearchFilter
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            searchPlaceholder="Search transactions..."
            filters={[
              {
                label: "Type",
                value: typeFilter,
                options: [
                  {
                    value: "Credit",
                    label: "Credit",
                  },
                  {
                    value: "Debit",
                    label: "Debit",
                  },
                  {
                    value: "Reversal",
                    label: "Reversal",
                  },
                ],
                onChange: (value) => {
                  setTypeFilter(value);
                  setCurrentPage(1);
                },
              },
              {
                label: "Status",
                value: statusFilter,
                options: [
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                  {
                    value: "Pending",
                    label: "Pending",
                  },
                  {
                    value: "Reversed",
                    label: "Reversed",
                  },
                ],
                onChange: (value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                },
              },
            ]}
            onReset={resetFilters}
          />

          <div className="mb-3 text-muted">
            Showing{" "}
            <strong>{filteredTransactions.length}</strong>{" "}
            transaction(s)
          </div>

          <DataTable
            columns={columns}
            data={paginatedTransactions}
            rowKey={(transaction) => transaction.id}
            emptyMessage="No transactions found."
          />

          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Transactions;
import { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import PageHeader from "../../common/PageHeader";
import SearchFilter from "../../common/SearchFilter";
import DataTable from "../../common/DataTable";
import StatusBadge from "../../common/StatusBadge";
import AppPagination from "../../common/Pagination";
import AppModal from "../../common/modal/AppModal";

import type { Redemption } from "../../../types/redemption";
import { redemptions as initialRedemptions } from "../../../data/redemptions";

const RedemptionHistory = () => {
  const [redemptionList] =
    useState<Redemption[]>(initialRedemptions);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRedemption, setSelectedRedemption] =
    useState<Redemption | null>(null);

  const recordsPerPage = 5;

  const categoryOptions = useMemo(() => {
    const categories = [
      ...new Set(
        redemptionList.map(
          (redemption) => redemption.category
        )
      ),
    ];

    return categories.map((category) => ({
      value: category,
      label: category,
    }));
  }, [redemptionList]);

  const filteredRedemptions = useMemo(() => {
    const searchText = search.toLowerCase();

    return redemptionList.filter((redemption) => {
      const matchesSearch =
        redemption.redemptionId
          .toLowerCase()
          .includes(searchText) ||
        redemption.rewardName
          .toLowerCase()
          .includes(searchText) ||
        redemption.category
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        !statusFilter ||
        redemption.status === statusFilter;

      const matchesCategory =
        !categoryFilter ||
        redemption.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    redemptionList,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const totalPages = Math.ceil(
    filteredRedemptions.length / recordsPerPage
  );

  const paginatedRedemptions = useMemo(() => {
    const startIndex =
      (currentPage - 1) * recordsPerPage;

    return filteredRedemptions.slice(
      startIndex,
      startIndex + recordsPerPage
    );
  }, [filteredRedemptions, currentPage]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
    setCurrentPage(1);
  };

  const columns = [
    {
      key: "redemptionId",
      header: "Redemption ID",
      render: (redemption: Redemption) => (
        <span className="fw-semibold">
          {redemption.redemptionId}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "rewardName",
      header: "Reward",
      render: (redemption: Redemption) => (
        <div>
          <div className="fw-semibold">
            {redemption.rewardName}
          </div>
          <small className="text-muted">
            {redemption.category}
          </small>
        </div>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
    },
    {
      key: "pointsUsed",
      header: "Points Used",
      render: (redemption: Redemption) => (
        <span className="fw-semibold">
          {redemption.pointsUsed.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (redemption: Redemption) => (
        <StatusBadge status={redemption.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (redemption: Redemption) => (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() =>
            setSelectedRedemption(redemption)
          }
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="container-fluid my-3">
      <PageHeader
        title="My Redemptions"
        description="View your reward redemption history and status."
      />

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <SearchFilter
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            searchPlaceholder="Search redemptions..."
            filters={[
              {
                label: "Status",
                value: statusFilter,
                options: [
                  {
                    value: "Pending",
                    label: "Pending",
                  },
                  {
                    value: "Processing",
                    label: "Processing",
                  },
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                  {
                    value: "Cancelled",
                    label: "Cancelled",
                  },
                  {
                    value: "Rejected",
                    label: "Rejected",
                  },
                ],
                onChange: (value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                },
              },
              {
                label: "Category",
                value: categoryFilter,
                options: categoryOptions,
                onChange: (value) => {
                  setCategoryFilter(value);
                  setCurrentPage(1);
                },
              },
            ]}
            onReset={resetFilters}
          />

          <div className="mb-3 text-muted">
            Showing{" "}
            <strong>{filteredRedemptions.length}</strong>{" "}
            redemption(s)
          </div>

          <DataTable
            columns={columns}
            data={paginatedRedemptions}
            rowKey={(redemption) => redemption.id}
            emptyMessage="No redemption records found."
          />

          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card.Body>
      </Card>

      <AppModal
        show={Boolean(selectedRedemption)}
        title="Redemption Details"
        onClose={() => setSelectedRedemption(null)}
        size="lg"
      >
        {selectedRedemption && (
          <>
            <div className="mb-3">
              <div className="text-muted small">
                Redemption ID
              </div>
              <div className="fw-semibold">
                {selectedRedemption.redemptionId}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Reward
              </div>
              <div className="fw-semibold">
                {selectedRedemption.rewardName}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Category
              </div>
              <div>
                {selectedRedemption.category}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Redemption Date
              </div>
              <div>
                {selectedRedemption.date}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Quantity
              </div>
              <div>
                {selectedRedemption.quantity}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Points Used
              </div>
              <div className="fw-semibold">
                {selectedRedemption.pointsUsed.toLocaleString()}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Status
              </div>
              <StatusBadge
                status={selectedRedemption.status}
              />
            </div>

            <div>
              <div className="text-muted small">
                Description
              </div>
              <div>
                {selectedRedemption.description}
              </div>
            </div>
          </>
        )}
      </AppModal>
    </div>
  );
};

export default RedemptionHistory;
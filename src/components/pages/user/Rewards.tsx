import { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PageHeader from "../../../components/common/PageHeader";
import SearchFilter from "../../../components/common/SearchFilter";
import StatusBadge from "../../../components/common/StatusBadge";
import AppModal from "../../../components/common/modal/AppModal";

import type { Reward } from "../../../types/reward";
import { rewards as initialRewards } from "../../../data/rewards";

const Rewards = () => {
  const [rewards] = useState<Reward[]>(initialRewards);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("");
  const [selectedReward, setSelectedReward] =
    useState<Reward | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(rewards.map((reward) => reward.category)),
    ];

    return uniqueCategories.map((category) => ({
      value: category,
      label: category,
    }));
  }, [rewards]);

  const availableRewards = useMemo(() => {
    const searchText = search.toLowerCase();

    return rewards.filter((reward) => {
      const matchesSearch =
        reward.name.toLowerCase().includes(searchText) ||
        reward.category.toLowerCase().includes(searchText) ||
        reward.description.toLowerCase().includes(searchText);

      const matchesCategory =
        !categoryFilter ||
        reward.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        reward.enabled
      );
    });
  }, [rewards, search, categoryFilter]);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
  };

  return (
    <div className="container-fluid my-3">
      <PageHeader
        title="Rewards"
        description="Browse rewards available for redemption."
      />

      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search rewards..."
        filters={[
          {
            label: "Category",
            value: categoryFilter,
            options: categories,
            onChange: setCategoryFilter,
          },
        ]}
        onReset={resetFilters}
      />

      <Row className="g-4">
        {availableRewards.length === 0 ? (
          <Col>
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="py-5">
                <div className="fs-1 mb-2">🎁</div>
                <p className="text-muted mb-0">
                  No rewards available.
                </p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          availableRewards.map((reward) => (
            <Col
              key={reward.id}
              xs={12}
              md={6}
              lg={4}
            >
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="fs-1">🎁</div>

                    <StatusBadge
                      status={
                        reward.stock > 0
                          ? "Available"
                          : "Out of Stock"
                      }
                    />
                  </div>

                  <h5>{reward.name}</h5>

                  <div className="text-muted small mb-2">
                    {reward.category}
                  </div>

                  <p className="text-muted flex-grow-1">
                    {reward.description}
                  </p>

                  <div className="mb-3">
                    <span className="fw-semibold">
                      {reward.pointsRequired.toLocaleString()}
                    </span>{" "}
                    points
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {reward.stock > 0
                        ? `${reward.stock} available`
                        : "Out of stock"}
                    </small>

                    <Button
                      variant="primary"
                      size="sm"
                      disabled={reward.stock === 0}
                      onClick={() =>
                        setSelectedReward(reward)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <AppModal
        show={Boolean(selectedReward)}
        title={selectedReward?.name ?? "Reward Details"}
        onClose={() => setSelectedReward(null)}
        size="lg"
      >
        {selectedReward && (
          <>
            <div className="mb-3">
              <div className="text-muted small">
                Category
              </div>
              <div className="fw-semibold">
                {selectedReward.category}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">
                Description
              </div>
              <div>
                {selectedReward.description}
              </div>
            </div>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <div className="text-muted small">
                    Points Required
                  </div>
                  <div className="fs-5 fw-semibold">
                    {selectedReward.pointsRequired.toLocaleString()}
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="mb-3">
                  <div className="text-muted small">
                    Available Stock
                  </div>
                  <div className="fs-5 fw-semibold">
                    {selectedReward.stock}
                  </div>
                </div>
              </Col>
            </Row>

            <div>
              <div className="text-muted small mb-1">
                Status
              </div>

              <StatusBadge
                status={
                  selectedReward.stock > 0
                    ? "Available"
                    : "Out of Stock"
                }
              />
            </div>
          </>
        )}
      </AppModal>
    </div>
  );
};

export default Rewards;
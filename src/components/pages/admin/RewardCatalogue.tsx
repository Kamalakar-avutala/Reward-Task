import { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PageHeader from "../../common/PageHeader";
import SearchFilter from "../../common/SearchFilter";
import DataTable from "../../common/DataTable";
import StatusBadge from "../../common/StatusBadge";
import AppModal from "../../common/modal/AppModal";
import ConfirmModal from "../../common/modal/ConfirmModal";

import FormInput from "../../common/forms/FormInput";
import FormSelect from "../../common/forms/FormSelect";
import FormTextarea from "../../common/forms/FormTextarea";
import FormSwitch from "../../common/forms/FormSwitch";
import FormButton from "../../common/forms/FormButton";

import type { Reward } from "../../../types/reward";
import { rewards as initialRewards } from "../../../data/rewards";

interface RewardForm {
  name: string;
  category: string;
  description: string;
  pointsRequired: string;
  stock: string;
  enabled: boolean;
}

interface RewardErrors {
  name?: string;
  category?: string;
  description?: string;
  pointsRequired?: string;
  stock?: string;
}

const emptyForm: RewardForm = {
  name: "",
  category: "",
  description: "",
  pointsRequired: "",
  stock: "",
  enabled: true,
};

const categoryOptions = [
  { value: "Gift Voucher", label: "Gift Voucher" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Food", label: "Food" },
  { value: "Electronics", label: "Electronics" },
  { value: "Merchandise", label: "Merchandise" },
  { value: "Travel", label: "Travel" },
];

const RewardCatalogue = () => {
  const [rewardList, setRewardList] = useState<Reward[]>(initialRewards);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const [form, setForm] = useState<RewardForm>(emptyForm);
  const [errors, setErrors] = useState<RewardErrors>({});
  const [saving, setSaving] = useState(false);

  const filteredRewards = useMemo(() => {
    return rewardList.filter((reward) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        reward.name.toLowerCase().includes(searchText) ||
        reward.category.toLowerCase().includes(searchText) ||
        reward.description.toLowerCase().includes(searchText);

      const matchesCategory =
        !categoryFilter || reward.category === categoryFilter;

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "enabled" && reward.enabled) ||
        (statusFilter === "disabled" && !reward.enabled);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [rewardList, search, categoryFilter, statusFilter]);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
  };

  const openAddModal = () => {
    setEditingReward(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (reward: Reward) => {
    setEditingReward(reward);

    setForm({
      name: reward.name,
      category: reward.category,
      description: reward.description,
      pointsRequired: String(reward.pointsRequired),
      stock: String(reward.stock),
      enabled: reward.enabled,
    });

    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingReward(null);
    setForm(emptyForm);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: RewardErrors = {};

    const name = form.name.trim();
    const description = form.description.trim();

    const pointsRequired = Number(form.pointsRequired);
    const stock = Number(form.stock);

    if (!name) {
      newErrors.name = "Reward name is required.";
    }

    if (!form.category) {
      newErrors.category = "Category is required.";
    }

    if (!description) {
      newErrors.description = "Description is required.";
    }

    if (!form.pointsRequired) {
      newErrors.pointsRequired = "Points required is required.";
    } else if (
      !Number.isInteger(pointsRequired) ||
      pointsRequired <= 0
    ) {
      newErrors.pointsRequired =
        "Points required must be a positive whole number.";
    }

    if (!form.stock) {
      newErrors.stock = "Stock is required.";
    } else if (!Number.isInteger(stock) || stock < 0) {
      newErrors.stock = "Stock cannot be negative.";
    }

    const duplicateReward = rewardList.some(
      (reward) =>
        reward.name.trim().toLowerCase() === name.toLowerCase() &&
        reward.id !== editingReward?.id
    );

    if (duplicateReward) {
      newErrors.name = "A reward with this name already exists.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setSaving(true);

    const now = new Date().toISOString().split("T")[0];

    const rewardData: Reward = {
      id: editingReward?.id ?? Date.now(),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      pointsRequired: Number(form.pointsRequired),
      stock: Number(form.stock),
      enabled: form.enabled,
      createdBy: editingReward?.createdBy ?? "Admin",
      createdAt: editingReward?.createdAt ?? now,
      updatedBy: editingReward ? "Admin" : undefined,
      updatedAt: editingReward ? now : undefined,
    };

    setTimeout(() => {
      if (editingReward) {
        setRewardList((currentRewards) =>
          currentRewards.map((reward) =>
            reward.id === editingReward.id ? rewardData : reward
          )
        );
      } else {
        setRewardList((currentRewards) => [
          ...currentRewards,
          rewardData,
        ]);
      }

      setSaving(false);
      closeModal();
    }, 300);
  };

  const handleToggleStatus = (reward: Reward) => {
    setRewardList((currentRewards) =>
      currentRewards.map((item) =>
        item.id === reward.id
          ? {
              ...item,
              enabled: !item.enabled,
              updatedBy: "Admin",
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
  };

  const openDeleteModal = (reward: Reward) => {
    setSelectedReward(reward);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedReward(null);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    if (!selectedReward) return;

    setRewardList((currentRewards) =>
      currentRewards.filter(
        (reward) => reward.id !== selectedReward.id
      )
    );

    closeDeleteModal();
  };

  const columns = [
    {
      key: "name",
      header: "Reward",
      render: (reward: Reward) => (
        <div>
          <div className="fw-semibold">{reward.name}</div>
          <small className="text-muted">
            {reward.description}
          </small>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "pointsRequired",
      header: "Points Required",
      render: (reward: Reward) => (
        <span className="fw-semibold">
          {reward.pointsRequired.toLocaleString()}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (reward: Reward) => (
        <span
          className={
            reward.stock === 0 ? "text-danger fw-semibold" : ""
          }
        >
          {reward.stock}
        </span>
      ),
    },
    {
      key: "enabled",
      header: "Status",
      render: (reward: Reward) => (
        <StatusBadge
          status={reward.enabled ? "Active" : "Disabled"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (reward: Reward) => (
        <div className="d-flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => openEditModal(reward)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant={
              reward.enabled
                ? "outline-warning"
                : "outline-success"
            }
            onClick={() => handleToggleStatus(reward)}
          >
            {reward.enabled ? "Disable" : "Enable"}
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => openDeleteModal(reward)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid my-4">
      <PageHeader
        title="Reward Catalogue"
        description="Manage rewards available for employee redemption."
        action={
          <FormButton
            text="Add Reward"
            variant="primary"
            onClick={openAddModal}
          />
        }
      />

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <SearchFilter
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search rewards..."
            filters={[
              {
                label: "Category",
                value: categoryFilter,
                options: categoryOptions,
                onChange: setCategoryFilter,
              },
              {
                label: "Status",
                value: statusFilter,
                options: [
                  {
                    value: "enabled",
                    label: "Active",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                  },
                ],
                onChange: setStatusFilter,
              },
            ]}
            onReset={resetFilters}
          />

          <DataTable
            columns={columns}
            data={filteredRewards}
            rowKey={(reward) => reward.id}
            emptyMessage="No rewards found."
          />
        </Card.Body>
      </Card>

      <AppModal
        show={showModal}
        title={editingReward ? "Edit Reward" : "Add Reward"}
        onClose={closeModal}
        onSubmit={handleSave}
        submitText={editingReward ? "Update Reward" : "Add Reward"}
        loading={saving}
        size="lg"
      >
        <Row>
          <Col md={6}>
            <FormInput
              label="Reward Name"
              value={form.name}
              placeholder="Enter reward name"
              required
              error={errors.name}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  name: value,
                }))
              }
            />
          </Col>

          <Col md={6}>
            <FormSelect
              label="Category"
              value={form.category}
              options={categoryOptions}
              required
              error={errors.category}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  category: value,
                }))
              }
            />
          </Col>
        </Row>

        <FormTextarea
          label="Description"
          value={form.description}
          placeholder="Enter reward description"
          rows={3}
          required
          error={errors.description}
          onChange={(value) =>
            setForm((current) => ({
              ...current,
              description: value,
            }))
          }
        />

        <Row>
          <Col md={6}>
            <FormInput
              label="Points Required"
              type="number"
              value={form.pointsRequired}
              placeholder="Enter required points"
              required
              error={errors.pointsRequired}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  pointsRequired: value,
                }))
              }
            />
          </Col>

          <Col md={6}>
            <FormInput
              label="Stock"
              type="number"
              value={form.stock}
              placeholder="Enter stock quantity"
              required
              error={errors.stock}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  stock: value,
                }))
              }
            />
          </Col>
        </Row>

        <FormSwitch
          label="Reward is active"
          checked={form.enabled}
          onChange={(checked) =>
            setForm((current) => ({
              ...current,
              enabled: checked,
            }))
          }
        />
      </AppModal>

      <ConfirmModal
        show={showDeleteModal}
        title="Delete Reward"
        message={`Are you sure you want to delete "${selectedReward?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default RewardCatalogue;


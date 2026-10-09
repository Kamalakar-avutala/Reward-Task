import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";

import {
  rewardRules as initialRewardRules,
  type RewardRule,
} from "../../../data/rewardRules";

import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import SearchFilter from "../../../components/common/SearchFilter";
import StatusBadge from "../../../components/common/StatusBadge";

import FormInput from "../../common/forms/FormInput";
import FormSelect from "../../common/forms/FormSelect";
import FormDateInput from "../../common/forms/FormDateInput";
import FormSwitch from "../../common/forms/FormSwitch";
import FormButton from "../../common/forms/FormButton";

import AppModal from "../../common/modal/AppModal";
import ConfirmModal from "../../common/modal/ConfirmModal";

interface RewardRuleForm {
  name: string;
  interviewType: string;
  interviewRound: string;
  basePoints: string;
  bonusConditionCode: string;
  bonusDescription: string;
  bonusPoints: string;
  enabled: boolean;
  effectiveFrom: string;
  effectiveTo: string;
}

const emptyForm: RewardRuleForm = {
  name: "",
  interviewType: "",
  interviewRound: "",
  basePoints: "",
  bonusConditionCode: "",
  bonusDescription: "",
  bonusPoints: "",
  enabled: true,
  effectiveFrom: "",
  effectiveTo: "",
};

const RewardRules = () => {
  const [rules, setRules] =
    useState<RewardRule[]>(initialRewardRules);

  const [showModal, setShowModal] =
    useState<boolean>(false);

  const [editingRule, setEditingRule] =
    useState<RewardRule | null>(null);

  const [searchTerm, setSearchTerm] =
    useState<string>("");

  const [typeFilter, setTypeFilter] =
    useState<string>("All");

  const [statusFilter, setStatusFilter] =
    useState<string>("All");

  const [error, setError] =
    useState<string>("");

  const [formData, setFormData] =
    useState<RewardRuleForm>(emptyForm);

  const [deleteRuleId, setDeleteRuleId] =
    useState<number | null>(null);

  // -----------------------------------
  // Open Add Rule Modal
  // -----------------------------------

  const handleAddRule = (): void => {
    setEditingRule(null);
    setFormData(emptyForm);
    setError("");
    setShowModal(true);
  };

  // -----------------------------------
  // Open Edit Rule Modal
  // -----------------------------------

  const handleEditRule = (rule: RewardRule): void => {
    const bonus = rule.bonuses?.[0];

    setEditingRule(rule);

    setFormData({
      name: rule.name,
      interviewType: rule.interviewType,
      interviewRound: rule.interviewRound,
      basePoints: String(rule.basePoints),
      bonusConditionCode:
        bonus?.conditionCode ?? "",
      bonusDescription:
        bonus?.description ?? "",
      bonusPoints:
        String(bonus?.points ?? 0),
      enabled: rule.enabled,
      effectiveFrom: rule.effectiveFrom,
      effectiveTo: rule.effectiveTo,
    });

    setError("");
    setShowModal(true);
  };

  // -----------------------------------
  // Close Modal
  // -----------------------------------

  const handleCloseModal = (): void => {
    setShowModal(false);
    setEditingRule(null);
    setFormData(emptyForm);
    setError("");
  };

  // -----------------------------------
  // Form Change
  // -----------------------------------

  const updateFormField = <
    K extends keyof RewardRuleForm
  >(
    field: K,
    value: RewardRuleForm[K]
  ): void => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  // -----------------------------------
  // Validate Form
  // -----------------------------------

  const validateForm = (): string => {
    if (!formData.name.trim()) {
      return "Rule name is required.";
    }

    if (!formData.interviewType) {
      return "Interview type is required.";
    }

    if (!formData.interviewRound) {
      return "Interview round is required.";
    }

    if (
      formData.basePoints === "" ||
      Number(formData.basePoints) <= 0
    ) {
      return "Base points must be greater than 0.";
    }

    if (
      formData.bonusPoints === "" ||
      Number(formData.bonusPoints) < 0
    ) {
      return "Bonus points cannot be negative.";
    }

    if (!formData.bonusConditionCode) {
      return "Bonus condition is required.";
    }

    if (!formData.bonusDescription.trim()) {
      return "Bonus condition description is required.";
    }

    if (!formData.effectiveFrom) {
      return "Effective From date is required.";
    }

    if (!formData.effectiveTo) {
      return "Effective To date is required.";
    }

    if (
      new Date(formData.effectiveFrom) >
      new Date(formData.effectiveTo)
    ) {
      return (
        "Effective From date cannot be after " +
        "Effective To date."
      );
    }

    // Check overlapping active rules
    const hasOverlap = rules.some((rule) => {
      // Ignore current rule while editing
      if (
        editingRule &&
        rule.id === editingRule.id
      ) {
        return false;
      }

      // Different interview type
      if (
        rule.interviewType !==
        formData.interviewType
      ) {
        return false;
      }

      // Different interview round
      if (
        rule.interviewRound !==
        formData.interviewRound
      ) {
        return false;
      }

      // Disabled rules don't cause conflict
      if (!rule.enabled) {
        return false;
      }

      const newFrom =
        new Date(formData.effectiveFrom);

      const newTo =
        new Date(formData.effectiveTo);

      const existingFrom =
        new Date(rule.effectiveFrom);

      const existingTo =
        new Date(rule.effectiveTo);

      return (
        newFrom <= existingTo &&
        newTo >= existingFrom
      );
    });

    if (hasOverlap) {
      return (
        "An active rule already exists for this " +
        "interview type, round and effective date range."
      );
    }

    return "";
  };

  // -----------------------------------
  // Save Rule
  // -----------------------------------

  const handleSaveRule = (): void => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const ruleData: Omit<
      RewardRule,
      "id" | "createdBy" | "createdAt"
    > = {
      name: formData.name.trim(),

      interviewType:
        formData.interviewType,

      interviewRound:
        formData.interviewRound,

      basePoints:
        Number(formData.basePoints),

      bonuses: [
        {
          conditionCode:
            formData.bonusConditionCode,

          description:
            formData.bonusDescription.trim(),

          points:
            Number(formData.bonusPoints),
        },
      ],

      enabled: formData.enabled,

      effectiveFrom:
        formData.effectiveFrom,

      effectiveTo:
        formData.effectiveTo,

      ...(editingRule
        ? {
            updatedBy: "Admin",
            updatedAt: today,
          }
        : {}),
    };

    // -----------------------------------
    // Edit Existing Rule
    // -----------------------------------

    if (editingRule) {
      setRules((previousRules) =>
        previousRules.map((rule) =>
          rule.id === editingRule.id
            ? {
                ...rule,
                ...ruleData,
              }
            : rule
        )
      );
    }

    // -----------------------------------
    // Add New Rule
    // -----------------------------------

    else {
      const newRule: RewardRule = {
        id: Date.now(),
        ...ruleData,
        createdBy: "Admin",
        createdAt: today,
      };

      setRules((previousRules) => [
        ...previousRules,
        newRule,
      ]);
    }

    handleCloseModal();
  };

  // -----------------------------------
  // Enable / Disable Rule
  // -----------------------------------

  const handleToggleRule = (
    ruleId: number
  ): void => {
    setRules((previousRules) =>
      previousRules.map((rule) =>
        rule.id === ruleId
          ? {
              ...rule,
              enabled: !rule.enabled,
            }
          : rule
      )
    );
  };

  // -----------------------------------
  // Open Delete Confirmation
  // -----------------------------------

  const handleDeleteRule = (
    ruleId: number
  ): void => {
    setDeleteRuleId(ruleId);
  };

  // -----------------------------------
  // Confirm Delete
  // -----------------------------------

  const confirmDeleteRule = (): void => {
    if (deleteRuleId === null) {
      return;
    }

    setRules((previousRules) =>
      previousRules.filter(
        (rule) => rule.id !== deleteRuleId
      )
    );

    setDeleteRuleId(null);
  };

  // -----------------------------------
  // Filter Rules
  // -----------------------------------

  const filteredRules = rules.filter(
    (rule) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        rule.name
          .toLowerCase()
          .includes(search) ||
        rule.interviewType
          .toLowerCase()
          .includes(search) ||
        rule.interviewRound
          .toLowerCase()
          .includes(search);

      const matchesType =
        typeFilter === "All" ||
        rule.interviewType === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Enabled" &&
          rule.enabled) ||
        (statusFilter === "Disabled" &&
          !rule.enabled);

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    }
  );

  // -----------------------------------
  // Get Bonus
  // -----------------------------------

  const getBonus = (
    rule: RewardRule
  ) => {
    return rule.bonuses?.[0] ?? null;
  };

  // -----------------------------------
  // Table Columns
  // -----------------------------------

  const columns = [
    {
      key: "number",
      header: "#",
      render: (
        rule: RewardRule
      ) => filteredRules.indexOf(rule) + 1,
    },

    {
      key: "name",
      header: "Rule Name",
      render: (
        rule: RewardRule
      ) => (
        <div>
          <strong>{rule.name}</strong>

          <div className="small text-muted">
            ID: {rule.id}
          </div>
        </div>
      ),
    },

    {
      key: "interviewType",
      header: "Interview",
    },

    {
      key: "interviewRound",
      header: "Round",
    },

    {
      key: "basePoints",
      header: "Base Points",
      render: (
        rule: RewardRule
      ) => (
        <strong>
          {rule.basePoints}
        </strong>
      ),
    },

    {
      key: "bonus",
      header: "Bonus",
      render: (
        rule: RewardRule
      ) => {
        const bonus = getBonus(rule);

        if (!bonus) {
          return "-";
        }

        return (
          <>
            <Badge bg="success">
              +{bonus.points}
            </Badge>

            <div
              className="small text-muted mt-1"
              style={{
                maxWidth: "180px",
              }}
            >
              {bonus.description}
            </div>
          </>
        );
      },
    },

    {
      key: "totalPoints",
      header: "Total Points",
      render: (
        rule: RewardRule
      ) => {
        const bonus = getBonus(rule);

        const totalPoints =
          Number(rule.basePoints) +
          Number(bonus?.points ?? 0);

        return (
          <Badge bg="primary">
            {totalPoints}
          </Badge>
        );
      },
    },

    {
      key: "effectivePeriod",
      header: "Effective Period",
      render: (
        rule: RewardRule
      ) => (
        <div>
          <div>{rule.effectiveFrom}</div>

          <div className="text-muted">
            to
          </div>

          <div>{rule.effectiveTo}</div>
        </div>
      ),
    },

    {
      key: "status",
      header: "Status",
      render: (
        rule: RewardRule
      ) => (
        <StatusBadge
          status={
            rule.enabled
              ? "Enabled"
              : "Disabled"
          }
        />
      ),
    },

    {
      key: "actions",
      header: "Actions",
      render: (
        rule: RewardRule
      ) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() =>
              handleEditRule(rule)
            }
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant={
              rule.enabled
                ? "outline-warning"
                : "outline-success"
            }
            onClick={() =>
              handleToggleRule(rule.id)
            }
          >
            {rule.enabled
              ? "Disable"
              : "Enable"}
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            onClick={() =>
              handleDeleteRule(rule.id)
            }
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid className="py-4">

      {/* Page Header */}
      <PageHeader
        title="Reward Point Configuration"
        description="Configure interview reward rules and bonus points."
        action={
          <FormButton
            text="+ Add Reward Rule"
            variant="primary"
            onClick={handleAddRule}
          />
        }
      />

      {/* Filters */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <SearchFilter
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search rule, interview type or round..."
            filters={[
              {
                label: "Interview Type",
                value: typeFilter,
                options: [
                  {
                    value: "Technical",
                    label: "Technical",
                  },
                  {
                    value: "HR",
                    label: "HR",
                  },
                  {
                    value: "Managerial",
                    label: "Managerial",
                  },
                ],
                onChange: setTypeFilter,
              },
              {
                label: "Status",
                value: statusFilter,
                options: [
                  {
                    value: "Enabled",
                    label: "Enabled",
                  },
                  {
                    value: "Disabled",
                    label: "Disabled",
                  },
                ],
                onChange: setStatusFilter,
              },
            ]}
            onReset={() => {
              setSearchTerm("");
              setTypeFilter("All");
              setStatusFilter("All");
            }}
          />
        </Card.Body>
      </Card>

      {/* Rules Table */}
      <Card className="shadow-sm">
        <Card.Body>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              Reward Rules
            </h5>

            <Badge bg="secondary">
              {filteredRules.length} Rules
            </Badge>
          </div>

          <DataTable
            columns={columns}
            data={filteredRules}
            rowKey={(rule) => rule.id}
            emptyMessage="No reward rules found."
          />

        </Card.Body>
      </Card>

      {/* Add / Edit Modal */}
      <AppModal
        show={showModal}
        title={
          editingRule
            ? "Edit Reward Rule"
            : "Add Reward Rule"
        }
        onClose={handleCloseModal}
        onSubmit={handleSaveRule}
        submitText={
          editingRule
            ? "Update Rule"
            : "Save Rule"
        }
        size="lg"
      >
        {error && (
          <Alert
            variant="danger"
            className="mb-3"
          >
            {error}
          </Alert>
        )}

        <Row className="g-3">

          {/* Rule Name */}
          <Col md={12}>
            <FormInput
              label="Rule Name"
              name="name"
              placeholder="Example: Technical Interview - Round 1"
              value={formData.name}
              required
              onChange={(value) =>
                updateFormField(
                  "name",
                  value
                )
              }
            />
          </Col>

          {/* Interview Type */}
          <Col md={6}>
            <FormSelect
              label="Interview Type"
              value={formData.interviewType}
              required
              options={[
                {
                  value: "Technical",
                  label: "Technical",
                },
                {
                  value: "HR",
                  label: "HR",
                },
                {
                  value: "Managerial",
                  label: "Managerial",
                },
              ]}
              onChange={(value) =>
                updateFormField(
                  "interviewType",
                  value
                )
              }
            />
          </Col>

          {/* Interview Round */}
          <Col md={6}>
            <FormSelect
              label="Interview Round"
              value={formData.interviewRound}
              required
              options={[
                {
                  value: "Round 1",
                  label: "Round 1",
                },
                {
                  value: "Round 2",
                  label: "Round 2",
                },
                {
                  value: "HR Round",
                  label: "HR Round",
                },
                {
                  value: "Managerial Round",
                  label: "Managerial Round",
                },
                {
                  value: "Final Round",
                  label: "Final Round",
                },
              ]}
              onChange={(value) =>
                updateFormField(
                  "interviewRound",
                  value
                )
              }
            />
          </Col>

          {/* Base Points */}
          <Col md={6}>
            <FormInput
              label="Base Points"
              type="number"
              value={formData.basePoints}
              placeholder="Example: 100"
              required
              onChange={(value) =>
                updateFormField(
                  "basePoints",
                  value
                )
              }
            />
          </Col>

          {/* Bonus Points */}
          <Col md={6}>
            <FormInput
              label="Bonus Points"
              type="number"
              value={formData.bonusPoints}
              placeholder="Example: 25"
              required
              onChange={(value) =>
                updateFormField(
                  "bonusPoints",
                  value
                )
              }
            />
          </Col>

          {/* Bonus Condition */}
          <Col md={6}>
            <FormSelect
              label="Bonus Condition"
              value={
                formData.bonusConditionCode
              }
              required
              options={[
                {
                  value:
                    "COMPLETED_ON_TIME",
                  label:
                    "Completed On Time",
                },
                {
                  value:
                    "FEEDBACK_WITHIN_24_HOURS",
                  label:
                    "Feedback Within 24 Hours",
                },
                {
                  value: "NO_RESCHEDULE",
                  label: "No Reschedule",
                },
                {
                  value:
                    "FEEDBACK_SAME_DAY",
                  label:
                    "Feedback Same Day",
                },
                {
                  value:
                    "COMPLETED_SUCCESSFULLY",
                  label:
                    "Completed Successfully",
                },
              ]}
              onChange={(value) =>
                updateFormField(
                  "bonusConditionCode",
                  value
                )
              }
            />
          </Col>

          {/* Bonus Description */}
          <Col md={6}>
            <FormInput
              label="Condition Description"
              value={
                formData.bonusDescription
              }
              placeholder="Example: Interview completed within scheduled time"
              required
              onChange={(value) =>
                updateFormField(
                  "bonusDescription",
                  value
                )
              }
            />
          </Col>

          {/* Effective From */}
          <Col md={6}>
            <FormDateInput
              label="Effective From"
              value={
                formData.effectiveFrom
              }
              required
              onChange={(value) =>
                updateFormField(
                  "effectiveFrom",
                  value
                )
              }
            />
          </Col>

          {/* Effective To */}
          <Col md={6}>
            <FormDateInput
              label="Effective To"
              value={
                formData.effectiveTo
              }
              required
              onChange={(value) =>
                updateFormField(
                  "effectiveTo",
                  value
                )
              }
            />
          </Col>

          {/* Enabled */}
          <Col md={12}>
            <FormSwitch
              label="Enable this reward rule"
              checked={formData.enabled}
              onChange={(checked) =>
                updateFormField(
                  "enabled",
                  checked
                )
              }
            />
          </Col>

        </Row>
      </AppModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        show={deleteRuleId !== null}
        title="Delete Reward Rule"
        message="Are you sure you want to delete this reward rule?"
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() =>
          setDeleteRuleId(null)
        }
        onConfirm={confirmDeleteRule}
      />

    </Container>
  );
};

export default RewardRules;
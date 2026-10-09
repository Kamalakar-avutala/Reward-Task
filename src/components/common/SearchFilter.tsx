import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  filters?: {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];

  onReset?: () => void;
}

const SearchFilter = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  onReset,
}: SearchFilterProps) => {
  return (
    <Row className="g-3 mb-4">
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>

      {filters.map((filter) => (
        <Col md={3} key={filter.label}>
          <Form.Select
            value={filter.value}
            onChange={(e) =>
              filter.onChange(e.target.value)
            }
          >
            <option value="">
              All {filter.label}
            </option>

            {filter.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      ))}

      {onReset && (
        <Col md="auto">
          <Button
            variant="outline-secondary"
            onClick={onReset}
          >
            Reset
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default SearchFilter;
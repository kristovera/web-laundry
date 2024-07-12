import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
import {
  PRODUCT_DATA_INIT,
  PRODUCT_FIELD_GUIDE,
  PRODUCT_FIELD_VALIDATION,
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";

const ProductPageCreate = () => {
  const navigate = useNavigate();
  const productCreate = useCreate(
    ["products"],
    PRODUCT_DATA_INIT,
    PRODUCT_FIELD_GUIDE,
    PRODUCT_FIELD_VALIDATION
  );

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"New Product"} />

        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    required
                    minLength={3}
                    value={productCreate.state.name}
                    onChange={productCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={productCreate.guide}
                    field={"name"}
                  />
                  <ManagerWidgetValidation
                    messages={productCreate.validation.get("name")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    required
                    value={productCreate.state.price || ""}
                    onChange={productCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={productCreate.guide}
                    field={"price"}
                  />
                  <ManagerWidgetValidation
                    messages={productCreate.validation.get("price")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    name="stock"
                    type="number"
                    required
                    value={productCreate.state.stock || ""}
                    onChange={productCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={productCreate.guide}
                    field={"stock"}
                  />
                  <ManagerWidgetValidation
                    messages={productCreate.validation.get("stock")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ManagerWidgetAction>
        <>
          <Button variant="outline-dark" onClick={() => navigate("../")}>
            Back
          </Button>

          <Button
            onClick={() => {
              productCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default ProductPageCreate;

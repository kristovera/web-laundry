import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate, useParams } from "react-router-dom";
import useDetail from "../../utils/hooks/useDetail";
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

const ProductPageUpdate = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const { id } = useParams();
  const productUpdate = useDetail(
    ["products"],
    PRODUCT_DATA_INIT,
    PRODUCT_FIELD_GUIDE,
    PRODUCT_FIELD_VALIDATION
  );

  useEffect(() => {
    console.log(id);
    productUpdate.onGet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, context.auth.isAuthenticated]);

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"Update Product"} />
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
                    value={productUpdate.state.name}
                    onChange={productUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={productUpdate.guide}
                    field={"name"}
                  />
                  <ManagerWidgetValidation
                    messages={productUpdate.validation.get("name")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    required
                    value={productUpdate.state.price || ""}
                    onChange={productUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={productUpdate.guide}
                    field={"price"}
                  />
                  <ManagerWidgetValidation
                    messages={productUpdate.validation.get("price")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    name="stock"
                    type="number"
                    required
                    value={productUpdate.state.stock || ""}
                    onChange={productUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={productUpdate.guide}
                    field={"stock"}
                  />
                  <ManagerWidgetValidation
                    messages={productUpdate.validation.get("stock")}
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
              productUpdate.onUpdate(id).then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default ProductPageUpdate;

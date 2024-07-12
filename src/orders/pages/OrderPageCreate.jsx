import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
import {
  ORDER_DATA_INIT,
  ORDER_FIELD_GUIDE,
  ORDER_FIELD_VALIDATION,
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ProductWidgetChoice from "../../products/widgets/ProductWidgetChoice";
import OrderWidgetItemList from "../widgets/OrderWidgetItemList";
import { useEffect } from "react";

const OrderPageCreate = () => {
  const navigate = useNavigate();
  const orderCreate = useCreate(
    ["orders"],
    ORDER_DATA_INIT,
    ORDER_FIELD_GUIDE,
    ORDER_FIELD_VALIDATION
  );

  useEffect(() => {
    let total = 0;
    for (let item of orderCreate.state.items) {
      total += item.subtotal;
    }

    orderCreate.setState((values) => ({ ...values, total }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCreate.state.items]);

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"New Order"} />
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Basic Order</Card.Title>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nomor Order</Form.Label>
                      <Form.Control
                        name="nomor"
                        type="text"
                        required
                        minLength={6}
                        maxLength={6}
                        value={orderCreate.state.nomor}
                        onChange={orderCreate.input.handler}
                      />
                      <ManagerWidgetGuide
                        guide={orderCreate.guide}
                        field={"nomor"}
                      />
                      <ManagerWidgetValidation
                        messages={orderCreate.validation.get("nomor")}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Tanggal Order</Form.Label>
                      <Form.Control
                        name="tanggal"
                        type="date"
                        required
                        value={orderCreate.state.tanggal}
                        onChange={orderCreate.input.handler}
                      />
                      <ManagerWidgetGuide
                        guide={orderCreate.guide}
                        field={"tanggal"}
                      />
                      <ManagerWidgetValidation
                        messages={orderCreate.validation.get("tanggal")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <ProductWidgetChoice
              callback={(product) => {
                const itemSet = [...orderCreate.state.items].map(
                  (value) => value._id
                );
                const items = [...orderCreate.state.items];

                if (itemSet.includes(product._id)) {
                  let index = items.findIndex(
                    (value) => value._id === product._id
                  );
                  let item = items[index];
                  if (product.stock > item.qty) {
                    item.qty += 1;
                    item.subtotal = item.qty * item.price;
                    items[index] = item;
                  }
                } else {
                  items.push({
                    ...product,
                    qty: 1,
                    subtotal: product.price,
                  });
                }

                orderCreate.setState((values) => ({
                  ...values,
                  items,
                }));
              }}
            />
          </Col>
          <Col>
            <OrderWidgetItemList
              items={orderCreate.state.items}
              callback={(item, index) => {
                const items = [...orderCreate.state.items];
                items.splice(index, 1);
                orderCreate.setState((values) => ({ ...values, items }));
              }}
            />
          </Col>
        </Row>
      </Container>

      <ManagerWidgetAction>
        <>
          <div className="fw-bold">Total: {orderCreate.state.total}</div>
          <Button variant="outline-dark" onClick={() => navigate("../")}>
            Back
          </Button>

          <Button
            onClick={() => {
              orderCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default OrderPageCreate;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UtilStateContextBase } from "../../utils/states/contexts";
import useList from "../../utils/hooks/useList";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_ORDERS } from "../states/constants";
import { READ_PRODUCTS } from "../../products/states/constants";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import OrderWidgetPreview from "../widgets/OrderWidgetPreview";

const OrderPageList = () => {
  const navigate = useNavigate();
  const context = useContext(UtilStateContextBase);
  const orderList = useList(["orders"]);

  useEffect(() => {
    orderList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.auth.isAuthenticated]);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Orders"}>
        <ManagerWidgetRBAC
          context={context}
          permissions={[CREATE_ORDERS, READ_PRODUCTS]}
        >
          <Button onClick={() => navigate("new")}>New Order</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "nomor", text: "Nomor" }]}
                callback={(value) => {
                  orderList.filter.current.field = value.field;
                  orderList.filter.current.value = value.value;
                  orderList.filter.current.page = 1;
                  orderList.onAll();
                }}
              />
            </Card.Body>
            <Table striped borderless responsive hover>
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Tanggal</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderList.states.map((order) => (
                  <tr key={order._id}>
                    <td>{order.nomor}</td>
                    <td>{order.tanggal}</td>
                    <td>{order.total}</td>
                    <td>
                      <OrderWidgetPreview id={order._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Card.Footer>
              <ManagerWidgetPagination
                pagination={orderList.pagination}
                callback={(value) => {
                  orderList.filter.current.page = value;
                  orderList.onAll();
                }}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPageList;

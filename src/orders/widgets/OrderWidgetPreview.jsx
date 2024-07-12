import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import useDetail from "../../utils/hooks/useDetail";
import { ORDER_DATA_INIT } from "../states/constants";
import { Col, Form, NavLink, Row } from "react-bootstrap";
import OrderWidgetItemList from "./OrderWidgetItemList";

const OrderWidgetPreview = ({ id }) => {
  const orderDetail = useDetail(["orders"], ORDER_DATA_INIT);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onShow = () => {
    orderDetail.onGet(id);
  };

  return (
    <>
      <NavLink onClick={handleShow} className={"text-secondary"}>
        preview
      </NavLink>

      <Modal size="lg" onShow={onShow} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nomor Order</Form.Label>
                <Form.Control
                  name="nomor"
                  type="text"
                  required
                  minLength={6}
                  maxLength={6}
                  disabled
                  value={orderDetail.state.nomor}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tanggal Order</Form.Label>
                <Form.Control
                  name="tanggal"
                  disabled
                  required
                  value={orderDetail.state.tanggal}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Total Order</Form.Label>
                <Form.Control
                  name="total"
                  disabled
                  required
                  value={orderDetail.state.total}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <OrderWidgetItemList
                items={orderDetail.state.items}
                callback={null}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

OrderWidgetPreview.propTypes = {
  id: PropTypes.string,
};

export default OrderWidgetPreview;

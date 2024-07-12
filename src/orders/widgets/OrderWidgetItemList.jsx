import { Button, Card, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import ManagerWidgetStaticPagination from "../../managers/widgets/ManagerWidgetStaticPagination";
import useStaticPagination from "../../utils/hooks/useStaticPagination";
import PropTypes from "prop-types";

const OrderWidgetItemList = ({ items, callback }) => {
  const itemPagination = useStaticPagination(items, items, 5);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Items</Card.Title>
      </Card.Body>
      <Table striped borderless responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Qty</th>
            <th>Subtotal</th>
            {callback && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {itemPagination.results.map((product, index) => (
            <tr key={product.id}>
              <td>{product.value.name}</td>
              <td>{product.value.price}</td>
              <td>{product.value.stock}</td>
              <td>{product.value.qty}</td>
              <td>{product.value.subtotal}</td>
              {callback && (
                <td>
                  <Button
                    onClick={() => {
                      callback(product, index);
                    }}
                    size="sm"
                    variant="outined-danger"
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Card.Footer>
        <ManagerWidgetStaticPagination staticPagination={itemPagination} />
      </Card.Footer>
    </Card>
  );
};

OrderWidgetItemList.propTypes = {
  items: PropTypes.array,
  callback: PropTypes.func,
};

export default OrderWidgetItemList;

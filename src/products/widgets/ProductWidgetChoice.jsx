import { useEffect } from "react";
import useList from "../../utils/hooks/useList";
import { Button, Card, Table } from "react-bootstrap";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import { FaPlusCircle } from "react-icons/fa";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import PropTypes from "prop-types";

const ProductWidgetChoice = ({ callback }) => {
  const productList = useList(["products"]);

  useEffect(() => {
    productList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Product Choice</Card.Title>
        <ManagerWidgetFilter
          fields={[{ value: "name", text: "Name" }]}
          callback={(value) => {
            productList.filter.current.field = value.field;
            productList.filter.current.value = value.value;
            productList.filter.current.page = 1;
            productList.onAll();
          }}
        />
      </Card.Body>
      <Table striped borderless responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.states.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Button onClick={() => callback(product)} size="sm">
                  <FaPlusCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card.Footer>
        <ManagerWidgetPagination
          pagination={productList.pagination}
          callback={(value) => {
            productList.filter.current.page = value;
            productList.onAll();
          }}
        />
      </Card.Footer>
    </Card>
  );
};

ProductWidgetChoice.propTypes = {
  callback: PropTypes.func,
};

export default ProductWidgetChoice;

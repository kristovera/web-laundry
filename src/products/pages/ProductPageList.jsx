import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate } from "react-router-dom";
import useList from "../../utils/hooks/useList";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  NavLink,
} from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import {
  CREATE_PRODUCTS,
  DELETE_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../states/constants";
import useDetail from "../../utils/hooks/useDetail";
import useMessage from "../../utils/hooks/useMessage";

const ProductPageList = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const context = useContext(UtilStateContextBase);
  const productList = useList(["products"]);
  const productsDelete = useDetail(["products"]);

  useEffect(() => {
    productList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <ManagerWidgetTitle title={"Products"}>
        <ManagerWidgetRBAC context={context} permissions={[CREATE_PRODUCTS]}>
          <Button onClick={() => navigate("new")}>New Product</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
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
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[UPDATE_PRODUCTS]}
                        >
                          <NavLink
                            className={"text-secondary"}
                            href={`#/products/update/${product._id}`}
                          >
                            edit
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[DELETE_PRODUCTS]}
                        >
                         <NavLink
                            className={"text-secondary"}
                          //  href={`#/products/delete/${products._id}`}
                          onClick={()=>{
                            message.confirmRemove(() => {
                              productsDelete.onDelete(product._id).then(()=>{
                                productList.onAll()
                              })
                            })
                          }}
                          >
                            delete
                          </NavLink>
                        </ManagerWidgetRBAC>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPageList;

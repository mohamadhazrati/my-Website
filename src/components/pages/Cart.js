import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styl from "../cssStyles/cart.module.css";

const Cart = ({ isLogIn }) => {
  const data = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const locUser = JSON.parse(localStorage.getItem("user")) ?? false;

  useEffect(() => {
    if (data.length) {
      const help = [];
      data.map((item) => {
        return help.push(item.price * item.qty);
      });
      const sum = help.reduce((first, num) => {
        return first + num;
      }, 0);
      localStorage.setItem("totalPrice", JSON.stringify(sum));
      return setPrice(sum);
    } else {
      setPrice(0);
    }
  }, [data]);

  return (
    <div className={styl.min}>
      <div className={styl.div1}>
        <h1>| Cart Shopping |</h1>
        <Container className="mt-5">
          {data.length ? (
            data.map((item, index, arr) => {
              return (
                <Row key={item._id} className={styl.forRow}>
                  <Col>
                    <img
                      className={styl.forImg}
                      src={item.image}
                      alt="product"
                    />
                  </Col>
                  <Col>
                    <div className={styl.div2}>{item.name}</div>
                  </Col>
                  <Col>
                    <div className={styl.div3}>Price: {item.price} $</div>
                  </Col>
                  <Col>
                    <div className={styl.div3}>
                      <Button
                        variant="danger"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "danger",
                            cancelButtonColor: "gray",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              data.splice(index, 1);
                              dispatch({
                                type: "removeACart",
                                payLoad: [...data],
                              });
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(data)
                              );
                              Swal.fire(
                                "Deleted!",
                                "Your item has been deleted.",
                                "success"
                              );
                            }
                          });
                        }}
                      >
                        Remove <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    <div className={styl.div4}>
                      <button
                        className={styl.forButt}
                        onClick={() => {
                          if (arr[index].qty > 1) {
                            arr[index].qty = arr[index].qty - 1;
                            dispatch({
                              type: "minusQtyCart",
                              payLoad: [...data],
                            });
                            localStorage.setItem("cart", JSON.stringify(data));
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <Button variant="info">{item.qty}</Button>
                      <button
                        className={styl.forButt}
                        onClick={() => {
                          if (item.qty < item.countInStock) {
                            arr[index].qty = arr[index].qty + 1;
                            dispatch({
                              type: "plusQtyCart",
                              payLoad: [...data],
                            });
                            localStorage.setItem("cart", JSON.stringify(data));
                          } else {
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "More than stock",
                              showConfirmButton: false,
                              timer: 1400,
                            });
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </Col>
                </Row>
              );
            })
          ) : (
            <h3 className="mt-5">Cart is Empty :(</h3>
          )}
        </Container>

        <div className={styl.div5}>Total Price: {price} $</div>
      </div>
      {data.length ? (
        <Button
          variant="info"
          className={styl.forButt2}
          onClick={() => (isLogIn ? navigate("/address") : navigate("/login"))}
        >
          Continue
        </Button>
      ) : (
        <Button variant="dark" className={styl.forButt2}>
          Please Push cart
        </Button>
      )}
    </div>
  );
};

export default React.memo(Cart);

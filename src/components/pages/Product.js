import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/action";
import { getCart } from "../../redux/action";
import Swal from "sweetalert2";
import styl from "../cssStyles/product.module.css";

const Product = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.oneProduct);
  const { productId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOneProduct(productId));
  }, []);

  return (
    <div className={styl.min}>
      {loading ? (
        <Spinner animation="border" variant="info" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className={styl.div1}>
          <div className={styl.div2}>
            <Button
              variant="info"
              className={styl.butt}
              onClick={() => navigate("/")}
            >
              {" "}
              <FontAwesomeIcon icon={faArrowRotateLeft} /> Back to Home
            </Button>
          </div>
          <div className={styl.div2}>
            <img src={data.image} className={styl.forImg} />
          </div>
          <Card className={styl.forCard}>
            <Card.Header className={styl.bgIt}>
              <h4>{data.name}</h4>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Brand: <span className={styl.blueIt}>{data.brand}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Category: <span className={styl.blueIt}>{data.category}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Color: <span className={styl.blueIt}>{data.color}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Available:{" "}
                <span className={styl.blueIt}>{data.countInStock}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Description:{" "}
                <span className={styl.blueIt}>{data.description}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Reviews: <span className={styl.blueIt}>{data.numReviews}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Price:{" "}
                <span className={styl.blueIt}>
                  {data.price}
                  <FontAwesomeIcon icon={faDollarSign} className={styl.ml3} />
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Rating:{" "}
                <span className={styl.blueIt}>
                  {data.rating}
                  <FontAwesomeIcon icon={faStar} className={styl.ml3} />
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <div className={styl.div2}>
            {data.countInStock ? (
              <Button
                variant="info"
                onClick={() => {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your item added",
                    showConfirmButton: false,
                    timer: 1400,
                  });
                  dispatch(getCart(data));
                }}
              >
                {" "}
                Add to Cart <FontAwesomeIcon icon={faPlus} />
              </Button>
            ) : (
              <Button variant="dark" disabled>
                Not Available
              </Button>
            )}
            <Button
              variant="info"
              className="mt-3"
              onClick={() => navigate("/cart")}
            >
              {" "}
              Go to Cart <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

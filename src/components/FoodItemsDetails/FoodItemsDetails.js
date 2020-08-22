import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
const FoodItemsDetails = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { keys } = useParams();
  const [cart, setCart] = useContext(CartContext);
  let history = useHistory();
  const handleHistory = () => {
    history.push("/");
  };
  useEffect(() => {
    fetch("http://localhost:3010/food/" + keys)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      });
  }, []);
  /** 
  const handleCart = () => {
    const items = { name: item.title, price: item.price };
    // console.log(items);
    setCart((prevCart) => [...prevCart, items]);
    // console.log(cart);
  };
  */
  const handleCart = () => {
    //keep same product as 1 in cart but change the quantity
    const clickSameProduct = item.keys;
    console.log(clickSameProduct);
    const sameProduct = cart.find((pd) => pd.keys === clickSameProduct);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.keys !== clickSameProduct);
      newCart = [...others, sameProduct];
      console.log(sameProduct, "if");
    } else {
      item.quantity = 1;
      newCart = [...cart, item];
    }
    setCart(newCart);
  };
  return (
    <div className="container">
      <div className="py-2">
        <button className="btn btn-info" onClick={handleHistory}>
          Back
        </button>
      </div>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <div className="row py-2">
          <div className="col-md-6">
            <h3 style={{ fontWeight: "bold" }}>{item.title}</h3>
            {/* <h5>{item.description}</h5> */}
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              ${item.price}
            </p>
            <button className="btn btn-danger" onClick={handleCart}>
              Add to cart
            </button>
          </div>
          <div className="col-md-6">
            <img
              src={item.img}
              style={{ width: "400px", height: "400px" }}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemsDetails;

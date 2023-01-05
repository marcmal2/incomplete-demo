import React from 'react'
import { useState, useEffect } from "react";
import './Cart.css'
import { useCart } from "react-use-cart";
import EmptyCart from '../EmptyCart/EmptyCart';
import {db} from '../../firebaseconfig'
import {
  onAuthStateChanged,
} from "firebase/auth";
import {  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,} from "firebase/firestore"
  import { auth } from "../../firebaseconfig";

const Cart = () => {
  const gamesCollectionRef = collection(db,"orders");
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  }, []) 
  const createUser = async () => {
    await addDoc(gamesCollectionRef, {  items: items, price: cartTotal , user:  user? user.email: "guest" });
  };
    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart
      } = useCart();
      if (isEmpty) return <EmptyCart/>;
  return (
    <>
    <div id="cart" class>
    <div class="parent">
      <div class = "items" >
      <p>{!isEmpty && <button className='btn btn-primary' onClick={emptyCart}>Empty cart</button>}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
           <h2>{item.quantity} x {item.title} &nbsp; 
            <button className='btn btn-primary'
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <button className='btn btn-primary'
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button  className='btn btn-primary' onClick={() => removeItem(item.id)}>Remove</button></h2>
          </li>
        ))}
      </ul>
      </div>
      <div class="totalcart">
    <div class="div1"><h1>Cart</h1></div>
    <div class="div2"><h1>total price: {cartTotal}</h1></div>
    <div class="div3"><button className='btn btn-primary' onClick={createUser}>checkout</button></div>
      </div>
      </div>
      </div>
    </>
  )
  
}

export default Cart
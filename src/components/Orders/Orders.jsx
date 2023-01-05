import React from 'react'
import './Orders.css'
import {db} from '../../firebaseconfig'
import {  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,} from "firebase/firestore"
  import { useState, useEffect } from "react";
  import {
    onAuthStateChanged,
  } from "firebase/auth";
  import { auth } from "../../firebaseconfig";


const Orders = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  }, []) 
    const [orders, setOrders] = useState([]);
    const ordersCollectionRef = collection(db,"orders");
    useEffect(() =>{
        const getOrders = async () => {
        const dase = await getDocs(ordersCollectionRef);
        setOrders(dase.docs.map((doc) => ({ ...doc.data(),id: doc.id})));
        };
        getOrders();
      }, [])
  return (
    <>
    { orders.filter((asd) => asd.user.toLowerCase().includes(user?.email)
        ).map((q) => {
        return (
          <div>
            {" "}
            <h2>Price: {q.price} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User: {q.user}</h2>
            <h2>{q.items.title}</h2>
            {q.items.map((u) => (
              <h2>quantity: {u.quantity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; item: {u.title}</h2>
          ))}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        );
      })}
    </>
  )
}

export default Orders
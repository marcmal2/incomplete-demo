import React from 'react'
import './Admin.css'
import {db} from '../../firebaseconfig'
import {  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,} from "firebase/firestore"
  import { useState, useEffect } from "react";

const Admin = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const [games, setGames] = useState([]);
  const [orders, setOrders] = useState([]);
  const gamesCollectionRef = collection(db,"Games");
  const ordersCollectionRef = collection(db,"orders");

  const createUser = async () => {
    await addDoc(gamesCollectionRef, {  description: newDescription, image: newImg , price: Number(newPrice), quantity: Number(newQuantity), title: newTitle, });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "Games", id);
    await deleteDoc(userDoc);
  };

  useEffect(() =>{
    const getGames = async () => {
    const dase = await getDocs(gamesCollectionRef);
    setGames(dase.docs.map((doc) => ({ ...doc.data(),id: doc.id})));
    };
    getGames();
    console.log(games);
  }, [createUser,deleteUser])

  useEffect(() =>{
    const getOrders = async () => {
    const dase = await getDocs(ordersCollectionRef);
    setOrders(dase.docs.map((doc) => ({ ...doc.data(),id: doc.id})));
    };
    getOrders();
    console.log(games);
  }, [createUser,deleteUser])

  return (
    <>
    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SHOP</h1>
    <div id="title">
      <div>&nbsp;</div>
      <input
        placeholder="title..."
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
      />
      <input
        type="quantity"
        placeholder="quantity..."
        onChange={(event) => {
          setNewQuantity(event.target.value);
        }}
      />
      <input
        type="price"
        placeholder="price..."
        onChange={(event) => {
          setNewPrice(event.target.value);
        }}
      />
      <input
        type="description"
        placeholder="description..."
        onChange={(event) => {
          setNewDescription(event.target.value);
        }}
      />
      <input
        type="img"
        placeholder="image..."
        onChange={(event) => {
          setNewImg(event.target.value);
        }}
      />
      &nbsp;

      <button onClick={createUser}> Create Game</button>
      {games.map((p) => {
        return (
          <div>
            {" "}
            <h2>Title: {p.title} &nbsp;&nbsp; Price: {p.price} &nbsp;&nbsp;    Quantity: {p.quantity}</h2>
            
            <button
              onClick={() => {
                updateUser(p.id, p.age);
              }}
            >
              {" "}
              Increase Quantity
            </button>
            <button
              onClick={() => {
                deleteUser(p.id);
              }}
            >
              {" "}
              Delete Game
            </button>
          </div>
        );
      })}
    </div>
    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ORDERS</h1>
    { orders.map((q) => {
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
    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MESSAGES</h1>
    </>
  )
}

export default Admin
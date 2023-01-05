import React, {useEffect, useState} from 'react'
import './Altshop.css'
import clouds from '../../assets/storm.png'
import { useCart } from "react-use-cart";
import {db} from '../../firebaseconfig'
import {  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,} from "firebase/firestore"


const Altshop = () => {
  const [games, setGames] = useState([]);
  const gamesCollectionRef = collection(db,"Games");
  const [query, setQuery] = useState("");
  const { addItem, inCart,} = useCart();
  const [dat, setData] = useState([]);
  const [sortType, setSortType] = useState('games');

  useEffect(() =>{
    const getGames = async () => {
    const dase = await getDocs(gamesCollectionRef);
    setGames(dase.docs.map((doc) => ({ ...doc.data(),id: doc.id})));
    setData(dase.docs.map((doc) => ({ ...doc.data(),id: doc.id})));
    };
    getGames();

  },[])

  useEffect(() => {
    const sortArray = type => {
      const types = {
        price: 'price',
        nprice:'price',
        quantity: 'title',
      };
      const sortProperty = types[type];
      const rsorted = [...games].sort((b, a) => b[sortProperty] - a[sortProperty]);
      const sorted = [...games].sort((a, b) => b[sortProperty] - a[sortProperty]);
      if(type=='nprice'){
        setData(rsorted);
      }
      else{
      setData(sorted);
      }
    };
    sortArray(sortType);
  }, [sortType]); 
  return (
    <>
    <div id="altshoponly">
    <header>
  <div class="filter-conditon">

    <input
        className="search"
         placeholder="Search..."
         onChange={(e) => setQuery(e.target.value.toLowerCase())}
       />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>Filter By</span>
      <select onChange={(e) => setSortType(e.target.value)}> 
        <option >none</option>
        <option value="price">Highest to lowest</option>
        <option value="nprice">lowest to Highest</option>
        <option value="quantity">quantity</option>
      </select>
  </div>
</header>
<br></br>
      <div className="container portfolio__container">
        
          {dat.filter((asd) => asd.title.toLowerCase().includes(query)
        ).map((p) =>{
            const alreadyAdded = inCart(p.id);
            return(
              <article key={p.id} className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={clouds} alt = {p.image} />
          </div>
          <h1>{p.title}</h1>
          <h3>{p.description}</h3>
          <div className="portfolio__item-cta">
          <button className='btn btn-primary' onClick={() => addItem(p)}>{alreadyAdded ? "Add again" : "Add to Cart"}</button>
          <h1>{p.price}$</h1>
          </div>
        </article>
            )
          })}
      </div>
    </div>
    <script type ="text/javascript" src="sort.js"></script>
    <script type ="text/javascript" src="filter.js"></script>
    </>
  )
}

export default Altshop
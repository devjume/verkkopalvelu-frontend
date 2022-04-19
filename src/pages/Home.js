import React from 'react'
import ComponentCarousel from "../components/ComponentCarousel";
import { useState, useEffect } from "react"
import axios from 'axios';
import Banner from '../components/admin/Banner';

export default function Home({url, addToCart, categories}) {
  const [twoCategories, setTwoCategories] = useState(categories.slice(0,2))
   useEffect(() => {
   }, [])

  return (
    <div>
      <Banner></Banner>
      {twoCategories?.map(category => (
            <ComponentCarousel key={category.id} url={url} categoryId={category.id} addToCart={addToCart} categoryName={category.nimi} />
          ))}
    </div>
  )
}
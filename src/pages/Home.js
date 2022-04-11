import React from 'react'
import ComponentCarousel from "../components/ComponentCarousel";
import { useState, useEffect } from "react"
import axios from 'axios';
import Banner from '../components/admin/Banner';

export default function Home({url}) {
  const [categories, setCategories] = useState()
   useEffect(() => {

     axios.get(`${url}/categories.php`)
       .then((response) => {
         let twoCategories = response.data.slice(0,2)
         setCategories(twoCategories)
       }).catch(error => {
         alert(error.response ? error.response.data.error : error)
       })
   }, [])

  return (
    <div>
      <Banner></Banner>
      {categories?.map(category => (
            <ComponentCarousel key={category.id} url={url} categoryId={category.id} categoryName={category.nimi} />
          ))}
    </div>
  )
}
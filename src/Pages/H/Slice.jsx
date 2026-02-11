import { createSlice } from "@reduxjs/toolkit";
 
const Slice=createSlice({
name:"CartItems",
initialState:[
     { "id": "1",
      "det": "black coloured stylish",
      "name": "Cropped ",
      "price": 1350,
      "img": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-Pesche-Flow-Tee-Black-0-4.jpg?v=1754351111&width=1000",
      "img2": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-Pesche-Flow-Tee-Black-0-15.jpg?v=1754351112&width=500",
      "img3": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-Pesche-Flow-Tee-Black-0-1.jpg?v=1754351114&width=1000",
      "img4": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-Pesche-Flow-Tee-Black-0.jpg?v=1754351115&width=1000",
      "category": "Tshirt",
      "description": "new imported ",
      "stock": 22},
         {
      "id": "2",
      "det": "",
      "name": "Cropped Slub Flow Tee",
      "price": 1350,
      "img": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-NY-Flow-Tee-Grey-Marle-0.jpg?v=1754351112&width=1000",
      "img2": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-NY-Flow-Tee-Grey-Marle-0-15.jpg?v=1754351112&width=1000",
      "img3": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-NY-Flow-Tee-Grey-Marle-0-11.jpg?v=1754351114&width=1000",
      "img4": "https://zanerobe.com.au/cdn/shop/files/ZANEROBE-NY-Flow-Tee-Grey-Marle-0-12.jpg?v=1754351115&width=1000",
      "category": "Tshirt",
      "stock": 1
    },


]

})

export default Slice.reducer
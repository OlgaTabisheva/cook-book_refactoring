import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import MainLayout from "/src/MainLayout/MainLayout";
import "./index.css";
import {gql, useQuery} from '@apollo/client'
import {useAuthenticated, useUserData} from "@nhost/react";
import {Toaster} from "react-hot-toast";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Ttest from "./test/test.jsx";
import RecipesCatalog from "./pages/RecipesCatalog/RecipesCatalog.jsx";


const GET_RECIPES = gql`
 query {recipes(offset: 0, limit: 60 ) {
    category {
      category
    }
      id
      date
      name
      food
      long
      description
      photo
      category
      
      }}`
const GET_CATEGORY = gql`
 query {categories {   
 number
 category
      }}`

function App() {

  const [formData, setFormData] = React.useState({
    displayName: '',
    avatarUrl: '',
    email: '',
  })
  const [allCategories, setAllCategories] = React.useState({})
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const user = useUserData()
  const isAuthenticated = useAuthenticated()
  const {data} = useQuery(GET_RECIPES)
  const categories = useQuery(GET_CATEGORY).data
  const [instantLikes, setInstantLikes] = useState([])
  const [instantAddRecipe, setInstantAddRecipe] = React.useState()
  const [formValuesRecipe, setFormValuesRecipe] = React.useState({
    id: '',
    name: '',
    photo: '',
    category: '',
    long: '',
    food: '',
  });
  const [description, setDescription] = React.useState("Введите текст");
  const [myImage, setMyImage] = useState();

  const GET_LIKES = gql`
 query {
  likes(where: {userId: {_eq: "${user?.id}"}}) {
    recipesId
    userId
  }
}
`
  const likesFromServer = useQuery(GET_LIKES).data?.likes

  useEffect(() => {
    setInstantLikes(likesFromServer)
  }, [likesFromServer])

  const SET_CATEGORY = gql`query {
   recipes(where: {category: {recipes: {recipes_category: {_eq: "${selectedCategory}"}}}}) {
    id
    date
    name
    food
    long
    description
    photo
    recipes_category
  }
}

  `
  const chosenCategory = useQuery(SET_CATEGORY).data

  React.useEffect(() => {
    setInstantAddRecipe(data)
  }, [data])

  React.useEffect(() => {
    setAllCategories(categories)
  }, [categories, allCategories, chosenCategory])


  return (
    <div className='app'>

      <Routes>


        <Route exact path="/" element={
          <MainLayout/>
        }>
          <Route path="/" element={
            <HomePage
              instantAddRecipe={instantAddRecipe}
              instantLikes={instantLikes}
              setInstantLikes={setInstantLikes}
              isAuthenticated={isAuthenticated}
              data={data}
              setInstantAddRecipe={setInstantAddRecipe}
            />
          }/>

        </Route>
        <Route exact path="/recipes" element={
          <MainLayout/>
        }>
          <Route path="/recipes" element={
            <RecipesCatalog
              isAuthenticated={isAuthenticated}
              allCategories={allCategories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              chosenCategory={chosenCategory}
              instantLikes={instantLikes}
              setInstantLikes={setInstantLikes}
              instantAddRecipe={instantAddRecipe}
            />
          }/>

        </Route>
        <Route path="/auth" element={

          <Auth/>

        }/>
        <Route path="/test" element={

          <Ttest/>

        }/>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;



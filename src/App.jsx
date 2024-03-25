import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import MainLayout from "/src/MainLayout/MainLayout";
import "./index.css";
import {gql, useQuery} from '@apollo/client'
import {useAuthenticated, useUserData} from "@nhost/react";
import {Toaster} from "react-hot-toast";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Ttest from "./test/test.jsx";
import RecipesCatalog from "./pages/RecipesCatalog/RecipesCatalog.jsx";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage.jsx";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import {PersonalPage} from "./pages/PersonalPage/PersonalPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import FullRecipe from "./pages/FullRecipe/FullRecipe.jsx";
import AddRecipe from "./pages/AddRecipe/AddRecipe.jsx";
import AddRecipeStep1 from "./pages/AddRecipeStep1/AddRecipeStep1.jsx";


const GET_RECIPES = gql`
 query {recipes(offset: 0, limit: 60 ) {
    category {
      category
    }
   duration {
      duration
    }
      id
      date
      name
      food
      description
      photo
      steps
      
      }}`
const GET_CATEGORY = gql`
 query {categories {   
 number
 category
      }}`

const GET_DURATION = gql`
query MyQuery {
  duration {
    number
    duration
  
}}`

function App() {

  const [formData, setFormData] = React.useState({
    displayName: '',
    avatarUrl: '',
    email: '',
  })
  const [allCategories, setAllCategories] = React.useState({})
  const [allDuration, setAllDuration] = React.useState({})
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const user = useUserData()
  const isAuthenticated = useAuthenticated()
  const {data} = useQuery(GET_RECIPES)
  const categories = useQuery(GET_CATEGORY).data
  const duration = useQuery(GET_DURATION).data
  const [instantLikes, setInstantLikes] = useState([])
  const [instantAddRecipe, setInstantAddRecipe] = React.useState()
  const [formValuesRecipe, setFormValuesRecipe] = React.useState({
    id: '',
    name: '',
    photo: '',
    category: '',
    duration: '',
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
    category {
      category
    }
   duration {
      duration
    }
      id
      date
      name
      food
      description
      photo
      steps
  }
}

  `

  const chosenCategory = useQuery(SET_CATEGORY).data


useEffect(()=>{
},[chosenCategory])

  React.useEffect(() => {
    setInstantAddRecipe(data)
  }, [data])

  React.useEffect(() => {
    setAllCategories(categories)
  }, [categories, allCategories, chosenCategory])

  React.useEffect(() => {
    setAllDuration(duration)
  }, [duration, allDuration])

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
              setInstantAddRecipe={setInstantAddRecipe}
              chosenCategory={chosenCategory}
            />
          }/>
        </Route>
        <Route exact path="/authors" element={
          <MainLayout/>
        }>
          <Route path="/authors" element={
            <ProtectedRoute>
            <AuthorsPage/>
              </ProtectedRoute>
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
        <Route path="/add-recipe" element={
          <ProtectedRoute>

          <AddRecipe
            allCategories={allCategories}
            allDuration={allDuration}
            instantAddRecipe={instantAddRecipe}
            setInstantAddRecipe={setInstantAddRecipe}
          />
          </ProtectedRoute>
        }/>
        <Route exact path="/add-recipe/:id" element={
          <ProtectedRoute>
            <AddRecipe
              allCategories={allCategories}
              allDuration={allDuration}
              instantAddRecipe={instantAddRecipe}
              setInstantAddRecipe={setInstantAddRecipe}
            />
          </ProtectedRoute>}
        />


        <Route path="/add-recipe-step" element={
          <ProtectedRoute>
          <AddRecipeStep1
            allCategories={allCategories}
            setInstantAddRecipe={setInstantAddRecipe}
            setFormValuesRecipe={setFormValuesRecipe}
            formValuesRecipe={formValuesRecipe}
            instantAddRecipe={instantAddRecipe}
          />
          </ProtectedRoute>
        }/>
        <Route exact path="/user" element={
          <MainLayout/>
        }>
          <Route path="/user" element={
            <ProtectedRoute>
            <PersonalPage
            />
            </ProtectedRoute>
          }/>
        </Route>
        <Route exact path="/recipe/:id" element={
          <MainLayout/>
        }>
          <Route path="/recipe/:id" element={
            <FullRecipe
              allCategories={allCategories}
              instantAddRecipe={instantAddRecipe}
              setInstantAddRecipe={setInstantAddRecipe}
            />
          }/>
        </Route>
        <Route exact path="*" element={
          <MainLayout/>
        }>
          <Route path="*" element={
            <NotFound
            />
          }/>

        </Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;



import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import searchIcon from './assets/search.svg';
import hamburgerIcon from './assets/hamburger.svg';
import { Header, AppNameComponent,  AppIcon, SearchComponent, SearchInput, SearchIcon } from './components/HeaderComponent';
import { Container, RecipeListContainer, RecipeContainer, CoverImage, RecipeName, IngredientsText, SeeMoreText, Placeholder } from './components/RecipeComponent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function App() {
 
  const url = 'https://api.edamam.com/search?q=egg&app_id=23972eb1&app_key=f5f19cc996ebe5948f3661065e16bc8b';
  
  const AppId = '23972eb1';

  const AppKey = 'f5f19cc996ebe5948f3661065e16bc8b';

  const[timeoutId, setTimeoutId] = useState();
  const[recipeList, setRecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${AppId}&app_key=${AppKey}`
      );
      console.log(response);
      setRecipeList(response.data.hits);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 500);
    setTimeoutId(timeout);
  };

  const RecipeComponent = (props) => {
    const[show, setShow] = useState(false);
    const { recipeObj } = props;
    return (
      <>
        <Dialog open={show} >
          <DialogTitle>Ingredients</DialogTitle>
          <DialogContent>
            <table>
              <hhead>
                <th>Ingredients</th>
                <th>Weight</th>
                <tbody>
                  {recipeObj.ingredients.map((ingredientObj) => <tr>
                    <td>{ingredientObj.text}</td>
                    <td>{ingredientObj.weight}</td>
                  </tr>)}
                  
                </tbody>
              </hhead>
            </table>
          </DialogContent>
          <DialogActions>
            <IngredientsText onClick={() => window.open(recipeObj.url)}>See More</IngredientsText>
            <SeeMoreText onClick={() => setShow(false)}>Close</SeeMoreText>
          </DialogActions>
        </Dialog>
        <RecipeContainer>
            <CoverImage src={recipeObj.image} />
            <RecipeName>{recipeObj.label}</RecipeName>
            <IngredientsText onClick={() => setShow(true)}>Ingredients</IngredientsText>
            <SeeMoreText onClick={() => window.open(recipeObj.url)}>See Complete Recipe </SeeMoreText>
        </RecipeContainer>
      </>
    );
  };

  return (
      <Container>

        <Header>
          <AppNameComponent><AppIcon src={hamburgerIcon} />Recipe Finder</AppNameComponent>
          <SearchComponent>
          <SearchIcon src={searchIcon}  />
          <SearchInput placeholder='Search Recipe' onChange={onTextChange} />
          </SearchComponent>
        </Header>

        <RecipeListContainer>
          {recipeList.length ? recipeList.map((recipeObj) => <RecipeComponent recipeObj={recipeObj.recipe}></RecipeComponent>) : 
          <Placeholder src={hamburgerIcon} />}
          
        </RecipeListContainer>

      </Container>
  )
}

export default App

import styled from 'styled-components';
import './App.css';
import searchIcon from './assets/search.svg';
import hamburgerIcon from './assets/hamburger.svg';
import { Header, AppNameComponent,  AppIcon, SearchComponent, SearchInput, SearchIcon } from './components/HeaderComponent';
import { Container, RecipeListContainer, RecipeContainer, CoverImage, RecipeName, IngredientsText, SeeMoreText  } from './components/RecipeComponent';


function App() {
 
  const url = 'https://api.edamam.com/search?q=egg&app_id=23972eb1&app_key=f5f19cc996ebe5948f3661065e16bc8b'

  return (
      <Container>

        <Header>
          <AppNameComponent><AppIcon src={hamburgerIcon} />Recipe Finder</AppNameComponent>
          <SearchComponent>
          <SearchIcon src={searchIcon}  />
          <SearchInput placeholder='Search Recipe' />
          </SearchComponent>
        </Header>

        <RecipeListContainer>
          <RecipeContainer>
            <CoverImage src={hamburgerIcon} />
            <RecipeName>Matar Paner</RecipeName>
            <IngredientsText>Ingredients</IngredientsText>
            <SeeMoreText>See Complete Recipe </SeeMoreText>
          </RecipeContainer>
        </RecipeListContainer>

      </Container>
  )
}

export default App

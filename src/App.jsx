import { useState } from "react";
import "./App.css";
import chef from "./assets/chef.gif";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";

function App() {
  const [recipes, setRecipes] = useState([]);
  // const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  console.log({
    recipes,
    query,
  });

  async function getRecipes() {
    const response = await axios.post(
      `https://api.edamam.com/search?q=${query}&app_id=${(import.meta.env.VITE_REACT_APP_ID =
        "d7584277")}&app_key=${(import.meta.env.VITE_REACT_APP_KEY =
        "4389e6c366bbdf3cc67ae920c653110e")}`
    );
    const { hits } = await response.data;

    setRecipes(hits);
  }

  return (
    <div className="App">
      <h1>Brian's Recipe Book </h1>
      <img className="chef" src={chef} alt="chef" />
      <p>Search for recipes by ingredient</p>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="search-button"
        onClick={() => {
          getRecipes();
          setQuery("");
        }}
      >
        Search
      </button>
      <div className="recipes">
        <Row xs={1} md={3} className="g-4">
          {recipes &&
            recipes.map((recipe, index) => (
              <Col key={index}>
                <Card className="recipe-card">
                  <Card.Img variant="top" src={recipe.recipe.image} />
                  <Card.Body>
                    <Card.Title>{recipe.recipe.label}</Card.Title>
                    <Card.Text>
                      {recipe.recipe.ingredientLines.map((ingredient) => (
                        <li key={ingredient.text}>{ingredient}</li>
                      ))}
                    </Card.Text>
                    <a
                      href={recipe.recipe.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Recipe
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default App;

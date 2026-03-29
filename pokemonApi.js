const image = document.getElementById("pokemon-img");
const input = document.getElementById("pokemon-input");
const guessBtn = document.getElementById("guess-btn");
const resultText = document.getElementById("result-note");
const scoreText = document.getElementById("score");

let score = Number(localStorage.getItem("score")) || 0;
let currentPokemon;
updateScore();

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemon(name) {
    const response = await fetch(baseURL + name);

    if (!response.ok) {
        console.log("Fel vid fetch");
        return;
    }

    return await response.json();
}

async function showPokemon() {
    const pokemons = [
        "pikachu",
        "bulbasaur",
        "charmander",
        "squirtle",
        "ditto",
        "meowth",
    ];

    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const randomPokemon = pokemons[randomIndex];

    currentPokemon = await fetchPokemon(randomPokemon);

    image.src = currentPokemon.sprites.other["official-artwork"].front_default;
}

function updateScore() {
    scoreText.textContent = `Score: ${score}`;
}

guessBtn.addEventListener("click", () => {
    const guess = input.value.toLowerCase();

    if (guess === currentPokemon.name) {
        resultText.textContent = "Rätt!";
        score++;
        updateScore();
        localStorage.setItem("score", score);
    } else {
        resultText.textContent = `Fel! Det var ${currentPokemon.name}`;
    }

    input.value = "";

    setTimeout(() => {
        resultText.textContent = "";
    }, 2000);

    showPokemon();
});

showPokemon();

// Get the elements of the DOM
const inputGameID = document.querySelector("#gameID");
const newKeyButton = document.querySelector("#newGameKey");
const newGameID = document.querySelector("#newKey").name;

// Event listeners
newKeyButton.addEventListener("click", () => {
  inputGameID.value = newGameID;
});

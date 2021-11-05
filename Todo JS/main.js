//-------------------
// ****Selectors****
//-------------------

// TODO
const todoInput = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".add-todo-btn");
const saveTodoBtn = document.querySelector(".save-todo-btn");
const todoList = document.getElementById("cardRow");
const time = document.querySelector(".todo-input-time");
const clockIcon = document.querySelector(".clock-icon");

// Searchbar
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");

// MOVIES
const modalTasks = document.querySelector("#modalTasks");
const addWatchlistBtn = document.querySelector(".add-watchlist-btn");
const removeWatchlistBtn = document.querySelector(".remove-watchlist-btn");
const modalImage = document.querySelector("#modalImage");
const modalMovieTitle = document.querySelector("#modalMovieTitle");
const modalDetails = document.querySelector("#modalDetails");
const modalImdb = document.querySelector("#modalImdb");
const modalRottenTomatoes = document.querySelector("#modalRottenTomatoes");
const modalPlot = document.querySelector("#modalPlot");
const modalGenre = document.querySelector("#modalGenre");
const showcaseCarousel = document.querySelector(".carousel-inner");
const carouselInner = document.querySelector("#watchListCarousel");
const watchlistRow = document.querySelector("#watchlistRow");
const modalWatchlist = document.getElementById("modalWatchlist");
const savedCard = [];
const listOfTitles = [];

// NAVBAR
const navWatchlist = document.querySelector("#nav-Watchlist");
const navTodos = document.querySelector("#nav-Todos");

// Main Containers
const containerWatchlist = document.querySelector("#container-watchlist");
const containerTasks = document.querySelector("#container-tasks");

//------------------------
// ****Eventlisteners****
//------------------------
navWatchlist.addEventListener("click", switchToWatchlist);
navTodos.addEventListener("click", switchToTodos);
clockIcon.addEventListener("click", showTimeInput);
addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", cardIconClick);
btnSearch.addEventListener("click", searchMovie);
addWatchlistBtn.addEventListener("click", addMovie);
removeWatchlistBtn.addEventListener("click", removeMovie);
showcaseCarousel.addEventListener("click", showcaseModal);
watchlistRow.addEventListener("click", watchlistModal);
saveTodoBtn.addEventListener("click", saveTodoEdit);

//-------------------
// ****Functions****
//-------------------
function switchToTodos() {
  containerWatchlist.classList.add("hide");
  navWatchlist.classList.remove("active");
  navTodos.classList.add("active");
  containerTasks.classList.remove("hide");
}
function switchToWatchlist() {
  containerWatchlist.classList.remove("hide");
  navWatchlist.classList.add("active");
  navTodos.classList.remove("active");
  containerTasks.classList.add("hide");
}
function showTimeInput() {
  if (time.style.display === "none") {
    time.style.display = "block";
  } else {
    time.style.display = "none";
  }
}
function addTodo() {
  if (todoInput.value === "" || !todoInput.value.trim()) {
    alert("Please write a todo!");
  } else {
    // ----------------CREATE ELEMENTS------------------//
    const todoCol = document.createElement("div");
    todoCol.classList.add("col-md-4");
    todoCol.classList.add("pt-2");

    const todoCard = document.createElement("div");
    todoCard.classList.add("card");
    todoCard.classList.add("card-tasks");

    const todoCircle = document.createElement("a");
    todoCircle.classList.add("circle-icon");
    todoCircle.href = "javascript:void(0)";

    const todoBr = document.createElement("br");

    const todoSmall = document.createElement("small");
    todoSmall.classList.add("timeText");
    todoSmall.classList.add("text-muted");
    todoSmall.innerText = time.value;

    const todoItem = document.createElement("span");
    todoItem.classList.add("todo-item");
    todoItem.classList.add("card-body");
    todoItem.classList.add("text-center");
    todoItem.innerText = todoInput.value;

    const todoSection = document.createElement("section");

    const todoTrash = document.createElement("a");
    todoTrash.classList.add("trash-icon");
    todoTrash.href = "javascript:void(0)";

    const todoEdit = document.createElement("a");
    todoEdit.classList.add("edit-icon");
    todoEdit.classList.add("editIcon");
    todoEdit.href = "javascript:void(0)";

    todoSection.appendChild(todoTrash);
    todoSection.appendChild(todoEdit);
    todoCard.appendChild(todoCircle);
    todoItem.appendChild(todoBr);
    todoCard.appendChild(todoItem);
    todoCard.appendChild(todoSmall);

    todoCard.appendChild(todoSection);
    todoCol.appendChild(todoCard);

    todoList.insertBefore(todoCol, todoList.children[0]);

    todoInput.value = "";
    time.value = "";
    time.setAttribute("style", "display:none");
    mainModal.style.display = "none";
  }
}
function cardIconClick(e) {
  const clickedIcon = e.target;
  const clickedIconParent = clickedIcon.parentElement;

  if (
    clickedIcon.classList.contains("circle-icon") ||
    clickedIcon.classList.contains("check-icon")
  ) {
    todoFinished(clickedIconParent);
  } else if (clickedIcon.classList.contains("edit-icon")) {
    todoEdit(clickedIconParent);
  } else if (clickedIcon.classList.contains("trash-icon")) {
    removeTodo(clickedIconParent);
  }
}
function todoFinished(clickedIconParent) {
  clickedIconParent.classList.toggle("text-line");
  clickedIconParent.classList.toggle("card-finished");
  const clickedIcon = clickedIconParent.children[0];
  const editIcon = document.querySelector(".editIcon");

  if (clickedIcon.classList.contains("circle-icon")) {
    clickedIcon.classList.add("check-icon");
    clickedIcon.classList.remove("circle-icon");
    editIcon.classList.remove("edit-icon");
  } else if (clickedIcon.classList.contains("check-icon")) {
    clickedIcon.classList.add("circle-icon");
    clickedIcon.classList.remove("check-icon");
    editIcon.classList.add("edit-icon");
  }
}
function removeTodo(clickedIconParent) {
  const card = clickedIconParent.parentElement;
  card.parentElement.remove();
}
function todoEdit(clickedIconParent) {
  modalTasks.classList.remove("hide");
  modalWatchlist.classList.add("hide");

  const card = clickedIconParent.parentElement;

  const taskText = card.children[1].innerText;
  const newTimeText = card.children[2].innerText;

  savedCard.push(card);

  todoInput.setAttribute("placeholder", taskText);
  time.setAttribute("placeholder", newTimeText);

  addTodoBtn.classList.add("hide");
  saveTodoBtn.classList.remove("hide");

  mainModal.style.display = "block";
}
function saveTodoEdit() {
  if (todoInput.value === "" || !todoInput.value.trim()) {
    alert("Please write a todo!");
  } else {
    savedCard[0].children[1].innerText = todoInput.value;
    savedCard[0].children[2].innerText = time.value;

    addTodoBtn.classList.remove("hide");
    saveTodoBtn.classList.add("hide");

    todoInput.value;
    time.value;

    todoInput.setAttribute("placeholder", "Work, train etc...");
    time.setAttribute("placeholder", "Duration");
    todoInput.value = "";
    time.value = "";
    time.setAttribute("style", "display:none");
    mainModal.style.display = "none";
  }
}

//-----------------------
//**** Search Movie ****/
//-----------------------
async function searchMovie() {
  const title = inputSearch.value;
  let movieData = await axios
    .get("https://www.omdbapi.com/?t=" + title + "&apikey=5c556192")
    .catch((err) => console.log(err));
  const movie = movieData.data;

  // Makes title of movie uppercase
  const titleUpperCase = titleCase(title);
  if (listOfTitles.includes(titleUpperCase)) {
    addWatchlistBtn.classList.add("hide");
    removeWatchlistBtn.classList.remove("hide");
  } else {
    addWatchlistBtn.classList.remove("hide");
    removeWatchlistBtn.classList.add("hide");
  }

  modalTasks.classList.add("hide");
  modalWatchlist.classList.remove("hide");

  modalImage.src = `${movie.Poster}`;
  modalMovieTitle.innerText = `${movie.Title}`;
  modalDetails.innerText = `${movie.Director} • ${movie.Year} • ${movie.Runtime}`;
  modalImdb.innerText = `${movie.imdbRating}`;
  console.log(movie.Ratings);
  if (movie.Ratings.length <= 1) {
    modalRottenTomatoes.innerText = "No data";
  } else {
    modalRottenTomatoes.innerText = `${movie.Ratings[1].Value}`;
  }
  modalPlot.innerHTML = `${movie.Plot}`;
  modalGenre.innerHTML = `${movie.Genre.replaceAll(",", " • ")}`;

  inputSearch.value = "";
  mainModal.style.display = "block";
}
function addMovie() {
  const watchlistRow = document.querySelector("#watchlistRow");

  const col = document.createElement("div");
  col.classList.add("col-md-3");

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("watchlistCard");

  const img = document.createElement("div");
  img.classList.add("imgDiv");
  const id = modalMovieTitle.innerText.replaceAll(" ", "-");
  img.innerHTML = `<a href="javascript:void(0)" class="${id} card-img-top img-watchlist img-fluid" style="content: url(${modalImage.src});" ></a>`;

  const imgTitle = document.createElement("div");
  imgTitle.classList.add("card-img-text");
  imgTitle.classList.add("pt-3");
  imgTitle.innerText = modalMovieTitle.innerText;

  card.appendChild(img);
  card.appendChild(imgTitle);
  col.appendChild(card);
  watchlistRow.appendChild(col);

  listOfTitles.push(modalMovieTitle.innerText);

  inputSearch.value = "";
  mainModal.style.display = "none";
}
function removeMovie() {
  const title = modalMovieTitle.innerText;

  const movie = title.replaceAll(" ", "-");

  const movieToRemove = document.querySelector("." + movie);

  const parent = movieToRemove.parentElement;
  const grandparent = parent.parentElement;
  const colToRemove = grandparent.parentElement;
  const watchlistRow = colToRemove.parentElement;

  console.log(watchlistRow);

  watchlistRow.removeChild(colToRemove);

  listOfTitles.splice(listOfTitles.indexOf(title), 1);

  mainModal.style.display = "none";
}
async function showcaseModal(event) {
  const title = event.target.id.replaceAll("-", " ");

  let movieData = await axios.get(
    "https://www.omdbapi.com/?t=" + title + "&apikey=5c556192"
  );
  const movie = movieData.data;

  const titleUpperCase = titleCase(title);
  if (listOfTitles.includes(titleUpperCase)) {
    addWatchlistBtn.classList.add("hide");
    removeWatchlistBtn.classList.remove("hide");
  } else {
    addWatchlistBtn.classList.remove("hide");
    removeWatchlistBtn.classList.add("hide");
  }

  modalTasks.classList.add("hide");
  modalWatchlist.classList.remove("hide");

  modalImage.src = `${movie.Poster}`;
  modalMovieTitle.innerText = `${movie.Title}`;
  modalDetails.innerText = `${movie.Director} • ${movie.Year} • ${movie.Runtime}`;
  modalImdb.innerText = `${movie.imdbRating}`;
  if (movie.Ratings.length <= 1) {
    modalRottenTomatoes.innerText = "No data";
  } else {
    modalRottenTomatoes.innerText = `${movie.Ratings[1].Value}`;
  }
  modalPlot.innerHTML = `${movie.Plot}`;
  modalGenre.innerHTML = `${movie.Genre.replaceAll(",", " • ")}`;

  mainModal.style.display = "block";
}
async function watchlistModal(event) {
  const title = event.target.classList[0].replaceAll("-", " ");

  let movieData = await axios.get(
    "https://www.omdbapi.com/?t=" + title + "&apikey=5c556192"
  );
  const movie = movieData.data;

  const titleUpperCase = titleCase(title);
  if (listOfTitles.includes(titleUpperCase)) {
    addWatchlistBtn.classList.add("hide");
    removeWatchlistBtn.classList.remove("hide");
  } else {
    addWatchlistBtn.classList.remove("hide");
    removeWatchlistBtn.classList.add("hide");
  }

  modalTasks.classList.add("hide");
  modalWatchlist.classList.remove("hide");

  modalImage.src = `${movie.Poster}`;
  modalMovieTitle.innerText = `${movie.Title}`;
  modalDetails.innerText = `${movie.Director} • ${movie.Year} • ${movie.Runtime}`;
  modalImdb.innerText = `${movie.imdbRating}`;
  if (movie.Ratings.length <= 1) {
    modalRottenTomatoes.innerText = "No data";
  } else {
    modalRottenTomatoes.innerText = `${movie.Ratings[1].Value}`;
  }
  modalPlot.innerHTML = `${movie.Plot}`;
  modalGenre.innerHTML = `${movie.Genre.replaceAll(",", " • ")}`;

  mainModal.style.display = "block";
}
function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}
// Showcase movie carousel
let items = document.querySelectorAll("#recipeCarousel .showcaseItem");
items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

// --------------------------
// **** MODAL SELECTORS ****
//---------------------------
const mainModal = document.getElementById("mainModal");
const openTaskModalBtn = document.getElementById("openModalTaskBtn");
const closeTaskModalBtn = document.getElementById("closeModalTaskBtn");
const closeModalWatchlistBtn = document.getElementById(
  "closeModalWatchlistBtn"
);

//--------------------------------
// **** Modal open and close ****
//--------------------------------
openTaskModalBtn.addEventListener("click", () => {
  addTodoBtn.classList.remove("hide");
  saveTodoBtn.classList.add("hide");
  todoInput.setAttribute("placeholder", "Work, train etc...");
  time.setAttribute("placeholder", "Duration");
  modalTasks.classList.remove("hide");
  modalWatchlist.classList.add("hide");
  mainModal.style.display = "block";
});
closeTaskModalBtn.addEventListener("click", () => {
  mainModal.style.display = "none";
});
closeModalWatchlistBtn.addEventListener("click", () => {
  mainModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == mainModal) {
    mainModal.style.display = "none";
  }
});

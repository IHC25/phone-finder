const phoneSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear search field
  searchField.value = "";
  // error handling
  errorCheck(searchText);
  // load data
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};
const displaySearchResult = (data) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // error handling
  errorCheck(data);
  // show data
  data.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add = "col";
    div.innerHTML = `
        <div class="card d-flex align-items-center py-2">
          <img src="${element.image}" class="card-img-top w-50" alt="..." />
          <div class="card-body">
            <h4 class="card-title">${element.phone_name}</h4>
            <h5 class="card-title">${element.brand}</h5>
          </div>
        </div>`;
    phoneContainer.appendChild(div);
  });
};
const errorCheck = (data) => {
  const errorMessage = document.getElementById("error-message");
  if (data.length == 0) {
    // show error message
    errorMessage.style.display = "grid";
    document.getElementById("phone-container").textContent = "";
  } else {
    // hide error message
    errorMessage.style.display = "none";
  }
};
// search button handler
document.getElementById("search-btn").addEventListener("click", () => {
  // phone search data load
  phoneSearch();
});

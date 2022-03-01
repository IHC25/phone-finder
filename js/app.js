const loadSearchResult = () => {
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
            <button onclick="loadExplore('${element.slug}')" class="btn btn-primary btn-lg">Explore</button>
          </div>
        </div>`;
    phoneContainer.appendChild(div);
  });
};

const loadExplore = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayExploreDetails(data.data));
};

const displayExploreDetails = (details) => {
  console.log(details);
  const exploreContainer = document.getElementById("explore-container");
  exploreContainer.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="row g-0 p-2">
    <div class="col-4 d-flex align-items-center">
    <img src="${
      details.image
    }" class="img-fluid rounded-start h-75" alt="device image" />
    </div>
    <div class="col-8">
      <div class="card-body">
        <h4 class="card-title">${details.name}</h4>
        <h5 class="card-title">Features:</h5>
        <p class="card-text">${details.mainFeatures.storage}</p>
        <p class="card-text">${details.mainFeatures.displaySize}</p>
        <p class="card-text">${details.mainFeatures.chipSet}</p>
        <p class="card-text">${details.mainFeatures.memory}</p>
        <h5 class="card-title">Sensors:</h5>
        <p class="card-text">${details.mainFeatures.sensors}</p>
        <h5 class="card-title">Others:</h5>
        <p class="card-text">
          Bluetooth: ${
            details.others?.Bluetooth
              ? details.others.Bluetooth
              : "No Data Found"
          }, 
          GPS: ${details.others?.GPS ? details.others.GPS : "No Data Found"}, 
          NFC: ${details.others?.NFC ? details.others.NFC : "No Data Found"}, 
          Radio: ${
            details.others?.Radio ? details.others.Radio : "No Data Found"
          }, 
          USB: ${details.others?.USB ? details.others.USB : "No Data Found"}, 
          WLAN: ${details.others?.WLAN ? details.others.WLAN : "No Data Found"}
        </p>
        
        <p class="card-text">
          <small class="text-muted">${
            details.releaseDate ? details.releaseDate : "No release date found"
          }</small>
        </p>
      </div>
    </div>
  </div>
  `;
  exploreContainer.appendChild(div);
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
  loadSearchResult();
});

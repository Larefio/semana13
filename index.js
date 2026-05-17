const API_KEY = "wYz-safirfTxT2P5WQrnqZcIR3lx4JOdaJOPJz-MlKg";

const searchInput = document.getElementById("search-input");
const gridContainer = document.getElementById("grid-container");
const categoryPills = document.querySelectorAll(".pill");
const logoHome = document.getElementById("logo-home");

const initialHTMLBackup = gridContainer.innerHTML;

async function fetchImages(category) {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${category}&client_id=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    renderImages(data.results);
  } catch (error) {
    console.error(error);
  }
}

function renderImages(images) {
  gridContainer.innerHTML = "";

  if (images.length === 0) {
    
    gridContainer.innerHTML =
      '<p class="no-results-msg">No se encontraron resultados.</p>';
    return;
  }

  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("pin-card");

    const img = document.createElement("img");
    img.src = image.urls.regular;
    img.alt = image.alt_description || "Pinterest Image";

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("btn-save");
    saveBtn.innerText = "Guardar";

    card.appendChild(img);
    card.appendChild(saveBtn);
    gridContainer.appendChild(card);
  });
}

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const categoryValue = searchInput.value.trim();

    if (categoryValue !== "") {
      categoryPills.forEach((p) => p.classList.remove("active"));
      fetchImages(categoryValue);
    }
  }
});

categoryPills.forEach((pill) => {
  pill.addEventListener("click", (e) => {
    categoryPills.forEach((p) => p.classList.remove("active"));
    e.target.classList.add("active");

    const targetCategory = e.target.getAttribute("data-category");

    if (targetCategory === "all") {
      searchInput.value = "";
      gridContainer.innerHTML = initialHTMLBackup;
    } else {
      searchInput.value = targetCategory;
      fetchImages(targetCategory);
    }
  });
});

logoHome.addEventListener("click", () => {
  searchInput.value = "";
  categoryPills.forEach((p) => p.classList.remove("active"));
  document.querySelector('.pill[data-category="all"]').classList.add("active");
  gridContainer.innerHTML = initialHTMLBackup;
});

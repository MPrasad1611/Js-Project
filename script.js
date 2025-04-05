const TRENDS_API_URL = "https://679f552e24322f8329c360ab.mockapi.io/trends";

const trendsSection = document.getElementById("trends-section");
const submitTrendSection = document.getElementById("submit-trend-section");
const trendsList = document.getElementById("trends-list");
const trendForm = document.getElementById("trend-form");
const submitTrendButton = document.getElementById("submit-trend");
const logoutButton = document.getElementById("logout-button");
const searchInput = document.getElementById("search-input");

const trendPopup = document.getElementById("trend-popup");
const popupImage = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupComments = document.getElementById("popup-comments");
const closePopupButton = document.getElementById("close-popup");

// Fetch trends from the API
async function fetchTrends() {
  try {
    const response = await fetch(TRENDS_API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch trends");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trends:", error);
    return [];
  }
}

// Render trends on the page
async function renderTrends(filteredTrends) {
  const trends = filteredTrends || (await fetchTrends());
  trendsList.innerHTML = "";
  trends
    .sort((a, b) => b.upvotes - a.upvotes)
    .forEach((trend) => {
      const trendElement = document.createElement("div");
      trendElement.className = "trend";
      trendElement.innerHTML = `
        <img src="${
          trend.image || "https://via.placeholder.com/400x200"
        }" alt="${trend.title}">
        <h3>${trend.title}</h3>
        <p>${trend.description}</p>
        <div class="comments">
          <h4>Comments:</h4>
          <ul>
            ${trend.comments.map((comment) => `<li>${comment}</li>`).join("")}
          </ul>
        </div>
        <div class="actions">
          <button onclick="upvoteTrend(${trend.id})">Upvote (${
        trend.upvotes
      })</button>
          <button onclick="commentOnTrend(${trend.id})">Comment</button>
          ${
            trend.userAdded
              ? `<button onclick="deleteTrend(${trend.id})">Delete</button>`
              : ""
          }
        </div>
      `;

      // Add click event listener to the card
      trendElement.addEventListener("click", (e) => {
        if (!e.target.closest("button")) {
          // Ensure buttons inside the card don't trigger the popup
          showTrendPopup(trend);
        }
      });

      trendsList.appendChild(trendElement);
    });
}

// Show the popup with trend details
function showTrendPopup(trend) {
  popupImage.src = trend.image || "https://via.placeholder.com/400x200";
  popupTitle.textContent = trend.title;
  popupDescription.textContent = trend.description;
  popupComments.innerHTML = trend.comments
    .map((comment) => `<li>${comment}</li>`)
    .join("");
  trendPopup.classList.add("active");
}

// Close the popup
closePopupButton.addEventListener("click", () => {
  trendPopup.classList.remove("active");
});

// Upvote a trend
async function upvoteTrend(id) {
  try {
    const trend = await fetch(`${TRENDS_API_URL}/${id}`).then((res) =>
      res.json()
    );
    const updatedTrend = { ...trend, upvotes: trend.upvotes + 1 };

    const response = await fetch(`${TRENDS_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrend),
    });

    if (!response.ok) {
      throw new Error("Failed to upvote trend");
    }

    alert("Upvoted successfully!");
    renderTrends();
  } catch (error) {
    console.error("Error upvoting trend:", error);
    alert("Failed to upvote trend. Please try again.");
  }
}

// Add a comment to a trend
async function commentOnTrend(id) {
  const comment = prompt("Enter your comment:");
  if (comment) {
    try {
      const trend = await fetch(`${TRENDS_API_URL}/${id}`).then((res) =>
        res.json()
      );
      const updatedTrend = {
        ...trend,
        comments: [...trend.comments, comment],
      };

      const response = await fetch(`${TRENDS_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTrend),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      alert("Comment added successfully!");
      renderTrends();
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  }
}

// Delete a trend
async function deleteTrend(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this trend?"
  );
  if (confirmDelete) {
    try {
      const response = await fetch(`${TRENDS_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete trend");
      }

      alert("Trend deleted successfully!");
      renderTrends();
    } catch (error) {
      console.error("Error deleting trend:", error);
      alert("Failed to delete trend. Please try again.");
    }
  }
}

// Handle form submission
trendForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("trend-title").value;
  const description = document.getElementById("trend-description").value;
  const image =
    document.getElementById("trend-image").value ||
    "https://via.placeholder.com/400x200";

  if (title && description) {
    const newTrend = {
      title,
      description,
      upvotes: 0,
      comments: [],
      image,
      userAdded: true,
    };

    try {
      const response = await fetch(TRENDS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrend),
      });

      if (!response.ok) {
        throw new Error("Failed to submit trend");
      }

      alert("Trend submitted successfully!");
      trendForm.reset();
      trendsSection.classList.add("active");
      submitTrendSection.classList.remove("active");
      renderTrends();
    } catch (error) {
      console.error("Error submitting trend:", error);
      alert("Failed to submit trend. Please try again.");
    }
  }
});

// Search functionality
searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.toLowerCase();
  const trends = await fetchTrends();
  const filteredTrends = trends.filter(
    (trend) =>
      trend.title.toLowerCase().includes(searchTerm) ||
      trend.description.toLowerCase().includes(searchTerm)
  );
  renderTrends(filteredTrends);
});

// Logout functionality
logoutButton.addEventListener("click", () => {
  alert("You have been logged out.");
  window.location.href = "./login.html";
});

// Show submit trend form
submitTrendButton.addEventListener("click", () => {
  trendsSection.classList.remove("active");
  submitTrendSection.classList.add("active");
});

// Initial render
renderTrends();
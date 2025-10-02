const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUserData() {
  userContainer.innerHTML = "<p>Loading...</p>"; // Show loading

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch data. Status: " + response.status);
    }

    const users = await response.json();

    userContainer.innerHTML = ""; // Clear loading text

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(card);
    });

  } catch (error) {
    userContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Reload button handler
reloadBtn.addEventListener("click", fetchUserData);

// Initial fetch
fetchUserData();

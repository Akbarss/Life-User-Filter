let result = document.getElementById("result");
let filter = document.getElementById("filter");
const listItems = [];

console.log(listItems);

async function getData() {
  try {
    const res = await fetch("https://randomuser.me/api?results=50");

    if (res.status === 429) {
      // Retry after 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return getData(); // Retry the request
    }

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const { results } = await res.json();

    result.innerHTML = "";

    results.forEach((user) => {
      const li = document.createElement("li");

      listItems.push(li);

      li.innerHTML = `
		<img src="${user.picture.large}" alt="${user.name.first}"/>
		<div class='user-info'>
		  <h4>${user.name.first} ${user.name.last}</h4>
		  <p>${user.location.city}, ${user.location.country}</p>
		</div>
	  `;

      result.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData(); // Call the function to fetch data

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

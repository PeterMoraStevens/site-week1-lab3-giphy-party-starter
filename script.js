// Global Constants
const apiKey = "YR5oZedqmvOxn8ougkAnBRvNot7SS2rS";
const submit_btn = document.querySelector("#search_btn");
const text_form = document.querySelector("#giphy_query");
const search_form = document.querySelector("#search-form");
const load_more = document.querySelector("#add-more-btn");
const limit = 9;
const rating = "g";
const lang = "en";
let offset = 0;

//get request - http://hostname/endpoint?param1=value1&param2=value2
//    GIPHY - http://api.giphy.com/v1/gifs/search?api_key=MY_API_KEY&q=puppy

/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
  results.data.forEach((result) => {
    document.getElementById("gif_container").innerHTML += `
      <img src=${result.images.original.url}>
    `;
  });
}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;
  const response = await fetch(url);
  const data = await response.json();
  offset += 9;
  displayResults(data);
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  offset = 0;
  document.querySelector("#gif_container").innerHTML = ""
  event.preventDefault();
  await getGiphyApiResults(text_form.value);
}

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  event.preventDefault();
  await getGiphyApiResults(text_form.value);
}

window.onload = function () {
  // YOUR CODE HERE
  // Add any event handlers here
  search_form.addEventListener("submit", handleFormSubmit);
  load_more.addEventListener("submit", handleShowMore);
}

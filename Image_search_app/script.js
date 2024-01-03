const accessKey = "xwfEOorxc0qpWEZiG8us27rJigWcGSAXW_y-f44Dv88";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
// to search class use ". "
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

let inputData = "";  //from input field
let page = 1; //page number


async function searchImages(){
    inputData = inputE1.value;
    //url to fetch the data based on user input using api
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    //to fit the generated imsges in the html template
    //'result' is the current result being processed among 'results'
    //result contain different fields for an image - urls, alt_description etc.
    results.map((result) => {
        //creating a 'div' element to hold the image and its anchor
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        //for anchor tag
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        //appending image and its anchor in the div
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        //appending in the main div
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

//crdeating event_listener to call above func
formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages()
});
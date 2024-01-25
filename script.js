const accessKey = "TTtwWf72yP91r8FlJEZNQ8noD0ewHfh6_TRFJCE6z3A";
const form = document.querySelector('form');
const inputValue = document.getElementById("searchBox");
const searchoutput = document.getElementById("searchoutput");
const showmoreBtn = document.getElementById("showMore");

let input = "";
let page = 1;


async function searchResults(){
    input = inputValue.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accessKey}`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);

    if( page === 1 ){
        searchoutput.innerHTML = "";
    }

    const results = data.results;
    // console.log(results);

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("searchResult");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchoutput.appendChild(imageWrapper);
      });
    
      page++;
    
      if (page > 1) {
        showmoreBtn.style.display = "block";
      }
}


form.addEventListener("submit" , (e) => {
    e.preventDefault();
    page = 1;
    searchResults();
});

showmoreBtn.addEventListener("click" , () => {
    searchResults();
})
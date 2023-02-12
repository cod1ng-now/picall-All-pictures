// variables
const API_KEY = 'Your Api Key';
const input = document.querySelector('input');
const formBtn = document.querySelector(".search_btn");

let searchText = "";
let search = false;

// default photos
async function defaultPhotos() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: API_KEY,
        }
    })
    const response = await data.json()
    // console.log(response);

    displayImage(response)
}

function displayImage(response) {
    response.photos.forEach((image) => {
        const photoDiv = document.createElement("div")
        photoDiv.innerHTML = `
            <a href=${image.src.large} target="_blank">
                <img class="image" src=${image.src.large} alt=${image.url}>
            </a>
            <figcaption class="caption">&nbsp;📷: ${image.photographer}<br>&nbsp;<i><img  class="ds" src="./ds.png"></i>: ${image.alt}</figcaption>`;
        document.querySelector(".display_images").appendChild(photoDiv)
    })
}

// search photos
async function searchPhotos(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: API_KEY,
        }
    })
    const response = await data.json()
    console.log(response);

    displayImage(response)
}

input.addEventListener('input', (e) => {
    e.preventDefault();
    searchText=e.target.value;
})

formBtn.addEventListener('click', () => {
    if(input.value === ""){
        document.querySelector('.alert').innerHTML = "Empty search! Please enter value..."
    }   
    if (input.value === "sex" || input.value === "xxx" || input.value === "seks" || input.value === "Sex" || input.value === "XXX" || input.value === "SEKS" || input.value === "porno"||input.value === "PORNO" || input.value === "porn"|| input.value === "PORN" || input.value === "fuck" || input.value === "fucking"|| input.value === "FUCKING"|| input.value === "FUCK" || input.value === "Fuck" || input.value === "Fucking"   ) {
        document.querySelector('.alert').innerHTML = `<b>${input.value.toUpperCase()}</b> search! Pornographic images are not allowed on this site...`;
        clear()
    }
    else {
        document.querySelector('.alert').innerHTML = "";
        clear();
        search = true;
        searchPhotos(searchText)
    }
})

function clear(){
    document.querySelector('.display_images').innerHTML = "";
}

defaultPhotos();
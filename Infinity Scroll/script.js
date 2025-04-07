// unsplash api

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photoArray = []
let totalImages = 0
let imagesLoaded = 0
let ready = false

//check if image is loaded
function imageLoad(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
        console.log('ready', ready);
    }
}

// create links and populate the dom
function displayPhotos(){
    totalImages  = photoArray.length
    console.log('total images',totalImages);
    photoArray.forEach((photo)=>{
        //create a link <a>
        const item = document.createElement('a')
        item.setAttribute('href',photo.links.html)
        item.setAttribute('target','_blank')
        // create image
        const img = document.createElement('img')
        img.setAttribute('src',photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)

        //Event listener, check when each is finished loading

        img.addEventListener('load',imageLoad)

        // put image inside a and then both inside image container
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


const count = 10
const apiKey = 'iFJLUOa6qz_UDwZKP01ekZr2yjbRSrwe9Ce0c3IYRA4'

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// get photos from unspalsh api

async function getPhotos(){
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        console.log(photoArray);
        displayPhotos()       
        
    } catch (error) {
        
    }
}

// scroll
window.addEventListener('scroll', ()=>{
    // console.log('scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
        
    }
})

// run on load
getPhotos()
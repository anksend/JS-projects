const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadingSpinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function hideLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

async function getQuote() {

    showLoadingSpinner() 

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')      
        const data = await response.json()
        if(data.quoteAuthor === ""){
            authorText.innerText = 'unknown'
        }
        else {
            authorText.innerText = data.quoteAuthor
        }     
        // reduce font size for long text
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        }  
        else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
        // stop loader show quote
        hideLoadingSpinner()
    } catch (error) {
        // getQuote()
        console.log('Sorry, No quote!', error);        
    }
}

function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `
    https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuote()

// Get Quote from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

//show loading 

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading

function hideLoadingSpinner(){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';

    try{
        // const response = await fetch(proxyUrl + apiUrl);
        // const data = await response.json();
        // console.log(data);
        showLoadingSpinner();
        const response = await fetch( proxyUrl + apiUrl );
        const data = await response.json();
        if (data.author === ''){
            authorText.innerHTML = "Unknow"
        } else{
            authorText.innerHTML = data.author;
        }
        
        //reduce font size for long quotes
        if(data.quote.length > 50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerHTML = data.quote;

        hideLoadingSpinner();
        
    }catch( error ) {
        //getQuote();
        hideLoadingSpinner();
        errorMessage.innerHTML = 'Something went wrong, try later';
        console.log('Oops no quote', error);
        
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank');
}

//event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();


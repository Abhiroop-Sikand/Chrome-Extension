//Constant to rep search button
const userClick = document.querySelector(".button");

//Constant to rep users input
const input = document.querySelector("input");

// Variable to store the current tab's URL
let tabUrl = "";

// Query the currently active tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs.length > 0) {
  // Store the current tab's URL
    tabUrl = tabs[0].url;
    userClick.addEventListener("click", ()=>{
    summarizer(tabUrl);
    }
);
  }
});


//Send url to api and get back summary
//Param: text rep. the url of users article
async function summarizer(userURL){
    const url = 'https://tldr-text-analysis.p.rapidapi.com/summarize/?text='+userURL+'&max_sentences=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '874e7bd4aamsh2f17ee37a741108p1d9161jsn95efd6555572',
            'X-RapidAPI-Host': 'tldr-text-analysis.p.rapidapi.com'
        }
    };
    main();
    async function main () {
        try {
            //Await response from api
            const response = await fetch(url, options);
            const result = await response.text();
            document.querySelector(".summary").innerHTML = result;
        } catch (error) {
        //If error output to console
            console.error(error);
        }
    };
}
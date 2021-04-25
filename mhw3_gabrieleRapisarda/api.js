const mediastack_key = '88795ecaa22ee4c00297ee2f6258007e';
const unsplash_client_key = '_nk9icmHJ-m6fxNDcPRNg8oEY3T5lzlkOYyyEKQDqd8';
const limit_news=50;

const mediastack_api = "http://api.mediastack.com/v1/news?countries=it&languages=it&keywords=teatro&offset=50&limit="+limit_news+"&access_key="+ mediastack_key;
const unsplash_api = "https://api.unsplash.com/search/photos?query=theater&per_page=8&client_id="+unsplash_client_key;

var newsInPrimoPiano=0;
var imgInserite=0;


function createGridImg(Object){

    const img = document.createElement("img");
    img.src=Object.urls.full;

    const user = document.createElement("p");
    user.textContent = Object.user.first_name +" "+Object.user.last_name;
    user.className="hidden";

    const box=document.createElement("div");
    box.className = "grid_img";

    box.appendChild(img);
    box.appendChild(user);

    if( imgInserite < 5) //le inserisco nella prima riga della grid
    document.getElementById("prima_riga").appendChild(box);
    else 
    document.getElementById("seconda_riga").appendChild(box);
}

function getJson(json){
    const results = json.results;
    //console.log(results);
    
    //metto nella grid le immagini
    for(let i=0;i<results.length;i++)
        {createGridImg(results[i]);
        imgInserite++;}


    console.log(document.getElementById("grid"));
}


function createNews(Object){

    const contenitore = document.createElement("div");

    if(newsInPrimoPiano < 2)
        contenitore.className="primo_piano";
    else
        contenitore.className="secondo_piano";

    const img = document.createElement("img");
    img.src=Object.image;

    const title = document.createElement("h1");
    title.textContent=Object.title;

    const author = document.createElement("h2");
    author.textContent="Author : "+Object.author;

    const description= document.createElement("p");
    description.textContent=Object.description;
    description.className="hidden";

    contenitore.appendChild(img);
    contenitore.appendChild(title);
    contenitore.appendChild(author);
    contenitore.appendChild(description);
    
    switch (newsInPrimoPiano){

        case 0: document.getElementById("prima_news").appendChild(contenitore);
                break;
        case 1: document.getElementById("seconda_news").appendChild(contenitore);
                break;
        default : document.querySelector("#news").appendChild(contenitore);
                break;
    }
}

function onJson(json){
  const results = json.data;
  
  for(let i=0;i<results.length;i++)
    if(results[i].image !== null){
        createNews(results[i]);
        newsInPrimoPiano++;
    }
  //console.log(document.querySelector("#news"));
}

function onResponse(response){
    return response.json();
}


fetch(mediastack_api).then(onResponse).then(onJson);
fetch(unsplash_api).then(onResponse).then(getJson);

function shiftNews(){
 
 //la prima notizia la metto in coda

 var prima = document.querySelector("#prima_news .primo_piano");
 const clone_prima = prima.cloneNode(true);
 clone_prima.className="secondo_piano";
 document.querySelector("#news").appendChild(clone_prima);
 prima.remove();


 //la 2 diventa la prima

 var seconda = document.querySelector("#seconda_news .primo_piano");
 const clone_seconda = seconda.cloneNode(true);
 document.getElementById("prima_news").appendChild(clone_seconda);
 seconda.remove();
 
 //la notizia in coda diventa la 2

 var notiziaInCoda = document.querySelector(".secondo_piano");
 const clone_notiziaInCoda=notiziaInCoda.cloneNode(true);
 clone_notiziaInCoda.className="primo_piano";
 document.getElementById("seconda_news").appendChild(clone_notiziaInCoda);
 notiziaInCoda.remove();

 //console.log(document.querySelector("#news"));
}

const ScorriNews = document.getElementById("ScorriNews");
ScorriNews.addEventListener("click",shiftNews);
const length = titoli.length;  //titoli è un array presente nel file contents.js
const like_photo ='favorite.png';
const BoxPreferiti = [];       //utilizzato per la gestione dei preferiti
var nbox = 1 + BoxPreferiti.length;

function createImage(src){
  const image = document.createElement('img');
  image.src= src;
  return image;
}

//caricamento contenuti da contents.js
for(let i = 0; i < length ;i++){
  
  const box=document.createElement("div"); 
  box.id='box'+i; 
  
  const titolo=document.createElement("h1");
  titolo.textContent = titoli[i];

  const like_button=createImage(like_photo);
  like_button.className='like_button';
  like_button.addEventListener('click',aggiungiPreferiti);
  
  const img=createImage(immagini[i]);  
  img.id='immagine';

  const dettagli_button=document.createElement("h2");
  dettagli_button.textContent = 'Clicca per più dettagli';
  dettagli_button.addEventListener('click',piuDettagli);

  const descr=document.createElement("p");
  descr.textContent=descrizione[i];
  descr.className='hidden';

  document.getElementById("Lista_Opere").appendChild(box);
  document.getElementById("box"+i).appendChild(titolo);
  document.getElementById("box"+i).appendChild(like_button);
  document.getElementById("box"+i).appendChild(img);
  document.getElementById("box"+i).appendChild(dettagli_button);
  document.getElementById("box"+i).appendChild(descr);
  
  //console.log(box);
}

function rimuoviBoxPreferito(ID){

  for(let i=0;i<nbox-1;i++)
    if(BoxPreferiti[i].id == ID){
      BoxPreferiti.splice(i,1);   //Rimuovo elemento i-esimo
      break;
    }

  nbox-=1;
}

function RimuoviPreferiti(event){
 
  const button=event.currentTarget;  
  const idBoxDaRimuovere = button.parentElement.id;
  
  //rimuovo il box dalle 2 liste
  rimuoviBoxPreferito(idBoxDaRimuovere);
  button.parentElement.remove();
  
  //se la lista rimane vuota nascondo lista preferiti

  if(BoxPreferiti.length==0)
    preferiti.classList.add('hidden');
}

function creaPreferito(boxDaCopiare){

  const box = document.createElement('div');
  
  const titolo = document.createElement('h1');
  titolo.textContent = boxDaCopiare.querySelector('h1').textContent;

  const unlike_button = createImage(like_photo);
  unlike_button.className='unlike_button';
  unlike_button.addEventListener('click',RimuoviPreferiti);

  const img = createImage(boxDaCopiare.querySelector('#immagine').src);
  img.id='immagine';


  box.appendChild(titolo);
  box.appendChild(unlike_button);
  box.appendChild(img);
  
  return box;
}

function aggiungiPreferiti(event){
  
  const button = event.currentTarget;
  
  //verifico che non ho già aggiunto ai preferiti questo box
  for(let i=0;i < nbox-1;i++)
    if(BoxPreferiti[i].id == button.parentElement.id)
    return;  //se esiste già allora non devo ricreare il box
  
  const boxDaCopiare = button.parentElement;
  const new_box = creaPreferito(boxDaCopiare);
  new_box.id=boxDaCopiare.id;  //assegno lo stesso id al box nei preferiti

  //verifico che non ci sia nessun elemento tra i preferiti
  if(BoxPreferiti.length==0)
    preferiti.classList.remove('hidden');
  
  //aggiungo box alle liste
  BoxPreferiti.push(new_box);
  listaOperePreferite.appendChild(new_box);

  nbox+=1;
  
 //console.log(preferiti);
 //console.log(BoxPreferiti);
}

function menoDettagli(event){

  const mdettagli=event.currentTarget;
  mdettagli.parentElement.querySelector('h2').classList.remove('hidden');
  mdettagli.classList.add('hidden');
}

function piuDettagli(event){
  
  const pdettagli = event.currentTarget;
  const descr=pdettagli.parentElement.querySelector('p');

  pdettagli.classList.add('hidden');
  descr.classList.remove('hidden');
  descr.addEventListener('click',menoDettagli);
}

function ricerca(event){

  const barraRicerca = event.currentTarget;
  var x;

  console.log('Stai cercando :'+barraRicerca.value);
  
 
  for(let i=0;i< length ; i++)
  {
    if(listaTitoli[i].textContent.search(barraRicerca.value) !== -1){
      x = listaTitoli[i].parentElement; 
      x.classList.remove("hidden");}
    else{ 
      x = listaTitoli[i].parentElement;
      x.classList.add("hidden");
    }
    //console.log(x);
  }
  
}

const preferiti = document.querySelector('#preferiti');
const listaOperePreferite = document.querySelector('#Lista_Opere_Preferite');
const listaTitoli = document.querySelectorAll("#Lista_Opere div h1");
const barraRicerca = document.querySelector('input[type="text"]');
barraRicerca.addEventListener('keyup',ricerca);


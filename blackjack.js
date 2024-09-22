let croupierMain=0;
let joueurMain=0;

let croupierNombreAs=0;
let joueurNombreAs=0; 

let carteCachee;
let pioche;

let peutPiocher=true; // Autorise le joueur a piocher tant que ta main <= 21 

window.onload=function(){
    creationPioche();
    melangerPioche();
}

function creationPioche(){
    let valeurs = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let familles = ["TREFLE","CARREAU","COEUR","PIQUE"];
    pioche=[];

    for (let i=0; i<familles.length; i++){
        console.log(familles.length)
        for (let j=0; j < valeurs.length; j++){
        console.log(valeurs.length)
            pioche.push(valeurs[j]+ "-" + familles[i]);
        }
    }
    console.log(pioche);
}

function melangerPioche(){
    for (let i=0; i<pioche.length;i++){
        let j = Math.floor(Math.random()*pioche.length); // je lui dis de tirer un nombre aleatoire de la longueur de la pioche (52)
        //Mélange des cartes dans le []
        let carteTemp=pioche[i]; // ex : i = carte4 et j=carte5, on stocke la valeur de la carte dans carteTemp
        pioche[i]=pioche[j];// ici i devient carte5
        pioche[j]=carteTemp;// carte5 devient la valeur piochée (alors qu'elle n'a pas de rapport avec carte4 = cartes mélangées)
    }
}
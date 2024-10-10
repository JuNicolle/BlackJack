let croupierMain=0;
let joueurMain=0;

let croupierNombreAs=0;
let joueurNombreAs=0; 

let carteCachee;
let pioche;

let peutPiocher=true; // Autorise le joueur a piocher tant que ta main <= 21 

window.onload=function(){
    console.log("Page chargée, jeu prêt à démarrer.");
    creationPioche();
    melangerPioche();
    demarragePartie();

}



function creationPioche(){
    let valeurs = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let familles = ["C","D","H","S"]; 
    pioche=[];

    for (let i=0; i<familles.length; i++){
        
        for (let j=0; j < valeurs.length; j++){
        
            pioche.push(valeurs[j]+ "-" + familles[i]);
        }
    }
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

function demarragePartie(){
    carteCachee=pioche.pop();
    croupierMain += recupererValeur(carteCachee);
    croupierNombreAs += verifierAs(carteCachee);
    while (croupierMain<17){
        let carteImg=document.createElement("img");
        let carte = pioche.pop();
        carteImg.src="./cards/"+carte+".png";
        croupierMain += recupererValeur(carte);
        croupierNombreAs += verifierAs(carte);
        document.getElementById("croupierCartes").append(carteImg);
    }
    console.log(croupierMain);
    
    for(let i=0; i<2;i++){
        let carteImg=document.createElement("img");
        let carte = pioche.pop();
        carteImg.src="./cards/"+carte+".png";
        joueurMain += recupererValeur(carte);
        joueurNombreAs += verifierAs(carte);
        document.getElementById("joueurCartes").append(carteImg);
    }
    
    console.log(joueurMain);
    document.getElementById("piocheBouton").addEventListener("click", piocher);
    document.getElementById("resterBouton").addEventListener("click", rester);

}

function piocher(){
    if (!peutPiocher){
        return;
    } 
    let carteImg=document.createElement("img");
    let carte = pioche.pop();
    carteImg.src="./cards/"+carte+".png";
    joueurMain += recupererValeur(carte);
    joueurNombreAs += verifierAs(carte);
    document.getElementById("joueurCartes").append(carteImg);


if (reduireValeurAs(joueurMain, joueurNombreAs) > 21) { //A, J, 8 -> 1 + 10 + 8
    peutPiocher = false;
    }
}

function rester(){
    croupierMain=reduireValeurAs(croupierMain, croupierNombreAs);
    joueurMain=reduireValeurAs(joueurMain, joueurNombreAs);

    peutPiocher=false;
    document.getElementById("carteCachee").src="./cards/"+carteCachee+".png";
    let message="";
    if (joueurMain>21){
        message="Vous avez perdu!";
    } 
    else if (croupierMain>21){
        message="Vous avez gagné!";
    } 
    else if (joueurMain==croupierMain){
        message="Match nul!";
    } 
    else if (joueurMain>croupierMain){
        message="Vous avez gagné!";
    } 
    else if (joueurMain<croupierMain){
        message="Vous avez perdu!";
    }
    document.getElementById("croupierMain").innerText=croupierMain;
    document.getElementById("joueurMain").innerText=joueurMain;
    document.getElementById("Resultats").innerText=message;

}

function recupererValeur(carte){
    let data=carte.split("-");
    let valeur=data[0];

    if (isNaN(valeur)){      // Donc ici on dit que si la carte n'est pas un chiffre (isNaN) ca egal 10
        if (valeur == "A"){    // sauf le A (as) qui lui va retourner 11
            return 11;
        }
        return 10;
    }
    return parseInt(valeur);
}

function verifierAs(carte){
    if (carte[0] == "A"){
        return 1;
    }
    return 0;
}

function reduireValeurAs(joueurMain, joueurNombreAs){
    while (joueurMain > 21 && joueurNombreAs > 0){
        joueurMain -= 10;
        joueurNombreAs -= 1;
    }
    return joueurMain;
}

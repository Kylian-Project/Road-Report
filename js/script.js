// #########################################
// ######## Copyright Kylian S2P3 ##########
// #########################################



let liste_meteo = [{"id_meteo":1,"value":"Soleil"},{"id_meteo":2,"value":"Nuageux"},{"id_meteo":3,"value":"Pluie"},{"id_meteo":4,"value":"Neige"},{"id_meteo":5,"value":"Brouillard"}];

let liste_type_route = [{"id_type_route":"1","value":"Autoroute"},{"id_type_route":"2","value":"Route nationale"},{"id_type_route":"3","value":"Route départementale"},{"id_type_route":"4","value":"Ville"}];

let liste_trafic = [{"id_trafic":"1","value":"Faible"},{"id_trafic":"2","value":"Moyen"},{"id_trafic":"3","value":"Élevé"}];

let liste_etat_route = [{"id_etat_route":"1","value":"Sèche"},{"id_etat_route":"2","value":"Humide"},{"id_etat_route":"3","value":"Mouillée"},{"id_etat_route":"4","value":"Enneigée"},{"id_etat_route":"5","value":"Verglacée"}];

let liste_type_conduite = [{"id_type_conduite":"1","value":"Sportive"},{"id_type_conduite":"2","value":"Normale"},{"id_type_conduite":"3","value":"Économique"}];

let liste_visibilite = [{"id_visibilite":"1","value":"Bonne"},{"id_visibilite":"2","value":"Moyenne"},{"id_visibilite":"3","value":"Mauvaise"}];

// Récupération de l'élément select
const meteoSelect = document.getElementById('meteo');
const typerouteSelect = document.getElementById('typeroute');
const trafic = document.getElementById('trafic');
const etat_route = document.getElementById('etatroute');
const type_conduite = document.getElementById('typeconduite');
const visibilite = document.getElementById('visibilite');

// Parcours de la liste_meteo et ajout des options à la liste déroulante
liste_meteo.forEach(function(item,index){
lOption=`<option value=${item.id_meteo}>${item.value}</option>`;
document.getElementById('meteo').insertAdjacentHTML('beforeend',lOption);
});

liste_type_route.forEach(function(item,index){
lOption=`<option value=${item.id_type_route}>${item.value}</option>`;
document.getElementById('typeroute').insertAdjacentHTML('beforeend',lOption);
});

liste_trafic.forEach(function(item,index){
lOption=`<option value=${item.id_trafic}>${item.value}</option>`;
document.getElementById('trafic').insertAdjacentHTML('beforeend',lOption);
});

liste_etat_route.forEach(function(item,index){
lOption=`<option value=${item.id_etat_route}>${item.value}</option>`;
document.getElementById('etatroute').insertAdjacentHTML('beforeend',lOption);
});

liste_type_conduite.forEach(function(item,index){
lOption=`<option value=${item.id_type_conduite}>${item.value}</option>`;
document.getElementById('typeconduite').insertAdjacentHTML('beforeend',lOption);
});

liste_visibilite.forEach(function(item,index){
lOption=`<option value=${item.id_visibilite}>${item.value}</option>`;
document.getElementById('visibilite').insertAdjacentHTML('beforeend',lOption);
});

// Enregistrement
function saveExp(){
  DateExp=document.getElementById('date').value;

  // Changer ordre date
  var dateCut = DateExp.split('-');
  var jour = dateCut[1]; // Récupérer jour
  var mois = dateCut[2]; // Récupérer mois
  var annee = dateCut[0]; // Récupérer année

  var dateFinal = jour + '-' + mois + '-' + annee; // Créer la chaîne de caractères "Jour/Mois/Année"
  // Fin ordre date

  // Recup élem HTML en variables
  Prenom=document.getElementById('prenom').value;
  Nom=document.getElementById('nom').value;
  HeureDep=document.getElementById('heure').value;
  HeureAr=document.getElementById('heure2').value;
  distanceParcourus=document.getElementById('distance').value;
  id_meteo=document.getElementById('meteo').value;
  id_type_route=document.getElementById('typeroute').value;
  id_trafic=document.getElementById('trafic').value;
  id_etat_route=document.getElementById('etatroute').value;
  id_type_conduite=document.getElementById('typeconduite').value;
  id_visibilite=document.getElementById('visibilite').value;
  Commentaire=document.getElementById('commentaire').value;

  // Verif si tous les champs sont complets
  if (DateExp == "" || HeureDep == "" || HeureAr == "" || distanceParcourus == ""){
    alert("Veuillez remplir tous les champs");
    return false; // Empêcher l'envoi du formulaire
  }

  liste_exp_conduite=new Array();
  dataString=localStorage.getItem('listeExp');
  // console.log(dataString);
  if(dataString!=null){
    liste_exp_conduite=JSON.parse(dataString);
  }

  // newIdExp=liste_exp_conduite.length+1;
  // Pou régler des problèmes plus tard je ne vais pas utiliser la longeur de liste_exp_conduite pour l'auto incrément

  let newIdExp = 1;
  if (liste_exp_conduite.length > 0) {
    newIdExp = liste_exp_conduite[liste_exp_conduite.length - 1].idExp +1;
  }


  new_ExpConduite={"idExp":newIdExp, "Prénom" :Prenom, "Nom":Nom, "Date":dateFinal,"HeureDepart":HeureDep,"HeureArrive":HeureAr,"distanceParcourus":distanceParcourus,"id_meteo":id_meteo,"id_type_route":id_type_route,"id_trafic":id_trafic,"id_etat_route":id_etat_route,"id_type_conduite":id_type_conduite,"id_visibilite":id_visibilite, "Commentaire": Commentaire};
  // console.log(new_ExpConduite);

  liste_exp_conduite.push(new_ExpConduite);

  listeExpStr=JSON.stringify(liste_exp_conduite);

  localStorage.setItem('listeExp',listeExpStr);
  alert('Expérience enregistré !');
  document.getElementById('Webform').reset(); // Pas forcément nécessaire car reload juste après
  location.href = ""; // retour acceuille, ce qui actualise le tableau car tout est en One Page
}


// Gestion pages - annimations :

// id
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const backflou = document.getElementById("20");

// class
const right_to_left = document.querySelector('.right_to_left');
const left_to_right = document.querySelector('.left_to_right');
const suppr_all_but = document.querySelector('.to_footer');

// Autre
var page_open = false;

// Page new exp de conduite
function open_new_exp(){
  page_open = true;
  right_to_left.style.left = '0%';
  page1.style.left = "0%";

  backflou.style.animation = 'fadeIn .2s ease-in 1 forwards';
  backflou.style.display = 'initial';
}

// Page tableau des exp
function open_view_exp(){
  page_open = true;
  left_to_right.style.right = '0%';
  page2.style.right = "0%";

  backflou.style.animation = 'fadeIn .2s ease-in 1 forwards';
  backflou.style.display = 'initial';
}

// Fermeture des pages
function close_page(swi){
  page_open = false;
  right_to_left.style.left = '101%';
  page1.style.left = "100%";

  left_to_right.style.right = '101%';
  page2.style.right = "100%";

  backflou.style.animation = 'fadeOut .7s ease-in forwards';
  backflou.style.opacity = '0';
  //Règle bug passage page gauche à droite, evite de suppr le flou d'arrière plan
  if (typeof swi == 'undefined') {
    setTimeout(function(){backflou.style.display = 'none'}, 1000);
  }
}


// Options touche changer page
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
      if (!page_open) {open_view_exp()} else{close_page()}
    }
    else if (e.keyCode == '39') {
      if (!page_open) {open_new_exp()} else{close_page()}
    }
}

// Fin touches




// --------------------Liste Exp Conduite-------------------
// --------------------Affichage Tableau--------------------


liste_exp_conduite=new Array();
dataString=localStorage.getItem('listeExp');
if(dataString!=null){
  liste_exp_conduite=JSON.parse(dataString);
}

// Attendre que la page soit complètement charger
document.onreadystatechange=function(){
  if(document.readyState=="complete"){
    afficheListeExp(); 
  }
}

let liste_liaison = ["id_meteo","id_type_route","id_trafic","id_etat_route","id_type_conduite","id_visibilite"];
let liste_liaison2 = ["liste_meteo","liste_type_route","liste_trafic","liste_etat_route","liste_type_conduite","liste_visibilite"];
let categorieRecherchee = '';

function afficheListeExp(){
  if(liste_exp_conduite.length!=0){
    var codeHTML="<div class='tableFixHead'><table><thead><tr><th>Plus</th><th>Prénom</th><th>Nom</th><th>Date</th><th>Heure Depart</th><th>Heure Arrivee</th><th>Distance</th><th>Meteo</th><th>Type Route</th><th>Trafic</th><th>Etat Route</th><th>Type Conduite</th><th>Visibilité</th></tr></thead><tbody>";

  liste_exp_conduite.forEach(function(item,index){
    codeHTML+=`<tr class="table_bottom_border" onclick="voirPlus(${item.idExp})"><td><img src="img/more.png"></td><td>${item.Prénom}</td><td>${item.Nom}</td><td>${item.Date}</td><td>${item.HeureDepart}</td><td>${item.HeureArrive}</td><td>${item.distanceParcourus} Km</td>`;

    for (var i = 0; i < liste_liaison.length; i++) {

      let lIdCategorie=item[liste_liaison[i]];
      categorieRecherchee=eval(liste_liaison2[i]).find(categorieElement => categorieElement[liste_liaison[i]]==lIdCategorie).value;
      codeHTML+=`<td>${categorieRecherchee}</td>`;

    }

    codeHTML+=`</tr>`;
  });

  codeHTML+="</tbody></table></div>";
  }else{
    suppr_all_but.style.display = 'none';
    var codeHTML="<h2 class='tab_vide'>Veuillez enregistrer votre première expérience de conduite <a href='#' onclick='close_page(true); open_new_exp();'><u>ici</u></a></h2>";
  }
  document.getElementById('page2').insertAdjacentHTML("afterbegin",codeHTML);
}

// ---------------------------------------------------------

// Function pour suppr toute les exps de conduite
function delAll(){
  // Verif pour être sur avant suppr
  if (confirm("Êtes-vous sûr de vouloir tout supprimer ?")) {
    localStorage.removeItem('listeExp');
    location.href = ""; // Actualiser page
  }
}

// ---------------------------------------------------------

// Partie ouverture fenetre + d'info dans tableau
const backflou2 = document.getElementById("30");

function voirPlus(x) {

  backflou2.style.animation = 'fadeIn .2s ease-in 1 forwards';
  backflou2.style.display = 'initial';

  const addInfo = document.createElement('div');
  addInfo.className = 'addInfo';



  // Recherche le nom / prenom de l'id selectionner
  var totalDistanceParcourue = 0;

  var enregistrementTrouve = liste_exp_conduite.find(function(enrg) {
    return enrg.idExp === x;
  });

  // Verif si l'enregistrement a été trouvé
  if (enregistrementTrouve) {
    temp_nom = enregistrementTrouve.Nom;
    temp_prenom = enregistrementTrouve.Prénom;
  } else {
    console.log("Erreur lors du calcul total KM");
  }

  // Recherche chaque personne avec meme nom / prenom -> pour total KM
  liste_exp_conduite.forEach(function(elem) {
    if (elem.Nom === temp_nom && elem.Prénom === temp_prenom) {
      var temp_distance = parseFloat(elem.distanceParcourus);
      // Verif si c'est un nombre valide
      if (!isNaN(temp_distance)) {
        totalDistanceParcourue += temp_distance;
      }
    }
  });
  // Fin calcul total KM


  liste_exp_conduite.forEach(function(element) {
    if (element.idExp === x) {
      addInfo.innerHTML = `<h2>Informations<br>supplémentaires<br>ID ➜ ${x}</h2><div class="scroll"><div class="conteneur-flex"><div class="colone"><p><b>Prenom :</b> ${element.Prénom}</p><p><b>Nom :</b> ${element.Nom}</p><p><b>Heure Départ :</b> ${element.HeureDepart}</p><p><b>Heure Arrivée :</b> ${element.HeureArrive}</p><p><b>Distance :</b> ${element.distanceParcourus} Km</p><p><b>Meteo :</b> ${liste_meteo[element.id_meteo-1].value}</p><p><b>Visibilité :</b> ${liste_visibilite[element.id_visibilite-1].value}</p></div><div class="colone"><p><b>Date :</b> ${element.Date}</p><p><b>Type De Route :</b> ${liste_type_route[element.id_type_route-1].value}</p><p><b>Trafic :</b> ${liste_trafic[element.id_trafic-1].value}</p><p><b>Etat Route :</b> ${liste_etat_route[element.id_etat_route-1].value}</p><p><b>Type Conduite :</b> ${liste_type_conduite[element.id_type_conduite-1].value}</p><p><b>Total KM :</b> ${totalDistanceParcourue}</p></div></div><fieldset><legend><b>Commentaire</b></legend><textarea readonly class="commentaire">${element.Commentaire}</textarea></fieldset></div>`;
    }
  });

  document.body.appendChild(addInfo);

  // Créer un bouton de fermeture
  const btnClose = document.createElement('button');
  btnClose.innerHTML = '<img class="bin" src="img/close.png">';
  btnClose.classList.add('addInfo-close');

  addInfo.appendChild(btnClose);



  // Crée poubelle suppr Exp conduite selectionner
  const btnDel = document.createElement('button');
  btnDel.innerHTML = '<img class="bin" src="img/bin.png">';
  btnDel.classList.add('addInfo-del');

  addInfo.appendChild(btnDel);

  // Recherche + suppr de l'exp voulu
  btnDel.onclick = function() {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette expérience de conduite ?")) {

      // On recherche l'index de la sous-liste à supprimer
      let indexASupprimer = -1;
      for(let i = 0; i < liste_exp_conduite.length; i++) {
        if(liste_exp_conduite[i].idExp === x) {
          indexASupprimer = i;
          break;
        }
      }

      // Si on a trouvé la sous-liste à supprimer, on la supprime avec la méthode splice()
      if(indexASupprimer >= 0) {
        liste_exp_conduite.splice(indexASupprimer, 1);
      }

      listeExpStr=JSON.stringify(liste_exp_conduite);
      localStorage.setItem('listeExp',listeExpStr);
      location.href = ""; // Actualiser page
    }
  };

  // Annim fermeture addInfo
  btnClose.onclick = function() {
    addInfo.style.animation = 'fadeOut .5s ease-in forwards';
    setTimeout(function(){addInfo.remove()}, 500);

    backflou2.style.animation = 'fadeOut .5s ease-in forwards';
    backflou2.style.opacity = '0';
    setTimeout(function(){backflou2.style.display = 'none'}, 500);
  };
}



// #########################################
// ######## Copyright Kylian S2P3 ##########
// #########################################
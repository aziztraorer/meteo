const body=document.querySelector('body')
const modeimg=document.querySelector('.modeimg')
const km=document.querySelector('.km')
let temperature=document.querySelector('.temp')
const pays=document.querySelector('.pays')
const menu=document.querySelector('.voir')
const autrepays=document.querySelector('.autrpays')
const voirailleure='';
//la barre de menu je vais met un prompt permet d'entre autre pays pour recuper le temps qui fais rien de plus 

menu.addEventListener('click',()=>{
    const voirailleure=prompt('Entrez le nom d\'un autre pays pour voir la temperature de l\'endroit souhaitez: ')
    autre(voirailleure)
})

async function autre(voir) {
    const link=`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${voir},&appid=cf7cda910d55224514128a8a6d7c5827`
    const weather=await fetch(`${link}`).then(res=>res.json())
    let degs=weather.main.temp_max
    autrepays.innerHTML=`${voir} ${degs.toFixed()} °C `;
  }
  
  
  
// heure
window.addEventListener('load',horloge);
function horloge() {
    let d=new Date();
    document.querySelector('.heureinfo').innerHTML=d.toLocaleTimeString();
    setTimeout(horloge,1000);
}

// function pour recuper la position
async function position() {
       // Vérifie si le navigateur supporte la géolocalisation
       if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var vitesse=position.coords.accuracy
            // Appel à l'API Nominatim pour obtenir le nom du lieu
            var url =`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var location = data.address.city 
                    var town=data.address.town  
                    var village=data.address.village  
                    var hamlet=data.address.hamlet  
                    var statut=data.address.state || data.address.country;
                    pays.textContent = statut +','+ location;
                    temps(statut)
                    km.textContent=`${vitesse}`
                })
                .catch(error => {
                    alert("Erreur lors de la récupération de l'adresse : " + error.message);
                });
        }, function(error) {
            alert("Erreur lors de la récupération de la position : " + error.message);
        });
    } else {
          alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }

}

position()
// function pour recuper la temperatur
async function temps(statut) {
  const link=`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${statut},&appid=cf7cda910d55224514128a8a6d7c5827`
  const weather=await fetch(`${link}`).then(res=>res.json())
  let degs=weather.main.temp_max
  temperature.textContent=`${degs.toFixed()} °C`;
  
}
// funtion pour reste dans un mode 
let dark=localStorage.getItem('dark-mode')

const enabledarkmode=()=>{
    body.classList.add('darkmodetogget')
    modeimg.classList.add('modepass')
    localStorage.setItem('dark-mode',"enabled")
}
const disabledarkmode=()=>{
    body.classList.remove('darkmodetogget')
    modeimg.classList.remove('modepass')
    localStorage.setItem('dark-mode',"disabled")
}
if (dark==='enabled') {
    enabledarkmode()
}
modeimg.onclick=function() {
    dark=localStorage.getItem('dark-mode');
    if (dark==='disabled') {
        enabledarkmode()
    }else{
        disabledarkmode()
    }
}
const nombre=document.getElementById("name")
const latitude=document.getElementById("latitude")
const longitude=document.getElementById("longitude")
const form=document.getElementById("form")
const parrafo=document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings=""
    let entrar=false
    parrafo.innerHTML=""
    if(nombre.value.length<6){
        warnings+='El nombre no es válido <br>'
        entrar=true
    }
    if(latitude.value.length==0){
        warnings+='La latitud no es válida <br>'
        entrar=true
    }
    if(longitude.value.length==0){
        warnings+='La longitud no es válida <br>'
        entrar=true
    }
    if(entrar){
        parrafo.innerHTML = warnings
    }
    if(latitude.value>=21.1324529 && longitude<=-101.6942687 && latitude.value>=21.103789 && longitude<= -101.565351){
        alert("Lo siento, no puede realizarse su entrega")
    }else{
        send()
    }
})

function send(){
    var name = document.getElementById("name").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
  
    window.location.href = "geolocation.html?nombre=" + name + "&latitud=" + latitude + "&longitud=" + longitude;
  }


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
})

/*window.addEventListener("load",  ()=>{
    const params=(new URL(document.location)).searchParams;
    const name=params.get("name")
    const longitude=params.get("longitude")
    const latitude=params.get("latitude")
})*/


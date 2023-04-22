<script>
  function fetch(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        /*resolve({
          nombre: "Rita la autora",
          edad: 41,
          ocupacion: "Autora de libros de comedia"
        })*/
        reject("Tenemos un problema para sacar los datos")
      }, 3000)
    })
  }
</script>

{#await fetch()} 
<p>Un segundo que estamos resolviendos cosas . . .</p>
{:then payload}
<p>Nombre: {payload.nombre}</p>
<p>Edad: {payload.edad}</p>
<p>ocupacion: {payload.ocupacion}</p>
{:catch e}
  <strong>Error: {e}</strong>
{/await}
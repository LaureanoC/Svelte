<script>
  import Interior from "./Interior.svelte";
  export let nombre;
  let momento = 'bonita tarde';
</script>

<h1>Hola {nombre}</h1>
<p>Que tenga una {momento}</p>
<Interior apellido="Chaves"/> 


<style>
    h1{
        font-size:2rem;
        text-align: center;
        color:#5F9EA0;
    }

    p{
        font-family:sans-serif;
    }
</style>


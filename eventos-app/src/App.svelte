<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }

    let nombre = "";
    let cant = 0;
    //Modifico los valores de nombre por teclado
    function handle (e){
        nombre = e.target.value;
        cant = nombre.length;
    }

</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>

<input type="text" placeholder="Introducir nombre" class="texto"
on:keyup={handle}/>

<!--Se asigna nombre y cant reactivamente-->
<p>Hola {nombre}, tienes {cant} caracteres en tu nombre</p>

<button disabled={nombre == ""}>Enviar Mensaje</button>

{#if nombre==""}
<p>No me has dicho como te llamas!</p>
{:else}
<strong>Cuando sea falsa: Hola {nombre}</strong>
{/if}

<style>
    .texto{
        margin: 1rem;
        font-size: 1.5rem;
        color:burlywood;
    }
</style>
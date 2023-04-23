<script>
  import Seccion from "./Seccion.svelte";

  function no(){
    alert("No puedes abrir el menu contextual")
  }

</script>

<svelte:body on:contextmenu|preventDefault={no}></svelte:body>

<main>
  <Seccion titulo="Menú del día">
    
    <svelte:fragment slot="main">
      <p>Chopitos</p>
      <p>Pollo</p>
      <p>etc</p>
    </svelte:fragment>

  </Seccion>

  <Seccion titulo="Cafés"></Seccion>
</main>
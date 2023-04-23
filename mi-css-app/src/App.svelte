<script>
  import Input from "./Input.svelte";

  let nombre="John";
  let apellido="Doe";
</script>

<main>
  <fieldset>
    <Input bind:value={nombre} label="Nombre" id="nombre"/>
    <Input bind:value={apellido} label="Apellido" id="apellido"/>
  </fieldset>
  
  <p class="label">Tu eres <strong>{nombre +" "+ apellido}</strong></p>
</main>



<style>
  
  .label{
    color:darkblue;
    font-size: 1.3rem;
  }

</style>

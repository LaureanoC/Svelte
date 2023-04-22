<script>
  import Acepta from "./Acepta.svelte";
  import Lista from "./Lista.svelte";
  import This from "./This.svelte";
  let nombre = "Luna";
</script>

<p>Tu nombre es {nombre}</p>
<input type=text bind:value={nombre}/>

<Acepta/>
<br><br>
<Lista/>

<h3>Bind.this</h3>

<This />

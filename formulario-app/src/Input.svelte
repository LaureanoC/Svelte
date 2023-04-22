<script>
    export let identificador;
    export let label
    export let value;
</script>

<!--Al igual que ocurre con el on puedo dejar el bind:value a secas-->
<div>
    <label for={identificador}>{label}</label>
    <input id={identificador} type="text" bind:value/>      
</div>


<script>
    export let nombre;

    export let terminado;
</script>

{#if terminado}
<p class="tachado">✔️ {nombre}</p>
{:else}
<p>{nombre}</p>
{/if}

<style>
    .tachado{
        text-decoration: line-through;
    }
</style>
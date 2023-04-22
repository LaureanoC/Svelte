<script>
    let acepta = false;
</script>

{#if acepta}
<p>Nos dice que sí</p>
{:else}
<p>Nos dice que no</p>
{/if}

<label>
<input type="checkbox" bind:checked={acepta}>
Modificar valor
</label>

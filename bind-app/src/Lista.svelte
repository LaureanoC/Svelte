<script>
    let valores = ["Africa", "America", "Asia", "Europa", "Oceanía"];
    let valor = "Asia";
</script>

<select bind:value={valor}>
    {#each valores as v}
    <option value={v}>{v}</option>
    {/each}
</select>
<p>Has decidido {valor}</p>
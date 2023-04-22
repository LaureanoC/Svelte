<script>
    import Tarea from "./Tarea.svelte";

    let elementos = [
        { id: '4891484', nombre: "Comprar patatas", terminado: false},
        { id: '4897774', nombre: "Limpiar el jardin", terminado: true},
        { id: '4894985', nombre: "Enviar un correo", terminado: true},
        { id: '4894895', nombre: "Jugar al ajedrez", terminado: false},
    ];

</script>

{#each elementos as e, num (e.id)}
<Tarea nombre = {e.nombre} terminado = {e.terminado}/>
{:else}
    <p>El listado está vacío</p>
{/each}
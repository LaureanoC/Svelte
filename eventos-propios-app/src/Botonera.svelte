<script>
    import Boton from "./Boton.svelte";
    
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function reinicio(){
        dispatch("reiniciar")
    }

</script>

<Boton on:pulsado/>
<button type="button" on:click={reinicio}>Reiniciar</button>
<script>
    import { createEventDispatcher } from "svelte";

    let disptach = createEventDispatcher();

    function pulsar(){
        disptach("pulsado")
    }

</script>

<button type="button" on:click={pulsar}>Púlsame</button>
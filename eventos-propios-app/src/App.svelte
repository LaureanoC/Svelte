<script>
    import Botonera from "./Botonera.svelte";

    let veces = 0;
    
    function sePulso(){
        veces++
    }

    function volverACero(){
        veces = 0;
    }
</script>

<p>Me han pulsado {veces} {veces == 1 ? 'vez':'veces'}</p>

<Botonera on:reiniciar={volverACero} on:pulsado={sePulso}/>
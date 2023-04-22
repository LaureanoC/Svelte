<script>
    import { createEventDispatcher } from "svelte";

    export let identificador;
    export let label;

    export let min; // valores iniciales, no del slider
    export let max;

    const dispatch = createEventDispatcher();

    function cambiarMin(e){
        const nuevoSalarioMin = parseInt(e.target.value)
        dispatch("update", {min: nuevoSalarioMin, max})
    }

    function cambiarMax(e){
        const nuevoSalarioMax = parseInt(e.target.value)
        dispatch("update", {min, max: nuevoSalarioMax})
    }

</script>

<div>
    <label for={`${identificador}_min`}>{label} mínimo</label>
    <input type ="range" min={0} max={50000} value={min} on:change={cambiarMin}/>
    <span>{min}</span>
</div>

<div>
    <label for={`${identificador}_max`}>{label} máximo</label>
    <input type ="range" min={0} max={50000} value={max} on:change={cambiarMax}/>
    <span>{max}</span>
</div>
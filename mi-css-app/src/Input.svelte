<script>
    export let label;
    export let value;
    export let id;
    let invalid = value.length==0;
    let valid = value.length>0;
    
    $:{

        invalid = value.length==0;
        valid = value.length>0;
    }
   

</script>

<div class:invalid class:valid>
    <label class="label" for={id}>{label}</label>
    <input type="text" id={id} bind:value/>
</div>

<style>
    .label{
        color:brown;
        font-weight: bold;
    }

    .valid input {
        background-color: rgb(131, 228, 136);
    }
    .invalid input{
        background-color: rgb(206, 155, 155);
    }
</style>
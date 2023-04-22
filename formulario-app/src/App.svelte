<script>
    import Desplegable from "./Desplegable.svelte";
    import Input from "./Input.svelte";
    import Rangos from "./Rangos.svelte";


let estado = {
  nombre: 'Pepita',
  apellido: 'Perez',
  sector: 'Frontend',
  salario: {
    min: 25000,
    max: 40000,
  },

}

let sectores = ["Backend", "Frontend", "DevOps", "QA"]

function envio(e){
    e.preventDefault(); //No recargará la página
    alert(JSON.stringify(estado))
}

function actualizarSalario(e){
  estado.salario.min = e.detail.min;
  estado.salario.max = e.detail.max;
}

</script>

<main>
  <form on:submit={envio}>

    <Input identificador="nombre" label="Nombre" bind:value={estado.nombre}/>
    <Input identificador="apellido" label="Apellido" bind:value={estado.apellido}/>
    <Desplegable identificador="sector" label="Sector" choices={sectores} bind:value={estado.sector}/>
    <Rangos identificador="salarios" label="Salarios" min={estado.salario.min} max={estado.salario.max} on:update={actualizarSalario}/>

    <input type="submit" value="Enviar"/>
  </form>
</main>

<style>
  :global(:root) {
    font-size: 16px;
    color: #333;
    background-color: #fff;
  }

  /* Reglas globales específicas para los elementos del formulario */

  :global(form) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :global(label) {
    margin: 10px 0;
  }

  :global(input[type="text"]),
  :global(input[type="email"]),
  :global(textarea) {
    width: 100%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  :global(button[type="submit"]) {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  :global(button[type="submit"]:hover) {
    background-color: #45a049;
  }
</style>
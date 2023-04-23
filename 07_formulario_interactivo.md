<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ejercicio de aplicación de los conceptos previos](#ejercicio-de-aplicaci%C3%B3n-de-los-conceptos-previos)
- [Primeros pasos](#primeros-pasos)
- [Componente Input](#componente-input)
- [Componente Desplegable](#componente-desplegable)
- [Componente Rangos](#componente-rangos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ejercicio de aplicación de los conceptos previos

Crear un formulario interactivo para una persona que está buscando trabajo.

Podrá escribir el nombre, apellido en una serie de inputs. Podrá seleccionar el tipo de trabajo que busca en un desplegable y elegir el rango salarial a traves de unos sliders.

Lo vamos a fabricar pensando en eventos para poder poner en practica los conceptos previos aprendidos.

Haremos la propagación de eventos para modificar una variable global y mandaremos los datos a traves de los componentes -> top-down

<img src="Imagenes-markdown\img_form\01.png">

# Primeros pasos

Pues bueno crearemos un formulario aunque será de uso local no realizará ninguna petición http.

Por ahora queremos que dado un estado con sus caracteristicas como nombre, apellido, sector, salario sea puesto en una alerta al envíar. Ojo que cuando le das al botón de envíar se recarga la aplicación porque por defecto el submit lo hace para ello debemos ponerle al evento de envio (e) el preventDefault

```html
<script>

let estado = {
  nombre: 'Pepita',
  apellido: 'Perez',
  sector: 'Frontend',
  salario: {
    min: 25000,
    max: 40000,
  },

}

function envio(e){
    e.preventDefault(); //No recargará la página
    alert(JSON.stringify(estado))
}

</script>

<main>
  <form on:submit={envio}>
    <input type="submit" value="Enviar"/>
  </form>
</main>
```

Podriamos hacer inputs con el tipo bind para que por defecto dentro del input se encuentre el valor estado.nombre por ejemplo y que se vaya modificando el estado.nombre a medida que tecleemos dentro de ese input.

En ejemplo real es necesario que el input tenga un label que diga nombre para cumplir con la semantica del formulario y con el estándar de accesibilidad.

```html
<script>

let estado = {
  nombre: 'Pepita',
  apellido: 'Perez',
  sector: 'Frontend',
  salario: {
    min: 25000,
    max: 40000,
  },

}

function envio(e){
    e.preventDefault(); //No recargará la página
    alert(JSON.stringify(estado))
}

</script>

<main>
  <form on:submit={envio}>

    <div>
      <label for="nombre">Nombre</label>
      <input id="nombre" type="text" bind:value={estado.nombre}/>      
    </div>

    <input type="submit" value="Enviar"/>
  </form>
</main>
```

En pantalla y en el alert
<img src="Imagenes-markdown\img_form\02.png">
<img src="Imagenes-markdown\img_form\03.png">

Podría repetirlo para los demás inputs.

Sin embargo estoy duplicando bastante código donde hay cosas que deberían estar sincronizadas como los valores del id y el for.

Crearemos nuestro primer componente llamado Input.svelte

# Componente Input

bind:value tendrá estado.value como era antes. Pero Svelte acepta este formato al igual que los on:evento. Tendrá el mismo comportamiento de siempre, valor inicial y modificaciones.
Tendremos un identificador para el id y el for.
Una variable label para el texto del label
Y el value.

```html
<script>
    export let identificador;
    export let label
    export let value;
</script>

<!--Al igual que ocurre con el on puedo dejar el bind:value a secas-->
<div>
    <label for={identificador}>{label}</label>
    <input id={identificador} type="text" bind:value/>      
</div>

```

Por lo que en nuestro componente principal tendremos que llamar a los componentes Input y le asignaremos los valores necesarios. Recordemos de importar el componente Input.

En el caso de bind:value existe una conexión bidireccional.

```html
<script>
    import Input from "./Input.svelte";


let estado = {
  nombre: 'Pepita',
  apellido: 'Perez',
  sector: 'Frontend',
  salario: {
    min: 25000,
    max: 40000,
  },

}

function envio(e){
    e.preventDefault(); //No recargará la página
    alert(JSON.stringify(estado))
}

</script>

<main>
  <form on:submit={envio}>

    <Input identificador="nombre" label="Nombre" bind:value={estado.nombre}/>
    <Input identificador="apellido" label="Apellido" bind:value={estado.apellido}/>
    
    <input type="submit" value="Enviar"/>
  </form>
</main>
```

Le agregare algún estilo generado automaticamente por chatgpt para que la img sea más bonita. Con la directiva global puedo afectar a todos los componentes, recordemos que cada componente puede tener su propio estilo.

```html
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
```

Nos queda algo así

<img src="Imagenes-markdown\img_form\04.png">

# Componente Desplegable

Bueno ahora queremos que seleccione el sector en el que trabaja.

Crearemos una input dropdown y le asignaremos por default un valor, misma idea del bind pero para un desplegable. Tendremos previamente un array.

(olvidate del css, ignoralo)

Componente Desplegable

```html
<script>
    export let identificador;
    export let label;
    export let choices;
    export let value;
</script>

<div>
    <label for={identificador}>{label}</label>
    <select id={identificador} bind:value>
        {#each choices as choice}
            <option value={choice}>{choice}</option>
        {/each}
    </select>
</div>
```

Componente App

```html
<script>
    import Desplegable from "./Desplegable.svelte";
    import Input from "./Input.svelte";


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

</script>

<main>
  <form on:submit={envio}>

    <Input identificador="nombre" label="Nombre" bind:value={estado.nombre}/>
    <Input identificador="apellido" label="Apellido" bind:value={estado.apellido}/>
    <Desplegable identificador="sector" label="Sector" choices={sectores} bind:value={estado.sector}/>
  
    <input type="submit" value="Enviar"/>
  </form>
</main>
```

Resultado

<img src="Imagenes-markdown\img_form\10.gif">

# Componente Rangos

Este componente de crear un deslizador(slider) podría ser creado perfectamente con los eventos DOM, pero nosotros como excusa para trabajar los eventos propios lo haremos personalizado.

No será el componente más usable, solo es de aprendizaje. Tendremos dos deslizadores uno para decir cual es el minimo y otro para decir cual es el máx.

Creamos el componente Rangos

El componente rango tendrá como props el identificador, label, min y max pero este min y max es del estado no de los limites del slider

Declararemos el dispatch para un uso posterior

Y el HTML va a estar compuesto por dos div, cada uno contendra un input del tipo slider, aquí utilizamos la interpolación para que los id no sean el mismo y se puedan diferenciar, le ponemos el rango minimo y máximo de cada slider, por ultimo le decimos que el valor inicial será el que es pasado como prop y también mostrado por pantalla.

Aquí  le pasaremos desde App min={estado.salario.min}

**Este componente aún no es interactivo 1. porque no quisimos ponerle el bind y queremos hacerlo nosotros con eventos propios.**

```html
<script>
    import { createEventDispatcher } from "svelte";

    export let identificador;
    export let label;

    export let min; // valores iniciales, no del slider
    export let max;

    const disptach = createEventDispatcher();

</script>

<div>
    <label for={`${identificador}_min`}>{label} mínimo</label>
    <input type ="range" min={0} max={50000} value={min}/>
    <span>{min}</span>
</div>

<div>
    <label for={`${identificador}_max`}>{label} máximo</label>
    <input type ="range" min={0} max={50000} value={max}/>
    <span>{max}</span>
</div>
```
En nuestro componente App importaremos y le pasaremos todos los props con sus valores correspondientes.

```html
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

</script>

<main>
  <form on:submit={envio}>

    <Input identificador="nombre" label="Nombre" bind:value={estado.nombre}/>
    <Input identificador="apellido" label="Apellido" bind:value={estado.apellido}/>
    <Desplegable identificador="sector" label="Sector" choices={sectores} bind:value={estado.sector}/>
    <Rangos identificador="salarios" label="Salarios" min={estado.salario.min} max={estado.salario.max}/>

    <input type="submit" value="Enviar"/>
  </form>
</main>
```

Y como dijimos anteriormente aún no es interactivo. Por lo que si modificamos un valor no se cambia en las variables 'globales' de App.svelte

Se ve así

<img src="Imagenes-markdown\img_form\10.png">

El evento que escucha el cambio de valor en el input del tipo range es el on:change

Crearemos una función para cada input, uno que cambie el máx y otro que cambie el mín.

Para ello utilizaremos el on:change = {function}

Por ahora solo imprimiremos por consola para ver que atributos tiene el evento.

Dentro de el objeto que retorna la funcion cambiarMin, entro en target y veo que tiene value, value as Number, as date

```html
<script>
    import { createEventDispatcher } from "svelte";

    export let identificador;
    export let label;

    export let min; // valores iniciales, no del slider
    export let max;

    const disptach = createEventDispatcher();

    function cambiarMin(e){
        console.log(e)
    }

    function cambiarMax(e){
        console.log(e)
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
```

<img src="Imagenes-markdown\img_form\13.png">

_____

Entramos en target

e.target.value

e.target.valueAsNumber

<img src="Imagenes-markdown\img_form\14.png">

Osea que si quiero no es necesario no es necesario convertilo a Number. Pero lo haremos igual.

Modificamos las funciones cambiarMin y cambiarMax

Si modifica el slider del max, mandará una señal con el nombre update para que lo manejen arriba, ademas en el detalle del evento le agrego el nuevo maximo, con el minimo pasado anteriormente como prop.

Viceversa con el min.

```js
function cambiarMin(e){
        const nuevoSalarioMin = parseInt(e.target.value)
        dispatch("update", {min: nuevoSalarioMin, max})
}

function cambiarMax(e){
        const nuevoSalarioMax = parseInt(e.target.value)
        dispatch("update", {min, max: nuevoSalarioMax})
}
```

Por lo que tendré que actualizar mi componente principal para que cuando reciba la señal "update" se modifique el estado y como consecuencia se modifica el prop enviado ya que en min o max se pide el estado.salario.min o estado.salario.max

Y nos quedaria así, agregandole el on:update={actualizarSalario} y dentro de actualizarSalario se modifican los valores de estado

```html
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
// Modificamos el estado.salario
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
    <Rangos identificador="salarios" label="Salarios" min={estado.salario.min} max={estado.salario.max} 
    
    on:update={actualizarSalario}/>

    <input type="submit" value="Enviar"/>
  </form>
</main>
```

Por lo que si ahora interactuamos con el botón de enviar los cambios se verán reflejados.

<img src="Imagenes-markdown\img_form\15.png">

<img src="Imagenes-markdown\img_form\16.png">

Ahora nos quedaría validar que el minimo no sea mayor que el máximo y tambien emitiremos el mensaje de error (y por supuesto sacarlo luego) pero no lo haremos.

















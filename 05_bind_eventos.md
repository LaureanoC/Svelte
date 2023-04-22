<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Binding](#binding)
- [Valor inicial y reactividad](#valor-inicial-y-reactividad)
- [bind:value={ }](#bindvalue-)
- [bind:checked={ }](#bindchecked-)
- [Existen númerosos binds](#existen-n%C3%BAmerosos-binds)
- [bind:this](#bindthis)
- [Importante sobre bind.this](#importante-sobre-bindthis)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Binding

En Svelte, el término "bind" se refiere a una característica que permite enlazar una variable en un componente con una propiedad en un elemento DOM (Document Object Model) correspondiente en el que se está usando el componente.

# Valor inicial y reactividad

Eventos un poquito más avanzados. Antes utilizamos palabra como on en alguna etiqueta para modificar el comportamiento de algo.

Tendremos un componente de Svelte con una variable, un parrafo y un input.

Si pasamos el nombre como el value del input solo pintará el valor inicial de la variable pero si lo modificamos no se modificará el texto de arriba.

```html
<script>
  let nombre = "Luna";
</script>

<p>Tu nombre es {nombre}</p>
<input type=text value={nombre}/>
```

Como habiamos visto si le agregamos un on:keyup={(e) => nombre = target.value} y conseguiriamos el resultado de que se actualice la variable de arriba.

```html
<script>
  let nombre = "Luna";
</script>

<p>Tu nombre es {nombre}</p>
<input type=text value={nombre} on:keyup={(e)=> nombre = e.target.value}/>
```

# bind:value={ }
Esto puede ser más simple en Svelte utilizando los **binds**

Al poner **bind** le estamos diciendo que cuando se produzca una modificación se notifique hacia arriba (js) por lo que tambien podemos hacer que automaticamente se actualice en función de lo que valga lo que le hemos dicho hacia arriba.

El código de abajo es equivalente al código superior escrito anteriormente.

Tendrá un valor inicial y la modificación dinamica.

```html
<script>
  let nombre = "Luna";
</script>

<p>Tu nombre es {nombre}</p>
<input type=text bind:value={nombre}/>
```

Crearemos otro componente para no ensuciar el código, lo llamaremos Acepta. Recordemos importarlo y agregarlo.

```html
<script>
  import Acepta from "./Acepta.svelte"
  let nombre = "Luna";
</script>

<p>Tu nombre es {nombre}</p>
<input type=text bind:value={nombre}/>

<Acepta/>
```

# bind:checked={ }

Componente Acepta.svelte con un checkbox que empezará con un valor inicial false y que a medida que le clickeamos si acepta es true nos dice que si y si acepta es false nos dice que no

```html
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
```

<img src="Imagenes-markdown\img_bind\03.gif">

Crearemos otro componente donde se tendrá un listado de los continentes. Creamos el componente y lo añadimos App.svelte (ignoro el paso).

Aquí como valor inicia como Asia y a medida que vamos eligiendo el continente el parrafo se va modificando.

```html
<script>
    let valores = ["Africa", "America", "Asia", "Europa", "Oceanía"];
    let valor = "Asia";
</script>

<select bind:value={valor}>
    {#each valores as v}
    <option value={v}>{v}</option>
    {/each}
</select>
<p>Has decidido{valor}</p>
```

Como resultado

<img src="Imagenes-markdown\img_bind\10.gif">

# Existen númerosos binds

**Existen binds** para cada tipo de entrada de usuario que se pueden encontrar en la documentación oficial de svelte. Ya te habras dado cuenta que en el momento de escribir bind: salen muchas opciones. Aquí solo mostraremos.

# bind:this

bind.this saca referencia a elementos DOM como si fuese variables.

Previamente lo haremos más rustico para entender el concepto.

Haremos un input y un botón que al clickear sobre el botón se haga focus al input para poder escribir automaticamente sin tener que hacer click en el input.

Podríamos utilizar el evento on:click con un manejador de eventos que le haga focus al input.

Con bind.this en el momento que se renderice por pantalla este componente se le asignará a la variable input (que al inicio se encuentra vacía) el Objeto del DOM.

```html
<script>
  let input;

  function focus(){
    console.log({ input });
  }

</script>

<input type="text" placeholder="Pon aquí algo" bind:this={input}/>
<button type="button" on:click={focus}>Hacer focus a input</button>
```

Al hacer interactuar con el botón vemos que se imprime por consola el siguiente Objeto del DOM, que tendrá todas sus propiedades. Aquí se me mostró de dos formas diferentes pero es lo mismo.

<img src="Imagenes-markdown\img_bind\11.png">
<img src="Imagenes-markdown\img_bind\12.png">

Bien entonces solo nos queda agregarle la funcionalidad de que al momento de hacer click en el botón se haga focus al input. Como ya tenemos almacenado el elemento del DOM en la variable input solo tendremos que invocar el metodo .focus()

```html
<script>
  let input;

  function focus(){
    input.focus();
  }

</script>

<input type="text" placeholder="Pon aquí algo" bind:this={input}/>
<button type="button" on:click={focus}>Hacer focus a input</button>
```

Como resultado

<img src="Imagenes-markdown\img_bind\17.gif">

# Importante

Recordemos que los valores iniciales de las variables, en nuestro caso, la variable input -> hasta no estar renderizado no se le asigna ningún valor a la variable.

















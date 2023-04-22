<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bucles en Svelte](#bucles-en-svelte)
  - [Ahora con objetos y props](#ahora-con-objetos-y-props)
  - [each else](#each-else)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bucles en Svelte

Pues con la misma idea del IF tiene su propia sintaxis 'rara'

Por ejemplo creamos una lista de elementos que en este caso son todos strings y los mostramos en formato de parrafo.

```html
<script>
    let elementos = [
        "Comprar patatas",
        "Limpiar el jardin",
        "Enviar un correo",
        "Jugar al ajedrez"
    ];

</script>

{#each elementos as elemento}
<p>{elemento}</p>
{/each}
```

<img src="Imagenes-markdown\img_bucles\01.png">

Podemos seguir complicandola un poquitito más por ejemplo le agregaremos un parametro opcional y lo llamaremos num que nos dirá la posición actual.

```html

{#each elementos as elemento,num}
<p><strong>Tarea {num}: </strong>{elemento}</p>
{/each}

```
<img src="Imagenes-markdown\img_bucles\02.png">

# Ahora con objetos y props

Crearemos un componente hijo llamado Tarea.svelte que recibirá dos props una prop sería nombre y el otro sería si está terminado o no

Componente Tarea

```html
<script>
    export let nombre;

    export let terminado;
</script>

{#if terminado}
<p class="tachado">✔️ {nombre}</p>
{:else}
<p>{nombre}</p>
{/if}

<style>
    .tachado{
        text-decoration: line-through;
    }
</style>
```

Componente App

Bueno ahora defineremos un array de objetos que contienen un id, nombre y si está o no terminado.

Es común que cada objeto tenga un identificador propio, con esto se puede utilizar en una variación del bucle foreach.

Al igual que se puede poner una coma y un numero que te diga la posición tambien se puede poner la key que se utiliza para optimizar bastante el uso de bucles.

Para cada e e.id obtendrá la key(id) sino le decimos nada obtendrá el numero de la posición del array como identificador unico.

Cuando se produzcan variaciones del array svelte sabrá que partes del array se habrá modificado.

**{#each elementos as e, num(e.id)}**

```html
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
{/each}
```

<img src="Imagenes-markdown\img_bucles\03.png">

# each else

Svelte tiene la opción de realizar otra cosa si el array está vacío agregandole un else.

```html
{#each elementos as e, num (e.id)}
<Tarea nombre = {e.nombre} terminado = {e.terminado}/>
{:else}
    <p>El listado está vacío</p>
{/each}
```




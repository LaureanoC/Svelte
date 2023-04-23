# ¿Qué son los slots de un componente?

Los slots son huecos que tienen los componentes y que pueden ser rellenados por los componentes descendientes. La idea es permitir crear componentes más reusables, o componentes de alto nivel, donde se pueden proporcionar a un componente ya no solo atributos, sino también todo un nodo DOM descendiente.

Supongas que tenemos un componente Sección que quiere lograr lo siguiente.

```html
<section>
    <h1>Titulo</h1>
    <p>Párrafo</p>
    <p>Párrafo</p>
    <p>Párrafo</p>
    <p>Párrafo</p>
    <p>Párrafo</p>
</section>
```

Componente App

```html
<script>
  import Seccion from "./Seccion.svelte";
</script>

<main>
  <Seccion titulo="Menú del día"/>
</main>
```

Podríamos por qué no tener props para el titulo y los parrafos.

Pero voy a pasar el choclo de parrafo hecho prop??????
Es decir, 6 choclos de texto? 1 en cada atributo?

Para ello existen los slots, en el componente App abrimos y cerramos etiquetas cual parrafo y le vamos metiendo la info.

Lo que esté dentro de la etiqueta va a parar en el slot definido en Seccion.

```html
<script>
    export let titulo;
</script>

<section>
    <h1>{titulo}</h1>
    <slot/>
</section>
```

```html
<script>
  import Seccion from "./Seccion.svelte";
</script>

<main>
  <Seccion titulo="Menú del día">
    <p>Pollo con mostaza</p>
    <p>Pescado</p>
    <p>Fruta del día</p>
  </Seccion>
</main>
```
Como vemos se verá bien.

<img src="Imagenes-markdown\img_slot\01.png">

Y si no tiene nada el slot podemos agregarle un **fallback** -> por ejemplo un mensaje de que no tiene nada en el slot.

En nuestro componente sección

```html
<script>
    export let titulo;
</script>

<section>
    <h1>{titulo}</h1>
    <slot>Slot vacío</slot>
</section>
```

Componente App

```html
<script>
  import Seccion from "./Seccion.svelte";
</script>

<main>
  <Seccion titulo="Menú del día">
    <p>Pollo con mostaza</p>
    <p>Pescado</p>
    <p>Fruta del día</p>
  </Seccion>

  <Seccion titulo="Cafés"></Seccion>
</main>
```
<img src="Imagenes-markdown\img_slot\02.png">

# Varios slots en un componente

Podemos tener más de un slot si lo quisieramos.

A cada slot tenemos que asignarle un nombre si o si.

Por ejemplo imagenimosno que no solo un titulo sino que mostramos toda una cabecera completa con su header y su titulo principal

```html
<script>
    export let titulo;
</script>

<section>
   <header>
        <slot name="header">
            <h1>{titulo}</h1>
        </slot>
    </header>
    <slot name="main">
        <p>Slot vacío</p>
    </slot>
</section>
```

Como le brindamos la info?

Pues

```html
<script>
  import Seccion from "./Seccion.svelte";
</script>

<main>
  <Seccion titulo="Menú del día">
    <p slot="main">Pollo con mostaza</p>
  </Seccion>

  <Seccion titulo="Cafés"></Seccion>
</main>
```

Es interesante ver el HTML generado porque el slot se habrá generado dentro de la etiqueta de la cual le pongamos nosotros  p slot="main" valor /p

Las consecuencias de utilizar slots con nombre es que solo se puede tener un solo elemento de raiz es decir tiene que haber algo principal de lo que cuelgue el atributo main. Siempre tendrá que haber un unico elemento que tenga el nombre del slot. Puede ocasionar problemas en el maquetado por ejemplo un div que nos arruine el flexbox ponele.

Existe una etiqueta especial llamada **svelte:fragment**

Este fragment lo que hace es que cuando se define un contenedor con nombre se le va a insertar lo que hay dentro pero no se insertará un div de más o lo que sea

```html
<script>
  import Seccion from "./Seccion.svelte";
</script>

<main>
  <Seccion titulo="Menú del día">
    
    <svelte:fragment slot="main">
      <p>Chopitos</p>
      <p>Pollo</p>
      <p>etc</p>
    </svelte:fragment>

  </Seccion>

  <Seccion titulo="Cafés"></Seccion>
</main>
```

Se insertará en donde es llamado esos elementos. NO se AGREGARA un div demás.

# Interactuar con windows, head y body svelte:

La etiqueta svelte: en Svelte se utiliza para crear componentes reutilizables que son específicos de Svelte. Es un prefijo que se usa para definir etiquetas personalizadas que son manejadas por el compilador de Svelte.

Por ejemplo, la etiqueta svelte:window se utiliza para agregar oyentes de eventos a la ventana del navegador, mientras que svelte:body se utiliza para agregar contenido al cuerpo de la página HTML.

El uso de la etiqueta svelte: es una de las características que distinguen a Svelte de otros frameworks, ya que permite la creación de componentes personalizados que aprovechan las características únicas de Svelte, como la compilación anticipada y la generación eficiente de código.

Con svelte:head podemos modificar cosas del head de html como el titulo de la página, podría ser reactivo.

Tambien podemos inyectarle un evento on:

Por ejemplo con svelte:window on:scroll podemos hacer que cada vez que se ejecute el scroll haga algo (ojo con el rendimiento)

Por ejemplo no quiero que se ejecute el menu contextual generado por click derecho en cualquier parte del body.

El | obliga a ejecutar previamente el preventdefault y luego la función no.

Por lo que cada vez que quiera presionar el click derecho me aparecera una alerta.

´´´html
<svelte:body on:contextmenu|preventDefault={no}/>
´´´






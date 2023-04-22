<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Patrones para la comunicación entre componentes](#patrones-para-la-comunicaci%C3%B3n-entre-componentes)
  - [Top-down](#top-down)
  - [Eventos propios](#eventos-propios)
  - [Bottom-up](#bottom-up)
- [Lista de tareas](#lista-de-tareas)
- [createEventDispatcher](#createeventdispatcher)
    - [Entonces ¿crea un evento?](#entonces-%C2%BFcrea-un-evento)
  - [Cómo utilizarlo?](#c%C3%B3mo-utilizarlo)
- [Agregar metadatos a un evento](#agregar-metadatos-a-un-evento)
- [Resetear el contador](#resetear-el-contador)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Patrones para la comunicación entre componentes

En Svelte, existen tres patrones principales para la comunicación entre componentes: top-down, eventos propios y bottom-up.

## Top-down

El patrón top-down se refiere a la comunicación de datos de un componente principal a sus componentes secundarios. En este patrón, los datos fluyen desde el componente principal hacia los componentes secundarios, y los cambios en los datos se propagan hacia abajo en la jerarquía de componentes. Este patrón se utiliza comúnmente en Svelte y se puede lograr mediante la asignación de valores a las propiedades de los componentes secundarios.

## Eventos propios

El patrón de eventos propios se utiliza para comunicar eventos entre componentes, **sin necesidad de que los componentes estén directamente relacionados en la jerarquía de componentes**.

En este patrón, los componentes emiten eventos personalizados que otros componentes pueden escuchar y manejar. Este patrón es especialmente útil para comunicar eventos a través de múltiples capas de componentes, o para componentes que no están directamente relacionados entre sí.

## Bottom-up

El patrón bottom-up es el opuesto al patrón top-down. En este patrón, los datos fluyen desde los componentes secundarios hacia el componente principal. Este patrón se utiliza para enviar datos o información de estado de un componente secundario a su componente principal. En Svelte, este patrón se logra mediante la emisión de eventos personalizados desde los componentes secundarios que son escuchados por el componente principal.

# Lista de tareas

Un componente superior que contenga un array con los distintos elementos, luego componentes a los cuales les pasaremos cada elemento (top-down).

<img src="Imagenes-markdown\img_patron\01.png">

Ahora supongamos que los hijos del componente superior también pueden ser interactivos independientemente del padre, por ejemplo si tiene un botón donde al interactuar con él la tarea se borre o se tache (actualice su presentación). La interactividad ocurre a nivel local.

<img src="Imagenes-markdown\img_patron\02.png">

Hay ocasiones que querramos modificar algo esté fuera del componente hijo, por ejemplo que en otro lado de la página exista una cajita que nos vaya diciendo cuantas tareas nos quedan pendientes. **Aquí no existe ninguna relación padre hijo.** Total de tareas 2 -> nos quedan 1

<img src="Imagenes-markdown\img_patron\03.png">

Se tratan componentes muy separados de la jerarquia.

Para poder modificar el comportamiento de un componente lejano lo que se hace es **propagar eventos**.

Lo normal es que los datos van fluyendo **de arriba a abajo** y los eventos van propagando la reactividad **de abajo a arriba** en caso de que los componentes sean lejanos y sea necesario. Lo que hará el componente es mandarle una notificación al de arriba para que maneje el evento. Haremos nuestros propios eventos.

# createEventDispatcher

createEventDispatcher es una función proporcionada por Svelte que permite a los componentes emitir eventos personalizados y enviar información adicional a los controladores de eventos que los escuchan.

Cuando un componente desea emitir un evento personalizado, llama a createEventDispatcher para crear un objeto que se utiliza para enviar el evento personalizado a los controladores de eventos. La función createEventDispatcher devuelve una función dispatch que se utiliza para emitir eventos personalizados.

La función dispatch acepta **dos argumentos:** el primer argumento es el nombre del evento personalizado y el segundo argumento es un objeto que contiene cualquier información adicional que se desee enviar con el evento.

### Entonces ¿crea un evento?

No exactamente. createEventDispatcher no crea un evento en sí mismo, sino que crea una función dispatch que se utiliza para emitir eventos personalizados.

Cuando se llama a la función dispatch con un nombre de evento personalizado y un objeto que contiene información adicional, se crea un nuevo evento personalizado en Svelte. 

## Cómo utilizarlo?

El siguiente ejemplo puede hacerse como lo haciamos anteriormente todo junto en App.svelte peeero vamos a hacerlo simple para entender el concepto.

Supongamos que tenemos un Componente Boton y el de App

En el componente principal App.

```html
<script>
    import Boton from "./Boton.svelte";

    let veces = 0;
</script>

<p>Me han pulsado {veces} {veces == 1 ? 'vez':'veces'}</p>

<Boton />
```

En nuestro componente boton separado generará una serie de eventos expulsandolo hacia arriba.
Para ello importaremos funciones de la librería de svelte, nosotros queremos la de createEventDispatcher.

Es una función que vamos a utilizar cuando crearemos despachadores de eventos para empujar hacia arriba el evento.

Crearemos una variable llamada dispatch que le asignaremos una función createEventDispatcher que nos fabricará un generador de eventos. La función no dispara nada pero si lo que nos retorna nos permite propagar hacia arriba.

dispatch(tipoEventoArbitrario)

Entonces, importamos la función para fabricar un generador de eventos.  Es asignado el valor de retorno que es una función dispatch (al igual que el nombre de la variable)

Nuestro botón en html tendrá un evento on:click que llamará a la función pulsar.

En la función pulsar se ejecuta la función dispatch que habia sido almacenada anteriormente y como párametro le asignamos un nombre arbitrario, creo que existe un estándar de como llamarlos pero aquí no se aplicará.

```html
<script>
    import { createEventDispatcher } from "svelte";

    let disptach = createEventDispatcher();

    function pulsar(){
        disptach("pulsado")
    }

</script>

<button type="button" on:click={pulsar}>Púlsame</button>
```

Una vez que se realiza el click en nuestro componente principal nuestro Boton podría poner el **on:pulsado**

Cuando mi botón haga un dispatch a mi componente de pulsado pues quiero que ocurra ciertos acontecimientos, es decir, le asigna una 

La propagación siempre se produce al componente padre más cercano. Por defecto el dispatch me va a llegar justo a la invocación del componente (Boton on:pulsado)
```html
<script>
    import Boton from "./Boton.svelte";

    let veces = 0;

    function sePulso(){
        veces++
    }
</script>

<p>Me han pulsado {veces} {veces == 1 ? 'vez':'veces'}</p>

<Boton on:pulsado={sePulso}/>
```

<img src="Imagenes-markdown\img_patron\11.gif">

# Agregar metadatos a un evento

Los eventos que fabriquemos con un event dispatcher también nos permiten agregarle información extra que puede ser capturada en el listener de los eventos, lo que nos va a permitir enviar información extra cuando hagamos fluir eventos de un sitio a otro.

Existe un parámetro implicito en la función sePulso, la llamaremos event

Es un objeto que tiene datos, nos encontramos que es un evento del tipo pulsado con todas las particularidades.

```html
<script>
    import Boton from "./Boton.svelte";

    let veces = 0;

    function sePulso(event){
        console.log({ event })
        veces++
    }
</script>

<p>Me han pulsado {veces} {veces == 1 ? 'vez':'veces'}</p>

<Boton on:pulsado={sePulso}/>
```

Al imprimirlo por consola vemos la siguiente información del objeto.

<img src="Imagenes-markdown\img_patron\13.png">

Tenemos un campo llamado detail que vale null, nos sirve para pasar cierta información extra hacia arriba.

Por ejemplo vamos a imaginar que tenemos un una variable timestamp para proporcionale en que momento se hizo click en el botón.

Entonces el segundo parámetro será para poner algo en detail. Pondremos un objeto que contenga la fechahora en la que se hizo click.

```html
<script>
    import { createEventDispatcher } from "svelte";

    let disptach = createEventDispatcher();

    function pulsar(){
        let timestamp = new Date();
        let ahora = timestamp.toLocaleString();
        disptach("pulsado", {
            fecha:ahora,
        })
    }

</script>

<button type="button" on:click={pulsar}>Púlsame</button>
```

En resultado de hacer click es

<img src="Imagenes-markdown\img_patron\14.png">

Por lo que ahora lo podemos utilizar para nuestro propio beneficio.

Mostraremos cada una de las fechahoras en las que se hizo click

**Svelte solo actualiza los campos si vé un operador = por lo que no podemos hacer fechas.push(fecha), asi que lo que se hace verlo más funcional y a fechas se sobrescribe fechas mas la fecha**

```html
<script>
    import Boton from "./Boton.svelte";

    let veces = 0;
    let fechas = [];

    function sePulso(event){
        
        const fecha = event.detail.fecha;
// Svelte solo actualiza cuando ve un operador = por lo cual
// la sintaxis para agregar una fecha será:
        fechas = [...fechas,fecha]
        veces++
    }
</script>

<p>Me han pulsado {veces} {veces == 1 ? 'vez':'veces'}</p>

<Boton on:pulsado={sePulso}/>

{#each fechas as fecha}
    <p>{fecha}</p>
{/each}
```

<img src="Imagenes-markdown\img_patron\15.png">

# Resetear el contador

Que pasa cuando queremos propagar eventos aúm mas hacia arriba, es decir, reenviar eventos.

En el ejemplo anterior

<img src="Imagenes-markdown\img_patron\16.png">

Ahora tendremos 3 componentes

El principal, la botonera y el botón diseñado previamente.

Pues ahora si el botón despacha el pulsado lo recibirá la botonera y no podrá cambiar el valor de **veces** ya que se encuentra dentro App.

Por lo que habrá que reeeeenviar la señal.

<img src="Imagenes-markdown\img_patron\17.png">

De forma tradicional propagaremos a mano (no utilizar en svelte) pero sirve para entender el concepto.

Entonces tenemos

Botón diseñado previamente que mandará una señal "pulsado" a la botonera porque es el más cercano.

```html
<script>
    import { createEventDispatcher } from "svelte";

    let disptach = createEventDispatcher();

    function pulsar(){
        disptach("pulsado")
    }

</script>

<button type="button" on:click={pulsar}>Púlsame</button>
```

La botonera contendrá el Componente Button y un botón de reincio que propagará hacia arriba la seña de reinicio -> es decir, cuando se haga click por culpa del onclick se llamará a la función reinicio la cual envía la propagación del evento custom hacia arriba.

Por lo que también en este caso botón debería haber la misma idea que el de reinicio para que llegue al componente mas cercano (App.js)

Vemos que el Boton on:pulsado={pulsar} **repite el proceso de mandar la señal hacia arriba por lo que es redundante** escribir nuevamente function pulsado(){dispatch("pulsado")}


```html
<script>
    import Boton from "./App.svelte";
    
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function reinicio(){
        dispatch("reiniciar")
    }

    function pulsado(){
        dispatch("pulsado")
    }

</script>

<Boton on:pulsado={pulsar}/>
<button type="button" on:click={reinicio}>Reiniciar</button>
```

El componente principal recibe ambas señales del botón de reinicio y el del componente Botón y lo maneja con las funciones volverACero() y sePulso()

Vemos que el componente Botonera va a despachar dos eventos, el de reiniciar y el de pulsado.

Y la aplicación funciona correctamente

```html
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
```

Se ve así el resultado

<img src="Imagenes-markdown\img_patron\21.gif">

Pero imaginemosno que tenemos que despachar el evento un montón de veces, es decir, desde el elemento más pequeña de la jerarquia debe llegar a un elemento muy superior deberiamos escribir muchas veces lo mismo por lo cual ensucia mucho el código.

Svelte te proporciona una herramienta donde ya sabe que la señal será despachada al elemento más cercano y tan solo con poner **on:eventoPropio** será mandado hacia arriba, no es necesario crear la función y despacharlo manualmente. Lo hace por detras. Es decir, **solo una vez debemos definir la función para que se despache**

Componente Botón

```html
<script>
    import { createEventDispatcher } from "svelte";

    let disptach = createEventDispatcher();

    function pulsar(){
        disptach("pulsado")
    }

</script>

<button type="button" on:click={pulsar}>Púlsame</button>
```

Componente Botonera, aquí solo ponemos on:pulsado

```html
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
```

Y en el componente App se manejará el evento

```html
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
```

Y seguirá funcionando correctamente, con un poquito menos de código como Svelte promete.

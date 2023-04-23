# Cómo trabajar con CSS en Svelte

Comenzamos el módulo de CSS hablando de lo más simple: cómo haríamos para incorporar estilos a una aplicación de Svelte. El resultado probablemente no te sorprenda: dentro de la etiqueta style de cada componente de Svelte se pueden insertar estilos CSS y usarlos localmente en el componente como se ha hecho toda la vida.

Las capacidades de estilo son muy similares y nos dá un potencial grande donde cada componente sabe que estilo tendrá sin ocurrir a una hoja de estilo larga.

Por lo general no se modificarán hojas de estilos globales en los cuales declararemos el comportamiento de toda la app. Quizá la tipografía, el tamaño y demas si.

Pero si queremos declarar los estilos de un componente en especifico lo declaramos directamente ahí.

Quiero que el .label (clase) tenga de color azul.

Cualquier elemento del DOM que tenga class label será afectado.

Con un simple style dentro del componente podemos modificarlo

Componente principal

```html
<script>
  import Input from "./Input.svelte";

  let nombre="John";
  let apellido="Doe";
</script>

<main>
  <fieldset>
    <Input bind:value={nombre} label="Nombre" id="nombre"/>
    <Input bind:value={apellido} label="Apellido" id="apellido"/>
  </fieldset>
  
  <p class="label">Tu eres <strong>{nombre +" "+ apellido}</strong></p>
</main>

<style>
  .label{
    color:darkblue;
    font-size: 1.3rem;
  }
</style>
```

Componente Input, a proposito le puse el mismo nombre de clase para ver como se comporta Svelte.

Svelte arregla a su manera para que las clases no colisionen.

```html
<script>
    export let label;
    export let value;
    export let id;
</script>

<div>
    <label class="label"for={id}>{label}</label>
    <input type="text" id={id} bind:value/>
</div>

<style>
    .label{
        color:red;
        font-weight: bold;
    }
</style>
```
<img src="Imagenes-markdown\img_css\01.png">

Cuando compilamos una aplicación de Svelte no solamente se genera una hoja de estilos global que agrupa todas las hojas de estilo que se encuentre por ahi. Es decir, cada vez que compilamos la app, Svelte va juntando las etiquetas style y va a ir fabricando una hoja de estilos maestra que contiene todo lo que va encontrando. No es solo concatenar, sino que hace una transformación.

Modifica localmente y luego se transforma automaticamente.

<img src="Imagenes-markdown\img_css\02.png">

# Aplicar estilos condicionales

En Svelte podremos aplicar clases si alguna condición sea verdadero o no.

Podriamos aplicar la clase como una condición de JS por ejemplo
div class={value.length > 0 ? 'valid':'invalid'}

Con valid verde y invalid rojo


<script>
    export let label;
    export let value;
    export let id;
</script>

<div class={value.length > 0 ? 'valid':'invalid'}>
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

<img src="Imagenes-markdown\img_css\03.png">

En el caso de Svelte también tenemos modificadores que se pueden aplicar talcual escribiendo el nombre de clase y la variable que tenemos que testear.

```html
<script>
    export let label;
    export let value;
    export let id;
</script>
// class:claseArbitraria={sisecumplelepongolaclaseArbitraria}
<div class:invalid={value.length==0}>
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
```
<img src="Imagenes-markdown\img_css\04.png">

Una forma aún mas simplificada es poner el nombre de la clase como una variable que se almacene la condición.

Y entonces solamente se escribiría **class:invalid**

```html
<script>
    export let label;
    export let value;
    export let id;

    let invalid = value.length==0;
    
</script>

<div class:invalid>
    <label class="label" for={id}>{label}</label>
    <input type="text" id={id} bind:value/>
</div>
```

Y no solo eso sino que también se pueden poner de forma simultanea. Obteniendo el mismo resultado que al inicio, o eso creiamos. No nos cambia nada de hecho solo admite el valido ahora que pasó?

Podriamos ponerle un evento on:keyup para solucionarlo pero existe otra forma.

**Svelte no siempre reinterpreta una variable y por ello no funcionaba bien.**

```html
<script>
    export let label;
    export let value;
    export let id;

    let invalid = value.length==0;
    let valid = value.length>0;

</script>

<div class:invalid class:valid>
    <label class="label" for={id}>{label}</label>
    <input type="text" id={id} bind:value/>
</div>
```
# Variables CSS

Como se sabe CSS se pueden poner variables en su propia escritura.

La idea del video era modificar una etiqueta con un estilo en linea que declare el valor de la variable que se encuentre seleccionada en el desplegable.

style:--bgcolor={backgrounds{color}}

y en el css

.color{
    background-color: var{--bgcolor}
}

# Definición global en Svelte

Va a afectar a toooda la aplicación es recomendable limitarlo al componente raiz por ejemplo.


:global(clase o etiqueta o id){
    font-family. . . . .
}

# Importar hojas de estilo

Si queremos importar una hoja de estilo simplemente dentro de la etiqueta script.

# BLOQUE DOLAR IMPORTANTE

Te acordas que no al poner class:valid class:invalid no era reactivo?

Pues con el bloque dolar podemos forzar la reactividad, si, lo forzamos, es decir, que se ejecutará nuevamente el bloque que se encuentre en el dolar si así lo quisieramos.

El operador $ (dolar o peso) sirve para declarar secciones que tienen que re-evaluarse cuando un componente se actualice y se repinte. Esto es necesario cuando tenemos propiedades en un componente que no se actualizan directamente, pero que son derivadas de otras propiedades que sí se van a actualizar.

**El compilador mirará que variables son las dependencias del bloque, en este caso value.**

En el caso del video era sumar el nombre + apellido guardado en una variable y entonces el bloque dolar tenia esas dos dependencias.

```html
<script>
    export let label;
    export let value;
    export let id;
    let invalid = value.length==0;
    let valid = value.length>0;
    // el bloque dolar se volverá a actualizar cada vez que se modifique value
    // Se puede poner tantos bloques dolar como se necesiten
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
```
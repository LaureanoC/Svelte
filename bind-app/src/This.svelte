<script>
    let input;
  
    function focus(){
      input.focus();
    }
  
  </script>
  
  <input type="text" placeholder="Pon aquí algo" bind:this={input}/>
  <button type="button" on:click={focus}>Hacer focus a input</button>
  
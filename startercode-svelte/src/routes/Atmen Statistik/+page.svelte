<script lang="ts">
  import { goto } from '$app/navigation';
  function back(){ goto('/startseite'); }
</script>

<main class="page">
  <h1>Atmen Statistik</h1>
  <p>Placeholder page for Atmen Statistik.</p>
  <button on:click={back} class="back">Back</button>
</main>

<style>
  :global(body){ margin:0; font-family: Inter, system-ui, sans-serif }
  .page{ min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(180deg,#e9c996 0%, #7a2b26 100%); color:#5b2020 }
  h1{ font-size:2rem; margin:0 0 1rem }
  .back{ margin-top:1.25rem; padding:10px 16px; border-radius:10px }
</style>

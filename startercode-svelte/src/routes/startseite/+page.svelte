<script lang="ts">
  import { goto } from '$app/navigation';
  const name = 'Jonathan';

  const buttons = [
    { label: 'Atmung Praxis', path: '/Atmung%20Praxis' },
    { label: 'Atmung Anleitung', path: '/Atmung%20Anleitung' },
    { label: 'Atmen Statistik', path: '/Atmen%20Statistik' },
    { label: 'Schlaf', path: '/Schlaf' },
    { label: 'Single Player', path: '/single-player' },
    { label: 'Multi Player', path: '/multi-player' }
  ];

  function go(p: string) {
    goto(p);
  }
</script>

<main class="page">
  <header class="header">
    <div class="profile" title="Profile"></div>
  </header>

  <section class="greeting">Guten Morgen {name}</section>

  <section class="grid">
    {#each buttons as b}
      <button class="hex" on:click={() => go(b.path)}>
        <span class="label">{b.label}</span>
      </button>
    {/each}
  </section>

</main>

<style>
  :global(body){ margin:0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; }
  
  .page{ 
    min-height:100vh; 
    width:100%;
    background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%); 
    display:flex; 
    flex-direction:column; 
    align-items:center;
    padding: 2.5rem 1rem;
    margin: 0;
  }

  .header{ 
    display:flex; 
    justify-content:flex-end; 
    width:100%;
    padding: 1.5rem 2rem;
    max-width: 1200px;
    align-self: center;
  }

  .profile{ 
    width: 64px; 
    height: 64px; 
    border-radius: 50%; 
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(15px);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    margin-right: 1.5rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .profile:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.08);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .greeting{ 
    text-align:center; 
    font-size: 2.8rem; 
    color: rgba(255, 255, 255, 0.98); 
    font-weight: 800;
    margin-top: 1.5rem;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.5px;
  }

  .grid{ 
    width:100%; 
    max-width: 680px; 
    margin-top: 3.5rem; 
    display:grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 2rem;
    align-items:center;
    padding: 0 1rem;
  }

  .hex{ 
    width:100%; 
    height: 110px; 
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
    border-radius: 18px; 
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    cursor:pointer; 
    position:relative; 
    overflow:hidden; 
    padding: 0; 
    display:flex; 
    align-items:center; 
    justify-content:center;
    box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.08), 0 8px 28px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(15px);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 48px;
  }

  .hex:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.1));
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-6px);
    box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.12), 0 16px 40px rgba(0, 0, 0, 0.2);
  }

  .hex:active { 
    transform: translateY(-2px);
    box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.1), 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .hex:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  .hex::after{ 
    content:''; 
    position:absolute; 
    inset:0; 
    border-radius: 18px; 
    pointer-events:none; 
    box-shadow: inset 0 -3px 8px rgba(0, 0, 0, 0.1); 
  }

  .hex .label{ 
    color: rgba(255, 255, 255, 0.95); 
    font-weight: 700; 
    font-size: 1.05rem; 
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding: 1rem;
    position: relative;
    z-index: 1;
  }

  @media(max-width: 768px){ 
    .grid{ 
      grid-template-columns: 1fr;
      max-width: 100%;
      gap: 1.5rem;
      padding: 0 1rem;
    } 
    .hex{ 
      height: 90px;
    }
    .greeting {
      font-size: 2rem;
    }
  }

  @media(max-width: 480px) {
    .header {
      padding: 1rem;
    }
    .profile {
      width: 56px;
      height: 56px;
      font-size: 1.5rem;
    }
    .greeting {
      font-size: 1.6rem;
      margin-top: 1rem;
    }
    .grid {
      gap: 1.25rem;
    }
  }
</style>

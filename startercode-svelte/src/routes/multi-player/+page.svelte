<script lang="ts">
  import { goto } from '$app/navigation';
  function back(){ goto('/startseite'); }
</script>

<main class="page">
  <div class="content-box">
    <h1>Multi Player</h1>
    <p>Placeholder page for Multi Player mode.</p>
    <button on:click={back} class="back">Back</button>
  </div>
</main>

<style>
  :global(body){ margin:0; font-family: 'Segoe UI', sans-serif; }
  .page{ 
    min-height:100vh; 
    width:100%;
    display:flex; 
    flex-direction:column; 
    align-items:center; 
    justify-content:center; 
    background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%); 
    color: rgba(255,255,255,0.95);
    padding: 2rem 1rem;
    margin: 0;
  }

  .content-box {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(25px);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    padding: 3.5rem 2.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    max-width: 500px;
    width: 100%;
    text-align: center;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .content-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  }

  h1{ 
    font-size: 2.5rem; 
    margin: 0 0 1rem;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  p {
    font-size: 1.1rem;
    margin: 0 0 2rem;
    color: rgba(255,255,255,0.85);
  }

  .back{ 
    margin-top: 2rem; 
    padding: 14px 28px; 
    border-radius: 12px;
    background: rgba(100, 200, 255, 0.18);
    border: 1.5px solid rgba(100, 200, 255, 0.5);
    color: rgba(255,255,255,0.95);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1rem;
    backdrop-filter: blur(15px);
    min-height: 48px;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.5px;
  }

  .back::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.1);
    transition: left 0.3s ease;
    z-index: 0;
  }

  .back:hover::before {
    left: 100%;
  }

  .back:hover {
    background: rgba(100, 200, 255, 0.28);
    border-color: rgba(100, 200, 255, 0.7);
    transform: translateY(-2px);
    box-shadow: inset 0 2px 8px rgba(255,255,255,0.1), 0 8px 20px rgba(0,0,0,0.2);
  }

  .back:active {
    transform: translateY(0);
  }

  .back:focus {
    outline: 2px solid rgba(255,255,255,0.5);
    outline-offset: 2px;
  }

  @media(max-width: 640px) {
    .content-box {
      padding: 2rem 1.5rem;
    }
    h1 {
      font-size: 1.8rem;
    }
  }
</style>

<script lang="ts">
  import { goto } from '$app/navigation';
  function goLogin() {
    goto('/login');
  }
  function goRegister() {
    // placeholder: keep on same page or implement registration route later
    alert('Register clicked');
  }
</script>

<main class="page">
  <div class="icon-top">🎮</div>
  <div class="card">
    <h2 class="welcome-sub">Welcome to</h2>
    <h1 class="title">RelaxGame</h1>

    <div class="actions">
      <button class="btn light" on:click={goLogin}>Login</button>
      <button class="btn" on:click={goRegister}>Register</button>
    </div>
  </div>
</main>

<style>
  :global(body) { margin:0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; }
  
  .page{
    min-height:100vh;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%);
    padding:2rem 1rem;
    margin:0;
    flex-direction: column;
    position: relative;
  }

  .icon-top {
    position: absolute;
    top: 3rem;
    right: 2rem;
    font-size: 3.5rem;
    opacity: 0.4;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  .card{ 
    text-align:center; 
    max-width:420px; 
    width:100%;
    background: transparent;
    padding: 4rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .welcome-sub{ 
    color: rgba(255, 255, 255, 0.8); 
    font-weight: 400; 
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .title{ 
    color: rgba(60, 30, 20, 0.9); 
    font-size: 4.5rem; 
    margin: 0 0 3rem 0; 
    letter-spacing: 1px;
    font-weight: 900;
    line-height: 1.1;
  }

  .actions{ 
    display: flex; 
    flex-direction: column; 
    gap: 2rem; 
    align-items: stretch;
    margin-top: 2rem;
    width: 100%;
  }

  .btn{ 
    width: 100%;
    padding: 18px 32px; 
    border-radius: 50px; 
    border: 2px solid rgba(255, 255, 255, 0.4); 
    font-size: 1.1rem; 
    cursor: pointer; 
    background: rgba(255, 255, 255, 0.1); 
    color: rgba(60, 30, 20, 0.85); 
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 700;
    letter-spacing: 0.5px;
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.15);
    transition: left 0.3s ease;
    z-index: 0;
  }

  .btn:hover::before {
    left: 100%;
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  }

  .btn:active {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .btn:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  .btn.light{ 
    background: rgba(255, 255, 255, 0.25); 
    border-color: rgba(255, 255, 255, 0.5);
    color: rgba(60, 30, 20, 0.95);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .btn.light:hover {
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 255, 255, 0.7);
  }

  @media(max-width: 768px) {
    .icon-top {
      font-size: 2.8rem;
      top: 2rem;
      right: 1.5rem;
    }
  }

  @media(max-width: 640px) {
    .card {
      padding: 3rem 1.75rem;
    }
    .title {
      font-size: 3rem;
      margin-bottom: 2.5rem;
    }
    .btn {
      padding: 16px 24px;
      min-height: 48px;
      font-size: 1rem;
    }
    .actions {
      gap: 1.5rem;
    }
    .icon-top {
      font-size: 2.2rem;
      top: 1.5rem;
      right: 1rem;
    }
  }
</style>

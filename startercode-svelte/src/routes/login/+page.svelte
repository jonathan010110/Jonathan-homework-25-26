<script lang="ts">
  import { goto } from '$app/navigation';
  let email = '';
  let password = '';

  function submit(e: Event) {
    e.preventDefault();
    // very small validation
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    // Navigate to startseite (image 3)
    goto('/startseite');
  }
</script>

<main class="page">
  <div class="top">Login</div>
  <form class="form" on:submit={submit}>
    <input placeholder="email..." type="email" bind:value={email} class="input" />
    <input placeholder="Passwort..." type="password" bind:value={password} class="input" />
    <button class="submit">Log in</button>
  </form>
</main>

<style>
  :global(body){ margin:0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; }
  
  .page{ 
    min-height:100vh; 
    width:100%;
    display:flex; 
    flex-direction:column; 
    align-items:center; 
    justify-content:center;
    background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%); 
    color: #fff;
    padding: 2rem 1rem;
    margin: 0;
  }

  .top{ 
    margin-bottom: 2.5rem; 
    font-size: 3.2rem; 
    font-weight: 800; 
    color: rgba(255, 255, 255, 0.98);
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
  }

  .form{ 
    width: 100%; 
    max-width: 400px; 
    display: flex; 
    flex-direction: column; 
    gap: 1.75rem; 
    align-items: stretch;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(25px);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    padding: 3rem 2.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .input{ 
    width: 100%;
    padding: 16px 18px; 
    border-radius: 14px; 
    border: 1.5px solid rgba(255, 255, 255, 0.3); 
    outline: none; 
    background: rgba(255, 255, 255, 0.12); 
    color: rgba(255, 255, 255, 0.95); 
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(15px);
    font-size: 1rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
  }

  .input:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(255, 255, 255, 0.25);
    outline: none;
  }

  .input:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.15);
  }

  .input::placeholder { 
    color: rgba(255, 255, 255, 0.65);
  }

  .submit{ 
    width: 100%;
    padding: 16px 24px; 
    border-radius: 14px; 
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    cursor: pointer; 
    background: rgba(255, 255, 255, 0.15); 
    color: rgba(255, 255, 255, 0.98); 
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.1), 0 10px 30px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(15px);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 48px;
    position: relative;
    overflow: hidden;
  }

  .submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: left 0.3s ease;
    z-index: 0;
  }

  .submit:hover::before {
    left: 100%;
  }

  .submit:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.15), 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .submit:active {
    transform: translateY(0);
    box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.1), 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .submit:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  @media(max-width: 640px) {
    .top {
      font-size: 2.2rem;
    }
    .form {
      padding: 2rem 1.75rem;
      max-width: 100%;
      gap: 1.5rem;
    }
  }
</style>

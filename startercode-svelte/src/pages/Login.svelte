<script>
  import Button from "../components/Button.svelte";
  import { user } from "../stores/user";

  let { onSuccess = () => {} } = $props();
  let email = $state("");
  let password = $state("");

  const submit = () => {
    user.login(email.trim());
    onSuccess();
  };
</script>

<div class="screen-shell screen-enter flex flex-col items-center justify-center px-9" style="background: linear-gradient(178deg, rgba(22,7,11,0.95) 0%, rgba(92,30,38,0.9) 62%, rgba(108,39,36,0.88) 100%);">
  <h2 class="mb-12 text-[38px] font-semibold text-[rgba(158,90,79,0.95)]">Login</h2>

  <form class="flex w-full max-w-[226px] flex-col gap-4" onsubmit={(event) => event.preventDefault()}>
    <input
      type="email"
      bind:value={email}
      placeholder="email..."
      class="glass-button px-5 py-2 text-[10px] placeholder:text-amber-100/35 focus:outline-none"
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Passwort..."
      class="glass-button px-5 py-2 text-[10px] placeholder:text-amber-100/35 focus:outline-none"
    />
    <Button fullWidth onClick={submit}>Login</Button>
  </form>
</div>

<script>
  import { fade } from "svelte/transition";
  import Welcome from "./pages/Welcome.svelte";
  import Login from "./pages/Login.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import BreathingPractice from "./pages/BreathingPractice.svelte";
  import BreathingGuide from "./pages/BreathingGuide.svelte";
  import BreathingSession from "./pages/BreathingSession.svelte";
  import Statistics from "./pages/Statistics.svelte";
  import Sleep from "./pages/Sleep.svelte";

  let current = $state("welcome");

  /** @param {string} screen */
  const go = (screen) => {
    if (screen === "statistics") {
      current = "statistics";
      return;
    }

    current = screen;
  };
</script>

<main class="grid min-h-screen place-items-center px-2 py-3 sm:px-6 sm:py-5">
  <section class="phone-frame">
    {#if current === "welcome"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <Welcome onNavigate={go} />
      </div>
    {:else if current === "login"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <Login onSuccess={() => go("dashboard")} />
      </div>
    {:else if current === "dashboard"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <Dashboard onNavigate={go} />
      </div>
    {:else if current === "practice"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <BreathingPractice onNavigate={go} />
      </div>
    {:else if current === "guide"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <BreathingGuide onNavigate={go} />
      </div>
    {:else if current === "session"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <BreathingSession onNavigate={go} />
      </div>
    {:else if current === "statistics"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <Statistics onNavigate={go} />
      </div>
    {:else if current === "sleep"}
      <div in:fade={{ duration: 220 }} out:fade={{ duration: 180 }} class="h-full">
        <Sleep onNavigate={go} />
      </div>
    {/if}
  </section>
</main>

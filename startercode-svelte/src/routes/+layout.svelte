<script module lang="ts">
	export const ssr = false;
</script>

<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main>
{@render children()}
</main>

<script module lang="ts">
	// Module script runs once for the route module (not once per component instance).
	// This disables server-side rendering and makes the app client-side only.
	export const ssr = false;
</script>

<script lang="ts">
	// $props() gives access to component props in Svelte 5.
	// In a layout, "children" is the content of the active page route.
	let { children } = $props();
</script>

<!--
	This layout is shared by all routes.
	The navigation bar appears on every page.
-->
<nav class="main-nav">
	<a href="/hello">hello</a>
	<a href="/login">login</a>
	<a href="/startseite">Counter</a>
	<a href="/atmung_praxis">Atmung Praxis</a>
</nav>

<!-- Render the page content of the current route -->
<main class="content">
	<!-- {@render ...} renders the passed snippet (the current child route). -->
{@render children()}
</main>

<style>
	/* ===== FOUNDATIONAL DESIGN SYSTEM ===== */
	/* Following UX/UI Laws: Consistency, Visual Hierarchy, Accessibility */
	
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
		background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%);
		color: #3a2416;
		min-height: 100vh;
		width: 100%;
		overflow-x: hidden;
		font-size: 16px;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
	}

	:global(html) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}

	/* ===== NAVIGATION BAR - Following Fitts's Law & Gestalt Principles ===== */
	/* Increased target size, clear visual hierarchy */
	.main-nav {
		display: flex;
		gap: 1rem;
		padding: 1.5rem 2rem;
		background: rgba(255, 255, 255, 0.12);
		backdrop-filter: blur(15px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.25);
		position: sticky;
		top: 0;
		z-index: 100;
		flex-wrap: wrap;
		align-items: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	/* Navigation items - Following Hick's Law (clear, distinct options) */
	.main-nav a {
		color: rgba(255, 255, 255, 0.95);
		text-decoration: none;
		padding: 0.8rem 1.5rem;
		border: 1.5px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10px);
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		font-weight: 600;
		font-size: 0.95rem;
		letter-spacing: 0.3px;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		white-space: nowrap;
	}

	/* Hover state - Visual feedback (Von Restorff Effect) */
	.main-nav a:hover {
		background-color: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.6);
		transform: translateY(-3px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
	}

	/* Active/Focus state - Accessibility */
	.main-nav a:focus {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}

	.main-nav a:active {
		transform: translateY(-1px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}

	/* Content area - Full height without gaps (Miller's Law) */
	.content {
		width: 100%;
		min-height: calc(100vh - 76px);
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
	}

	/* ===== RESPONSIVE DESIGN - Mobile First Approach ===== */
	@media (max-width: 768px) {
		.main-nav {
			gap: 0.75rem;
			padding: 1.25rem 1rem;
			justify-content: space-between;
		}

		.main-nav a {
			padding: 0.7rem 1rem;
			font-size: 0.9rem;
			flex: 1;
			min-width: 0;
		}
	}

	@media (max-width: 480px) {
		.main-nav {
			gap: 0.5rem;
			padding: 1rem;
		}

		.main-nav a {
			padding: 0.65rem 0.8rem;
			font-size: 0.8rem;
			min-height: 40px;
		}
	}
</style>

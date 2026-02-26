<main class="page">
	<div class="content-box">
		<h1>Welcome to RelaxGame</h1>
		<p>
			This starter project contains several interactive features to help you relax and unwind. Explore the different sections to discover breathing exercises, sleep guidance, and more.
		</p>
		<ul class="features">
			<li>🧘 Breathing Exercises</li>
			<li>😴 Sleep Guidance</li>
			<li>⏱️ Relaxation Timer</li>
			<li>👥 Multiplayer Activities</li>
		</ul>
	</div>
</main>

<style>
	:global(body) { 
		margin: 0; 
		font-family: 'Segoe UI', sans-serif;
	}

	.page {
		min-height: 100vh;
		width: 100%;
		background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%);
		display: flex;
		align-items: center;
		justify-content: center;
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
		max-width: 600px;
		width: 100%;
		text-align: center;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.content-box:hover {
		transform: translateY(-4px);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
	}

	h1 {
		margin-bottom: 1.5rem;
		color: rgba(255, 255, 255, 0.98);
		font-size: 2.8rem;
		text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		font-weight: 800;
		letter-spacing: 1px;
	}

	p {
		margin-top: 0;
		margin-bottom: 2rem;
		color: rgba(255, 255, 255, 0.85);
		font-size: 1.1rem;
		line-height: 1.7;
	}

	.features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.features li {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.05rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 12px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.features li:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateX(8px);
		box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	@media(max-width: 640px) {
		.content-box {
			padding: 2.5rem 1.75rem;
		}
		h1 {
			font-size: 2rem;
		}
		p {
			font-size: 1rem;
		}
		.features li {
			padding: 0.85rem;
			font-size: 1rem;
		}
	}
</style>

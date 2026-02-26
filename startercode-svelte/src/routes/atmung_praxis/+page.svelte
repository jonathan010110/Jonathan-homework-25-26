<script lang="ts">
	/*
		One todo item has:
		- text: what to do
		- done: if it is completed
	*/
	// This is a TypeScript type alias. It describes the shape of one todo object.
	type TodoItem = {
		id: number;
		text: string;
		done: boolean;
	};

	// Text that the user types into the input field.
	// $state makes this value reactive.
	let newTodoText = $state('');

	// Starter items so students see data on first load.
	// todos is a reactive array of TodoItem objects.
	let todos = $state<TodoItem[]>([
		{ id: 1, text: 'Read Svelte basics', done: false },
		{ id: 2, text: 'Build a first component', done: true }
	]);

	// A simple counter used to create unique ids.
	let nextId = 3;

	/*
		Add a new todo when the button is clicked.
		We trim text so "only spaces" is ignored.
	*/
	function addTodo() {
		const cleanedText = newTodoText.trim();

		if (cleanedText.length === 0) {
			return;
		}

		const newItem: TodoItem = {
			id: nextId,
			text: cleanedText,
			done: false
		};

		// Create a new array with ... so Svelte clearly sees an update.
		todos = [...todos, newItem];
		nextId += 1;
		newTodoText = '';
	}

	// Toggle the done state for one item.
	function toggleDone(id: number) {
		for (const todo of todos) {
			if (todo.id === id) {
				// Flip true -> false or false -> true.
				todo.done = !todo.done;
				break;
			}
		}
	}
</script>

<h1>Simple Todo List</h1>

<p>Add a task and mark it as done when finished.</p>

<!-- Input row uses Flexbox so items are in one line -->
<div class="input-row">
	<!-- Two-way binding: input text <-> newTodoText -->
	<input
		type="text"
		placeholder="Enter a todo"
		bind:value={newTodoText}
	/>
	<!-- Simple event handler -->
	<button type="button" onclick={addTodo}>Add</button>
</div>

<ul class="todo-list">
	<!--
		{#each ...} loops over all todos.
		(todo.id) is the key so Svelte can track each list item.
	-->
	{#each todos as todo (todo.id)}
		<li class="todo-item">
			<label>
				<!-- Toggle one item when checkbox value changes -->
				<input
					type="checkbox"
					checked={todo.done}
					onchange={() => toggleDone(todo.id)}
				/>
				<!-- class:done adds class "done" only when todo.done is true -->
				<span class:done={todo.done}>{todo.text}</span>
			</label>
		</li>
	{/each}
</ul>

<style>
	:global(body) { margin: 0; font-family: 'Segoe UI', sans-serif; }

	:global(main) {
		min-height: 100vh;
		width: 100%;
		background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%);
		padding: 2rem 1rem;
		margin: 0;
	}

	h1 {
		margin-bottom: 0.5rem;
		color: rgba(255,255,255,0.95);
		text-align: center;
		font-size: 2rem;
		text-shadow: 0 2px 10px rgba(0,0,0,0.2);
	}

	p {
		margin-top: 0;
		color: rgba(255,255,255,0.85);
		text-align: center;
		font-size: 1.1rem;
	}

	/* Input row - Following Fitts's Law */
	.input-row {
		display: flex;
		gap: 0.75rem;
		margin: 2.5rem auto;
		max-width: 600px;
		padding: 0 1rem;
	}

	.input-row input {
		flex: 1;
		padding: 14px 16px;
		border: 1.5px solid rgba(255,255,255,0.3);
		border-radius: 12px;
		background: rgba(255,255,255,0.12);
		backdrop-filter: blur(15px);
		color: rgba(255,255,255,0.95);
		font-size: 1rem;
		outline: none;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		font-weight: 500;
		min-height: 44px;
	}

	.input-row input:focus {
		background: rgba(255,255,255,0.2);
		border-color: rgba(255,255,255,0.5);
		box-shadow: inset 0 2px 8px rgba(0,0,0,0.1), 0 8px 20px rgba(255,255,255,0.25);
	}

	.input-row input:hover:not(:focus) {
		border-color: rgba(255,255,255,0.4);
		background: rgba(255,255,255,0.15);
	}

	.input-row input::placeholder {
		color: rgba(255,255,255,0.65);
	}

	button {
		padding: 12px 24px;
		border: 1.5px solid rgba(100, 200, 255, 0.5);
		border-radius: 12px;
		background: rgba(100, 200, 255, 0.18);
		color: rgba(255,255,255,0.95);
		cursor: pointer;
		font-weight: 700;
		backdrop-filter: blur(15px);
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		min-height: 44px;
		position: relative;
		overflow: hidden;
		letter-spacing: 0.5px;
	}

	button::before {
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

	button:hover::before {
		left: 100%;
	}

	button:hover {
		background: rgba(100, 200, 255, 0.28);
		border-color: rgba(100, 200, 255, 0.7);
		transform: translateY(-2px);
		box-shadow: inset 0 2px 8px rgba(255,255,255,0.1), 0 8px 20px rgba(0,0,0,0.2);
	}

	button:active {
		transform: translateY(0);
	}

	button:focus {
		outline: 2px solid rgba(255,255,255,0.5);
		outline-offset: 2px;
	}

	.todo-list {
		list-style: none;
		padding: 0;
		margin: 2.5rem auto;
		max-width: 600px;
		background: rgba(255, 255, 255, 0.12);
		backdrop-filter: blur(25px);
		border: 1.5px solid rgba(255, 255, 255, 0.25);
		border-radius: 18px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
		overflow: hidden;
	}

	.todo-item {
		padding: 1.25rem;
		border-bottom: 1px solid rgba(255,255,255,0.12);
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.todo-item:last-child {
		border-bottom: none;
	}

	.todo-item:hover {
		background: rgba(255,255,255,0.08);
	}

	.todo-item label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		position: relative;
	}

	.todo-item input[type="checkbox"] {
		width: 20px;
		height: 20px;
		cursor: pointer;
		accent-color: rgba(100, 200, 255, 0.8);
		transition: all 0.2s ease;
	}

	.todo-item input[type="checkbox"]:hover {
		transform: scale(1.1);
	}

	/* Visual feedback for finished tasks */
	.done {
		text-decoration: line-through;
		color: rgba(255,255,255,0.5);
	}

	.todo-item span {
		color: rgba(255,255,255,0.9);
		font-size: 1rem;
		line-height: 1.5;
		transition: all 0.2s ease;
	}

	@media(max-width: 640px) {
		h1 {
			font-size: 1.5rem;
		}
		.input-row {
			flex-direction: column;
		}
	}
</style>

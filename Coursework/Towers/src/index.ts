import './style.css';

const DISK_COUNT = 4;

let towers: number[][] = [];
let selectedTower: number | null = null;

function byId<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Missing element: ${id}`);
    }

    return element as T;
}

function createInitialTowers(): number[][] {
    const firstTower: number[] = [];

    for (let size = DISK_COUNT; size >= 1; size -= 1) {
        firstTower.push(size);
    }

    return [firstTower, [], []];
}

function createDiv(className: string, id?: string): HTMLDivElement {
    const element = document.createElement('div');
    element.className = className;

    if (id) {
        element.id = id;
    }

    return element;
}

function createTowerColumn(index: number): HTMLDivElement {
    const towerColumn = createDiv('tower-column');
    const tower = createDiv('tower', `tower-${index}`);
    const diskStack = createDiv('disk-stack', `disk-stack-${index}`);
    const rod = createDiv('rod');

    tower.appendChild(diskStack);
    tower.appendChild(rod);
    towerColumn.appendChild(tower);

    return towerColumn;
}

function createTowerButton(index: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = `tower-button-${index}`;
    button.className = 'rect-btn tower-btn';
    button.type = 'button';
    button.dataset.tower = String(index);
    button.textContent = String(index + 1);

    return button;
}

function buildDom(): void {
    const app = byId<HTMLDivElement>('app');
    const game = document.createElement('main');
    game.className = 'game';

    const topbar = document.createElement('header');
    topbar.className = 'topbar';

    const resetButton = document.createElement('button');
    resetButton.id = 'reset-button';
    resetButton.className = 'rect-btn reset-btn';
    resetButton.type = 'button';
    resetButton.textContent = 'Reset';

    topbar.appendChild(resetButton);

    const board = document.createElement('section');
    board.className = 'board';
    board.setAttribute('aria-label', 'Three towers');

    const towersContainer = createDiv('towers-container');

    for (let i = 0; i < 3; i += 1) {
        towersContainer.appendChild(createTowerColumn(i));
    }

    towersContainer.appendChild(createDiv('base-line'));

    const towerButtons = createDiv('tower-buttons');

    for (let i = 0; i < 3; i += 1) {
        towerButtons.appendChild(createTowerButton(i));
    }

    board.appendChild(towersContainer); 
    board.appendChild(towerButtons);

    game.appendChild(topbar);
        game.appendChild(board);

    app.replaceChildren(game);
}

function renderTowers(): void {
    for (let towerIndex = 0; towerIndex < 3; towerIndex += 1) {
        const stackEl = byId<HTMLDivElement>(`disk-stack-${towerIndex}`);
        stackEl.replaceChildren();

        const stack = towers[towerIndex] ?? [];

        // Render in reverse so the largest disk is visually at the bottom.
        for (let i = stack.length - 1; i >= 0; i -= 1) {
            const size = stack[i];
            const disk = document.createElement('div');

            disk.className = `disk disk-size-${size}`;
            stackEl.appendChild(disk);
        }

        const towerEl = byId<HTMLDivElement>(`tower-${towerIndex}`);
        towerEl.classList.toggle('selected', selectedTower === towerIndex);
    }
}

function canMove(from: number, to: number): boolean {
    const fromTower = towers[from];
    const toTower = towers[to];

    if (!fromTower || !toTower) {
        return false;
    }

    const movingDisk = fromTower[fromTower.length - 1];
    const targetDisk = toTower[toTower.length - 1];

    if (movingDisk === undefined) {
        return false;
    }

    if (targetDisk === undefined) {
        return true;
    }

    return movingDisk < targetDisk;
}

function moveDisk(from: number, to: number): void {
    const fromTower = towers[from];
    const toTower = towers[to];

    if (!fromTower || !toTower) {
        return;
    }

    if (!canMove(from, to)) {
        selectedTower = null;
        renderTowers();
        return;
    }

    const disk = fromTower.pop();

    if (disk === undefined) {
        return;
    }

    toTower.push(disk);
    selectedTower = null;

    renderTowers();
}

function handleTowerSelect(towerIndex: number): void {
    if (selectedTower === null) {
        selectedTower = towerIndex;
        renderTowers();
        return;
    }

    if (selectedTower === towerIndex) {
        selectedTower = null;
        renderTowers();
        return;
    }

    moveDisk(selectedTower, towerIndex);
}

function handleTowerButtonClick(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement | null;

    if (!button) {
        return;
    }

    const value = button.dataset.tower;

    if (value === undefined) {
        return;
    }

    handleTowerSelect(Number(value));
}

function resetGame(): void {
    towers = createInitialTowers();
    selectedTower = null;
    renderTowers();
}

function bindEvents(): void {
    const resetButton = byId<HTMLButtonElement>('reset-button');

    for (let i = 0; i < 3; i += 1) {
        const button = byId<HTMLButtonElement>(`tower-button-${i}`);
        button.addEventListener('click', handleTowerButtonClick);
    }

    resetButton.addEventListener('click', resetGame);
}

function init(): void {
    buildDom();
    towers = createInitialTowers();
    renderTowers();
    bindEvents();
}

init();

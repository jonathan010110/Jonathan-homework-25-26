import './style.css';

const DISK_COUNT = 4;
const INITIAL_STACKS: number[][] = [[4, 3, 2, 1], [], []];
const TOWER_INDICES = [0, 1, 2] as const;

let stacks: number[][] = INITIAL_STACKS.map((tower) => [...tower]);
let selectedTower: number | null = null;
let moveCount = 0;
let clearMessageTimeout: number | null = null;

function getById<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Element not found: ${id}`);
    }

    return element as T;
}

function getTower(index: number): number[] {
    const tower = stacks[index];

    if (!tower) {
        throw new Error(`Tower index out of bounds: ${index}`);
    }

    return tower;
}

const messageEl = getById<HTMLParagraphElement>('message');
const moveCounterEl = getById<HTMLDivElement>('move-counter');
const resetButton = getById<HTMLButtonElement>('reset');
const towerButtons = TOWER_INDICES.map((index) => getById<HTMLButtonElement>(`tower-btn-${index}`));
const towerElements = TOWER_INDICES.map((index) => getById<HTMLDivElement>(`tower-${index}`));
const stackElements = TOWER_INDICES.map((index) => getById<HTMLDivElement>(`disk-stack-${index}`));

function showMessage(text: string, cssClass = '', autoClear = true): void {
    messageEl.textContent = text;
    messageEl.className = `message ${cssClass}`.trim();

    if (clearMessageTimeout !== null) {
        window.clearTimeout(clearMessageTimeout);
    }

    if (autoClear) {
        clearMessageTimeout = window.setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 1400);
    }
}

function canMove(from: number, to: number): boolean {
    const fromStack = getTower(from);
    const toStack = getTower(to);

    if (fromStack.length === 0) {
        return false;
    }

    const movingDisk = fromStack[fromStack.length - 1]!;
    const targetDisk = toStack[toStack.length - 1];

    return targetDisk === undefined || movingDisk < targetDisk;
}

function renderStacks(highlightTower: number | null = null): void {
    for (const towerIndex of TOWER_INDICES) {
        const towerStack = getTower(towerIndex);
        const stackEl = stackElements[towerIndex]!;
        const towerEl = towerElements[towerIndex]!;

        stackEl.innerHTML = '';
        towerEl.classList.toggle('selected', selectedTower === towerIndex);

        // Render disks in reverse order (largest bottom, smallest top)
        for (let i = towerStack.length - 1; i >= 0; i -= 1) {
            const diskSize = towerStack[i];
            
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.setAttribute('data-size', String(diskSize));

            if (highlightTower === towerIndex && i === towerStack.length - 1) {
                disk.classList.add('moved-disk');
            }

            stackEl.appendChild(disk);
        }
    }

    moveCounterEl.textContent = `Plays`;
}

function checkWin(): void {
    if (getTower(2).length === DISK_COUNT) {
        showMessage(`You have won with a total of ${moveCount}`, 'win-message', false);
        towerButtons.forEach((button) => {
            button.disabled = true;
        });
    }
}

function moveDisk(from: number, to: number): void {
    if (!canMove(from, to)) {
        showMessage('This move is not allowed', 'error-message');
        selectedTower = null;
        renderStacks();
        return;
    }

    const fromStack = getTower(from);
    const toStack = getTower(to);
    const disk = fromStack.pop();

    if (disk === undefined) {
        return;
    }

    toStack.push(disk);
    moveCount += 1;
    selectedTower = null;

    renderStacks(to);
    checkWin();
}

function handleTowerSelection(towerIndex: number): void {
    if (selectedTower === null) {
        selectedTower = towerIndex;
        renderStacks();
        return;
    }

    if (selectedTower === towerIndex) {
        selectedTower = null;
        renderStacks();
        return;
    }

    moveDisk(selectedTower, towerIndex);
}

function resetGame(): void {
    stacks = INITIAL_STACKS.map((tower) => [...tower]);
    selectedTower = null;
    moveCount = 0;
    showMessage('', '', false);

    towerButtons.forEach((button) => {
        button.disabled = false;
    });

    renderStacks();
}

towerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.dataset.select;

        if (value === undefined) {
            return;
        }

        handleTowerSelection(Number(value));
    });
});

resetButton.addEventListener('click', resetGame);

renderStacks();
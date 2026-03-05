import './style.css';

const DISK_COUNT = 4;
const INITIAL_STACKS: number[][] = [[4, 3, 2, 1], [], []];

let stacks: number[][] = INITIAL_STACKS.map((tower) => [...tower]);
let selectedTower: number | null = null;
let moveCount = 0;
let clearMessageTimeout: number | null = null;

function getTower(index: number): number[] {
    const tower = stacks[index];

    if (!tower) {
        throw new Error(`Tower index out of bounds: ${index}`);
    }

    return tower;
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <main class="game">
        <header class="topbar">
            <button id="reset" class="rect-btn reset-btn" type="button">Reset</button>
            <div id="move-counter" class="move-counter">Plays</div>
        </header>

        <p id="message" class="message" aria-live="polite"></p>

        <section class="board" aria-label="Tower of Hanoi board">
            <div class="towers-container">
                ${[0, 1, 2]
                    .map(
                        (index) => `
                            <div class="tower-col">
                                <div class="tower" data-tower="${index}">
                                    <div class="disk-stack" data-stack="${index}"></div>
                                    <div class="rod"></div>
                                </div>
                            </div>
                        `
                    )
                    .join('')}
                <div class="base-line"></div>
            </div>

            <div class="buttons-container">
                ${[0, 1, 2]
                    .map(
                        (index) => `
                            <button class="rect-btn tower-btn" data-select="${index}" type="button">${index + 1}</button>
                        `
                    )
                    .join('')}
            </div>
        </section>
    </main>
`;

const messageEl = document.getElementById('message') as HTMLParagraphElement;
const moveCounterEl = document.getElementById('move-counter') as HTMLDivElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const towerButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.tower-btn'));

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
    for (let towerIndex = 0; towerIndex < 3; towerIndex += 1) {
        const towerStack = getTower(towerIndex);
        const stackEl = document.querySelector<HTMLDivElement>(`.disk-stack[data-stack="${towerIndex}"]`);
        const towerEl = document.querySelector<HTMLDivElement>(`.tower[data-tower="${towerIndex}"]`);

        if (!stackEl || !towerEl) {
            continue;
        }

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
import './index.css';
import { CaboosePart, CargoPart, DiningPart, LocomotivePart, PassengerPart, Train } from './train';

const PART_OPTIONS = [
    { label: 'Add locomotive (2400 kW)', value: 'locomotive' },
    { label: 'Add passenger wagon (48 seats)', value: 'passenger' },
    { label: 'Add cargo wagon (35 t)', value: 'cargo' },
    { label: 'Add dining wagon (8 tables)', value: 'dining' },
    { label: 'Add caboose (2 crew)', value: 'caboose' }
];

const trainContainer = document.getElementById('train');
const messageContainer = document.getElementById('message');
const undoButton = document.getElementById('undoBtn') as HTMLButtonElement | null;

if (!trainContainer || !messageContainer || !undoButton) {
    throw new Error('Required DOM elements are missing.');
}

const train = new Train(trainContainer);
const safeMessageContainer: HTMLElement = messageContainer;

buildPartGrid('partGrid');
undoButton.addEventListener('click', () => {
    
});

function buildPartGrid(parentId: string): void {
    const grid = document.getElementById(parentId)!;

    for (const option of PART_OPTIONS) {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.addEventListener('click', () => {
            if (option.value === 'locomotive') {
                train.addPart(new LocomotivePart(2400));
                safeMessageContainer.textContent = '';
                return;
            }

            if (option.value === 'passenger') {
                train.addPart(new PassengerPart(48));
                safeMessageContainer.textContent = '';
                return;
            }

            if (option.value === 'cargo') {
                train.addPart(new CargoPart(35));
                safeMessageContainer.textContent = '';
                return;
            }

            if (option.value === 'dining') {
                train.addPart(new DiningPart(8));
                safeMessageContainer.textContent = '';
                return;
            }

            if (option.value === 'caboose') {
                train.addPart(new CaboosePart(2));
                safeMessageContainer.textContent = '';
                return;
            }

          
        });

        grid.appendChild(button);
    }
}
/**
 * Describes where in the train a part is allowed to be placed.
 *
 * - `MustBeFirst` — this part may only be added when the train is empty (e.g. a locomotive).
 * - `MustBeLast`  — once this part is added, nothing can be appended after it (e.g. a caboose).
 * - `None`        — no positional restriction; the part can be placed anywhere after the locomotive.
 */
export enum PartRestriction {
    MustBeFirst,
    MustBeLast,
    None,
}

/**
 * Abstract base class for every part that can be added to a train.
 *
 * Every concrete wagon class (Locomotive, PassengerWagon, CargoWagon, …) must extend
 * this class and implement (or override) the three members below.
 *
 * The `Train` class works exclusively with `TrainPart` references, so all logic
 * that the train needs must be accessible through this base class.
 */
export abstract class TrainPart {
    /**
     * Positional restriction for this part.
     *
     * The `Train` class reads this value to enforce ordering rules without
     * needing to know the concrete type of the part.
     *
     * Each subclass must declare this as a `readonly` property and initialise
     * it with the appropriate `PartRestriction` member.
     */
    abstract readonly restriction: PartRestriction;

    /**
     * The maximum cargo weight this part contributes, in tons.
     *
     * The default implementation returns `0`, which is correct for every part
     * that carries no cargo (locomotive, passenger wagon, dining wagon, caboose).
     *
     * **Override this getter in `CargoWagon`** to return the actual maximum
     * weight so that the heavy-cargo warning can be computed without
     * `instanceof` checks.
     */
    get cargoWeightTons(): number { return 0; }

    /**
     * Creates and returns the `HTMLElement` that visually represents this part.
     *
     * The returned element will be appended directly to the train preview
     * container by `Train.render()`.  Use `document.createElement` to build
     * the element, set an appropriate CSS class, and populate it with the
     * part's data (title, detail value, …).
     */
    abstract render(): HTMLElement;
}

export class LocomotivePart extends TrainPart {
    readonly restriction = PartRestriction.MustBeFirst;

    constructor(private readonly powerKw: number) {
        super();
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add('part', 'locomotive');

        const title = document.createElement('span');
        title.classList.add('part-title');
        title.textContent = 'Locomotive';

        const detail = document.createElement('span');
        detail.classList.add('part-detail');
        detail.textContent = `${this.powerKw} kW`;

        wrapper.appendChild(title);
        wrapper.appendChild(detail);

        return wrapper;
    }
}

export class PassengerPart extends TrainPart {
    readonly restriction = PartRestriction.None;

    constructor(private readonly seatCount: number) {
        super();
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add('part', 'passenger');

        const title = document.createElement('span');
        title.classList.add('part-title');
        title.textContent = 'Passenger';

        const detail = document.createElement('span');
        detail.classList.add('part-detail');
        detail.textContent = `${this.seatCount} seats`;

        wrapper.appendChild(title);
        wrapper.appendChild(detail);

        return wrapper;
    }
}

export class CargoPart extends TrainPart {
    readonly restriction = PartRestriction.None;

    constructor(private readonly maxWeightTons: number) {
        super();
    }

    get cargoWeightTons(): number {
        return this.maxWeightTons;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add('part', 'cargo');

        const title = document.createElement('span');
        title.classList.add('part-title');
        title.textContent = 'Cargo';

        const detail = document.createElement('span');
        detail.classList.add('part-detail');
        detail.textContent = `${this.maxWeightTons} t`;

        wrapper.appendChild(title);
        wrapper.appendChild(detail);

        return wrapper;
    }
}

export class DiningPart extends TrainPart {
    readonly restriction = PartRestriction.None;

    constructor(private readonly tableCount: number) {
        super();
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add('part', 'dining');

        const title = document.createElement('span');
        title.classList.add('part-title');
        title.textContent = 'Dining';

        const detail = document.createElement('span');
        detail.classList.add('part-detail');
        detail.textContent = `${this.tableCount} tables`;

        wrapper.appendChild(title);
        wrapper.appendChild(detail);

        return wrapper;
    }
}

export class CaboosePart extends TrainPart {
    readonly restriction = PartRestriction.MustBeLast;

    constructor(private readonly crewCount: number) {
        super();
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add('part', 'caboose');

        const title = document.createElement('span');
        title.classList.add('part-title');
        title.textContent = 'Caboose';

        const detail = document.createElement('span');
        detail.classList.add('part-detail');
        detail.textContent = `${this.crewCount} crew`;

        wrapper.appendChild(title);
        wrapper.appendChild(detail);

        return wrapper;
    }
}

export class Train {
    private readonly parts: TrainPart[] = [];

    constructor(private readonly trainContainer: HTMLElement) {}

    addPart(part: TrainPart): void {
        this.parts.push(part);
        this.render();
    }

    removeLast(): void {
        if (this.parts.length === 0) {
            return;
        }

        this.parts.pop();
        this.render();
    }

    private render(): void {
        this.trainContainer.innerHTML = '';

        for (const part of this.parts) {
            this.trainContainer.appendChild(part.render());
        }
    }
}

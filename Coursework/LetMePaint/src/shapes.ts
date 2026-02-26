export abstract class Shape {
  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {}
  public abstract updatePosition(start: Point, end: Point): void;
  public abstract contains(point: Point): boolean;
  public abstract set tempMode(isTemp: boolean);
}

export type Point = {
  x: number;
  y: number;
};

export class Circle extends Shape {
  private center: Point = { x: 0, y: 0 };
  private radius = 0;
  private circleElement: SVGCircleElement;

  constructor(
    svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    svgContainer.appendChild(this.circleElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    this.radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    this.center = start;

    this.circleElement.setAttribute('cx', `${start.x}`);
    this.circleElement.setAttribute('cy', `${start.y}`);
    this.circleElement.setAttribute('r', `${this.radius}`);
  }

  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.circleElement.classList.add('temp');
    } else {
      this.circleElement.classList.remove('temp');
    }
  }

    public override contains(point: Point): boolean {
    return (
      Math.pow(point.x - this.center.x, 2) + Math.pow(point.y - this.center.y, 2) <= Math.pow(this.radius, 2)
    );
  }
}
export type Size = {
  width: number;
  height: number;
};

export class Rectangle extends Shape {
  private position: Point = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };
  private rectElement: SVGRectElement;

  constructor(
    svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svgContainer.appendChild(this.rectElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    this.position = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };
    this.size = {
      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
    };

    this.rectElement.setAttribute('x', `${this.position.x}`);
    this.rectElement.setAttribute('y', `${this.position.y}`);
    this.rectElement.setAttribute('width', `${this.size.width}`);
    this.rectElement.setAttribute('height', `${this.size.height}`);
  }

  public override contains(point: Point): boolean {
    return (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.size.width &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.size.height
    );
  }



  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.rectElement.classList.add('temp');
    } else {
      this.rectElement.classList.remove('temp');
    }
  }
}

import { Circle, Rectangle, Shape, Point } from './shapes';
import { ToolType } from './tool-selection';
 
type DrawingState = {
  currentTempShape: Shape;
  start: Point;
};
 
export class ShapeManager {
  private shapes: Shape[] = [];
  private container: SVGSVGElement;
  private currentTool?: DrawingState | undefined = undefined;
  private selectedTool: ToolType = ToolType.CIRCLE;
 
  constructor(svgContainerId: string = 'drawing-canvas') {
    this.container = document.getElementById(svgContainerId) as unknown as SVGSVGElement;
    this.container?.addEventListener('mousedown', (event) => this.handleMouseDown(event));
    this.container?.addEventListener('mouseup', (event) => this.handleMouseUp(event));
    this.container?.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    this.container?.addEventListener('mouseleave', (event) => this.handleMouseLeave(event));
  }

  public setTool(tool: ToolType) {
    this.selectedTool = tool;
  }
  private handleMouseDown(event: MouseEvent): void {
    const startPoint = this.getSVGCoordinates(event);

    if (this.selectedTool === ToolType.POINTER) return;

    let shape: Shape;
    switch (this.selectedTool) {
      case ToolType.RECTANGLE:
        shape = new Rectangle(this.container, startPoint);
        break;
      case ToolType.CIRCLE:
      default:
        shape = new Circle(this.container, startPoint);
        break;
    }

    shape.tempMode = true;
    this.shapes.push(shape);
    this.currentTool = {
      currentTempShape: shape,
      start: startPoint,
    };
  }
 
  private handleMouseUp(event: MouseEvent): void {
    this.currentTool!.currentTempShape.tempMode = false;
    this.currentTool = undefined;
  }
 
  private handleMouseMove(event: MouseEvent): void {
    if (this.currentTool) {
      this.currentTool.currentTempShape.updatePosition(this.currentTool.start, this.getSVGCoordinates(event));
 
    }
  }
 
  private handleMouseLeave(event: MouseEvent): void {
    if (this.currentTool) {
      this.currentTool.currentTempShape.tempMode = false;
      delete this.currentTool;
    }
  }
 
  private getSVGCoordinates(event: MouseEvent): Point {
    // This method converts mouse event coordinates to SVG coordinates
    // (position relatSVGCoortive to the SVG's left/top, taking viewBox into account)
    // ⚠️ This method is a little bit tricky due to SVG coordinate systems.
    // Don't worry about the details for now. Just use it as a template
    // whenever you need to convert mouse event coordinates to SVG coordinates.
    // If you want to fully understand it, use your favorite AI assistant
    // to explain.
 
    // Mouse events give us screen coordinates (pixels from window edge)
    // But we need SVG coordinates (units from viewBox origin)
    const svgPoint = this.container.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
 
    // Transform: screen space → SVG user space
    const transformed = svgPoint.matrixTransform(this.container.getScreenCTM()?.inverse());
 
    return {
      x: transformed?.x || 0,
      y: transformed?.y || 0,
    };
  }
}
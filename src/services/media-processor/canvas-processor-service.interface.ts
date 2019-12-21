import {ISize} from '../../models/size.interface';

export interface ICanvasProcessorService {

  //#region Methods

  drawCanvasFromHtmlImage(htmlCanvasElement: HTMLCanvasElement,
                          imageSource: CanvasImageSource,
                          x: number, y: number,
                          height: number, width: number): void;

  calculateControlSize(size: ISize, ratio: number,
                       resizeMode: 'larger' | 'smaller'): ISize;

  calculateControlSizeFitContainer(containerSize: ISize, controlSize: ISize, basicDimension: 'width' | 'height'): ISize;

  //#endregion
}

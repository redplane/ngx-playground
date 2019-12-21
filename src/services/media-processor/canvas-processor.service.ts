import {ICanvasProcessorService} from './canvas-processor-service.interface';
import {Injectable} from '@angular/core';
import {ISize} from '../../models/size.interface';
import {cloneDeep} from 'lodash';

@Injectable()
export class CanvasProcessorService implements ICanvasProcessorService {

  //#region Methods

  public drawCanvasFromHtmlImage(htmlCanvasElement: HTMLCanvasElement,
                                 imageSource: CanvasImageSource,
                                 x: number, y: number,
                                 width: number, height: number): void {
    const context = htmlCanvasElement.getContext('2d');
    context.drawImage(imageSource, x, y, width, height);
  }

  public calculateControlSize(size: ISize, ratio: number,
                              resizeMode: 'larger' | 'smaller'): ISize {

    const controlSize: ISize = cloneDeep(size);
    const actualRatio = (ratio > 1) ? ratio : (1 / ratio);

    switch (resizeMode) {
      case 'larger':

        controlSize.width = size.width * actualRatio;
        controlSize.height = size.width * actualRatio;

        break;

      default:
        controlSize.width = size.width / actualRatio;
        controlSize.height = size.height / actualRatio;

    }

    return controlSize;
  }

  public calculateControlSizeFitContainer(containerSize: ISize,
                                          controlSize: ISize, basicDimension: 'width' | 'height'): ISize {

    const actualSize: ISize = cloneDeep(controlSize);
    const containerRatio = containerSize.width / containerSize.height;

    switch (basicDimension) {
      case 'width':
        actualSize.width = containerSize.width;
        actualSize.height = containerSize.width / containerRatio;
        break;

      default:
        actualSize.height = containerSize.height;
        actualSize.width = containerSize.width * containerRatio;
    }

    return actualSize;
  }

  //#endregion


}

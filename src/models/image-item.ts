export class ImageItem {

  //#region Properties

  public path: string;

  public dataUrl: string;

  //#endregion

  //#region Constructor

  constructor(path: string, dataUrl: string) {
    this.path = path;
    this.dataUrl = dataUrl;
  }

  //#endregion

}

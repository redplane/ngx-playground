export class SpinStatuses {

  public static get idling(): string {
    return 'IDLING';
  }

  public static get beginSpinning(): string {
    return 'BEGIN_SPINNING';
  }

  public static get spinning(): string {
    return 'SPINNING';
  }

  public static get finishedSpinning(): string {
    return 'FINISHED_SPINNING';
  }
}

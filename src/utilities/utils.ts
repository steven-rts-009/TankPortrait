export class Utils {

  public static buildStageName(stageNumber: number): string {
    return (stageNumber < 10) ? "0" + stageNumber.toString() : stageNumber.toString();
  }

}

import { GameProgress } from "../entities/game-progress";
import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;

  constructor() {
    super ({ key: "GameOverScene" });
  }

  public init(params: GameProgress): void {
    // .
  }

  public preload(): void {
    this.load.image("gameover-background", "assets/images/backgrounds/gameover-background.png");
    this.load.audio("game_over", "assets/sound/game_over.ogg");
  }

  public create(): void {
    this.sound.play("game_over");
    this.background = this.add.image(228, 0, "gameover-background").setOrigin(0.5, 0);

    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(228, 360, 2000, "Linear", false);

    this.time.delayedCall(3000, () => {
      this.scene.start("WelcomeScene");
    });
  }

  public update(time: number): void {
    // .
  }
}

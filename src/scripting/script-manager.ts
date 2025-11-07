import { StateControlEnemies } from "../state-control/state-enemies";
import { StateMachine } from "./state-machine";
import { StageScene } from "../scenes/stage-scene";

export class ScriptManager {

  public static parse(scene: StageScene, enemies: Phaser.Physics.Arcade.Group, dataJSON: string, callback?: (args: any) => void, callbackContext?: any) {

    const JSON_KEY_ENEMIES: string = "enemies";
    const JSON_KEY_NAME: string = "name";
    const JSON_KEY_TYPE: string = "type";
    const JSON_KEY_SPAWN: string = "spawn";
    const JSON_KEY_DELAY: string = "delay";
    const SPAWN_Y = 36;

    let posX: number = 0;
    let posY: number = 0;
    let spriteKey: string = "";

    this.spawnPointLeft = scene.add.sprite(this.getPosX("left"), SPAWN_Y, "game-spawn-point");
    this.spawnPointCenter = scene.add.sprite(this.getPosX("center"), SPAWN_Y, "game-spawn-point");
    this.spawnPointRight = scene.add.sprite(this.getPosX("right"), SPAWN_Y, "game-spawn-point");

    //@ts-ignore
    const enemiesJSON = dataJSON[JSON_KEY_ENEMIES];

    enemiesJSON.forEach((element: any) => {
      scene.time.delayedCall(element[JSON_KEY_DELAY], () => {

        const spawnPoint = this.selectSpawnPoint(element[JSON_KEY_SPAWN]);
        spawnPoint.setAlpha(0.8);
        spawnPoint.setVisible(true);
        spawnPoint.setDepth(1);
        spawnPoint.anims.play("game-anim-spawn-point-blink", true);

        scene.time.delayedCall(900, () => {

          posX = this.getPosX(element[JSON_KEY_SPAWN]);
          posY = SPAWN_Y;
          spriteKey = this.getSpriteKey(element[JSON_KEY_TYPE]);

          const enemy: Phaser.Physics.Arcade.Sprite = enemies.create(posX, posY, spriteKey, 4);
          enemy.setData("name", element[JSON_KEY_NAME]);
          enemy.setData("stop", false);
          enemy.setData("type", element[JSON_KEY_TYPE]);
          enemy.setBounce(0, 0);
          enemy.setCollideWorldBounds(true);
          enemy.setImmovable(false);
          enemy.setPushable(false);
          enemy.setBodySize(48, 48);
          scene.physics.add.collider(enemy, enemies);

          StateMachine.register(element[JSON_KEY_NAME]);
          StateControlEnemies.register(element[JSON_KEY_NAME]);

          if (callback !== undefined) { callback(callbackContext); }
        });
      });
    });
  }

  private static spawnPointLeft: Phaser.GameObjects.Sprite;
  private static spawnPointCenter: Phaser.GameObjects.Sprite;
  private static spawnPointRight: Phaser.GameObjects.Sprite;

  //@ts-ignore
  private static selectSpawnPoint(spawn: string): Phaser.GameObjects.Sprite {
    spawn = spawn.toLowerCase();
    if (spawn === "left") { return this.spawnPointLeft; }
    if (spawn === "center") { return this.spawnPointCenter; }
    if (spawn === "right") { return this.spawnPointRight; }
  }

  //@ts-ignore
  private static getPosX(spawn: string): number {
    const SPAWN_X_LEFT = 36;
    const SPAWN_X_CENTER = 228;
    const SPAWN_X_RIGHT = 420;

    spawn = spawn.toLowerCase();
    if (spawn === "left") { return SPAWN_X_LEFT; }
    if (spawn === "center") { return SPAWN_X_CENTER; }
    if (spawn === "right") { return SPAWN_X_RIGHT; }
  }

  //@ts-ignore
  private static getSpriteKey(type: string): string {
    const SPRITE_KEY_REGULAR: string = "game-enemy-regular";
    const SPRITE_KEY_SPEEDY: string = "game-enemy-speedy";
    const SPRITE_KEY_SHOOTER: string = "game-enemy-shooter";
    const SPRITE_KEY_HEAVY: string = "game-enemy-heavy";

    type = type.toLowerCase();
    if (type === "regular") { return SPRITE_KEY_REGULAR; }
    if (type === "speedy") { return SPRITE_KEY_SPEEDY; }
    if (type === "shooter") { return SPRITE_KEY_SHOOTER; }
    if (type === "heavy") { return SPRITE_KEY_HEAVY; }
  }
}

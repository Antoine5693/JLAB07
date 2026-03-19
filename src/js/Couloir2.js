var player;
var clavier;
var enter;
var interact;
var porte1;
var open_portec2_1 = false;
var porte2;
var open_portec2_2 = false;
var porte3;
var open_portec2_3 = false;
var porte4;
var open_portec2_4 = false;
var porte5;
var open_portec2_5 = false;
var escalier1;

export default class Couloir2 extends Phaser.Scene {
  constructor() {
    super({
      key: "Couloir2"
    });
  }

  preload() {
    this.load.image("B", "src/assets/Background.png");
    this.load.image("B2", "src/assets/Background2.png");
    this.load.image("D1", "src/assets/Dela_dec1.png");
    this.load.image("D2", "src/assets/Dela_dec2.png");
    this.load.tilemapTiledJSON("carte4", "src/assets/Couloir2.tmj");
    this.load.spritesheet("img_porteC2_1", "src/assets/porte1finie.png", {
      frameWidth: 103,
      frameHeight: 128
    });
    this.load.spritesheet("img_porteC2_2", "src/assets/porte1finie.png", {
      frameWidth: 103,
      frameHeight: 128
    });
    this.load.spritesheet("img_porteC2_3", "src/assets/porte1finie.png", {
      frameWidth: 103,
      frameHeight: 128
    });
    this.load.spritesheet("img_porteC2_4", "src/assets/porte1finie.png", {
      frameWidth: 103,
      frameHeight: 128
    });
    this.load.spritesheet("img_porteC2_5", "src/assets/porte1finie.png", {
      frameWidth: 103,
      frameHeight: 128
    });
    this.load.image("img_escalier1", "src/assets/escalier.png", {
      frameWidth: 50,
      frameHeight: 200
    });
    this.load.spritesheet("dude.png", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {

    interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    clavier = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    // Tilemap
    const map = this.add.tilemap("carte4");
    const tileset1 = map.addTilesetImage("2", "B");
    const tileset2 = map.addTilesetImage("333", "B2");
    const tileset3 = map.addTilesetImage("3", "D1");
    const tileset4 = map.addTilesetImage("1", "D2");
    const calque1 = map.createLayer("Calque de Tuiles 1", [tileset1, tileset3, tileset4, tileset2]);
    const calque2 = map.createLayer("Calque de Tuiles 2", [tileset2, tileset3, tileset4, tileset1]);
    calque1.setCollisionByProperty({ estSolide: true });
    calque2.setCollisionByProperty({ estSolide: true });

    // Spawn du joueur
    const spawn = this.scene.settings.data || {};
    const startX = spawn.x ?? 1056;
    const startY = spawn.y ?? 2204;

    // Création des portes
    porte1 = this.physics.add.staticSprite(1107, 383, "img_porteC2_1", 0);
    open_portec2_1 = false;
    this.anims.create({
      key: "anim_ouvreporte1",
      frames: this.anims.generateFrameNumbers("img_porteC2_1", { start: 0, end: 7 }),
      frameRate: 20,
      repeat: 0
    });

    porte2 = this.physics.add.staticSprite(1681, 383, "img_porteC2_2", 0);
    open_portec2_2 = false;
    this.anims.create({
      key: "anim_ouvreporte2",
      frames: this.anims.generateFrameNumbers("img_porteC2_2", { start: 0, end: 7 }),
      frameRate: 20,
      repeat: 0
    });

    porte3 = this.physics.add.staticSprite(2353, 383, "img_porteC2_3", 0);
    open_portec2_3 = false;
    this.anims.create({
      key: "anim_ouvreporte3",
      frames: this.anims.generateFrameNumbers("img_porteC2_3", { start: 0, end: 7 }),
      frameRate: 20,
      repeat: 0
    });

    porte4 = this.physics.add.staticSprite(1585, 1503, "img_porteC2_4", 0);
    open_portec2_4 = false;
    this.anims.create({
      key: "anim_ouvreporte4",
      frames: this.anims.generateFrameNumbers("img_porteC2_4", { start: 0, end: 7 }),
      frameRate: 20,
      repeat: 0
    });

    porte5 = this.physics.add.staticSprite(2257, 1055, "img_porteC2_5", 0);
    open_portec2_5 = false;
    this.anims.create({
      key: "anim_ouvreporte5",
      frames: this.anims.generateFrameNumbers("img_porteC2_5", { start: 0, end: 7 }),
      frameRate: 20,
      repeat: 0
    });

    // Escalier — hitbox physique + zone de détection
    escalier1 = this.physics.add.staticSprite(1054, 2298, "img_escalier1", 0);
    escalier1.setSize(escalier1.displayWidth, 10);
    escalier1.setOffset(0, escalier1.displayHeight - 10);
    this.zone_escalier1 = this.add.zone(escalier1.x, escalier1.y, escalier1.width, escalier1.height);
    this.physics.add.existing(this.zone_escalier1, true);

    // Joueur
    player = this.physics.add.sprite(startX, startY, "dude.png");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Caméra
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Animations du joueur
    this.anims.create({
      key: "anim_tourne_gauche",
      frames: this.anims.generateFrameNumbers("dude.png", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "dude.png", frame: 4 }],
      frameRate: 20
    });
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("dude.png", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // ---- COLLIDERS CALQUES ----
    this.physics.add.collider(player, calque1);
    this.physics.add.collider(player, calque2);

    // ---- HITBOX MOITIÉ SUPÉRIEURE + COLLIDERS PORTES ----
    porte1.setSize(103, 64);
    porte1.setOffset(0, 0);
    this.physics.add.collider(player, porte1);

    porte2.setSize(103, 64);
    porte2.setOffset(0, 0);
    this.physics.add.collider(player, porte2);

    porte3.setSize(103, 64);
    porte3.setOffset(0, 0);
    this.physics.add.collider(player, porte3);

    porte4.setSize(103, 64);
    porte4.setOffset(0, 0);
    this.physics.add.collider(player, porte4);

    porte5.setSize(103, 64);
    porte5.setOffset(0, 0);
    this.physics.add.collider(player, porte5);

    // ---- COLLIDER ESCALIER ----
    this.physics.add.collider(player, escalier1);
  }

  update() {

    player.setVelocityX(0);
    player.setVelocityY(0);

    // Ouverture des portes / escaliers
    if (Phaser.Input.Keyboard.JustDown(interact) == true) {

      if (open_portec2_1 == false && this.physics.overlap(player, porte1) == true) {
        open_portec2_1 = true;
        porte1.anims.play("anim_ouvreporte1");
        this.time.delayedCall(500, () => {
          this.scene.start("Salle07");
        });
      }

      if (open_portec2_2 == false && this.physics.overlap(player, porte2) == true) {
        open_portec2_2 = true;
        porte2.anims.play("anim_ouvreporte2");
        this.time.delayedCall(500, () => {
          this.scene.start("Salle08");
        });
      }

      if (open_portec2_3 == false && this.physics.overlap(player, porte3) == true) {
        open_portec2_3 = true;
        porte3.anims.play("anim_ouvreporte3");
        this.time.delayedCall(500, () => {
          this.scene.start("Salle09");
        });
      }

      if (open_portec2_4 == false && this.physics.overlap(player, porte4) == true) {
        open_portec2_4 = true;
        porte4.anims.play("anim_ouvreporte4");
        this.time.delayedCall(500, () => {
          this.scene.start("Salle10");
        });
      }

      if (open_portec2_5 == false && this.physics.overlap(player, porte5) == true) {
        open_portec2_5 = true;
        porte5.anims.play("anim_ouvreporte5");
        this.time.delayedCall(500, () => {
          this.scene.start("Salle01");
        });
      }

      if (this.physics.overlap(player, this.zone_escalier1) == true) {
        this.scene.start("Couloir1", { x: 3392, y: 2330 });
      }
    }

    // Déplacement du joueur
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    }

    if (clavier.up.isDown) {
      player.setVelocityY(-160);
    } else if (clavier.down.isDown) {
      player.setVelocityY(160);
    }

    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      player.anims.play("anim_face", true);
    }
  }
}
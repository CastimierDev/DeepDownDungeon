//base entitiy class
class Entity {
  constructor(givenX, givenY, givenPlaatje) {
    this.x = givenX;
    this.y = givenY;
    this.plaatje = givenPlaatje;
  }
}

//player extends entity class
class Player extends Entity {
  constructor(givenX, givenY, givenPlaatje, givenScore, givenClass, givenHP, givenUsed, givenDir) {
    super(givenX, givenY, givenPlaatje);
    this.score = givenScore;
    this.class = givenClass; //1 = wizard, 2 = knight, 3 = rogue
    this.hp = givenHP;
    this.abilityUsed = givenUsed;
    this.fireDirection = givenDir; //1=left,2=right,3=up,4=downs
    this.spritePos = 0;
  }
}

//loot extends entity class
class Reward extends Entity {
  constructor(givenX, givenY, givenPlaatje, givenWaarde) {
    super(givenX, givenY, givenPlaatje);
    this.waarde = givenWaarde
  }
}

//gold extends reward class
class Gold extends Reward {
  constructor(givenX, givenY, givenPlaatje, givenWaarde) {
    super(givenX, givenY, givenPlaatje, givenWaarde);
  }
}

//diamond extends reward class
class Diamond extends Reward {
  constructor(givenX, givenY, givenPlaatje, givenWaarde) {
    super(givenX, givenY, givenPlaatje, givenWaarde);
  }
}

//wall extennds entity class
class Wall extends Entity {
  constructor(givenX, givenY, givenPlaatje) {
    super(givenX, givenY, givenPlaatje);
  }
}

//enemy extennds entity class
class Enemy extends Entity {
  constructor(givenX, givenY, givenPlaatje, givenDamage) {
    super(givenX, givenY, givenPlaatje);
    this.damage = givenDamage;
  }
}

//trap extennds enemy class
class Trap extends Enemy {
  constructor(givenX, givenY, givenPlaatje, givenDamage) {
    super(givenX, givenY, givenPlaatje, givenDamage);
  }
}

//enemy that moves
class Mover extends Enemy {
  constructor(givenX, givenY, givenPlaatje, givenDamage, givenDir) {
    super(givenX, givenY, givenPlaatje, givenDamage);
    this.direction = givenDir; //1=rechts,0=links,2=omhoog,3=omlaag
  }
}

//exit to end game
class Exit extends Entity {
  constructor(givenX, givenY, givenPlaatje) {
    super(givenX, givenY, givenPlaatje);
  }
}

//down to go to next level
class Down extends Entity {
  constructor(givenX, givenY, givenPlaatje) {
    super(givenX, givenY, givenPlaatje);
  }
}

//facking player s-woord
var Playerskin;

//class knoppen
var knopwizard;
var knopknight;
var knoprogue;
var knopX = 0;

//game settings variables
var xGridSize = 15;
var yGridSize = 15.5;
var gridMultiplier = 50;
var fps = 60;
var currentLevel = 1;
var alleLeveltjes;
var tutorialFinished = false;
var levelUno;

//images
var batmanTexture;
var pietTexture;
var wallTexture;
var trapTexture;
var diaTexture;
var goldTexture;
var backgroundTexture;
var FirebeamTexture;
var WizardTexture;
var KnightTexture;
var RogueTexture;
var fireUpTexture;
var fireDownTexture;
var fireRightTexture;
var fireLeftTexture;
var sterretjeTexture;
var nextlevelTexture;
var wallUnoTexture;
var wallDosTexture;
var wallDrieTexture;
var ridderAbility;
var trapEnemyTexture;

//objects
var player;
var centje;
var dia;
var wall;
var valletje;
var moveEnemy;
var exit;
var down;

//abilities
var beweginteller;
beweginteller = 3
var stun = true;
AbilityCounter = 0;
var hit = false;
var knightswoosh;
knightswoosh = 0;

function relocate(dingetje, walls) {
  let retry = true;
  while (retry == true) {
    var xje = Math.floor(Math.random() * (xGridSize - 1));
    var ytje = Math.floor(Math.random() * (yGridSize - 1));

    retry = false;
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x === xje && walls[i].y === ytje) {
        retry = true;
        break;
      }
      else {
        retry = false;
      }
    }
  }

  dingetje.x = xje;
  dingetje.y = ytje;
}

//laad plaatjes
function preload() {
  batmanTexture = loadImage("Textures/batman.png");
  pietTexture = loadImage("Textures/goblin.png");
  wallTexture = loadImage("Textures/generated-icon.png");
  trapTexture = loadImage("Textures/trap(nl).png");
  diaTexture = loadImage("Textures/zak goud.png");
  goldTexture = loadImage("Textures/coin.png");
  backgroundTexture = loadImage("Textures/Bord.png");
  FirebeamTexture = loadImage("Textures/vuurbeamopstekopwajo.png");
  WizardTexture = loadImage("Textures/toverman.png");
  KnightTexture = loadImage("Textures/Ridderdepidder.png");
  RogueTexture = loadImage("Textures/ninjajaja.png");
  fireDownTexture = loadImage("Textures/vuurbeamopstekopwajo.png");
  fireUpTexture = loadImage("Textures/Vuurbeam.png");
  fireLeftTexture = loadImage("Textures/vuurtjelinks.png");
  fireRightTexture = loadImage("Textures/vuurtjerechts.png");
  sterretjeTexture = loadImage("Textures/image.png");
  nextlevelTexture = loadImage("Textures/NextLevel.png");
  wallUnoTexture = loadImage("Textures/Wall1.png");
  wallDosTexture = loadImage("Textures/Wall2.png");
  wallDrieTexture = loadImage("Textures/Wall3.png");
  trapEnemyTexture = loadImage("Textures/trap(engels).png");
  ridderspin =
loadImage("Textures/riddertjeswoesj.png");
  ridderspin2 = 
loadImage("Textures/riddertjeswoesj2.png");
  ridderspin3 = loadImage("Textures/riddertjeswoesj3.png");
  ridderspin4 = 
loadImage("Textures/riddertjeswoesj4.png");
  //add player texture to player
  player = new Player(2, 1, batmanTexture, 0, 0, 3, false, 0);

  //laad levelfile
  alleLeveltjes = [
    //loadStrings("level.lvl"),
 //   loadStrings("anotherone.lvl"),
    loadStrings("robinlevel.lvl"),
    loadStrings("spinjitsu.lvl"),
    loadStrings("W rizz level.lvl"),
    loadStrings("tempelrun.lvl"),
    loadStrings("balzak.lvl"),
    loadStrings("rennen.lvl"),
    loadStrings("slenderman.lvl"),
    loadStrings("robert.lvl"),
    loadStrings("noppesnada.lvl"),
    loadStrings("poepie.lvl"),
    loadStrings("friend_kandelbroodje.lvl"),
  ];
  
  levelUno = loadStrings("tutorialLbozoLoser.lvl");
}

function drawImage(entity, entityTexture) {
  for (let i = 0; i < entity.length; i++) {
    entity[i].plaatje = entityTexture;
    entity[i].plaatje.resize(50, 0);
    image(entity[i].plaatje, entity[i].x * gridMultiplier, entity[i].y * gridMultiplier);
  }
}

function drawWalls(entity) {
  for (let i = 0; i < entity.length; i++) {
    entity[i].plaatje.resize(50, 0);
    image(entity[i].plaatje, entity[i].x * gridMultiplier, entity[i].y * gridMultiplier);
  }
}

//gebeurt op opstart
function setup() {

  player.x = 1;
  player.y = 1;

  frameRate(fps); //zet framerate

  canvas = createCanvas(xGridSize * gridMultiplier, yGridSize * gridMultiplier - gridMultiplier / 2 - gridMultiplier); //maakt window

  background('orange');
  centje = [
  ];
  dia = [
  ];
  wall = [
  ];
  valletje = [
  ];
  moveEnemy = [
  ];
  exit = new Exit(0, 0, trapTexture);
  down = new Down(13, 11, nextlevelTexture);

  console.log("levelength: " + alleLeveltjes.length);
  var lvl = Math.floor(Math.random() * (alleLeveltjes.length - 1 + 1)) + 1 - 1;
  console.log("levelchosen: " + lvl);
  var levelFile = alleLeveltjes[lvl];

  if (levelFile !== undefined && levelFile !== null && tutorialFinished) {
    loadLevel(levelFile); //laad level
  }
  else if (!tutorialFinished)
  {
    loadLevel(levelUno);
  }
  else {
    console.log("IK POEP IN M'N BROEK");
    frameRate(0);
  }

  if (player.class == 0) setupButtons(); // Setup buttons once
};

//laad level file
function loadLevel(levelFile) {
  var levelData = levelFile;
  var w = 0;
  var m = 0;
  var t = 0;
  var c = 0;
  var d = 0;

  if (levelData !== undefined && levelData !== null) {
    console.log("GREAT SUCCES");
  }
  else {
    console.log("IK POEP IN M'N BROEK");
    frameRate(0);
  }

  for (let i = 0; i < levelData.length; i++) {
    console.log(levelData[i]);
    var currentEntity = levelData[i].split(" ", 5);
    switch (currentEntity[0]) {
      case "w":
        var rand = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        console.log(String(w) + " random: " + String(rand));
        switch (rand) {
          case 1:
            wall[w] = new Wall(Number(currentEntity[1]), Number(currentEntity[2]), wallUnoTexture);
            break;

          case 2:
            wall[w] = new Wall(Number(currentEntity[1]), Number(currentEntity[2]), wallDosTexture);
            break;

          case 3:
            wall[w] = new Wall(Number(currentEntity[1]), Number(currentEntity[2]), wallDrieTexture);
            break;
        }

        console.log(String(wall[w].plaatje));

        w += 1;

        break;

      case "m":
        console.log(String(m))
        moveEnemy[m] = new Mover(Number(currentEntity[1]), Number(currentEntity[2]), wallTexture, 1, Number(currentEntity[3]));
        m += 1;
        break;

      case "t":
        console.log(String(t))
        valletje[t] = new Trap(Number(currentEntity[1]), Number(currentEntity[2]), wallTexture, 3);
        t += 1;
        break;

      case "c":
        console.log(String(c))
        centje[c] = new Gold(Number(currentEntity[1]), Number(currentEntity[2]), wallTexture, 10);
        c += 1;
        break;

      case "d":
        console.log(String(d))
        dia[d] = new Diamond(Number(currentEntity[1]), Number(currentEntity[2]), wallTexture, 25);
        d += 1;
        break;

      case "e":
        down.x = currentEntity[1];
        down.y = currentEntity[2];
        break;

      default:
        break;
    }
  }
}

//reguleert de input
function keyPressed() {
  console.log("Key pressed:", key);
  console.log("Key code:", keyCode);

  //player movement
  stun = beweginteller > 1;
  let newX = player.x;
  let newY = player.y;
  let canMove = true;
  let ActiveAbility = AbilityCounter == 1;

  if (keyCode === LEFT_ARROW && player.x >= 1 && ActiveAbility == false) {
    newX -= 1;
    beweginteller += 1;
    player.spritePos = 0;
  }
  else if (keyCode === RIGHT_ARROW && player.x < xGridSize - 1 && ActiveAbility == false) {
    newX += 1;
    beweginteller += 1;
    player.spritePos = 0;
  }
  else if (keyCode === UP_ARROW && player.y >= 1 && ActiveAbility == false) {
    newY -= 1;
    beweginteller += 1;
    player.spritePos = 0;
  }
  else if (keyCode === DOWN_ARROW && player.y <= yGridSize - 3 && ActiveAbility == false) {
    newY += 1;
    beweginteller += 1;
    player.spritePos = 0;
  }

  //rogue ability
  else if (keyCode === 70 && player.class == 3 && !player.abilityUsed) {
    stun = false;
    beweginteller = 0;
    AbilityCounter = 0;
    player.abilityUsed = true;
  }

  //Wizard ability  
  else if (keyCode === 70 && player.class == 1 && !player.abilityUsed) {
    stun = false;
    beweginteller = 1;
    AbilityCounter = 1;
    player.abilityUsed = true;
    player.fireDirection = 0;
  }

  else if (keyCode === LEFT_ARROW && ActiveAbility == true && player.class == 1) {
    AbilityCounter = 0
    beweginteller += 1;
    for (let i = 0; i < moveEnemy.length; i++) {
      if (moveEnemy[i].x < player.x &&
        (moveEnemy[i].y === player.y - 1 || moveEnemy[i].y === player.y || moveEnemy[i].y === player.y + 1)) {
        moveEnemy[i].x -= 1000000000;
      }
    }

    player.fireDirection = 1;
  }
  else if (keyCode === RIGHT_ARROW && ActiveAbility == true && player.class == 1) {
    AbilityCounter = 0
    beweginteller += 1;
    for (let i = 0; i < moveEnemy.length; i++) {
      if (moveEnemy[i].x > player.x &&
        (moveEnemy[i].y === player.y - 1 || moveEnemy[i].y === player.y || moveEnemy[i].y === player.y + 1)) {
        moveEnemy[i].x -= 1000000000;
      }
    }

    player.fireDirection = 2;
  }
  else if (keyCode === UP_ARROW && ActiveAbility == true && player.class == 1) {
    AbilityCounter = 0
    beweginteller += 1;
    for (let i = 0; i < moveEnemy.length; i++) {
      if (moveEnemy[i].y < player.y &&
        (moveEnemy[i].x === player.x - 1 || moveEnemy[i].x === player.x || moveEnemy[i].x === player.x + 1)) {
        moveEnemy[i].x -= 1000000000;
      }
    }

    player.fireDirection = 3;
  }
  else if (keyCode === DOWN_ARROW && ActiveAbility == true && player.class == 1) {
    AbilityCounter = 0;
    beweginteller += 1;
    for (let i = 0; i < moveEnemy.length; i++) {
      if (moveEnemy[i].y > player.y &&
        (moveEnemy[i].x === player.x - 1 || moveEnemy[i].x === player.x || moveEnemy[i].x === player.x + 1)) {
        moveEnemy[i].x -= 1000000000;

      }
    }

    player.fireDirection = 4;
  }

  //knight ability

  else if (keyCode === 70 && player.class == 2 && !player.abilityUsed) {
    stun = false;
    beweginteller = 1;
    AbilityCounter = 1;
    beweginteller += 1;
    AbilityCounter += 1;
    setTimeout(() => { knightswoosh = 1; }, 50);
    setTimeout(() => { knightswoosh = 2; }, 100);
    setTimeout(() => { knightswoosh = 3; }, 150);
    setTimeout(() => { knightswoosh = 4; }, 200);
    setTimeout(() => { knightswoosh = 1; }, 250);
    setTimeout(() => { knightswoosh = 2; }, 300);
    setTimeout(() => { knightswoosh = 3; }, 350);
    setTimeout(() => { knightswoosh = 4; }, 400);

    setTimeout(() => {
      knightswoosh = 0;

    }, 450);

    setTimeout(() => {
    for (let i = 0; i < moveEnemy.length; i++) {
      if ((moveEnemy[i].y === player.y - 1 || moveEnemy[i].y === player.y || moveEnemy[i].y === player.y + 1) &&
        (moveEnemy[i].x === player.x - 1 || moveEnemy[i].x === player.x || moveEnemy[i].x === player.x + 1)) {
        moveEnemy[i].x -= 1000000000;
        player.abilityUsed = true;
      }
    }
    }, 200);
  }


  else (canMove = false);

  for (let i = 0; i < wall.length; i++) {
    if (wall[i].x === newX && wall[i].y === newY) {
      canMove = false;
      break;
    }
  }

  if (canMove) {
    player.x = newX;
    player.y = newY;
  }

  //mid movement player touches moveEnemy check
  for (let i = 0; i < moveEnemy.length; i++) {
    if (player.x == moveEnemy[i].x && player.y == moveEnemy[i].y && player.x != 13 && player.y != 11  && player.x != 1 && player.y != 1) {
      player.hp -= moveEnemy[i].damage;
      moveEnemy[i].x -= 1000000; //relocate(moveEnemy[i], wall);
    }
  }

  if (player.x == down.x && player.y == down.y) {
    //nieuw level laden
    tutorialFinished = true;
    getNewLevel();
  }

  if (player.x == exit.x && player.y == exit.y) {
    //highscore krijgen
    highscore();
  }

  //move enemies movement
  if (stun) {
    for (let i = 0; i < moveEnemy.length; i++) {
      if (moveEnemy[i].direction == 1 && canMove == true) {
        moveEnemy[i].x += 1;
      }
      else if (moveEnemy[i].direction == 0 && canMove == true) {
        moveEnemy[i].x -= 1;
      }
      else if (moveEnemy[i].direction == 2 && canMove == true) {
        moveEnemy[i].y -= 1;
      }
      else if (moveEnemy[i].direction == 3 && canMove == true) {
        moveEnemy[i].y += 1;
      }

      let changeDir = false;
      for (let w = 0; w < wall.length; w++) {
        if (wall[w].x === moveEnemy[i].x && wall[w].y === moveEnemy[i].y) {
          changeDir = true;
          break;
        }
      }

      //horizontal switcheroo
      if (moveEnemy[i].x == -1 && moveEnemy[i].direction < 2 || moveEnemy[i].x == xGridSize && moveEnemy[i].direction < 2) {
        if (moveEnemy[i].direction == 1) {
          moveEnemy[i].x -= 1;
          moveEnemy[i].direction = 0;
        }
        else {
          moveEnemy[i].x += 1;
          moveEnemy[i].direction = 1;
        }
      }

      //vertical switcheroo
      else if (moveEnemy[i].y == -1 || moveEnemy[i].y == xGridSize - 1) {
        if (moveEnemy[i].direction == 3) {
          moveEnemy[i].y -= 1;
          moveEnemy[i].direction = 2;
        }
        else {
          moveEnemy[i].y += 1;
          moveEnemy[i].direction = 3;
        }
      }

      if (changeDir) {
        if (moveEnemy[i].direction == 1) {
          moveEnemy[i].x -= 1;
          moveEnemy[i].direction = 0;
        }
        else if (moveEnemy[i].direction == 0) {
          moveEnemy[i].x += 1;
          moveEnemy[i].direction = 1;
        }
        else if (moveEnemy[i].direction == 2) {
          moveEnemy[i].y += 1;
          moveEnemy[i].direction = 3;
        }
        else if (moveEnemy[i].direction == 3) {
          moveEnemy[i].y -= 1;
          moveEnemy[i].direction = 2;
        }
      }
    }
  }
}

//gebeurt elke frame
function draw() {

  background('orange');

  //teken background
  image(backgroundTexture, 0, 0);

  //player receives centje
  for (let i = 0; i < centje.length; i++) {
    if (player.x == centje[i].x && player.y == centje[i].y) {
      player.score += 10;
      centje[i].x -= 1000000; //relocate(centje[i], wall);
    }
  }

  //player receives diamond
  for (let i = 0; i < dia.length; i++) {
    if (player.x == dia[i].x && player.y == dia[i].y) {
      player.score += 25;
      dia[i].x -= 1000000; //relocate(dia[i], wall);
      player.abilityUsed = false;
    }
  }
  
  //player touches trap
  for (let i = 0; i < valletje.length; i++) {
    if (player.x == valletje[i].x && player.y == valletje[i].y && player.x != 13 && player.y != 11) {
      player.hp -= valletje[i].damage;
      valletje[i].x -= 1000000; //relocate(valletje[i], wall);
      hit = true;
    }
  }

  //player touches moveEnemy
  for (let i = 0; i < moveEnemy.length; i++) {
    if (player.x == moveEnemy[i].x && player.y == moveEnemy[i].y && player.x != 13 && player.y != 11  && player.x != 1 && player.y != 1) {
      player.hp -= moveEnemy[i].damage;
      moveEnemy[i].x -= 1000000; //relocate(moveEnemy[i], wall);
      hit = true;
    }
  }

  if (player.x == down.x && player.y == down.y) {
    //nieuw level laden
    tutorialFinished = true;
    getNewLevel();
  }

  if (player.x == exit.x && player.y == exit.y) {
    //highscore krijgen
    highscore();
  }

  //teken trap
  drawImage(valletje, trapEnemyTexture);
  
  //teken centje
  drawImage(centje, goldTexture);

  //teken dia
  drawImage(dia, diaTexture);

  //teken exit
  exit.plaatje.resize(50, 0);
  image(exit.plaatje, exit.x * gridMultiplier, exit.y * gridMultiplier);

  //teken down
  down.plaatje.resize(80, 0);
  image(down.plaatje, down.x * gridMultiplier - 15, down.y * gridMultiplier - 15);

  //teken mover
  drawImage(moveEnemy, pietTexture);

  //teken player
  if (player.spritePos == 0)
  {
    player.spritePos = 1;
  }
  else if (player.spritePos == 1)
  {
    player.spritePos = 2;
  }
  else if (knightswoosh != 0)
  {
    player.plaatje.resize(150, 0);
    image(player.plaatje, player.x * gridMultiplier-gridMultiplier, player.y * gridMultiplier - gridMultiplier - 10);
  }
  else if (knightswoosh == 0) {
    player.plaatje.resize(50, 0);
    image(player.plaatje, player.x * gridMultiplier, player.y * gridMultiplier - 10);
  }

  //Rogue plaatje
  if (player.class == 3) {
    player.plaatje = RogueTexture;
  }
  //Knight plaatjes
  
    
  else if (player.class == 2 && knightswoosh == 0) {
    player.plaatje = KnightTexture;
  }
  else if (player.class == 2 && knightswoosh == 1){player.plaatje = ridderspin
}
   else if (player.class == 2 && knightswoosh == 2){player.plaatje = ridderspin2
}
else if (player.class == 2 && knightswoosh == 3){player.plaatje = ridderspin3
}
else if (player.class == 2 && knightswoosh == 4){player.plaatje = ridderspin4
}
  
  //Wizard plaatje
  else if (player.class == 1) {
    player.plaatje = WizardTexture;
  }

  //teken walls
  drawWalls(wall);

  //teken fire
  if (!stun && player.class == 1) drawFire();

  //teken player info
  textSize(25);
  textStyle(BOLD);

  fill('red');
  text("Health: " + player.hp, 620, 30); //hp

  fill('yellow');
  text("Score: " + player.score, 620, 70); //score

  /*fill('yellow');
  text(player.class, 700, 70); //class

  fill('cyan');
  text(frameRate(), 700, 90); //class

  fill('light green');
  text(player.x, 700, 110); //coords
  text(player.y, 700, 130);*/

  //teken UI blur
  if (player.class === 0) {
    let zwart = color(0, 0, 0);
    zwart.setAlpha(128);
    noStroke();
    fill(zwart);
    rect(0, 0, 1000, 1000);
  }
  else if (!stun && player.class == 3) {
    let mist = color(64, 64, 64);
    mist.setAlpha(96);
    noStroke();
    fill(mist);
    rect(0, 0, 1000, 1000);
  }

  if (hit == true) {
    let auw = color(255, 0, 0);
    auw.setAlpha(128);
    noStroke();
    fill(auw);
    rect(0, 0, 1000, 1000);
    setTimeout(() => { hit = false; }, 50);
  }

  if (player.hp < 1) {
    dood();
  }
}

//setup class select
function setupButtons() {
  knopwizard = createImg('Textures/toverman.png', 'wizard button');
  knopwizard.position(100 + knopX, 300);
  knopwizard.size(100, 100);
  knopwizard.mousePressed(() => {
    player.class = 1;
    knopX = -5000000000000000;
    knopknight.position(100 + knopX, 300);
    knopwizard.position(100 + knopX, 100)
    knoprogue.position(100 + knopX, 300);
  });

  knopknight = createImg('Textures/Ridderdepidder.png', 'knight button');
  knopknight.position(325 + knopX, 300);
  knopknight.size(100, 100);
  knopknight.mousePressed(() => {
    player.class = 2;
    knopX = -5000000000000000;
    knopknight.position(100 + knopX, 300);
    knopwizard.position(100 + knopX, 100)
    knoprogue.position(100 + knopX, 300);
  });

  knoprogue = createImg('Textures/ninjajaja.png', 'rogue button');
  knoprogue.position(550 + knopX, 300);
  knoprogue.size(100, 100);
  knoprogue.mousePressed(() => {
    player.class = 3;
    knopX = -5000000000000000;
    knoprogue.position(100 + knopX, 300);
    knopwizard.position(100 + knopX, 300);
    knopknight.position(100 + knopX, 300);
  });
}

function drawFire() {
  if (player.fireDirection == 1) {
    image(fireLeftTexture, player.x * gridMultiplier - 750, (player.y - 1) * gridMultiplier);
  }
  if (player.fireDirection == 2) {
    image(fireRightTexture, player.x * gridMultiplier + gridMultiplier, (player.y - 1) * gridMultiplier);
  }
  else if (player.fireDirection == 3) {
    image(fireUpTexture, player.x * gridMultiplier - gridMultiplier, player.y * gridMultiplier - 750);
  }
  else if (player.fireDirection == 4) {
    image(fireDownTexture, player.x * gridMultiplier - gridMultiplier, player.y * gridMultiplier + 60);
  }
}

function highscore() { //highscore laten zien en eindig gimma
  console.log("oof");
  let zwart = color(0, 0, 0);
  noStroke();
  fill(zwart);
  rect(0, 0, 1000, 1000);
  textSize(60);
  fill('yellow');
  text("SCORE: " + String(player.score), 120, 100);
  buttonretry = createButton('Retry');
  buttonretry.position(350, 400);
  buttonretry.mousePressed(refreshPage);
  buttonretry.position(350, 250);
  frameRate(0);
}

function getNewLevel() {
  //pick a new level file and load it in
  setup();
}

function dood() { //je bent dood
  console.log("oof");
  let zwart = color(128, 0, 0);
  zwart.setAlpha(0.5);
  noStroke();
  fill(zwart);
  rect(0, 0, 1000, 1000);
  textSize(35);
  fill('black');
  textStyle(BOLD);

  var pikKans = Math.floor(Math.random() * 100);
  
  if (pikKans == 69) text("JE BENT DOOD PIK", 120, 100);
  else {
    text("JE HEBT DE DUNGEON NIET OVERLEEFD!", 20, 100);
    text("PROBEER HET OPNIEUW!", 155, 150);
    buttonretry = createButton('Retry');
    buttonretry.position(350, 400);
    buttonretry.mousePressed(refreshPage);
    buttonretry.position(350, 250);
    
  }
  
  frameRate(0);
}
function refreshPage(){
  window.location.reload();
}
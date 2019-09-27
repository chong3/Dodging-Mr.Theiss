/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */
function renderTheiss(context) {
  var canvas = document.getElementById('canvas');
  handleTheissMovement();
  var top = new Image();  //Get images from file
  var bottom = new Image();
  top.src = 'theiss.png';
  bottom.src = 'theiss2.png';
  context.drawImage(top, THEISS1.x, 0, THEISS1.width, THEISS1.height);  //Render top THEISS 1
  context.drawImage(bottom, THEISS1.x, THEISS1.height + GAME.gap, THEISS1.width, GAME.canvas.height - (THEISS1.height+GAME.gap)); //Render bottom THEISS 1
  context.drawImage(top, THEISS2.x, 0, THEISS2.width, THEISS2.height); //Render top THEISS 2
  context.drawImage(bottom, THEISS2.x, THEISS2.height + GAME.gap, THEISS2.width, GAME.canvas.height - (THEISS2.height+GAME.gap));//Render bottom THEISS 2
  context.drawImage(top, THEISS3.x, 0, THEISS3.width, THEISS3.height);  //Render top THEISS 3
  context.drawImage(bottom, THEISS3.x, THEISS3.height + GAME.gap, THEISS3.width, GAME.canvas.height - (THEISS3.height+GAME.gap));//Render bottom THEISS 3
}
function initializeTheiss(){
  THEISS1.x = GAME.canvas.width;  //Give initial x positions, evenly spaced across canvas, 1 canvas distance away from main canvas
  THEISS2.x = 4.0/3 * GAME.canvas.width + THEISS1.width/3.0;
  THEISS3.x = 5.0/3 * GAME.canvas.width + THEISS1.width/3.0 +THEISS2.width/3.0;
  THEISS1.height = Math.random() * (GAME.canvas.height-GAME.gap);//give a random spacing for each THEISS
  THEISS2.height = Math.random() * (GAME.canvas.height-GAME.gap);
  THEISS3.height = Math.random() * (GAME.canvas.height-GAME.gap);
}
function handleTheissMovement() {
  if (THEISS1.x < -1 * THEISS1.width){  //If THEISSs go off of the screen, wrap around and give new random hole position
    THEISS1.x = GAME.canvas.width;
    THEISS1.height = Math.random() * (GAME.canvas.height-GAME.gap);
  };
  if (THEISS2.x < -1 * THEISS2.width){
    THEISS2.x = GAME.canvas.width;
    THEISS2.height = Math.random() * (GAME.canvas.height-GAME.gap);
  };
  if (THEISS3.x < -1 * THEISS3.width){
    THEISS3.x = GAME.canvas.width;
    THEISS3.height = Math.random() * (GAME.canvas.height-GAME.gap);
  };
  THEISS1.x -= 2;//Move THEISSs
  THEISS2.x -= 2;
  THEISS3.x -= 2;
}
function initializeStudent(){
  STUDENT.y = GAME.canvas.height/2;
}
function handleStudentMovement() {
  STUDENT.vel+=STUDENT.acc;
  if (CONTROLS.student.jumping){
    STUDENT.vel = STUDENT.jump;
  }
  STUDENT.y += STUDENT.vel;
  if (STUDENT.y > GAME.canvas.height-STUDENT.height){
    STUDENT.y = GAME.canvas.height-STUDENT.height;
  };
  if (STUDENT.y < 0){
    STUDENT.y = 0;
  };
}
function renderStudent(context){
  var canvas = document.getElementById('canvas');
  handleStudentMovement();
  var student = new Image();
  if (THEISS1.x == STUDENT.x||THEISS2.x == STUDENT.x||THEISS3.x == STUDENT.x){
    STUDENT.currentStudent = STUDENT.students[Math.floor(Math.random() * STUDENT.students.length)];
    GAME.score++;
  };
  student.src = STUDENT.currentStudent;
  context.drawImage(student, STUDENT.x, STUDENT.y, STUDENT.width, STUDENT.height);
}
function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');

  if (GAME.started) {
    context.clearRect(0, 0, 600, 300);
    renderStudent(context);
    renderTheiss(context);
    if (STUDENT.x < THEISS1.x + THEISS1.width &&
      STUDENT.x + STUDENT.width > THEISS1.x &&
      STUDENT.y < THEISS1.height) {
        GAME.started = false;
    }
    if (STUDENT.x < THEISS2.x + THEISS2.width &&
      STUDENT.x + STUDENT.width > THEISS2.x &&
      STUDENT.y < THEISS2.height) {
        GAME.started = false;
    }
    if (STUDENT.x < THEISS3.x + THEISS3.width &&
      STUDENT.x + STUDENT.width > THEISS3.x &&
      STUDENT.y < THEISS3.height) {
        GAME.started = false;
    }
    if (STUDENT.x < THEISS1.x + THEISS1.width &&
      STUDENT.x + STUDENT.width > THEISS1.x &&
      STUDENT.y + STUDENT.height > THEISS1.height + GAME.gap){
        GAME.started = false;
    }
    if (STUDENT.x < THEISS2.x + THEISS2.width &&
      STUDENT.x + STUDENT.width > THEISS2.x &&
      STUDENT.y + STUDENT.height > THEISS2.height + GAME.gap){
        GAME.started = false;
    }
    if (STUDENT.x < THEISS3.x + THEISS3.width &&
      STUDENT.x + STUDENT.width > THEISS3.x &&
      STUDENT.y + STUDENT.height > THEISS3.height + GAME.gap){
        GAME.started = false;
    }

  } else {
    context.font = "30px Arial";
    if (GAME.score > document.cookie){
      document.cookie = GAME.score;
    }
    context.fillText("Game Over Score " + GAME.score, 135, 200);
    context.fillText("High Score : " + document.cookie, 135, 230);
    context.fillText("Press R to try again", 135, 260);
    if (CONTROLS.running){
      GAME.started = true;
      initializeTheiss();
      initializeStudent();
      GAME.score = 0;
    }
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);

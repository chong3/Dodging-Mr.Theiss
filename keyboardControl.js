/**
 *  Keydown event listener runs every time ANY key is pressed!
 *
 */

var CONTROLS = {
  student : {
    jumping : false
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.student.jumping = true;
      break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.student.jumping = false;
      break;
    default:
      break;
  }
});

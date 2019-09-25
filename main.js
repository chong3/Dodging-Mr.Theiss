
// Javascript Canvas Intro!

/**
 *  This is called once after the HTML of the page loads
 *
 */
var high= document.cookie;
function Start() {
  if (!document.cookie){
    high = 0;
  }
  initializeStudent();
  initializeTheiss();
}

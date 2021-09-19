/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
//  */
let navSec;
let navMenu;
let scrolTop;
let rotElem;
rotElem = document.documentElement;
scrolTop = document.getElementById("scrolTop");
navMenu = document.querySelector('ul');
navSec = document.querySelectorAll(".navscroll");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// create navbar dynamic
function scrollTop() {
  // Scroll to top
  rotElem.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function createNav() {
    let docFrag = new DocumentFragment();
    let li;
    let a;
    navSec.forEach(function(navSec){
        a = document.createElement('a');
        li = document.createElement('li');
        a.innerText = navSec.getAttribute('data-nav');
        a.setAttribute('class', 'lin');
        a.addEventListener("click", function() {
            navSec.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });
            });
        // add a link to llist
        li.appendChild(a);
        //add list to frgment document
        docFrag.appendChild(li);
    });
    // add fragment into nav-menu
    navMenu.appendChild(docFrag);
};
function activeSec() {
  visibleSec = getVisibleSec();
  // If visible Section is existed
  if (visibleSec != -1) {
  // create list from nav menu
    let navList;
    navList = document.querySelectorAll(".lin");
    for (let j = 0; j < navSec.length; j++) {
      if (j != visibleSec) {
        navSec[j].classList.remove("spot");
        navList[j].classList.remove("spot");
      } else {
        navSec[j].classList.add("spot");
        navList[j].classList.add("spot");
      }
    }
  }
}
function getVisibleSec() {
    let heig;
    heig = window.innerHeight;
    visibleSec = -1;

    navSec.forEach((navSec, i) => {
        let pos;
        let num;
        pos = navSec.getBoundingClientRect();
        num = Math.abs(pos.top);
        if(num < heig){
            heig = num;
            visibleSec = i;
        }
    });
    return visibleSec;
}
createNav();
scrolTop.addEventListener("click", scrollTop);
document.addEventListener('scroll', activeSec);
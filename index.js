const TypeWritter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.isDeleting = false;
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.words = words;
  this.txt = '';
  this.type();
};

//add type method
TypeWritter.prototype.type = function () {
  //get current index
  const current = this.wordIndex % this.words.length;
  //get full text
  const fullTxt = this.words[current];
  if (this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  //insert element
  this.txtElement.innerHTML=`<span class='txt'>${this.txt}</span>`

  //set typespeed
  let typeSpeed=300;
  if(this.isDeleting){
      typeSpeed/=2;
  }
  //if word complete
  if(!this.isDeleting && this.txt===fullTxt){
      //make pause
      typeSpeed=this.wait;
      this.isDeleting=true;
  }
  else if(this.isDeleting && this.txt==''){
      this.isDeleting=false;
      //move to the next word
      this.wordIndex++;
      //take a pause
      typeSpeed=500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

//Init the DOM
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //init the constructor function
  new TypeWritter(txtElement, words, wait);
}

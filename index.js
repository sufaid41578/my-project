let age =0;

const button = document.getElementById("button");

const h2 = document.getElementById("h2");

button.onclick = function (){
 age = document.getElementById("age").value;
 
 if (age >= 18) {
  h2.textContent='your are an adult';
 }else if(age < 0){
  h2.textContent='invalid age';
 }else{
  h2.textContent='you are a minor';
 }
}

'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const output = document.querySelector('.output');

var nameInput = document.getElementById('name');
 document.querySelector('form.pure-form').addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('input', nameInput.value) 
    outputYou.textContent = nameInput.value; 
    console.log(nameInput.value) 
  });

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('reply', function(replyText) {
  synthVoice(replyText);
  if(replyText == '') replyText = '(No answer...)';
  output.textContent = replyText;
});

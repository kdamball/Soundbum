"use strict";

var Snd = (function(){
  
  var errorMessages = [
    "No song found under "+myGenre,
    "You didn't enter any genre"
  ];
  
  var displayError = function(message){
    var message = message.toString();
    $('form').append(error)
  };
  
  var dispose = function(element){
    $(element).empty()
  }
  
  var load = function(){
    
  };
  
  return {
    remove: dispose,
    error: diplayError,
    play: load
  }
  
})();

(function(){
  $("form").on("submit", app.getSong)
})();

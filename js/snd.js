"use strict";

var Snd = (function(){
  
  var myGenre = $("#genre").val();
  
  var displayError = function(message){
    var message = message.toString();
    $('form').append('<span style="color:red"><br>' +message+'</span>')
  }
  
  return {
    remove: dispose,
    error: diplayError,
    play: load
  }
  
})();

"use strict";

function sanitizeInput(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

var Snd = (function(genre){
  
  var self = this;

  var inputGenre = genre;
  
  var dispose = function(element){
    $(element).empty()
  };

  var displayError = function(errorCode){
    dispose("#error");
    var errorMessages = [
      "No song found under " +inputGenre,
      "You didn't enter any genre"
    ];
    $('#error').append(errorMessages[Number(errorCode)]);
  };
  
  var widgetSetup = function(){
    $('iframe').attr('sandbox', 'allow-same-origin allow-scripts');
    var iframe = $('iframe')[0], widget = SC.Widget(iframe);
    widget.bind(SC.Widget.Events.READY, function(){
      widget.bind(SC.Widget.Events.FINISH, function(){
        load();
        setVolume(20);
      });
    });
  };
  
  var load = function(){
  
    SC.initialize({
      client_id: '762b8d030947ba97c00769ffb6c5e61e'
    });
    
    SC.get(
        '/tracks', 
        
        { genres: inputGenre },

        function(tracks, error) {

          if (error){
            displayError(0);
          }else{
            
            var random = Math.floor(Math.random() * tracks.length);
            dispose("#error");
            dispose("#info");
            document.title = tracks[random].genre + " : " + tracks[random].title ;
            var track_url = tracks[random].permalink_url;
            
            SC.oEmbed(
              track_url, 
              {
                auto_play: true, 
                color: "#ff0066", 
                show_comments: false, 
                download:true,
                show_artwork:true
              },
              $("#target")[0]
            );
            
            if(tracks[random].description){
              $('#info').empty().append("<strong>Song Description:</strong> <br>" +tracks[random].description);
            };
            
            setTimeout(widgetSetup, 5000);
            
          }
      });
    
  };
  
  return {
    error: displayError,
    play: load
  }
  
});

(function(){
  $("form").on("submit", function(e){
    e.preventDefault();
    var myGenre = sanitizeInput($("#genre").val().trim().toLowerCase());
    
    var app = new Snd(myGenre);
    
    if(myGenre == null || myGenre.length == 0){
      app.error(1);
    }else{
      app.play();
    }
  });
})();

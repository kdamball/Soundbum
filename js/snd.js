"use strict";

var Snd = (function(){
  
  self = this;
  
  
  
  var displayError = function(errorCode){
    var errorMessages = [
      "No song found under "+myGenre,
      "You didn't enter any genre"
    ];
    var message = message.toString();
    $('#error').append(errorMessage[errorCode])
  };
  
  var dispose = function(element){
    $(element).empty()
  }
  
  var widgetSetup = function(){
    var iframe = $('iframe')[0], widget = SC.Widget(iframe);
    widget.bind(SC.Widget.Events.READY, function(){
      widget.bind(SC.Widget.Events.FINISH, function(){
        self.play()
      });
    });
  };
  
  var load = function(){
    SC.initialize({
      client_id: '762b8d030947ba97c00769ffb6c5e61e'
    });
    
    SC.get(
        '/tracks', 
        
        { genres: myGenre },
        
        function(tracks, error) {

          if (error){
          
            self.error(0);
            
          }else{
            
            var random = Math.floor(Math.random() * tracks.length);
            self.remove("#error")
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
              $('#info').empty().append("Song Description: " +tracks[random].description);
            }
            
            $('iframe').attr('sandbox', 'allow-same-origin');
            
            setTimeout(widgetSetup, 2000);
            
          }
      });
    
  };
  
  return {
    remove: dispose,
    error: diplayError,
    play: load
  }
  
})();


(function(){
  $("form").on("submit", function(){
  
    var myGenre = $("#genre").val();
    
    if(myGenre == null || myGenre.length< 0){
      app.error(1);
    }else{
      app.play();
    }
  });
})();

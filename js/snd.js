"use strict";

var Snd = (function(){
  
  var self = this;
  var clear = function(message){
    $('form > span').remove();
    if(message){
      message = message.toString();
      $('form').append('<span style="color:red"><br>' +message+'</span>')
    }
  };
  
  var display = function(){
  
    
    
    SC.initialize({
      client_id: '762b8d030947ba97c00769ffb6c5e61e'
    });
    var playMusic = function (tracks){
      var random = Math.floor(Math.random() * tracks.length);
      self.remove();
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
      
      
      $('iframe').attr('sandbox', 'allow-same-origin');
      var widgetSetup = function(){
        var iframe = $('iframe')[0], widget = SC.Widget(iframe);
        widget.bind(SC.Widget.Events.READY, function(){
          widget.bind(SC.Widget.Events.FINISH, function(){
            playMusic();
          });
        });
      };
      
      
      setTimeout(widgetSetup, 2000);
      
      if(tracks[random].description){
        $('#info').empty().append("Song Description: " +tracks[random].description);
      }
    }
    
    SC.get(
        '/tracks', 
        
        { genres: myGenre, bpm: { from: 120 } },
        
        function(tracks, error){
          if (error){
            self.remove("Sorry, couldn't find any songs under " +myGenre);
            document.title = "No Song Found";
            return;
          }else{
            playMusic(tracks);
          }
        }
    );
  };
  
  return {
    remove: clear,
    play(): display
  }
});



(function(){
  $('form').on('submit', function(e){
    var myGenre = $('#genre').val();
    e.preventDefault();
    var app = new Snd();
    if (myGenre == null || myGenre.length == 0){
      app.remove("You didn't enter any genre");
    } 
    else if (myGenre.length >= 1){
      app.play();
    }
      
  });
})();

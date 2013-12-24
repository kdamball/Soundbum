(function(){
  $('form').on('submit', function(){
  
    var myGenre = $('#genre').val();
    //for errors
    function remove(message){
      $('form > span').remove();
      if(message){
        message = message.toString();
        $('form').append('<span style="color:red"><br>' +message+'</span>')
      }
    }
      
    if (myGenre == null || myGenre.length == 0){
      remove("You didn't enter any genre");
    }
    
    else if (myGenre.length >= 1){
      SC.initialize({
        client_id: '762b8d030947ba97c00769ffb6c5e61e'
      });
      
      SC.get(
        '/tracks', 
        
        { genres: myGenre, bpm: { from: 120 } },
        
        function(tracks, error) {
          var random = Math.floor(Math.random() * tracks.length);
          if (error){
            remove("Sorry, couldn't find any songs under " +myGenre);
            document.title = "No Song Found";
            return;
          }else{
            remove();
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

            //just for the sake of it (future feature??)
            var hist = {foo: SC.oEmbed(track_url, {auto_play: true, color: "#ff0066"})};
            history.pushState(hist, tracks[random].title, ""); 
            
          }
        }
      );
    }
      
  });
})();

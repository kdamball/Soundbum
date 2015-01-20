(function(){
  function sanitizeInput(input) {
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
  
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
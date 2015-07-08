var snd = angular.module("Snd", []);

snd.controller("SearchController", ["$scope", "SndFactory", function($scope, SndFactory){
    $scope.search = function(){
        SndFactory.getSongs($scope.genre)
    }

}]).controller("SongsController", ["$scope", "SndFactory", "PlayService", function($scope, SndFactory, PlayService){
    $scope.songs = SndFactory.songs;

    $scope.playSong = function(song){
        PlayService.play(song);
    };

}]).service("PlayService", ["$rootScope", function($rootScope){
    
    this.play = function (song){
        SC.oEmbed(
          song.permalink_url, 
          {
            auto_play: true, 
            color: "#ff0066", 
            show_comments: false, 
            download:true,
            show_artwork:true
          },
          document.getElementById("player")
        );

        $rootScope.description = song.description;
    }

}]).factory("SndFactory", ["$rootScope", "$q", function($rootScope, $q){
    SC.initialize({
      client_id: '762b8d030947ba97c00769ffb6c5e61e'
    });

    var Snd = {};

    Snd.songs = {}

    Snd.getSongs = function(genre){
        SC.get(
        '/tracks',
        
        { genres: genre },

        function(tracks, error) {
          
          if (error){
            $rootScope.error = "We had a problem with getting songs";
          }else{
            $rootScope.error = "";

            Snd.songs.list = tracks.slice(0,10);

            console.log(tracks[0])

            //force update on new search
            $rootScope.$apply()

            // document.title = tracks[random].genre + " : " + tracks[random].title ;
            
          }
      });
    }

    return Snd;
}])
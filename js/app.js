var snd = angular.module("Snd", []);

snd.controller("SearchController", ["$scope", "$rootScope", "SndFactory", function($scope, $rootScope, SndFactory){
    $scope.search = function(){
        SndFactory.getSongs($scope.genre)
            .then(function(songs){
                SndFactory.sndScope.$emit('songsReceived', songs);
                $rootScope.error = "";
            }).catch(function(error){
                $rootScope.error = "We had a problem with getting songs";
            });
    }

}]).controller("SongsController", ["$scope", "SndFactory", "PlayService", function($scope, SndFactory, PlayService){
    
    SndFactory.sndScope.$on('songsReceived', function(msg, songs){
        $scope.songs = songs;
    });

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

}]).factory("SndFactory", ["$q", "$rootScope", function($q, $rootScope){

    SC.initialize({
      client_id: '762b8d030947ba97c00769ffb6c5e61e'
    });

    var Snd = {
        sndScope: $rootScope.$new()
    };

    Snd.getSongs = function(genre){
        return $q(function(res, rej){
            SC.get(
                '/tracks',

                { 
                  genres: genre,
                  limit: 100
                },

                function(tracks, error) {

                    if (error || tracks.length === 0){
                        rej(error);
                    }else{
                        
                        var startplace = Math.floor(Math.random()*(tracks.length-10));
                        res(tracks.slice(startplace, startplace+10))
                    }
            });
        });
    }

    return Snd;
}])
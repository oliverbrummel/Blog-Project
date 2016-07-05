angular.module('openApp', [])
  .controller('MainController', ['$http', function($http){
    var vm = this;
    vm.latitude;
    vm.longitude;

    vm.enterZip = function(){
      $http.get('/zipcodeApi/'+ vm.zipcode)
        .then(function(response){
          vm.latitude = response.data.lat;
          vm.longitude = response.data.lng;
          console.log('vm.latitude = ',vm.latitude);
          console.log('vm.longitude = ',vm.longitude);
          initialize();
        })
    }


      function initialize(){
// [[[[[[[[[[[[[[]]]]]]]]]]]]]]
          var mapLocation = new google.maps.LatLng(vm.latitude, vm.longitude);

          var openPlaces = [];
          // var mapLocation = new google.maps.LatLng(44.999475, -93.241433);

          var mapProp = {
            center: mapLocation,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

          var placesRequest = {
            location: mapLocation,
            radius: '2000',
            types: ['restaurant'],
            keyword: 'restaurant',

          };

          var service = new google.maps.places.PlacesService(map);

          service.nearbySearch(placesRequest, function(results, status) {
            if(status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {

                var listedHours = results[i].opening_hours;
                if(typeof listedHours != 'undefined' && listedHours.open_now === true){
                  openPlaces.push(results[i]);
                  var place = results[i];
                  console.log('place:', place);
                  var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                  });
                }

              }
              console.log('openPlaces:', openPlaces);
            }
          })//nearbySearch


      }


      google.maps.event.addDomListener(window, 'load', initialize);
  }]);

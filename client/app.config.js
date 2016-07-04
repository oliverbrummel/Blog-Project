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
          var mapProp = {
            // center: new google.maps.LatLng(44.9778, -93.2650),
            center: new google.maps.LatLng(vm.latitude, vm.longitude),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      }
      // google.maps.event.addDomListener(window, 'load', initialize);

  }]);

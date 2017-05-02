
  //Deklarasi Taruh Diatas
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');

        var input = document.getElementById('pac-input');
        var coba = document.getElementById('coba');
        var kotak = document.getElementById('info');

        var placename = document.getElementById('place-name');
        var placeaddress = document.getElementById('place-address');
        var phone = document.getElementById('phone');
        var website = document.getElementById('website');
        var nmtempat = document.getElementById('nm_tempat');
        var alamat = document.getElementById('alamat');
        var telepon = document.getElementById('telepon');
        var web = document.getElementById('web');

        var c;

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {

          center: {lat: -6.1753924, lng: 106.8249641},
          zoom: 13,
          mapTypeId: 'roadmap'
        });
        // direction autocomplete
        new AutocompleteDirectionsHandler(map);
        // direction autocomplete
        // Create the search box and link it to the UI element.
        var searchBox = new google.maps.places.SearchBox(input);

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(coba);
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(kotak);


        // Bias the SearchBox results towards current map's viewport.
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        autocomplete.addListener('place_changed', function() {
         infowindow.open(map, marker);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          destinationInput.value = input.value;
          //alert(input.value);

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });

          marker.setVisible(true);

          placename.textContent = place.name;
          placeaddress.textContent = place.formatted_address;
          phone.textContent = place.formatted_phone_number;
          website.textContent = place.website;

          nmtempat.textContent = place.name;
          alamat.textContent = place.formatted_address;
          telepon.textContent = place.formatted_phone_number;
          web.textContent = place.website;

          infowindow.setContent(document.getElementById('infowindow-content'));

          infowindow.open(map, marker);
        });
      }

      
      //Fungsi Direction
      function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        //var originInput = document.getElementById('origin-input');
        //var destinationInput = document.getElementById('destination-input');
        //var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }


      //Mengeset filter pada radio button
      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });
      };

      //menampilkan route 
      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          console.log(this.originPlaceId);
          console.log(this.destinationPlaceId);
          return;
        }
        var me = this;

        this.directionsService.route({  
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, 
        function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to' + status);
          }
        });
      };
  
    function tukar(){      
      c = destinationInput.value;
      destinationInput.value = originInput.value;
      originInput.value = c;
    }

    $(document).ready(function(){
        $("#coba").click(function(){
            $("#mode-selector").fadeToggle();
            $("#origin-input").fadeToggle();
            $("#destination-input").fadeToggle();
            $("#tukar").fadeToggle();
        });
    });

    $(document).ready(function(){
        $("#pac-input").change(function(){
            $(".kotak").show();
            $(".infoo").show();
        });
    });
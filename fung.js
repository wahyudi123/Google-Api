
  //Deklarasi Taruh Diatas
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');

        var input = document.getElementById('pac-input');
        var coba = document.getElementById('coba');
        var kotak = document.getElementById('info');
        var kotak2 = document.getElementById('info2');

        var placename = document.getElementById('place-name');
        var placeaddress = document.getElementById('place-address');
        var phone = document.getElementById('phone');
        var website = document.getElementById('website');
        var nmtempat = document.getElementById('nm_tempat');
        var alamat = document.getElementById('alamat');
        var telepon = document.getElementById('telepon');
        var web = document.getElementById('web');

        var foto = document.getElementById('fotolah');

        var c;

      function initAutocomplete() {
        
        var map = new google.maps.Map(document.getElementById('map'), {

          center: {lat: -6.1753924, lng: 106.8249641},
          zoom: 13,
          mapTypeId: 'roadmap'


        });

        var markers;

            function placeMarker(location) {
              if (markers) {
                markers.setPosition(location);

              } else {
                markers = new google.maps.Marker({
                  position: location,
                  map: map
                });
              }

            marker.setVisible(false);
            infowindow.close(map, markers);
            }
        
          $(document).ready(function(){
          google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);

              $(".kotak").slideDown();
              $(".infoo").slideDown();
              $("#distance").hide();
              $(".infoo2").hide();
              $("#mode-selector").hide();
              $("#origin-input").hide();
              $("#destination-input").hide();
              $("#tukar").hide();
   
              
          });
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
          map: map,
          draggable:true
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

          //destinationInput.value = input.value;
          originInput.value = ""; 
          destinationInput.value = "";
          input.value = "";
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
          //website.textContent = place.website;

          nmtempat.textContent = place.name;
          alamat.textContent = place.formatted_address;
          telepon.textContent = place.formatted_phone_number;

          web.textContent = place.website;
          var link = document.createElement("a");
          link.setAttribute("href", web.textContent);
          link.innerHTML = web.textContent;
          // var span = document.createElement("span");
          // span.appendChild(link);
          // document.body.appendChild(span);
          document.getElementById('website').appendChild(link);

          //foto.textContent = place.icon;
          foto = place.photos[0].getUrl({maxWidth: 200, maxHeight: 200});
          // alert(foto.textContent);

              // var img = document.createElement("IMG");
              // img.setAttribute('src', foto + "photo.jpg");

              // document.getElementById('fotolah').appendChild(img);

          var image = document.getElementById("fotolah");
          image.src = foto;


              //foto.removeChild(foto.childNodes[0]);
              //document.getElementById('fotolah').removeChild(img);

            // var photoUrl = place.photos[0].getUrl({maxWidth: 400, maxHeight: 400});
            // var img = document.createElement("img");
            // img.setAttribute('src', photoUrl + "photo.jpg");
            // document.getElementById('place-list').appendChild(img);

          //foto.setAttribute("src", foto.textContent);
          //document.getElementById("foto").appendChild(foto);
          //foto.src = foto.textContent;
          
          
          infowindow.setContent(document.getElementById('infowindow-content'));

          infowindow.close(map, marker);


        });
      }

      
      //Fungsi Direction
      function AutocompleteDirectionsHandler(map) {
        console.log('tes' + this);
        var me = this;
        me.map = map;
        me.originPlaceId = null;
        me.destinationPlaceId = null;
        me.travelMode = 'DRIVING';
        //menentukan direction service dan
        // display yang akan di munculkan di marker
        me.directionsService = new google.maps.DirectionsService;
        me.directionsDisplay = new google.maps.DirectionsRenderer(
          {draggable:true,
          map: map,
          panel: document.getElementById('total')});

        me.directionsDisplay.addListener('directions_changed', function() {
          computeTotalDistance(me.directionsDisplay.getDirections());
          alert("tess");
        });
       

        //hari ini
        // this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        me.setupClickListener('changemode-walking', 'WALKING');
        me.setupClickListener('changemode-transit', 'TRANSIT');
        me.setupClickListener('changemode-driving', 'DRIVING');
        me.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        me.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        

        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }


      //Mengeset filter pada radio button
      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        console.log(this);
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        //alert(me);
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          
          var place = autocomplete.getPlace();
          //alert("testetee"); 
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG'){
            //pengecekan destination yang terlebih dahulu 
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
        this.directionsDisplay.setMap(map);
        this.directionsService.route({  
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode,
          avoidTolls: true
        },
        function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to' + status);
          }
        });
      };

      function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        //alert(myroute);
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
      }
  
    function tukar(){      
      c = destinationInput.value;
      destinationInput.value = originInput.value;
      originInput.value = c;
    }

    $(document).ready(function(){
        $("#coba").click(function(){
            $(".kotak").slideDown();
            $("#mode-selector").slideDown();
            $("#origin-input").slideDown();
            $("#destination-input").slideDown();
            $("#tukar").slideDown();
           $("#distance").slideDown();
            $(".infoo2").slideDown();
            $(".infoo").hide();
           
            
        });
    });

    $(document).ready(function(){
        $("#pac-input").change(function(){
            $(".kotak").slideDown();
            $(".infoo").slideDown();
            $("#distance").hide();
            $(".infoo2").hide();
            $("#mode-selector").hide();
            $("#origin-input").hide();
            $("#destination-input").hide();
            $("#tukar").hide();
           
        });
    });
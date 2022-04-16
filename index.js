function initMap() {
    const dhqg = { lat: 21.0376713, lng: 105.7816301 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: dhqg,
    });
    const marker = new google.maps.Marker({
      position: dhqg,
      map: map,
    });
  }
  
  window.initMap = initMap;
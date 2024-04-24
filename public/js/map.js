mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listings.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(listings.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${listings.location}</h4><p>Exact Location Provided after booking</p>`
    )
)
.addTo(map);

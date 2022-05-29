import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.fitBounds([
    [-87.6818, 42.0485], // southwestern corner of the bounds
    [-87.6679, 42.0625] // northeastern corner of the bounds
    ]);


    const popup_bienen = new mapboxgl.Popup().setHTML(
     '<strong><center>Bienen</center></strong> See <a href="http://localhost:8000/static/room.html" target="_blank" class="link">Practice Rooms</a>'
    );

    const popup_elder = new mapboxgl.Popup().setHTML(
     '<strong><center>Elder</center></strong> See <a href="https://github.com/GarrettWeil/WildHacks2022" target="_blank" title="Opens in a new window" class="link">Practice Rooms</a>'
    );

    const popup_shep = new mapboxgl.Popup().setHTML(
     '<strong><center>Shepard</center></strong> See <a href="https://github.com/GarrettWeil/WildHacks2022" target="_blank" title="Opens in a new window" class="link">Practice Rooms</a>'
    );

    const popup_willard = new mapboxgl.Popup().setHTML(
     '<strong><center>Willard</center></strong> See <a href="https://github.com/GarrettWeil/WildHacks2022" target="_blank" title="Opens in a new window" class="link">Practice Rooms</a>'
    );

    const popup_plex = new mapboxgl.Popup().setHTML(
     '<strong><center>Plex</center></strong> See <a href="https://github.com/GarrettWeil/WildHacks2022" target="_blank" title="Opens in a new window" class="link">Practice Rooms</a>'
    );

    const popup_chapin = new mapboxgl.Popup().setHTML(
     '<strong><center>Chapin</center></strong> See <a href="https://github.com/GarrettWeil/WildHacks2022" target="_blank" title="Opens in a new window" class="link">Practice Rooms</a>'
    );

    const popup_slivka = new mapboxgl.Popup().setHTML(
     '<strong><center>Slivka</center></strong> See <a href="https://github.com/GarrettWeil/WildHacks2022" target="_blank" title="Opens in a new window" class="link">Practice Rooms</a>'
    );

    // create DOM element for the marker
    var el = document.createElement('div');
    //el.innerHTML = "Bienen";
    el.id = 'marker';
    el.icon = 'music-11.svg'


    const bienen = new mapboxgl.Marker().setLngLat([-87.6715, 42.0519]).setPopup(popup_bienen).addTo(map);

    const elder = new mapboxgl.Marker().setLngLat([-87.67788796493683, 42.06126750075559]).setPopup(popup_elder).addTo(map);
    const shep = new mapboxgl.Marker().setLngLat([-87.67890421555978, 42.05105751307834]).setPopup(popup_shep).addTo(map);
    const willard = new mapboxgl.Marker().setLngLat([-87.6811524505949, 42.051683857238636]).setPopup(popup_willard).addTo(map);
    const plex = new mapboxgl.Marker().setLngLat([-87.67865989407854, 42.0529281931598]).setPopup(popup_plex).addTo(map);
    const chapin = new mapboxgl.Marker().setLngLat([-87.68130238318464, 42.0511357886299]).setPopup(popup_chapin).addTo(map);
    const slivka = new mapboxgl.Marker().setLngLat([-87.675732321229, 42.06055290140624]).setPopup(popup_slivka).addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
      <a href="http://localhost:8000/static/sso-covid.html" style={{position:"absolute", bottom:0, left:0}}>
        <img src="http://localhost:8000/static/covid.png" width= "70" height="70" alt="covid logo"/>
      </a>
    </div>
  );
};

export default Map;

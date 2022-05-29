import React, { useRef, useEffect, useState } from 'react';
import './Bienen.css';
import mapboxgl from 'mapbox-gl';
import bienen from './bienen.jpeg'

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

var dict = {
  "room1": [3, 6],
  "room2": [2.4, 4.4],
  "room3": [1.8, 2.8],
  "room4": [1.2, 1.2],
  "room5": [0.6, -0.4],
  "room6": [0, -2],
  "room7": [-0.6, -3.6],
  "room8": [-1.2, -5.2],
  "room9": [-1.8, -6.8],
  "room10": [-2.4, -8.4],
  "room11": [-3, -10],
  "room12": [0, -17.5],
  "room13": [-2.5, -17.5],
  "room14": [-5, -17.5],
  "room15": [-7.5, -17.5],
  "room16": [-10.2, -17.5],
  "room17": [-12.7, -17.5],
  "room18": [-15.4, -17.5],
  "room19": [-17.9, -17.5],
  "room20": [-20.6, -17.5],
  "room21": [-23.1, -17.5],
  "room22": [-25.8, -17.5],
  "room23": [-28.3, -17.5],
  "room24": [-31, -17.5],
  "room25": [-34, -17.5]
};



const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const bounds = [[-40, -23],
          [40, 23]
  ];

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });
  map.setMaxBounds(bounds);

// int width = 100
// int height = 100
// int topx = -150
// int topy = 75

    map.on('load', () => {
      map.addSource('radar', {
          'type': 'image',
          'url': bienen, // not correct
          'coordinates': [[-40, 23], //top left
              [40, 23], //top right
              [40, -23], //bottom right
              [-40, -23]] //bottom left
      });
      map.addLayer({
          id: 'radar-layer',
          'type': 'raster',
          'source': 'radar',
          'paint': {
              'raster-fade-duration': 0
          }
      });
  });

    //function change_color(position){

    //}

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // create DOM element for the marker
    var green = document.createElement('div');
    //el.innerHTML = "Bienen";
    green.id = 'marker1';
    green.icon = 'music-11.svg'



    var red = document.createElement('div');
    //el.innerHTML = "Bienen";
    red.id = 'marker2';
    var l1 = new mapboxgl.Marker({color: "green"}).setLngLat([3, 6]).addTo(map);

    var l2 = new mapboxgl.Marker({color: "green"}).setLngLat([2.4, 4.4]).addTo(map);

    var l3 = new mapboxgl.Marker({color: "green"}).setLngLat([1.8, 2.8]).addTo(map);

    var l4 = new mapboxgl.Marker({color: "green"}).setLngLat([1.2, 1.2]).addTo(map);
    var l5 = new mapboxgl.Marker({color: "green"}).setLngLat([0.6, -0.4]).addTo(map);
    var l6 = new mapboxgl.Marker({color: "green"}).setLngLat([0, -2]).addTo(map);
    var l7 = new mapboxgl.Marker({color: "green"}).setLngLat([-0.6, -3.6]).addTo(map);
    var l8 = new mapboxgl.Marker({color: "green"}).setLngLat([-1.2, -5.2]).addTo(map);
    var l9 = new mapboxgl.Marker({color: "green"}).setLngLat([-1.8, -6.8]).addTo(map);

    var l10 = new mapboxgl.Marker({color: "green"}).setLngLat([-2.4, -8.4]).addTo(map);
    var l11 = new mapboxgl.Marker({color: "green"}).setLngLat([-3, -10]).addTo(map);


    var m2 = new mapboxgl.Marker({color: "red"}).setLngLat([0, -17.5]).addTo(map);

    var m3 = new mapboxgl.Marker({color: "red"}).setLngLat([-2.5, -17.5]).addTo(map);

    var m4 = new mapboxgl.Marker({color: "red"}).setLngLat([-5, -17.5]).addTo(map);

    var m5 = new mapboxgl.Marker({color: "red"}).setLngLat([-7.5, -17.5]).addTo(map);

    var m6 = new mapboxgl.Marker({color: "red"}).setLngLat([-10.2, -17.5]).addTo(map);

    var m7 = new mapboxgl.Marker({color: "red"}).setLngLat([-12.7, -17.5]).addTo(map);

    var m8 = new mapboxgl.Marker({color: "red"}).setLngLat([-15.4, -17.5]).addTo(map);
    var m9 = new mapboxgl.Marker({color: "red"}).setLngLat([-17.9, -17.5]).addTo(map);
    var m10 = new mapboxgl.Marker({color: "red"}).setLngLat([-20.6, -17.5]).addTo(map);
    var m11 = new mapboxgl.Marker({color: "red"}).setLngLat([-23.1, -17.5]).addTo(map);
    var m12 = new mapboxgl.Marker({color: "red"}).setLngLat([-25.8, -17.5]).addTo(map);
    var m13 = new mapboxgl.Marker({color: "red"}).setLngLat([-28.3, -17.5]).addTo(map);
    var m14 = new mapboxgl.Marker({color: "red"}).setLngLat([-31, -17.5]).addTo(map);
    var m15 = new mapboxgl.Marker({color: "red"}).setLngLat([-34, -17.5]).addTo(map);






    //for (var i = 0; i<positions.length;i++){
    // var marker = new mapboxgl.Marker({
    //    color: "green"//needs to be mapped , draggable = false
    //}).setLngLat(positions[i][0],positions[i][1]).addTo(map);
    //}

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;

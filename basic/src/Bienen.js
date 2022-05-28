import React, { useRef, useEffect, useState } from 'react';
import './Bienen.css';
import mapboxgl from 'mapbox-gl';
import bienen from './bienen.jpeg'

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

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
    </div>
  );
};

export default Map;

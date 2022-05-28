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

    const bienen = new mapboxgl.Marker().setLngLat([-87.6715, 42.0519]).addTo(map);
    const elder = new mapboxgl.Marker().setLngLat([-87.67788796493683, 42.06126750075559]).addTo(map);
    const shep = new mapboxgl.Marker().setLngLat([-87.67890421555978, 42.05105751307834]).addTo(map);
    const willard = new mapboxgl.Marker().setLngLat([-87.6811524505949, 42.051683857238636]).addTo(map);
    const plex = new mapboxgl.Marker().setLngLat([-87.67865989407854, 42.0529281931598]).addTo(map);
    const chapin = new mapboxgl.Marker().setLngLat([-87.68130238318464, 42.0511357886299]).addTo(map);
    const slivka = new mapboxgl.Marker().setLngLat([-87.675732321229, 42.06055290140624]).addTo(map);

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

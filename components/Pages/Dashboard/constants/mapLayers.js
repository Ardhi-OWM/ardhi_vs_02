// ardhi_1224/components/pages/Dashboard/MapComponent/mapLayers.js

export const mapLayers = [
    {
        name: "OpenStreetMap",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        default: true,
    },
    {
        name: "OSM Bright",
        url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
    },
    {
        name: "Google Maps Satellite",
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    },
    {
        name: "Carto Light",
        url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    },

    {
        name: "Stamen Terrain",
        url: "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",
    },
    {
        name: "Alidade Smooth",
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    },
    {
        name: "Alidade Smooth Dark",
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    },
    {
        name: "Alidade Satellite",
        url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg",
    },
    {
        name: "Stadia Outdoors",
        url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
    },
    {
        name: "Stamen Watercolor",
        url: "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
    },
    {
        name: "Stamen Toner Lite",
        url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
    },
    {
        name: "Esri World Imagery",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}",
    },
    /*
      {
          name: 'Thunderforest Outdoors',
          url: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=YOUR_THUNDERFOREST_API_KEY',
      },
      {
          name: 'Mapbox Streets',
          url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN',
      }, */
];

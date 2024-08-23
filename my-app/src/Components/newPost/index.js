import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Select from 'react-select';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";
import markerIcon_all from "../../assets/cluster-pin-large.png";
import markerIcon_point from "../../assets/punct-pin-large.png";
import markerIcon_other from "../../assets/cluster-pin-large_shop.png";

const NovaPoshtaPage = () => {
    const apiKey = "63aa362a44e812e38243bd8fb803b606";
    const [areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const markerMapRef = useRef(new Map()); // Додаємо Map для зберігання маркерів

    useEffect(() => {
        displayMap([]);
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            const areasData = await getAreas();
            setAreas(areasData);
        }
        fetchAreas();
    }, []);

    useEffect(() => {
        if (selectedArea) {
            const fetchCities = async () => {
                const citiesData = await getCities(selectedArea.Ref);
                setCities(citiesData);
            }
            fetchCities();
        }
    }, [selectedArea]);

    useEffect(() => {
        if (selectedCity) {
            const fetchWarehouses = async () => {
                const warehousesData = await getWarehouses(selectedCity.Ref);
                setWarehouses(warehousesData);
                displayMap(warehousesData);
            }
            fetchWarehouses();
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedWarehouse && mapRef.current) {
            const marker = markerMapRef.current.get(selectedWarehouse.Ref);
            if (marker) {
                mapRef.current.setView(marker.getLatLng(), 40); // Центруємо карту на вибране відділення
                marker.openPopup(); // Відкриваємо попап для вибраного маркера
            }
        }
    }, [selectedWarehouse]);

    const getAreas = async () => {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "getAreas"
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    }

    const getCities = async (areaRef) => {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {
                    AreaRef: areaRef
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }

    const getWarehouses = async (cityRef) => {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: apiKey,
                modelName: "AddressGeneral",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: cityRef
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching warehouses:", error);
        }
    }

    const displayMap = (warehouses) => {
        if (mapRef.current) {
            mapRef.current.remove();
        }

        const map = L.map('map').setView([48.3794, 31.1656], 6);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const markers = L.markerClusterGroup();
        const bounds = [];

        // Очищаємо старі маркери
        markersRef.current = [];
        markerMapRef.current = new Map();

        warehouses.forEach(warehouse => {
            const statusEmoji = warehouse.WarehouseStatus === 'Working' ? "🟢" : "🔴";
            const popupContent = `<b>${warehouse.Description}</b><br>
                           <br><strong>Address:</strong> ${warehouse.ShortAddress}<br>
                           <strong>Status:</strong> ${warehouse.WarehouseStatus} ${statusEmoji}`;

            const marker = L.marker([warehouse.Latitude, warehouse.Longitude], {
                icon: iconmap(warehouse.Description)
            }).bindPopup(popupContent);

            markers.addLayer(marker);
            markersRef.current.push(marker);
            markerMapRef.current.set(warehouse.Ref, marker); // Додаємо маркер до Map
            bounds.push([warehouse.Latitude, warehouse.Longitude]);
        });

        map.addLayer(markers);

        if (bounds.length > 0) {
            map.fitBounds(bounds);
        }
    }

    return (
        <>
            <h1>NovaPost API</h1>

            <div className="primary-button mt-4">
                <em>Select Area:</em>
                <Select
                    value={selectedArea == null ? "" : selectedArea}
                    onChange={(selectedOption) => {
                        setSelectedArea(selectedOption);
                        setSelectedCity(null);
                        setSelectedWarehouse(null);
                    }}
                    getOptionLabel={option => option.Description}
                    getOptionValue={option => option.Ref}
                    options={areas}
                />

                {selectedArea && (
                    <div style={{marginLeft: '20px'}}>
                        <em>Select City:</em>
                        <Select
                            value={selectedCity == null ? "" : selectedCity}
                            onChange={(selectedOption) => {
                                setSelectedCity(selectedOption);
                                setSelectedWarehouse(null);
                            }}
                            getOptionLabel={option => option.Description}
                            getOptionValue={option => option.Ref}
                            options={cities}
                        />
                    </div>
                )}

                {selectedCity && (
                    <div style={{marginLeft: '20px'}}>
                        <em>Select Warehouse:</em>
                        <Select
                            value={selectedWarehouse == null ? "" : selectedWarehouse}
                            onChange={(selectedOption) => {
                                setSelectedWarehouse(selectedOption);
                            }}
                            getOptionLabel={option => option.Description}
                            getOptionValue={option => option.Ref}
                            options={warehouses}
                        />
                    </div>
                )}

            </div>

            <div id="map" style={{height: "490px", marginTop: "20px", zIndex: 0}}></div>
        </>
    )
}

export default NovaPoshtaPage;




const customMarkerIcon_point = L.icon({
        iconUrl: markerIcon_point,
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
        const customMarkerIcon_parcel = L.icon({
        iconUrl: markerIcon_all,
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
        const customMarkerIcon_other = L.icon({
        iconUrl: markerIcon_other,
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
        const iconmap = (type) => {
        if (type.includes("Поштомат")) {
            return customMarkerIcon_parcel;
        } else if (type.includes("Відділення")) {
            return customMarkerIcon_point;
        } else {
            return customMarkerIcon_other;
        }};

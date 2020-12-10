import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import API from '../api';
import Utils from './utils';
import {store} from 'react-notifications-component';
import 'animate.css/animate.min.css';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Room } from '@material-ui/icons';
import { Settings } from './settings';


interface Markers {
    [techName : string] : mapboxgl.Marker
}

export interface Technician {
    name : string,
    bearing : number,
    coordinates : number[]
}

export default function MapRender() {
    const [lastGetTechnicians, setLastGetTechnicians] = useState<Technician[]>([]);
    const [solarFarmId, setSolarFarmId] = useState<number>(1);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [map, setMap] = useState<mapboxgl.Map>();
    const [markers, setMarkers] = useState<Markers>({});
    const [requestingData, setRequestingData] = useState<boolean>(false);
    const [[errorType, errorMessage], setError] = useState(['', '']);
    const [lastTimeUpdated, setLastTimeUpdated] = useState<number>(0);

   let mapContainer : HTMLElement | string = "";
   let intervalId : NodeJS.Timeout | null;
   

   useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiZ29vcGl0eWdvb3Bnb29wIiwiYSI6ImNraWRranFtcDFkYjkycG1ndjg3aGZzZGQifQ.xO-MMAxkMbT-o68hcU1xag";
        setMap(new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-115.606391900599817, 32.673693943392962],
            zoom: 9
        }));
   }, []);

   useEffect(() => {
       if(!settingsOpen && map && !errorMessage) {
            intervalId = setInterval(() => {
                requestUpdatedData();
            }, 5000);
            requestUpdatedData();
        }

        return () => {
            if(intervalId)
                clearInterval(intervalId);
            intervalId = null;
        };
   }, [settingsOpen, map, errorMessage]);


   async function requestUpdatedData() {
        setRequestingData(true);
        try {
            const getData = await API.getInstance().getTechnicians(solarFarmId);
            console.log(getData);
            if(!getData || !getData["features"])
            {
                setError(['get', 'No data found']);
                return;
            }
            if(errorType == 'get')
                setError(['', '']);
            
            const technicians = getData["features"];
            const currentTime = technicians.length == 0 ? lastTimeUpdated : technicians[0]["properties"]["tsecs"];
            console.log('technicians legnth: ' + technicians.length + " last technicians lenth: " + lastGetTechnicians.length + " current time: " + currentTime + " kast tuneL " + lastTimeUpdated)
            if(technicians.length === lastGetTechnicians.length && currentTime === lastTimeUpdated) {
                return;
            }
            setLastTimeUpdated(currentTime);
            addMarkers(technicians);
            checkForNotifications(technicians);
        }
        catch(err) {
            setError(['get', err.message ? err.message : err]);
            console.log(err);
        }
        finally {
            setRequestingData(false);
        }
    }
    
    const addMarkers = (technicians : []) => {      
        lastGetTechnicians.length = 0;
        let namesTaken : {[name: string] : boolean} = {};
        let bounds = new mapboxgl.LngLatBounds();
        for(let i = 0; i < technicians.length; i++) {
            const tech = technicians[i];
            const name = tech["properties"]["name"];
            const bearing = tech["properties"]["bearing"];
            const secs = tech["properties"]["tsecs"];
    
            const coordinates : number[] = tech["geometry"]["coordinates"];
            namesTaken[name] = true;

            if(!markers[name]) {
                markers[name] = new mapboxgl.Marker().setLngLat([coordinates[0], coordinates[1]]).addTo(map || new mapboxgl.Map());
            }
    
            let marker : mapboxgl.Marker = markers[name];
            marker.setLngLat([coordinates[0], coordinates[1]]);
            marker.setPopup(new mapboxgl.Popup().setHTML(`
                <h3>${name}</h3> 
                <p><strong>Bearing:</strong> ${bearing}</p> 
            `));
    
            bounds.extend([coordinates[0], coordinates[1]]);
    
            const newTech : Technician = {name: name, bearing: bearing, coordinates: coordinates};
            lastGetTechnicians.push(newTech);
        }

        let keys = Object.keys(markers);
        for(let ind in keys) {
            let name = keys[ind];
            if(!namesTaken[name]) {
                let marker : mapboxgl.Marker = markers[name];
                marker.remove();
                delete markers[name];
            }
        }

        setMarkers(markers);

        setLastGetTechnicians(lastGetTechnicians);
        if(technicians.length > 0)
            map.fitBounds(bounds, {padding: 100});
    }
    
    const checkForNotifications = (allTechs : [] = []) => {
        for(let i = 0; i < lastGetTechnicians.length; i++) {
            for(let j = i + 1; j < lastGetTechnicians.length; j++) {
                const coord1 = lastGetTechnicians[i].coordinates;
                const coord2 = lastGetTechnicians[j].coordinates; 
                const tech1Name = allTechs[i]["properties"]["name"];
                const tech2Name = allTechs[j]["properties"]["name"];
                const dist = Utils.getDistanceFromLatLonInKm(coord1[1], coord1[0], coord2[1], coord2[0]);
                if(dist * 1000 <= 304.8) {
                    store.addNotification({
                        title: "Techncians will meet",
                        message: `Technicians ${tech1Name} and ${tech2Name} are about to meet. Do with this what you will!`,
                        type: "info",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                      });
                }
            }
        }
    }

    const handleSettingsChanged = (settings) => {
        setSettingsOpen(false);
        if(settings.changed) {
            setSolarFarmId(settings.solarFarmId);
            requestUpdatedData();
        }
    }

    const renderLoading = () => {
        if(requestingData)
        {
            return (
                <Grid item>
                <CircularProgress color="secondary"/>
                </Grid>
                );   
        }
    }

    const renderError = () => {
        if(errorMessage) {
            return <h1 style={{position: 'fixed', transform: 'translate(-50%, -50%)', left: '50%', top: '50%', zIndex: 1, color: 'red'}}>Error: {errorMessage}</h1>;
        }
    }

   return (
       <>
       {
           renderError()
       }
        <div ref={el => mapContainer = el || ''} className="mapContainer" />
        <div style = {{marginTop: '20px', marginLeft: '20px'}}>
                <Grid container spacing = {1}>
                    <Grid item xs={1}>
                        <Button onClick={() => { setSettingsOpen(true); }} startIcon={<SettingsIcon/>} variant="contained" color="primary">
                        Settings
                        </Button>
                    </Grid>
                    
                    <Grid item>
                        <Button onClick={() => { API.getInstance().randomizeTechnicianPositions(solarFarmId, lastGetTechnicians); }} startIcon={<Room/>} variant="contained" color="primary">
                            Simulate Position Change
                        </Button>
                    </Grid>    
                    {
                        renderLoading()
                    }
                </Grid> 
                {
                    renderError()
                }    
        </div>
        <Settings isOpen={settingsOpen} currentTechnicians={lastGetTechnicians} 
            solarFarmId={solarFarmId}
            onSettingsChanged={handleSettingsChanged} />
     </>
   );
}

 
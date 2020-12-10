import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Switch, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Technician } from './maprender';
import { ButtonHTMLAttributes, useState } from 'react';
import API from '../api';


export function Settings({isOpen, currentTechnicians, solarFarmId, onSettingsChanged}) {

    const [technicians, setTechnicians] = useState<Technician[]>(currentTechnicians); 

    const handleChangedTechnician = (event) => {
        const id = event.target.id.split('-');
        const val = event.target.value;
        const ind : number = parseInt(id[1]);
        const prop : string = id[2];

        let newArray = [...technicians];
        let tech : Technician = newArray[ind];
        if(prop == "name") {
            tech[prop] = val;
        }
        else if(prop == "bearing") {
            tech[prop] = parseInt(val);
        }
        else if(prop == "long") {
            tech.coordinates[0] = parseFloat(val);
        }
        else {
            tech.coordinates[1] = parseFloat(val);
        }

        setTechnicians(newArray);
    }

    async function handleSettingsChanged (event : React.FormEvent) {
        event.preventDefault();
        await API.getInstance().updateTechnicians(solarFarmId, technicians);
        onSettingsChanged({
            changed: true,
            solarFarmId: solarFarmId,
            technicians: technicians
        });
    }

    const handleSettingsModalClose = () => {
        setTechnicians(currentTechnicians);
        onSettingsChanged({
            changed: false
        });
    }

    const handleDeleteTechnician = (event) => {
        document.querySelectorAll("input").forEach(
            input => (input.value = "")
          );
        let ind = parseInt(event.currentTarget.id.split('-')[1]);
        let newArray = [...technicians];
        newArray.splice(ind, 1);
        setTechnicians(newArray);
    }

    const renderTechnicians = () => {
        if(technicians.length == 0)
            return <Typography gutterBottom> No Technicians </Typography>;
        //NOTE: this key should be a unique id and NOT index
        return technicians.map((item, index) => {
            return (
                <div key={index} style={{marginBottom: '20px'}}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <TextField id={`item-${index}-name`} label={"Technician " + (index + 1)} value={item.name} onChange={handleChangedTechnician} required></TextField>
                        </Grid>
                        <Grid item >
                            <TextField id={`item-${index}-bearing`} style={{width: 100}} label="Bearing" type="number" inputProps={{step: 1, min: 0, max: 360}} value={item.bearing} onChange={handleChangedTechnician} required></TextField>
                        </Grid>
                        <Grid item>
                            <TextField id={`item-${index}-long`} label="Longitude" type="number" inputProps={{step: "any", min: -180, max: 180}} value={item.coordinates[0]} onChange={handleChangedTechnician} required></TextField>
                        </Grid>
                        <Grid item>
                            <TextField id={`item-${index}-lat`} label="Latitude" type="number" inputProps={{step: "any", min: -90, max: 90}} value={item.coordinates[1]} onChange={handleChangedTechnician} required></TextField>
                        </Grid>

                        <Grid item>
                            <IconButton id={`item-${index}-delete`} onClick={handleDeleteTechnician}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        </Grid>
                      
                </div>
            );
        });
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth="md" onClose={handleSettingsModalClose} aria-labelledby="customized-dialog-title" open={isOpen}>
                <DialogTitle id="customized-dialog-title">
                    Settings
                </DialogTitle>
    
                <form onSubmit={handleSettingsChanged}>
                    <DialogContent dividers>
                    <TextField style={{marginBottom: "20px"}} required inputProps={{step: 1}} type="number" label="Solar Farm Id" value={solarFarmId + ""} />
                    {
                        renderTechnicians()
                    }
                    <Button startIcon={<AddIcon />} onClick={() => {
                        setTechnicians([...technicians, {name: "", bearing: 0, coordinates: [0, 0]}]);
                    }}> Add Tech </Button>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={handleSettingsModalClose} color="secondary">
                        Cancel
                    </Button>
                    <Button autoFocus type="submit" color="primary">
                        Save Changes
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>        
        </>
    );
}
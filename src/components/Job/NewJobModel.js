import React, {useState} from "react";
import { Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress} from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';
//import { StreamChat } from 'stream-chat';

const useStyles = makeStyles((theme) => ({
    skillChip:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        cursor: "pointer",

        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
        }
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    }
}));

const initState = {
        title:"",
        type:"Full time",
        companyName:"",
        companyUrl:"",
        location:"Remote",
        link:"",
        description:"",
        skills:[],
}
export default (props) => {
    const [loading, setLoading] = useState(false)
    const [jobDetails, setJobDetails] = useState(initState);

    const handleChange = (e) => {
        e.persist();
        setJobDetails(oldState => ({
            ...oldState, 
            [e.target.name]: e.target.value,
        }));
    };

    const addRemoveSkill = (skill) => 
        jobDetails.skills.includes(skill)
        ? setJobDetails(oldState => ({
            ...oldState,
            skills: oldState.skills.filter((s) => s !== skill),
        }))
        : setJobDetails(oldState => ({
            ...oldState, 
            skills: oldState.skills.concat(skill),
        }));

    const handleSubmit = async () =>{
        for(const field in jobDetails){
            if(typeof jobDetails[field] == 'string' && !jobDetails[field]) return;
        }
        if(!jobDetails.skills.length) return;
        
        setLoading(true);
        await props.postJob(jobDetails);
        closeModel();
    };    

    const closeModel = () =>{
        setJobDetails(initState);
        setLoading(false);
        props.closeModel();
    }
    
    const classes = useStyles();
    const skills =[
        "Javascript",
        "ReactJS",
        "NodeJS",
        "MongoDB",
        "MERN Stack",
        "Android developer",
        "MySQL",
    ];
    console.log(jobDetails);

    return(
        <Dialog open={props.newJobModel} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                   Post Job/Internship
                   <IconButton onClick={closeModel}>
                        <CloseIcon />
                    </IconButton> 
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange={handleChange}
                            name="title"
                            value={jobDetails.title}
                            autoComplete="off" 
                            placeholder="Job/Internship title *" 
                            disableUnderline 
                            fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select 
                            onChange={handleChange}
                            name="type"
                            value={jobDetails.type}
                            disableUnderline 
                            variant="filled" 
                            fullWidth>
                            <MenuItem value ="Full time">Full time</MenuItem>
                            <MenuItem value ="Part time">Part time</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange={handleChange}
                            name="companyName"
                            value={jobDetails.companyName}
                            autoComplete="off" 
                            placeholder="Company name *" 
                            disableUnderline 
                            fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange={handleChange}
                            name="companyUrl"
                            value={jobDetails.companyUrl} 
                            autoComplete="off" 
                            placeholder="Company website *" 
                            disableUnderline 
                            fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select 
                            onChange={handleChange}
                            name="location"
                            value={jobDetails.location}
                            disableUnderline 
                            variant="filled"  
                            fullWidth>
                            <MenuItem value ="Remote">Remote</MenuItem>
                            <MenuItem value ="Work from home">Work from home</MenuItem>
                            <MenuItem value ="In-Office">In-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange={handleChange}
                            name="link"
                            value={jobDetails.link} 
                            autoComplete="off" 
                            placeholder="Job/Internship link *" 
                            disableUnderline 
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput 
                            onChange={handleChange}
                            name="description"
                            value={jobDetails.description}
                            autoComplete="off" 
                            placeholder="Job/Internship description *" 
                            disableUnderline 
                            fullWidth 
                            multiline 
                            rows={5}/>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills *</Typography>
                    <Box display= "flex">
                        {skills.map((skill) =>(
                            <Box onClick={() => addRemoveSkill(skill)} 
                            className={`${classes.skillChip} ${
                                jobDetails.skills.includes(skill) && classes.included
                            }`} 
                            key= {skill}
                            >
                                {skill}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">*Required fields</Typography>
                    <Button 
                        onClick={handleSubmit}
                        variant="contained" 
                        disableElevation 
                        color="primary"
                        disabled={loading}>
                            {loading ? (
                            <CircularProgress color="secondary" size={22}/>
                            ):(
                                "Post"
                            )   
                        }
                        
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
};

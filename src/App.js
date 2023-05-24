import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider, Typography } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModel from "./components/Job/NewJobModel";
//import jobData from './dummyData';
import { firestore, app } from './firebase/config';
import {Close as CloseIcon} from '@material-ui/icons'
import ViewJobModel from "./components/Job/ViewJobModel";


export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModel, setNewJobModel] = useState(false);
  const [viewJob, setViewJob] = useState([]);


  const fetchJobs = async () =>{
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
    .collection('jobs')
    .orderBy('postedOn','desc')
    .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(), 
      id: job.id , 
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setCustomSearch(true);
    setLoading(true);
    const req = await firestore
    .collection('jobs')
    .orderBy('postedOn','desc')
    .where("location",'==', jobSearch.location)
    .where("type",'==', jobSearch.type)
    .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(), 
      id: job.id , 
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJob = async jobDetails => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModel={() => setNewJobModel(true)}/>
       <NewJobModel 
          closeModel = {() => setNewJobModel(false)}
          newJobModel={newJobModel} 
          postJob={postJob} /> 
          <ViewJobModel job={viewJob} closeModel={() =>setViewJob({})}/>
      <Box mb={3}>
      <Grid container justify="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom = {fetchJobsCustom} />

          {
            loading ? (
              <Box display="flex" justifyContent="center"> 
                <CircularProgress />
              </Box>
            ) : (
              <>
             {customSearch &&(
              <Box my={2} display="flex" justifyContent="flex-end">
                <Button onClick={fetchJobs}>
                  <CloseIcon size={20}/>
                  Custom Search
                </Button>
              </Box>
              )}
              {jobs.map((job) => (
              <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
              ))}
              </>
          )}
          
        </Grid>
      </Grid>
      </Box>   
    </ThemeProvider>
  );
};

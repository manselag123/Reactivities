import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity| undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])
  function handleSelectActivity(id: string){
     setSelectActivity(activities.find(x => x.id=== id));
  }
  function handleCancelActivity(){
     setSelectActivity(undefined);
  }
  function handleformOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true );
  }
  function handleformClose(){
       setEditMode(false);
  }
  function handleCreateEditForm(activity:Activity){
    activity.id?
       setActivities([...activities.filter(x => x.id !== activity.id),activity])
      :setActivities([...activities,{...activity,id :uuid()}]);
  }

  function handleDeleteActivity(id:string)
{
   setActivities([...activities.filter(x=>x.id !==id)]);
}  return (
    <> 
      <NavBar  openForm={handleformOpen}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboad activities={activities}
           selectedActivity={selectedActivity}
           selectActivity={handleSelectActivity}
           cancelSelectedActivity={handleCancelActivity}
           editMode ={editMode}
           openForm ={handleformOpen}
           closeForm = {handleformClose}
           createEdit ={handleCreateEditForm}
           deleteActivity={handleDeleteActivity}
           />
      </Container>
    </>
  );
}
export default App;

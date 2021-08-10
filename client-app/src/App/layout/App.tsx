import React, { useState, useEffect, Fragment } from 'react'; 
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from './API/agent';
import LoadingComponet from './LoadingComponet';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity| undefined>(undefined);
  const [editMode, setEditMode] = useState(false); 
  const [loading,setLoading] =useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  useEffect(() => {
    agent.activities.list().then(response => {
      setActivities(response);
      setLoading(false)
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
    setSubmitting(true)
    if (activity.id){
      agent.activities.update(activity).then(()=>{
        setActivities([...activities.filter(x => x.id !== activity.id),activity])
        setEditMode(false)
        setSubmitting(false)
        setSelectActivity(activity)
      })
    }
    else{
      activity.id=uuid()

      agent.activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setEditMode(false) 
        setSubmitting(false)
        setSelectActivity(activity)
      });
    }
     
  }

  function handleDeleteActivity(id:string)
{
  setSubmitting(true)
  agent.activities.delete(id).then(()=>{
    setSubmitting(false) 
    setActivities([...activities.filter(x=>x.id !==id)]);

  })
}  
 
if (loading) return   <LoadingComponet   /> 
return (
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
           submitting ={submitting}
           />
      </Container>
    </>
  );
}
export default App;

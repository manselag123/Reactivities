import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../models/activity'; 
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../forms/ActivityForm';
import ActivityList from './ActivityList';
 
interface Props {
    activities: Activity[];
    selectedActivity : Activity| undefined;
    selectActivity : (id:string) =>void;
    cancelSelectedActivity : () => void;
    editMode: boolean;
    openForm : (id:string)=>void;
    closeForm: ()=>void;
    createEdit: (activity:Activity) =>void;
    deleteActivity :(id:string) => void;
}
export default function ActivityDashboad({ activities ,selectedActivity, selectActivity, deleteActivity,
                                           cancelSelectedActivity,editMode,openForm,closeForm,createEdit}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                 <ActivityList activities ={activities} selectActivity ={selectActivity} deleteActivity ={deleteActivity}  />
            </Grid.Column>
            <Grid.Column width='6'>
                { selectedActivity && !editMode &&
                    <ActivityDetails  activity={ selectedActivity} 
                    cancelSelectedActivity ={cancelSelectedActivity}
                    openForm ={openForm}/> 
                 }
                 {editMode &&
                  <ActivityForm activity={selectedActivity} closeForm={closeForm} createEdit={createEdit} />
                }
                
            </Grid.Column>
        </Grid>
    )
}
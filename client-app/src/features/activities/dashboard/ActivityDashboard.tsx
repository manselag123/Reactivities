import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponet from '../../../App/layout/LoadingComponet';
import { useStore } from '../../../stores/store';
import ActivityFilters from '../details/ActivityFilter';
import ActivityList from './ActivityList'; 

export default observer(function ActivityDashboad() {
  const { activityStore } = useStore();
  const { loadActivities, loadingInitial, activityRegistry } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 0) loadActivities();
  }, [loadActivities,activityRegistry]);
  if (loadingInitial) return <LoadingComponet />
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
       <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
})
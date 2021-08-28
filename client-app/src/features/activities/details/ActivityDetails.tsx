import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponet from '../../../App/layout/LoadingComponet';
import { useStore } from '../../../stores/store';
import ActivityDetailChat from './ActitvityDetailChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetaiInfo from './ActivityDetailInfo';
import ActivityDetailSidbar from './ActivityDetailSidebar';

export default observer(function ActivityDetails() {

  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);
  if (loadingInitial || !activity) return <LoadingComponet />;
  return (
    
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetaiInfo  activity={activity}/>
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidbar />
      </Grid.Column>
    </Grid>
  )
})
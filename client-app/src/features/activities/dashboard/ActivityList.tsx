import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';
import ActivitlyListItme from './ActivityListItem'; 
export default observer(function ActivityList() {
    const { activityStore } = useStore()
    const { activitoesByDate } = activityStore; 
    return (
        <>
           {
                               activitoesByDate.map(activity => {
                                  return  (
                                          <ActivitlyListItme key={activity.id} activity={activity} />
                                         )
                                     })
                            } 
        </>

    );
})
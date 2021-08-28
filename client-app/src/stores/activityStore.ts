import { makeAutoObservable, runInAction } from "mobx";
import agent from "../App/layout/API/agent";
import { Activity } from "../models/activity";
import { v4 as uuidv4 } from 'uuid';
export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    constructor() {
        makeAutoObservable(this)
    }
    setLoadingInitial = (status: boolean) => {
        this.loadingInitial = status;
    }

    setEditMode = (status: boolean) => {
        this.editMode = status;
    }
    get activitoesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }
    get groupedActivites() {
        return Object.entries(
            this.activitoesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date]= activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[Key: string]: Activity[] })
        )
    }
    loadActivities = async () => {

        this.setLoadingInitial(true);
        try {
            const activites = await agent.activities.list();
            activites.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (!activity) {
            this.setLoadingInitial(true);
            try {
                const activity = await agent.activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
        else {
            this.selectedActivity = activity;
            return activity;
        }
    }

    setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingActivity = (status: boolean) => {
        this.loading = status;
    }
    createActiivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuidv4();
        try {
            await agent.activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.setLoadingActivity(false);
                this.setEditMode(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingActivity(false);

            });
        }
    }


    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.setLoadingActivity(false);
                this.setEditMode(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingActivity(false);
            })
        }
    }


    deleteActivity = async (id: string) => {
        this.loading = true;

        try {
            await agent.activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.setEditMode(false);
                this.setLoadingActivity(false);

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingActivity(false);

            })
        }
    }
}
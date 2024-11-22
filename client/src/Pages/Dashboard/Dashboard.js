import React from "react";
import MySchedule from "./MySchedule";
import DietWorkoutChart from "./DietWorkoutChart";
// import MyGoals from "./MyGoals";
import 'react-circular-progressbar/dist/styles.css';
import ProgressCircles from "./ProgressCircles";

function Dashboard ()
{
    const now = new Date();
    const hour = now.getHours();
    const name = localStorage.getItem( "userName" ).split( " " )[ 0 ];
    let greeting;
    if ( hour >= 5 && hour < 12 )
    {
        greeting = "Good Morning";
    } else if ( hour >= 12 && hour < 17 )
    {
        greeting = "Good Afternoon";
    } else if ( hour >= 17 && hour < 21 )
    {
        greeting = "Good Evening";
    } else
    {
        greeting = "Good Night";
    }
    return (
        <div>
            <div className="ml-36 mt-24 font-roboto text-2xl text-white">{ greeting }, { name }</div>
            <div className="h-fit w-max-full ml-52 mt-16 flex flex-col gap-10">
                <div className="text-center w-3/5 text-4xl font-bold h-0 text-white font-outfit">Today's Progress</div>
                <div className="flex items-center justify-between w-full gap-4">
                    <div className="flex gap-8">
                        <div className="w-64 h-64 flex flex-col gap-4 items-center justify-center">
                            <ProgressCircles text={ "Workout" } percentage={ 40 } color="#FF0090" />
                        </div>
                        <div className="w-64 h-64 flex flex-col gap-4 items-center justify-center">
                            <ProgressCircles text={ "Cardio" } percentage={ 80 } color="cyan" />
                        </div>
                        <div className="w-64 h-64 flex flex-col gap-4 items-center justify-center">
                            <ProgressCircles text={ "Calories" } percentage={ 60 } color="yellow" />
                        </div>
                    </div>
                    <MySchedule />
                </div>
                <div className="flex justify-between items-center gap-4">
                        <DietWorkoutChart />
                        {/* <MyGoals /> */}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
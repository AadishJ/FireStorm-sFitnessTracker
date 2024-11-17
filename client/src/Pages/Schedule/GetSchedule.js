import axios from "../../axiosInstance";

async function getSchedule ()
{
    const date = new Date(); // Current date
    const dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    const dayName = dayNames[ date.getDay() ];
    try
    {
        const res = await axios.get( "/schedule", {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                workoutName: localStorage.getItem( "workoutName" ),
                yogaWorkoutName: localStorage.getItem( "yogaWorkoutName" ),
                dietPlanName: localStorage.getItem( "dietPlanName" ),
                cardioWorkoutName: localStorage.getItem( "cardioWorkoutName" ),
                day: dayName,
            }
        });
        return res.data;
    } catch ( err )
    {
        alert(err?.response?.data?.message || "Cannot fetch schedule");
    }
}

export default getSchedule;
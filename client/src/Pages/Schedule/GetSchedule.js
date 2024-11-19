async function getSchedule ( selectedDate, handleLogout,axiosInstance )
{
    const dayName = selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } );
    try
    {
        const res = await axiosInstance.get( "/schedule", {
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
        } );
        return res.data;
    } catch ( err )
    {
        if ( err?.response?.status === 404 )
        {
            alert( err?.response?.data?.message || "Cannot fetch schedule" );
            await handleLogout();
        } else
            alert( err?.response?.data?.message || "Cannot fetch schedule" );
    }
    return null;
}

export default getSchedule;
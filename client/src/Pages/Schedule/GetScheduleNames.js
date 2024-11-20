const GetScheduleNames = async (axiosInstance,handleLogout) =>
{ 
    try
    {
        const res = await axiosInstance.get( "/schedule/names" );
        return res.data;
    } catch ( err )
    {
        if ( err.response.status === 404 )
        {
            alert( err?.response?.data?.message );
            handleLogout();
        } else
        {
            alert( err?.response?.data?.message );
        }
    }
}

export default GetScheduleNames;
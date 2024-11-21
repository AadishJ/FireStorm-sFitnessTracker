function ScheduleCard ({number,schedule})
{
    console.log( schedule );
    console.log(schedule.exercise);
    return (
        <div>
            <div className="bg-anotherPurple w-64 rounded-lg h-20 text-white font-roboto p-2 flex items-center justify-center">
                {schedule.exercise}
            </div>
        </div>
    );
}

export default ScheduleCard;
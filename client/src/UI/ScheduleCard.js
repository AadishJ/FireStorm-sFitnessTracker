function ScheduleCard ({number,schedule})
{
    return (
        <div>
            <div className="bg-anotherPurple w-64 rounded-lg h-20 text-white font-roboto p-2 flex items-center justify-center">
                {schedule.exercise}
            </div>
        </div>
    );
}

export default ScheduleCard;
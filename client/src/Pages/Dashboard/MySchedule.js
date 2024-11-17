import ScheduleCard from "../../UI/ScheduleCard";

function MySchedule ()
{
    return (
        <div>
            <div className="flex flex-col">
                <div className="mr-24 flex flex-col gap-4 font-roboto">
                    <div className="flex text-white items-center justify-between">
                        <div className="">
                            My Schedule
                        </div>
                        <div className="text-xs">
                            View All
                        </div>
                    </div>
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                </div>
            </div>
        </div>
    );
}

export default MySchedule;
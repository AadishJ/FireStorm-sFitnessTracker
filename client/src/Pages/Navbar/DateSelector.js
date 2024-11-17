import { FaCalendarAlt } from "react-icons/fa";
import { useDate } from "../../Context/DateContext";
import moment from "moment/moment";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState, useRef, useEffect } from "react";

function DateSelector() {
    const { selectedDate, changeDate } = useDate();
    const [isOpen, setIsOpen] = useState(false);
    const calendarRef = useRef(null);

    const handleChangeDate = (date) => {
        changeDate(date);
    };

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const date = moment(selectedDate).startOf('day').format("YYYY-MM-DD");

    return (
        <div>
            <div className="flex flex-col">
                <div onClick={toggleCalendar} className="flex gap-2 items-center font-roboto border-2 p-2 rounded-3xl cursor-pointer">
                    <FaCalendarAlt className="" />
                    <div>{date}</div>
                </div>
                {isOpen && (
                    <div ref={calendarRef} className="fixed top-16">
                        <Calendar
                            onChange={handleChangeDate}
                            className="text-black font-roboto"
                            value={selectedDate}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DateSelector;
import React, { useState } from 'react';
import Calendar from 'react-calendar';

const RoomCalendar = ({ onDateSelect, enabledDates = [] }) => {
    const [value, setValue] = useState(new Date());

    const handleChange = (date) => {
        setValue(date);
        onDateSelect(date); // Notify parent component
    };

    const isDateDisabled = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            return !enabledDates.includes(formattedDate); // Disable if not in enabledDates
        }
        return false;
    };

    return (
        <div>
            <Calendar
                onChange={handleChange}
                value={value}
                tileDisabled={isDateDisabled}
            />
        </div>
    );
};

export default RoomCalendar;

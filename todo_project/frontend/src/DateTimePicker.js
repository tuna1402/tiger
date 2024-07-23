import React from 'react';

const DateTimePicker = ({ selectedDate, onChange }) => {
    const formatDate = (date) => {
        return date.toISOString().slice(0, 16);
    };

    const handleChange = (e) => {
        onChange(new Date(e.target.value));
    };

    return (
        <input
            type="datetime-local"
            value={formatDate(selectedDate)}
            onChange={handleChange}
        />
    );
};

export default DateTimePicker;
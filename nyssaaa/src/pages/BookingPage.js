import React, { useState } from 'react';
import RoomCalendar from '../components/RoomCalendar';
import EquipmentForm from '../components/EquipmentForm';
import EmailConfirmationForm from '../components/EmailConfirmationForm';

const BookingPage = () => {
    // Hardcoded data for demo
    const rooms = [
        { id: 1, name: 'Room A' },
        { id: 2, name: 'Room B' },
        { id: 3, name: 'Room C' },
        { id: 4, name: 'Room D' },
        { id: 5, name: 'Room E' },
        { id: 6, name: 'Room F' },
        { id: 7, name: 'Room G' },
    ];

    const demoAvailableSlots = {
        '2024-11-22': ['09:00','10:00' ,'11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
        '2024-11-23': ['09:00','10:00' ,'11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
        '2024-11-29': ['09:00','10:00' ,'11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
        '2024-11-30': ['09:00','10:00' ,'11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
        '2024-12-01': ['09:00','10:00' ,'11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
        '2024-12-02': ['09:00','10:00' ,'11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
    };
    const enabledDates = Object.keys(demoAvailableSlots); // Dates with available slots
    const alternativeDates = {
        '2024-11-22': ['09:00', '11:00', '15:00'],
        '2024-11-23': ['10:00', '14:00', '16:00'],
    }
    const equipment = [
        { id: 1, name: 'Microphone' },
        { id: 2, name: 'Speakers' },
        { id: 3, name: 'Mixer' },
    ];
    
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookingData, setBookingData] = useState(null);
    const [showEmailForm, setShowEmailForm] = useState(true);


    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
        setAvailableSlots(demoAvailableSlots[formattedDate] || []);
    };

    
    const handleBooking = () => {
        if (!selectedSlot || !selectedRoom || !selectedDate) {
            alert('Please complete all fields before booking.');
            return;
        }

        const bookingDetails = {
            roomId: selectedRoom,
            date: selectedDate,
            slot: selectedSlot,
            equipment: selectedEquipment,
        };

        console.log('Booking data:', bookingDetails);
        alert('Booking successful!');

        // Show email confirmation form
        setBookingData(bookingDetails);
        setShowEmailForm(true);
    };
    return (
        <div>
            <h1>Reserva una sala</h1>

            <label>Selecciona la sala:</label>
            <select onChange={(e) => setSelectedRoom(e.target.value)}>
            <option value="">---</option>
                {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                        {room.name}
                    </option>
                ))}
            </select>

            <label>Select Date:</label>
            

            <RoomCalendar
                roomId={selectedRoom}
                onDateSelect={handleDateChange}
                enabledDates={enabledDates}
            />;


                <div>
                <div>
                <h2>Available Time Slots</h2>
                {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedSlot(slot)}
                            style={{
                                backgroundColor: selectedSlot === slot ? 'green' : 'initial',
                                color: selectedSlot === slot ? 'white' : 'initial',
                            }}
                        >
                            {slot}
                        </button>
                    ))
                ) : (
                    <div>
                        <p>No slots available for the selected date. Please select a different date.</p>
                        {alternativeDates.length > 0 && (
                            <div>
                                <h3>Alternative Dates:</h3>
                                <ul>
                                    {alternativeDates.map((alt, index) => (
                                        <li key={index}>
                                            {alt.date}: {alt.slots.join(', ')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

                </div>
            
            <EquipmentForm
            onEquipmentSelect={setSelectedEquipment}
            demoEquipment={equipment} // Pass hardcoded equipment
            />
            
            <button
                onClick={handleBooking}
                disabled={!selectedSlot || !selectedRoom || !selectedDate}
            >
                Book Slot
            </button>

            
        </div>
    );
};

export default BookingPage;

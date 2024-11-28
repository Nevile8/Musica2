import React, { useState, useEffect } from 'react';

const EquipmentForm = ({ onEquipmentSelect, demoEquipment = [] }) => {
    const [equipment, setEquipment] = useState(demoEquipment);

    useEffect(() => {
        // Update equipment if the prop changes
        setEquipment(demoEquipment);
    }, [demoEquipment]);

    const handleEquipmentChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            onEquipmentSelect((prev) => [...prev, value]);
        } else {
            onEquipmentSelect((prev) => prev.filter((item) => item !== value));
        }
    };

    return (
        <div>
            <h2>Select Equipment</h2>
            <ul>
                {equipment.map((item) => (
                    <li key={item.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={item.id}
                                onChange={handleEquipmentChange}
                            />
                            {item.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EquipmentForm;


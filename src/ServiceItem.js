// ServiceItem.js

import React from 'react';

const ServiceItem = ({ service, selectService }) => {
    const handleSelectService = () => {
        selectService(service);
    };

    return (
        <div className="card" onClick={handleSelectService}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
        </div>
    );
};

export default ServiceItem;
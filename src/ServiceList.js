// ServiceList.js

import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services, selectService }) => {
    const handleSelectService = (service) => {
        selectService(service);
    };

    return (
        <div>
            <h2>Available Services</h2>
            {services.map((service) => (
                <ServiceItem key={service.id} service={service} selectService={handleSelectService} />
            ))}
        </div>
    );
};

export default ServiceList;
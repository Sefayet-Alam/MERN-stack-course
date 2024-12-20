import React, { useEffect, useState } from "react";
import { fetchServices } from "../API/api";
import "./Service.css";

const Service = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetchServices();
        setServices(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load services. Please try again later.");
      }
    };

    getServices();
  }, []);

  return (
    <div className="service">
      <h1 className="service-title">Our Services</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="service-list">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))
        ) : (
          <p className="no-services">No services available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Service;

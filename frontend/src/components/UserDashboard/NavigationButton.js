import React from "react";
import "./NavigationButton.css";

const NavigationButton = () => {
    return (
        <div className="navigation-buttons">
            <button className="active">PERFIL</button>
            <button>AGENDA</button>
        </div>
    );
};

export default NavigationButton;

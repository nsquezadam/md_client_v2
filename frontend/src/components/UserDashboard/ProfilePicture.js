import React from "react";
import "./ProfilePicture.css";
import img_dr from "../../assets/img_dr.jpg"

const ProfilePicture = () => {
    return (
        <div className="profile-picture">
            <img
                src={img_dr}
                alt="Foto de perfil"
                className="profile-image"
            />
            <div className="upload-section">
                <label htmlFor="file-upload" className="upload-label">
                    Modificar Foto perfil
                </label>
                <input type="file" id="file-upload" className="upload-input" />
                <button className="upload-button">Subir</button>
            </div>
        </div>
    );
};

export default ProfilePicture;

import React from "react";
import ProfilePicture from "./ProfilePicture";
import UserDetailsForm from "./UserDetailsForm";
import NavigationButton from "./NavigationButton";
import "./UserDashboard.css";

const UserDashboard = () => {
    return (
        <div className="user-dashboard">
           <NavigationButton />
            <div className="content">
                <ProfilePicture />
                <UserDetailsForm />
            </div>
        </div>
    );
};

export default UserDashboard;

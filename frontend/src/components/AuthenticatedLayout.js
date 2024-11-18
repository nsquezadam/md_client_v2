import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const AuthenticatedLayout = ({ children }) => {
    return (
        <div className="authenticated-layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default AuthenticatedLayout;

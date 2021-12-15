import React from 'react';
import { Link } from "react-router-dom";
import sullivanLogoPic from "../images/sullivan-logo.png";

export default function Footer() {
    return (
        <div className="w-full py-8 bg-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <img src={sullivanLogoPic} alt="Sullivan Logo" width="300" />
                <div className="flex gap-8">
                    <p className="text-white">&copy;2021 Sullivan Foundation</p>
                    <Link to="/terms" className="text-white hover:text-orange-300 duration-150">Terms of Service</Link>
                    <Link to="/privacy" className="text-white hover:text-orange-300 duration-150">Privacy Policy</Link>
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./StartNowCTA.module.css";

export default function StartNowCTA() {
    return (
        <div className={styles.startNowCTA}>
            <Link to="/register" className="btn btn-large bg-indigo-600 text-white hover:bg-indigo-700">Start Now</Link>
        </div>
    )
}

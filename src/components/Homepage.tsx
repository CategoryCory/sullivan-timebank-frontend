import React from 'react';
import styles from "./Homepage.module.css";
import helpingHandsPic from "../images/helping.jpg";

export default function Homepage() {
    return (
        <main>
            <div className={styles.homepageHero}>
                <div className="container mx-auto py-8 grid grid-cols-2">
                    <div>
                        <p className="mb-8 text-3xl font-bold">Welcome to the</p>
                        <h1 className="mb-10 text-6xl font-bold leading-normal">Oxford Community Timebank</h1>
                        <p className="mb-6 text-xl">Building Community Through an Alternative Economy</p>
                        <button className="btn btn-large bg-indigo-600 text-white hover:bg-indigo-700">
                            Register in your community
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-2">
                <div>
                    <img src={helpingHandsPic} alt="Helping Hands" className="w-full object-cover" />
                </div>
                <div className="px-8 flex flex-col justify-center gap-8">
                    <h2 className="text-6xl"><span className="text-3xl">About</span><br />Sullivan TimeBank</h2>
                    <p className="text-xl text-indigo-600 lg:text-2xl">Helping others is like money in the bank.</p>
                    <div className="prose lg:prose-lg">
                        <p>
                            TimeBanking is a community program that allows for the exchange of services between members. It is as simple as giving
                            an hour of your time and receiving an hour of help in return. For every hour you spend helping others, you receive
                            one time credit. You can then use your time credit to obtain an hour of assistance for one of your projects.
                        </p>
                        <p>
                            If you don&rsquo;t need help right now, you have the option to donate your credit.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.homepageCTA}>
                <div className="container mx-auto">
                    <h2 className="text-3xl">How the TimeBank</h2>
                    <h2 className="text-5xl">Benefits Your Community</h2>
                    <div className="py-6 prose lg:prose-lg lg:max-w-none">
                        <p>
                            Due to the combination of living in a technologically-driven society and the isolation ensuing from COVID-19 limitations,
                            we are increasingly disconnected from the gift of community. During a time of social distancing and gathering limitations,
                            many of us rediscovered the importance of daily interactions. Transitioning out of the pandemic and back into our
                            neighborhoods, the TimeBank provides a way to foster intentional connection and strengthen bonds with community members.
                        </p>
                        <p>
                            In addition to fostering relationships, the TimeBank meets practical needs in the community, as lawns are mowed and walls
                            are painted. The TimeBank provides the opportunity for community members to sharpen their crafts or rediscover hobbies.
                            Our credit system also allows those recovering from financial hardship a new way to move forward.
                        </p>
                    </div>
                    <button className="btn btn-large bg-indigo-600 text-white hover:bg-indigo-700">Start Now</button>
                </div>
            </div>
        </main>
    )
}

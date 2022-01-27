import React from 'react';
import { Tab } from "@headlessui/react";
import AboutTab from "./AboutTab";
import styles from "./About.module.css";
import FaqTab from './FaqTab';

export default function AboutPage() {
    const tabBaseClasses = "w-full m-2 py-3 font-bold lg:text-lg tracking-wide rounded-lg duration-150";
    const tabInactiveClasses = "hover:bg-indigo-500/10";
    const tabActiveClasses = "bg-indigo-500/20 text-indigo-800";

    return (
        <>
            <div className={styles.aboutHero}>
                <div className="container mx-auto">
                    <h1 className="text-5xl">About the TimeBank</h1>
                </div>
            </div>
            <main className="w-full mt-16">
                <Tab.Group>
                    <Tab.List className="container max-w-[58rem] mx-auto mb-10 flex border-b-2 border-blue-800/20">
                        <Tab 
                            className={({ selected }) => 
                                selected 
                                    ? `${tabBaseClasses} ${tabActiveClasses}`
                                    : `${tabBaseClasses} ${tabInactiveClasses}`
                            }
                        >
                            About the TimeBank
                        </Tab>
                        <Tab 
                            className={({ selected }) => 
                                selected 
                                    ? `${tabBaseClasses} ${tabActiveClasses}`
                                    : `${tabBaseClasses} ${tabInactiveClasses}`
                            }
                        >
                            FAQ
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <AboutTab />
                        </Tab.Panel>
                        <Tab.Panel>
                            <FaqTab />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </main>
        </>
    )
}

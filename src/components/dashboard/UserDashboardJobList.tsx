import { Tab } from '@headlessui/react';
import React from 'react';

export default function UserDashboardJobList() {
    const tabBaseClasses = "w-full pb-3 font-bold lg:text-lg tracking-wide border-b-2 border-b-gray-200 duration-150";
    const tabInactiveClasses = "hover:border-b-4 hover:border-b-indigo-300";
    const tabActiveClasses = "text-indigo-700 border-b-4 border-b-indigo-600";

    return (
        <main className='w-full mt-8'>
            <Tab.Group>
                <Tab.List className="container mx-auto flex">
                    <Tab
                        className={({ selected }) => 
                            selected
                                ? `${tabBaseClasses} ${tabActiveClasses}`
                                : `${tabBaseClasses} ${tabInactiveClasses}`
                        }
                    >
                        Your Posted Jobs
                    </Tab>
                    <Tab
                        className={({ selected }) => 
                            selected
                                ? `${tabBaseClasses} ${tabActiveClasses}`
                                : `${tabBaseClasses} ${tabInactiveClasses}`
                        }
                    >
                        Your Job Applications
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel><h2>These are your posted jobs.</h2></Tab.Panel>
                    <Tab.Panel><h2>These are your job applications.</h2></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </main>
    );
}

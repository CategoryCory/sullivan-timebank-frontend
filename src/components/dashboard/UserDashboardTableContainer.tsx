import { Tab } from '@headlessui/react';
import React from 'react';
import UserDashboardApplicationsTable from './UserDashboardApplicationsTable';
import UserDashboardJobsTable from './UserDashboardJobsTable';

export default function UserDashboardTableContainer() {
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
                        Your Submitted Applications
                    </Tab>
                </Tab.List>
                <Tab.Panels className="container mx-auto flex justify-center items-center">
                    <Tab.Panel className="w-full"><UserDashboardJobsTable /></Tab.Panel>
                    <Tab.Panel className="w-full"><UserDashboardApplicationsTable /></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </main>
    );
}

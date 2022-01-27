import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function FaqTab() {
    return (
        <section className="container mx-auto mb-16">
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full my-4 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">What is TimeBanking?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    TimeBanking is a community program that allows the voluntary exchange of services between members.
                                </p>
                                <p>
                                    It&rsquo;s as simple as give an hour, receive an hour: by giving one hour of help to another member,
                                    you earn one hour of time credit, which can be used to receive services that are of personal value,
                                    such as dog walking, ironing, community gardening, massages, language tuition, painting, administrative
                                    assistance&hellip;you&rsquo;re only restricted by your imagination.
                                </p>
                                <p>
                                    Everyone can be part of TimeBanking because everyone has something to give.
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">What can TimeBanking do for me?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    If you like to volunteer and give time to your community, TimeBanking is for you!
                                </p>
                                <p>
                                    TimeBanking can help you build a network of support within your neighborhood or community
                                    because TimeBanking creates connections through sharing skills. You also earn time credits for
                                    giving your time and sharing your skills to help another member. You can then use these credits
                                    to receive services that are useful and valuable to you.
                                </p>
                                <p>
                                    Everyone has different skills and knowledge to share, which is why TimeBanking is so successful.
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">How is TimeBanking different from traditional volunteering?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    TimeBanking is based on the tradition of reciprocity. You earn time credits for giving services
                                    to another person, which you can then use to receive services that are useful and valuable to you.
                                    In addition, unlike traditional volunteering, you are more likely to develop lasting connections
                                    with other members of your community.
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">How does it work?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    Once you become a TimeBanking member, you are able to search through all the offers of assistance
                                    and requests for assistance by other members.
                                </p>
                                <p>
                                    If you see someone's offer or request that you could complete, or that you would find useful, you
                                    simply contact that person to arrange completion of the service.
                                </p>
                                <p>
                                    Following completion of the task, the person who received the service logs into their account and
                                    registers the number of hours it took, to the nearest half hour. The system then completes the
                                    exchange of time between the members involved.
                                </p>
                                <p>
                                    Everyone has something to give, so have a think about what you could offer and what you might want.
                                    It may be housework, it could be guitar lessons, or even reading to someone&mdash;there are no
                                    limits!
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">What types of services can I request?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    Anything that you need help with, from computer repairs, cleaning, driving, hospital visits,
                                    cooking lessons, umpiring, flat pack construction, pool cleaning, administrative
                                    assistance&mdash;the possibilities are endless!
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">What if I don't need any services?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    You can still participate! If you don't use the hours that you earn, you can donate them
                                    to another TimeBanking member by contacting your local TimeBanking coordinator.
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">What is expected of me as a member?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    We ask that members make their first exchange within two weeks of joining and engage in
                                    at least six activities during the course of a year. We also ask that you return any messages
                                    with requests or offers for service within several days of receiving them.
                                </p>
                                <p>
                                    You are not obliged to provide a service to anyone; however, you are asked to look for suitable
                                    opportunities to give back.
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">How can I become a member?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    All you have to do is register! We will review your profile and send you an email when your
                                    account has been approved.
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">How much does it cost to become a member?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    TimeBanking is free to join, so sign up today!
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) =>(
                    <>
                        <Disclosure.Button className="w-full mb-3 px-5 py-3 flex justify-between bg-slate-300/20 rounded-md">
                            <h3 className="text-2xl text-slate-700">Further questions?</h3>
                            <ChevronRightIcon className={`${open ? "transform rotate-90" : ""}`} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition origin-top duration-150 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition origin-top duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="max-w-[72rem] mb-4 px-6 prose lg:prose-lg">
                                <p>
                                    We'd be pleased to answer any other questions you may have. Contact us at (admin's email).
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </section>
    )
}

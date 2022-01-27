import React from 'react';
import StartNowCTA from './StartNowCTA';
import questionsPic from "../images/questions.jpg";
import deliveryPic from "../images/delivery.jpg";

export default function AboutTab() {
    return (
        <>
            <div className="container mx-auto px-8">
                <div className="mx-auto prose max-w-[68rem] lg:prose-lg">
                    <p>
                        Despite many local communities &#40;your school, church, sports club, town&#41;, many of us do not know
                        where to turn to help those in need or whom to ask when we need help. We can certainly donate our time
                        through local agencies who are possibly serving a different community than ours. However, these &quot;service
                        events&quot; do little to build community and friendships, and they often create a sense of the haves and
                        the have-nots.
                    </p>
                    <p>
                        TimeBanking was created to provide access to services you need while providing a tool for you to connect
                        and give back to others. TimeBanking is a mode of exchange that allows people to swap their skills and time,
                        rather than money, while building stronger connections within your community. Everyone has something to give, 
                        and everyone has needs. The TimeBank encourages the virtues of both giving and receiving by earning and
                        using credits. 
                    </p>
                </div>
            </div>
            <div className="w-full my-14 py-6 grid grid-cols-1 bg-slate-200/40 lg:py-0 lg:grid-cols-2 items-center">
                <div className="max-w-xl mx-auto px-6 lg:ml-auto lg:mr-0">
                    <h4 className="text-lg leading-loose text-center lg:text-xl lg:leading-loose lg:text-right xl:text-2xl xl:leading-loose">
                        Members of the TimeBank earn and spend &quot;time credits&quot;&mdash;for every hour they
                        spend on an activity that helps others, they receive one time credit. When they need help
                        from other TimeBank members with particular skills, they can &quot;spend&quot; their time
                        credits.
                    </h4>
                </div>
                <div className="hidden lg:block">
                    <img src={questionsPic} alt="People Asking Questions" className="w-full object-cover" />
                </div>
            </div>
            <p className="max-w-[52rem] mx-auto my-8 px-6 lg:px-0 lg:text-lg xl:text-xl">
                Each TimeBank is a members-only community, where people in your community commit to the ideas and
                values of the TimeBank, including:
            </p>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="hidden lg:block">
                    <img src={deliveryPic} alt="Person Delivering Food" className="w-full object-cover" />
                </div>
                <div className="max-w-xl pl-6">
                    <ul className="px-6 list-disc space-y-4 marker:text-lime-500 marker:text-3xl lg:text-lg">
                        <li>
                            <span className="text-2xl font-bold">Assets:</span><br />
                            Everyone has something to offer
                        </li>
                        <li>
                            <span className="text-2xl font-bold">Redefining work:</span><br />
                            Building home, family and community is valued work
                        </li>
                        <li>
                            <span className="text-2xl font-bold">Reciprocity:</span><br />
                            Encouraging givers to receive&mdash;and receivers to give&mdash; builds trust, 
                            resiliency and sharing
                        </li>
                        <li><span className="text-2xl font-bold">Community:</span><br />
                            We are stronger together
                        </li>
                        <li><span className="text-2xl font-bold">Respect:</span><br />
                            Respect is the root of equality
                        </li>
                    </ul>
                </div>
            </div>
            <p className="max-w-[52rem] mx-auto my-12 px-6 lg:px-0 lg:text-lg xl:text-xl">
                Members who wish to simply help the community through their service are able to donate their
                earned hours to a designated community pot so that members of that specific community who may
                not be able to provide services themselves can still receive benefit.
            </p>
            <h2 className="text-5xl text-center">Join our community<br />and start helping</h2>
            <StartNowCTA />
        </>
    )
}

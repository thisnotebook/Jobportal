    
     import { useState } from "react";
    import {
        faCalendarDays,
        faCalendarXmark,
        faHourglassStart,
        faLocationDot,
        faStar, faUser, faUsers,
        faWallet
    } from "@fortawesome/free-solid-svg-icons";
    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

    const InternshipSingleItem = ({internship}) => {
        
        const date1 = new Date();
        const date2 = new Date(internship.endsIn);
        const date3 = new Date(internship.posted);

        const diffInLeftMilliseconds = Math.abs(date2.getTime() - date1.getTime());
        const diffInConsumedMilliseconds = Math.abs(date3.getTime() - date1.getTime());

        const diffInLeftDays = Math.ceil(diffInLeftMilliseconds / (1000 * 60 * 60 * 24));
        const diffInConsumedDays = Math.ceil(diffInConsumedMilliseconds / (1000 * 60 * 60 * 24))

        const renderSkills = () => {
            const skills = internship.skills;
            const skillDivs = [];
            for (let i = 0; i < skills.length; i += 5) {
                const skillSubset = skills.slice(i, i + 5);
                const skillItems = skillSubset.map((skill, index) => (
                    <div  key={`${index}  ${internship._id} `}  className="px-4 py-2 bg-[#F2F4F7] rounded-full text-sm">
                        {skill}
                    </div>
                ));
                const skillDiv = <div className="skill-group flex justify-between px-8 py-4">{skillItems}</div>;
                skillDivs.push(skillDiv);
            }
            return skillDivs;
        };
        
        const renderListItems = (items) => {
            return items.map((item, index) => <li key={item}>
                <span className="bullet-point px-2">&#8226;</span>{item}
            </li>);
        };

        return (
            <>
                <div className="bg-[#FFFFFF] rounded-md max-h-[calc(100vh-192px)] overflow-y-auto">
                    <div className="flex justify-between">
                        <div className="flex p-4 items-center">
                            <div className="items-center space-x-2 px-4">
                                <img
                                    src={internship.pic}
                                    alt="Profile Avatar"
                                    className="w-8 h-8 rounded-full"
                                /> 
    
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {internship.title}
                                </div>
                                <div className="text-sm text-[#667085]">
                                    {internship.company}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="py-3 px-10 bg-[#EBE9FE] text-[#186F65] font-bold text-lg rounded-bl-full">
                                {internship.category}
                            </div>

                        </div>
                    </div>
                    <div className="w-5/6 px-8 py-3 flex">
                        <div className="w-1/4 border-r-2 border-[#D0D5DD] flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faHourglassStart} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{internship.duration} Month</div>
                                <div className="font-light">Duration</div>
                            </div>
                        </div>
                        <div className="w-1/4 border-r-2 border-[#D0D5DD] flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faStar} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{internship.experience}</div>
                                <div className="font-light">Experience</div>
                            </div>
                        </div>
                        <div className="w-1/4 border-r-2 border-[#D0D5DD] flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faWallet} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">
                                    {internship.stipend.isPaid ? `₹${internship.stipend.lowerBound} - ₹${internship.stipend.upperBound}` : "Unpaid"}
                                </div>
                                <div className="font-light">Stipend</div>
                            </div>
                        </div>
                        <div className="w-1/4 flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faLocationDot} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{internship.location}</div>
                                <div className="font-light">Location</div>
                            </div>
                        </div>
                    </div>
                    <hr className="w-2/3 ml-16"/>
                    <div className="w-5/6 px-8 py-3 flex ">
                        <div className="w-1/4 border-r-2 border-[#D0D5DD] flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{diffInConsumedDays} Days Ago</div>
                                <div className="font-light">Posted</div>
                            </div>
                        </div>
                        <div className="w-1/4 border-r-2 border-[#D0D5DD] flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faCalendarXmark} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{diffInLeftDays} Days</div>
                                <div className="font-light">Ends In</div>
                            </div>
                        </div>
                        <div className="w-1/4 border-r-2 border-[#D0D5DD] flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faUser} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{internship.openPositions}</div>
                                <div className="font-light">Open Positions</div>
                            </div>
                        </div>
                        <div className="w-1/4 flex px-2 items-center">
                            <div className="pr-4">
                                <FontAwesomeIcon icon={faUsers} style={{color: "#186F65"}}/>
                            </div>
                            <div className="text-xs">
                                <div className="font-semibold">{internship.applicants}</div>
                                <div className="font-light">Total Appplications</div>
                            </div>
                        </div>
                    </div>
                    <div className="">{renderSkills()}</div>
                    <div className="px-8 py-2">
                        <div className="font-bold">
                            About Us
                        </div>
                        <div>
                            {internship.aboutUs}
                        </div>
                    </div>
                    <div className="px-8 py-2">
                        <div className="font-bold">
                            Requirements
                        </div>
                        <div>
                            <ul>{renderListItems(internship.requirements)}</ul>
                        </div>
                    </div>
                    <div className="px-8 py-2">
                        <div className="font-bold">
                            Responsibilities
                        </div>
                        <div>
                            <ul>{renderListItems(internship.responsibilities)}</ul>
                        </div>
                    </div>
                    <div className="flex justify-between px-8 py-8 items-center">
                        <div>
                            <a target="_blank" rel="noopener noreferrer" className="cursor-pointer text-[#186F65] font-semibold">
                                Visit Website
                            </a>
                        </div>
                        <div>
                            <button  className="py-2 px-4 bg-[#186F65] rounded-full text-[#FFFFFF] font-bold text-xl">
                               Apply Now
                                </button>
                        </div>
                    </div>
                </div>
             

            </>
        )
    }

    export default InternshipSingleItem;
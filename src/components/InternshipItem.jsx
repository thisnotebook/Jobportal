
import {faBookmark, faCalendarXmark, faHourglassStart, faUsers, faWallet} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InternshipState} from "../Context/InternshipProvider.jsx";
import {useState} from "react";


//selectedInternship
const InternshipItem = ({internshipid,internship,selectedInternship}) => {

    const [isBookmarked, setIsBookmarked] = useState(internship.isBookmarked);
    const [activeclass, setActiveClass] = useState("bg-[#ffffff] my-2 rounded-md")

    const date1 = new Date();
    const date2 = new Date(internship.endsIn);

    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));


    // const handleBookmarkClick = async () => {
    //     setIsBookmarked(!isBookmarked);
    //     const status = !isBookmarked;
    //     try{
    //         const updateBookmark =  await fetch(`http://localhost:9000/jobs/${internship._id}`, {
    //             status :`${status}`
    //         })
    //         console.log(updateBookmark);
    //     }catch(err){
    //         console.log(err);
    //     }
    // };
    //////
    console.log("bookmarked", isBookmarked);
    function handleBookmarkClick() {
        setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
        console.log("bookmarked", isBookmarked,selectedInternship);
      }

      
      
      // Later in your code or component, you can use the updated state:
 
      
// className={selectedInternship._id=== null ? "bg-[#E6E6FA] my-2 rounded-md" : "bg-[#ffffff] my-2 rounded-md"}
//className="bg-[#ffffff] my-2 rounded-md" 

return (
        <>
        
            <div  className="bg-[#ffffff] my-2 rounded-md"
           >
                <div className="flex py-2 px-2" >
                    <div>
                        <div className="font-bold">
                            {internship.title}
                        </div>
                        <div className="text-[#667085] font-medium text-sm">
                            {internship.company}
                        </div>
                    </div>
                    <div
                        className={`self-center ml-auto border-2 p-1 pt-2 rounded-md ${
                            isBookmarked ? "text-blue-500" : "text-gray-500"
                        }`}
                        onClick={handleBookmarkClick}
                    >
                        <FontAwesomeIcon icon={faBookmark} style={{height: 20, width: 20, color: `${isBookmarked ? "#186F65" : "#EBE9FE"}`}}/>
                    </div>
                </div>
                <div className="flex py-2 px-2 text-sm items-center overflow-hidden">
                    <div className="items-center space-x-2 px-4">
                        <img
                            src={internship.pic}
                            alt="Profile Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                    <div className="flex items-center text-sm font-medium">
                        <div className={`rounded-l-full bg-[#edf2f4] px-2 py-1 border-r-2 ${internship.skills.length===1 && "rounded-r-full"}  overflow-hidden`}>
                            {internship.skills[0]}
                        </div>
                        {internship.skills[1] && <div className={`bg-[#edf2f4] px-2 py-1 border-r-2 ${internship.skills.length===2 && "rounded-r-full"}  overflow-hidden`}>
                            {internship.skills[1]}
                        </div>}
                        {internship.skills[2] && <div className={`bg-[#edf2f4] px-2 py-1 border-r-2 ${internship.skills.length===3 && "rounded-r-full"}  overflow-hidden`}>
                            {internship.skills[2]}
                        </div>}
                        {internship.skills.length >3 && <div className="rounded-r-full bg-[#edf2f4] px-2 py-1"> +{internship.skills.length-3}</div>}
                    </div>
                </div>
                <div className="flex py-2 px-2 text-sm items-center">
                    <div className="w-1/2 flex">
                        <div className="w-1/6 pr-2">
                            <FontAwesomeIcon icon={faHourglassStart} style={{color: "#186F65"}}/>
                        </div>
                        <div>
                            {internship.duration} Month
                        </div>
                    </div>
                    <div className="w-1/2 flex">
                        <div className="w-1/6 pr-2">
                            <FontAwesomeIcon icon={faWallet} style={{color: "#186F65"}}/>
                        </div>
                        <div>
                            {internship.stipend.isPaid ? `₹${internship.stipend.lowerBound} - ₹${internship.stipend.upperBound}` : "Unpaid"}
                        </div>
                    </div>
                </div>
                <div className="flex py-2 px-2 text-sm items-center">
                    <div className="w-1/2 flex">
                        <div className="w-1/6 pr-2">
                            <FontAwesomeIcon icon={faUsers} style={{color: "#186F65"}}/>
                        </div>
                        <div>
                            {internship.applicants} Applicants
                        </div>

                    </div>
                    <div className="w-1/2 flex">
                        <div className="w-1/6 pr-2">
                            <FontAwesomeIcon icon={faCalendarXmark} style={{color: "#186F65"}}/>
                        </div>
                        <div>
                            {diffInDays} Days
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InternshipItem;

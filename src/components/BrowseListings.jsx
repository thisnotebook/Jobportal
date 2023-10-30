import React from "react";
import { useEffect, useState } from "react";
import {
  faCaretDown,
  faFilter,
  faMagnifyingGlass,
  faSearch,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InternshipItem from "./InternshipItem";
import InternshipSingleItem from "./InternshipSingleItem";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./RangeSlider.css";
import detail from "./jobs-data";

const DropdownMenu = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="font-bold flex px-1 py-1 overflow-auto border rounded-md bg-[#186F65}">
          {selectedItems?.map((item) => (
            <div
              key={item}
              className="px-2 py-2 mx-1 bg-[#EBE9FE] text-[#186F65] text-xs border rounded-md flex"
            >
              <div
                className="px-1"
                onClick={() => {
                  setSelectedItems(
                    selectedItems.filter((checkItem) => checkItem !== item)
                  );
                  let check = selectedItems.filter(
                    (checkItem) => checkItem !== item
                  );
                  onSelect(check);
                }}
              >
                X
              </div>
              <div>{item}</div>
            </div>
          ))}
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          style={{
            color: "#186F65",
            marginRight: "1em",
            height: "1.5em",
            width: "1em",
          }}
        />
      </div>
      {isOpen && (
        <div className="absolute bg-white shadow-md py-2 mt-1 w-48 rounded-md max-h-40 z-10 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                let checkItem = selectedItems.find((item) => item === option);
                if (checkItem) return;
                setSelectedItems([...selectedItems, option]);
                onSelect([...selectedItems, option]);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function BrowseListings() {
  const [activeTab, setActiveTab] = useState("popular");
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null); //null

  const [showFilterBox, setShowFilterBox] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedStipend, setSelectedStipend] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [applyFilters, setApplyFilters] = useState(false);


  const categories = [
    "Marketing",
    "Sales",
    "Software",
    "HR",
    "Graphic Design",
    "Data Science",
  ];
  const skills = [
    "NodeJs",
    "MongoDB",
    "ExpressJs",
    "Python",
    "Django",
    "ReactJs",
    "Vue",
    "Tailwind",
    "HTML",
    "CSS",
    "Javascript",
    "Photoshop",
    "AfterEffects",
    "Canva",
    "DataAnalysis",
    "ML",
  ];
  const locations = [
    "Mumbai",
    "Pune",
    "Gurugram",
    "Delhi",
    "Hyderabad",
    "Noida",
    "Bengaluru",
    "Lucknow",
    "Chandigarh",
    "Indore",
  ];
  const monthsMarks = {
    0: "1",
    20: "2",
    40: "3",
    60: "4",
    80: "5",
    100: "6+",
  };
  const stipendMarks = {
    0: "0",
    20: "1K",
    40: "5K",
    60: "10K",
    80: "20K",
    100: "40K+",
  };
  const applicantMarks = {
    0: "0",
    20: "10",
    40: "25",
    60: "50",
    80: "100",
    100: "250+",
  };

  const mames = [];
  const fetchInternships = async () => {
    try {
      //for local host by fake api
      // write 'npm run server ' in different terminal - go to browser and type http://localhost:9000/jobs
      // to use this uncomment this
      const getIntern = await fetch("https://backapi-production-9953.up.railway.app/jobs");
     const res = await getIntern.json();

  //const  res = detail;

      let internData = res;
      console.log(internData);
      if (applyFilters) {
        if (selectedCategories.length !== 0) {
          internData = internData.filter((intern) =>
            selectedCategories.includes(intern.category)
          );
        }
        if (selectedSkills.length !== 0) {
          internData = internData.filter((intern) => {
            for (let i = 0; i < intern.skills.length; i++) {
              if (selectedSkills.includes(intern.skills[i])) {
                return true;
              }
            }
            return false;
          });
        }
        if (selectedTimings.length === 1) {
          if (selectedTimings[0] === "Part Time") {
            internData = internData.filter(
              (intern) => intern.isFullTime === false
            );
          } else {
            internData = internData.filter(
              (intern) => intern.isFullTime === true
            );
          }
        }
        if (selectedTypes.length === 1) {
          if (selectedTypes[0] === "Work From Home") {
            internData = internData.filter(
              (intern) => intern.isInOffice === false
            );
          } else {
            internData = internData.filter(
              (intern) => intern.isInOffice === true
            );
          }
        }
        if (selectedLocation.length !== 0) {
          internData = internData.filter((intern) =>
            selectedLocation.includes(intern.location)
          );
        }
        if (selectedDuration.length !== 0) {
          if (selectedDuration[1].length === 2) {
            internData = internData.filter(
              (intern) => intern.duration >= parseInt(selectedDuration[0])
            );
          } else {
            internData = internData.filter(
              (intern) =>
                intern.duration <= parseInt(selectedDuration[1]) &&
                intern.duration >= parseInt(selectedDuration[0])
            );
          }
        }
        if (selectedStipend.length !== 0) {
          if (selectedStipend[1].length === 4) {
            if (selectedStipend[0].length === 1) {
            } else {
              internData = internData.filter(
                (intern) =>
                  intern.stipend.upperBound >=
                  parseInt(
                    selectedStipend[0].substring(
                      0,
                      selectedStipend[0].length - 1
                    )
                  ) *
                    1000
              );
            }
          } else {
            if (selectedStipend[0].length === 1) {
              internData = internData.filter(
                (intern) =>
                  intern.stipend.lowerBound <=
                  parseInt(
                    selectedStipend[1].substring(
                      0,
                      selectedStipend[1].length - 1
                    )
                  ) *
                    1000
              );
            } else {
              internData = internData.filter(
                (intern) =>
                  intern.stipend.upperBound >=
                    parseInt(
                      selectedStipend[0].substring(
                        0,
                        selectedStipend[0].length - 1
                      )
                    ) *
                      1000 &&
                  intern.stipend.lowerBound <=
                    parseInt(
                      selectedStipend[1].substring(
                        0,
                        selectedStipend[1].length - 1
                      )
                    ) *
                      1000
              );
            }
          }
        }
        if (selectedApplicants.length !== 0) {
          if (selectedApplicants[1].length === 4) {
            internData = internData.filter(
              (intern) => intern.applicants >= parseInt(selectedApplicants[0])
            );
          } else {
            internData = internData.filter(
              (intern) =>
                intern.applicants >= parseInt(selectedApplicants[0]) &&
                intern.applicants <= parseInt(selectedApplicants[1])
            );
          }
        }
      }
      if (activeTab === "newest") {
        internData.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        //setInternships(internData);
      } else if (activeTab === "popular") {
        internData.sort((a, b) => b.applicants - a.applicants);
        //setInternships(internData);
      } else {
        internData = internData.filter(
          (intern) => intern.isBookmarked === true
        );
        internData.sort((a, b) => b.applicants - a.applicants);
       // setInternships(internData);
      }
      setInternships(internData);
    } catch (err) {
      console.error(err);
    }
  };
 

  useEffect(() => {
  fetchInternships();
    
  }, [applyFilters, activeTab]);
  //   useEffect(() => {
  //     console.log(selectedInternship);
  //   }, [selectedInternship]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleInternshipClick = (internship) => {
    setSelectedInternship(internship);
    //console.log(internship);
  };

  const handleFilterClick = () => {
    setShowFilterBox(!showFilterBox);
  };

  const handleSliderChange1 = (value) => {
    const valueUpdated = [parseInt(value[0]), parseInt(value[1])];
    const valueForMonths = [
      monthsMarks[valueUpdated[0]],
      monthsMarks[valueUpdated[1]],
    ];
    setSelectedDuration(valueForMonths);
  };
  const handleSliderChange2 = (value) => {
    const valueUpdated = [parseInt(value[0]), parseInt(value[1])];
    const valueForStipend = [
      stipendMarks[valueUpdated[0]],
      stipendMarks[valueUpdated[1]],
    ];
    setSelectedStipend(valueForStipend);
  };
  const handleSliderChange3 = (value) => {
    const valueUpdated = [parseInt(value[0]), parseInt(value[1])];
    const valueForApplicants = [
      applicantMarks[valueUpdated[0]],
      applicantMarks[valueUpdated[1]],
    ];
    setSelectedApplicants(valueForApplicants);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedTimings([]);
    setSelectedTypes([]);
    setSelectedDuration([]);
    setSelectedLocation([]);
    setSelectedStipend([]);
    setSelectedApplicants([]);
    setApplyFilters(false);
    handleFilterClick();
  };

  const handleApply = () => {
    setApplyFilters(true);
    fetchInternships();
    setShowFilterBox(!showFilterBox);

    //the last line is ---+---
  };

  return (
    <>
      <div className="h-full bg-[#edf2f4] p-6 flex">
        <div className="w-1/4 mr-2  rounded-md">
          <div className="flex justify-between bg-[#FFFFFF] items-center h-12 px-1 mb-6 rounded-md">
            <button
              className={`rounded-md text-base w-1/2 py-2 font-medium ${
                activeTab === "popular" ? "text-[#FFFFFF]" : "text-[#186F65]"
              }
                            ${
                              activeTab === "popular"
                                ? "bg-[#186F65]"
                                : "bg-[#FFFFFF]"
                            }`}
              onClick={() => handleTabClick("popular")}
            >
              Popular
            </button>
            <button
              className={`text-base rounded-md w-1/2 py-2 font-medium ${
                activeTab === "newest" ? "text-[#FFFFFF]" : "text-[#186F65]"
              }
                            ${
                              activeTab === "newest"
                                ? "bg-[#186F65]"
                                : "bg-[#FFFFFF]"
                            }`}
              onClick={() => handleTabClick("newest")}
            >
              Newest
            </button>
            {/* <button
              className={`text-base rounded-md w-1/3 py-2 font-medium ${
                activeTab === "bookmark" ? "text-[#FFFFFF]" : "text-[#186F65]"
              }
                            ${
                              activeTab === "bookmark"
                                ? "bg-[#186F65]"
                                : "bg-[#FFFFFF]"
                            }`}
              onClick={() => handleTabClick("bookmark")}
            >
              Bookmark
            </button> */}
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto rounded-md cursor-pointer">
            {internships?.map((internship) => (
              // <div onClick={(e) => {
              //         setSelectedInternship(internship);
              //     }}>
              <div
                key={internship.id}
                onClick={() => handleInternshipClick(internship)}
                className="bg-orange"
              >
                {/* selectedInternship={selectedInternship} */}

                <InternshipItem
                  key={internship._id}
                  internship={internship}
                  selectedInternship={selectedInternship}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 ml-2 rounded-md">
          <div className="flex justify-between rounded-l-md items-center h-12 bg-[#FFFFFF] mb-6">
            <div className="w-10/12 rounded-l-md">
              <input
                className=" w-full h-12 px-4 rounded-l-md text-gray-800 placeholder-gray-400 focus:outline-none"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="w-1/12 h-12 flex justify-center items-center bg-[#186F65] rounded-r-md">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: "#FFFFFF", height: 20, width: 20 }}
              />
            </div>
            <div
              className="cursor-pointer w-1/12 h-12 flex justify-center items-center bg-[#edf2f4] "
              onClick={handleFilterClick}
            >
              <FontAwesomeIcon
                icon={faFilter}
                style={{ color: "#186F65", height: 20, width: 20 }}
              />
            </div>
          </div>
          <div>
            {selectedInternship ? (
              <InternshipSingleItem internship={selectedInternship} />
            ) : (
              <div className="pl-40 text-3xl" style={{ marginTop: "10rem" }}>
                Please select an internship to know more:)
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilterBox && (
        <div className="fixed top-40 left-2/3 w-1/3 bg-white border rounded-tl-3xl z-50">
          <div className="p-4 flex">
            <div className="mx-auto text-[#186F65] font-bold">Filters</div>
            <div onClick={handleFilterClick} className="cursor-pointer">
              <FontAwesomeIcon
                icon={faSquareXmark}
                style={{ color: "#186F65", height: 20, width: 20 }}
              />
            </div>
          </div>
          <div className="flex px-4 my-2">
            <div className="w-1/2 text-sm pr-1">
              <div className=" px-3 font-bold py-1 bg-[#186F65] text-[#ffffff] rounded-lg" >Category</div>
              <div>
                <DropdownMenu
                  title="Category"
                  options={categories}
                  onSelect={(selected) => setSelectedCategories(selected)}
                />
              </div>
            </div>
            <div className="w-1/2 text-sm pl-1">
              <div className="font-bold py-1  bg-[#186F65] text-[#ffffff] rounded-lg px-3">Skills</div>
              <div>
                <DropdownMenu
                  title="Skills"
                  options={skills}
                  onSelect={(selected) => setSelectedSkills(selected)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-4 my-2">
            <div className="w-1/2 text-sm pr-1">
              <div className="font-bold py-1   bg-[#186F65] text-[#ffffff] rounded-lg px-3">Timings</div>
              <div>
                <div
                  className="items-center my-4 flex"
                  onClick={() => {
                    const checkbox = document.getElementById("scales1");
                    if (checkbox.checked) {
                      const searchTime = selectedTimings.find(
                        (timing) => timing === "Part Time"
                      );
                      if (searchTime) return;
                      setSelectedTimings([...selectedTimings, "Part Time"]);
                    } else {
                      setSelectedTimings(
                        selectedTimings.filter(
                          (timing) => timing !== "Part Time"
                        )
                      );
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    id="scales1"
                    name="scales1"
                    className="accent-[#186F65]"
                  />
                  <label
                    htmlFor="scales1"
                    className="ml-2 px-4 py-1 border bg-[#EBE9FE] text-[#186F65] text-xs font-bold rounded-md"
                  >
                    Part Time
                  </label>
                </div>
                <div
                  className="items-center my-4"
                  onClick={() => {
                    const checkbox = document.getElementById("scales2");
                    if (checkbox.checked) {
                      const searchTime = selectedTimings.find(
                        (timing) => timing === "Full Time"
                      );
                      if (searchTime) return;
                      setSelectedTimings([...selectedTimings, "Full Time"]);
                    } else {
                      setSelectedTimings(
                        selectedTimings.filter(
                          (timing) => timing !== "Full Time"
                        )
                      );
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    id="scales2"
                    name="scales2"
                    className="accent-[#186F65]"
                  />
                  <label
                    htmlFor="scales2"
                    className="ml-2 px-4 py-1 border bg-[#EBE9FE] text-[#186F65] text-xs font-bold rounded-md"
                  >
                    Full Time
                  </label>
                </div>
              </div>
            </div>
            <div className="w-1/2 text-sm pl-1">
              <div className="font-bold py-1  bg-[#186F65] text-[#ffffff] rounded-lg px-3">Type</div>
              <div>
                <div
                  className="items-center my-4"
                  onClick={() => {
                    const checkbox = document.getElementById("scales3");
                    if (checkbox.checked) {
                      const searchType = selectedTypes.find(
                        (type) => type === "Work From Home"
                      );
                      if (searchType) return;
                      setSelectedTypes([...selectedTypes, "Work From Home"]);
                    } else {
                      setSelectedTypes(
                        selectedTypes.filter(
                          (type) => type !== "Work From Home"
                        )
                      );
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    id="scales3"
                    name="scales3"
                    className="accent-[#186F65] pr-2"
                  />
                  <label
                    htmlFor="scales3"
                    className="ml-2 px-4 py-1 border bg-[#EBE9FE] text-[#186F65] text-xs font-bold rounded-md"
                  >
                    Work from Home
                  </label>
                </div>
                <div
                  className="items-center my-4"
                  onClick={() => {
                    const checkbox = document.getElementById("scales4");
                    if (checkbox.checked) {
                      const searchType = selectedTypes.find(
                        (type) => type === "In Office"
                      );
                      if (searchType) return;
                      setSelectedTypes([...selectedTypes, "In Office"]);
                    } else {
                      setSelectedTypes(
                        selectedTypes.filter((type) => type !== "In Office")
                      );
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    id="scales4"
                    name="scales4"
                    className="accent-[#186F65]  pr-2"
                  />
                  <label
                    htmlFor="scales4"
                    className="ml-2 px-4 py-1 border bg-[#EBE9FE] text-[#186F65] text-xs font-bold rounded-md"
                  >
                    In Office
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-4 my-2">
            <div className="w-1/2 text-sm pr-1">
              <div className="font-bold py-1  bg-[#186F65] text-[#ffffff] rounded-lg pl-3">Duration (Months)</div>
              <div className="pb-4 w-5/6 ml-2 mt-2">
                <Slider
                  range
                  min={0}
                  max={100}
                  defaultValue={[0, 100]}
                  onChange={handleSliderChange1}
                  marks={monthsMarks}
                  className="custom-slider"
                  step={null}
                />
              </div>
            </div>
            <div className="w-1/2 text-sm pl-1 pb-4">
              <div className="font-bold py-1  bg-[#186F65] text-[#ffffff] rounded-lg px-3">Location</div>
              <div>
                <DropdownMenu
                  title="Skills"
                  options={locations}
                  onSelect={(selected) => setSelectedLocation(selected)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-4 my-2 mb-8">
            <div className="w-1/2 text-sm pr-1 ">
              <div className="font-bold py-1  bg-[#186F65] text-[#ffffff] rounded-lg px-3">Stipend</div>
              <div className="pb-4 w-5/6 ml-2 mt-2">
                <Slider
                  range
                  min={0}
                  max={100}
                  defaultValue={[0, 100]}
                  onChange={handleSliderChange2}
                  marks={stipendMarks}
                  className="custom-slider"
                  step={null}
                />
              </div>
            </div>
            <div className="w-1/2 text-sm pr-1 ">
              <div className="font-bold py-1  bg-[#186F65] text-[#ffffff] rounded-lg px-3">Applicants</div>
              <div className="pb-4 w-5/6 ml-2 mt-2">
                <Slider
                  range
                  min={0}
                  max={100}
                  defaultValue={[0, 100]}
                  onChange={handleSliderChange3}
                  marks={applicantMarks}
                  className="custom-slider"
                  step={null}
                />
              </div>
            </div>
          </div>
          <div className="border-t flex justify-end rounded-tl-xl py-2 px-4 justify-between">
            <div className="mr-4 cursor-pointer">
              <div
                onClick={clearAllFilters}
                className="text-xs py-2 px-4 rounded text-[#186F65] font-bold"
              >
                Clear All
              </div>
            </div>
            <div>
              <button
                onClick={handleApply}
                className="bg-[#186F65] text-white text-xs font-bold py-2 px-8 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

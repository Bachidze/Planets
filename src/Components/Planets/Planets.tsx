import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";

export default function Planets() {
  const params = useParams();
  const [menu, setMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview"); // State to track selected tab
  const planetData = data.find(
    (el) => el.name.toLowerCase() === params.id?.toLowerCase()
  );

  if (!planetData) {
    return <h1>Planet not found</h1>;
  }

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div>
        <div className="flex justify-between p-4 items-center">
          <div>
            <h1 className="text-[28px]">The Planets</h1>
          </div>
          <div
            onClick={handleMenu}
            className="flex flex-col gap-1 cursor-pointer"
          >
            <div
              className={`w-8 h-1 bg-white transition-transform duration-300 ${
                menu ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`w-8 h-1 bg-white transition-opacity duration-300 ${
                menu ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-8 h-1 bg-white transition-transform duration-300 ${
                menu ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        </div>
        <div className="absolute p-4">
        {data.map((el) => (
            <div key={el.name} className="flex items-center gap-4">
              {menu ? <img className="w-10 h-10" src={el.images.planet} alt={el.name} />: null}
              {menu ? <a href={`/${el.name}`}>{el.name}</a> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="border"></div>

      <div className="flex justify-between p-4">
        <h2
          className={`cursor-pointer text-[17px] tracking-[1.5px] ${
            selectedTab === "overview" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setSelectedTab("overview")}
        >
          Overview
        </h2>
        <h2
          className={`cursor-pointer text-[17px] tracking-[1.5px] ${
            selectedTab === "structure" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setSelectedTab("structure")}
        >
          Structure
        </h2>
        <h2
          className={`cursor-pointer text-[17px] tracking-[1.5px] ${
            selectedTab === "surface" ? "border-b-2 border-white" : ""
          }`}
          onClick={() => setSelectedTab("surface")}
        >
          Surface
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center pt-20">
        <img
          className="w-[200px] h-[200px]"
          src={
            selectedTab === "overview"
              ? planetData.images.planet
              : selectedTab === "structure"
              ? planetData.images.internal
              : planetData.images.geology
          }
          alt="Planet"
        />
        <h2 className="text-[40px] pt-20 pb-10">{planetData.name}</h2>
      </div>
      <div className="pb-10">
        <div><p className="text-center w-[93%] m-auto text-[12px]  leading-[26px]">{planetData.overview.content}</p></div>
        <div className="text-center pt-5">
         Source: <a className="underline" href={planetData.overview.source} target="_blank" rel="noopener noreferrer">Wikipedia</a>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[90%] m-auto mb-12">
        <div className="border p-3 border-[gray]"><h2>Rotation Time:{planetData.rotation}</h2></div>
        <div className="border p-3 border-[gray]"><h2>Revolution Time:{planetData.revolution}</h2></div>
        <div className="border p-3 border-[gray]"><h2>Radius :{planetData.radius}</h2></div>
        <div className="border p-3 border-[gray]"><h2>Averge Temp:{planetData.temperature}</h2></div>
      </div>
    </>
  );
}

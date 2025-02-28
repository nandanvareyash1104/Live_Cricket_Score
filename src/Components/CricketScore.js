import React, { useEffect, useState } from "react";
import circle from "./circle.png";
import "./CricketScore.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=a0e2cec4-e3ed-4537-a7f5-ec126f72b0b3"
      );
      const fetchedData = await response.json();
      setData(fetchedData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const handleBtn = () => {
    setSearch(inputData);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="header">
          <img src={circle} alt="Logo" className="logo" />
          <h1 className="title">Live Cricket Score</h1>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Matches"
            onChange={handleInput}
            className="search-input"
          />
          <button onClick={handleBtn} className="search-button">
            Search
          </button>
        </div>

        <div className="match-container">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="match-card skeleton-card">
                  <Skeleton height={20} width={"80%"} />
                  <Skeleton height={16} width={"60%"} />
                  <div className="teams-container">
                    <div className="team">
                      <Skeleton circle={true} height={40} width={40} />
                      <Skeleton height={16} width={"70%"} />
                      <Skeleton height={16} width={"50%"} />
                    </div>
                    <span className="vs-text">VS</span>
                    <div className="team">
                      <Skeleton circle={true} height={40} width={40} />
                      <Skeleton height={16} width={"70%"} />
                      <Skeleton height={16} width={"50%"} />
                    </div>
                  </div>
                  <Skeleton height={16} width={"90%"} />
                </div>
              ))
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((val, index) => {
              if (
                val.status !== "Match not started" &&
                (search === "" ||
                  val.series.toLowerCase().includes(search.toLowerCase()) ||
                  val.t1.toLowerCase().includes(search.toLowerCase()) ||
                  val.t2.toLowerCase().includes(search.toLowerCase()))
              ) {
                return (
                  <div key={index} className="match-card fade-in">
                    <h3 className="series-title">{val.series}</h3>
                    <h4 className="match-type">{val.matchType}</h4>
                    <div className="teams-container">
                      <div className="team">
                        <img
                          src={val.t1img}
                          alt="team1"
                          className="team-logo"
                        />
                        <p className="team-name">{val.t1}</p>
                        <p className="team-score">{val.t1s}</p>
                      </div>
                      <span className="vs-text">VS</span>
                      <div className="team">
                        <img
                          src={val.t2img}
                          alt="team2"
                          className="team-logo"
                        />
                        <p className="team-name">{val.t2}</p>
                        <p className="team-score">{val.t2s}</p>
                      </div>
                    </div>
                    <p className="match-status">Status: {val.status}</p>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="no-data">Data not Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CricketScore;

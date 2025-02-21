import React, { useEffect, useState } from "react";
import circle from "./circle.png";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState();
  const [search, setSerach] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=a0e2cec4-e3ed-4537-a7f5-ec126f72b0b3"
      );
      const data = await response.json();
      console.log(data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value);
    setInputData(e.target.value);
  };

  const handleBtn = () => {
    setSerach(inputData);
    getData();
  };

  return (
    <div className="main-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Matches"
          onChange={handleInput}
        />
        <button onClick={handleBtn}>Search</button>
      </div>
      <div className="heading">
        <img alt="img" src={circle} />
        <p>Live Cricket Score</p>
      </div>
      <div className="container">
        {data ? (
          data.map((val, index) => {
            console.log(val);
            if (val.status !== "Match not started") {
              if (
                val.series.includes(search) ||
                val.t1.includes(search) ||
                val.t2.includes(search)
              ) {
                return (
                  <div className="card">
                    <h3>{val.series}</h3>
                    <h3>{val.matchType}</h3>
                    <div className="img">
                      <div>
                        <img src={val.t1img} alt="img" />
                        <p>{val.t1}</p>
                        <p>{val.t1s}</p>
                      </div>
                      <div>
                        <img src={val.t2img} alt="img"/>
                        <p>{val.t2}</p>
                        <p>{val.t2s}</p>
                      </div>
                    </div>
                    <p className="status">Status : {val.status}</p>
                  </div>
                );
              }
              if (search === "") {
                return (
                  <div className="card">
                    <h3>{val.series}</h3>
                    <h3>{val.matchType}</h3>
                    <div className="img">
                      <div>
                        <img src={val.t1img} alt="img"/>
                        <p>{val.t1s}</p>
                      </div>
                      <div>
                        <img src={val.t2img} alt="img" />
                        <p>{val.t2s}</p>
                      </div>
                    </div>
                    <p className="status">Status : {val.status}</p>
                  </div>
                );
              }
            }
          })
        ) : (
          <p>Data not Available</p>
        )}
      </div>
    </div>
  );
};

export default CricketScore;

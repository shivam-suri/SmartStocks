import React, { Component , useEffect, useState} from 'react';
import Overview from './overview';
import Fundamentals from './fundamentals';
import axios from "axios"

function NavBar() {
  
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [chart, setChart] = useState("");
  const [label, setLabel] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:9000/stockdata").then(function(response) {
        setData(response.data)
    })
    axios.get("http://localhost:9000/chartdata").then(function(response) {
        setChart(response.data)
    })
    axios.get("http://localhost:9000/labeldata").then(function(response) {
        setLabel(response.data)
    })
  }, [refresh])

  async function postName(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9000/post_name", {
        name
      })
      setRefresh(refresh + 1);
    } catch (error) {
        console.log(error);
    }
  }
  
  return (
    <div>
    <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand m-2">
            <span className="badge bg-pill bg-primary m-2">S</span>
            SmartStocks
        </a>
        
        <form className="form-inline m-3" onSubmit={postName}>
            <div class="container">
                <div class="row">
                    <div class="col-8">
                    <input 
                        className="form-control" 
                        value={name}
                        placeholder="Insert Ticker Symbol" 
                        aria-label="Search"
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div class="col-4">
                    <button type="submit" className="btn btn-primary">Get Data</button>
                    </div>
                </div>
            </div>
        </form>
    </nav>
    <Overview name={name} data={data} chart={chart} label={label}/>
    <Fundamentals data={data}/>
    </div>
);
}

export default NavBar;


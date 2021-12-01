import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { Link } from "react-router-dom";
import {
    PermIdentity,
    Storefront
  } from "@material-ui/icons";

export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);

  async function getParkingSpots() {
      const parkingSpotsCollection = firebase.firestore().collection('parking-spots')
      setLoading(true);
      parkingSpotsCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            const ps = doc.data();
            if(ps.available)
                items.push(doc.data());
        });
        setParkingSpots(items);
        setLoading(false);
      });

    // // If using local sprint boot server.
    // setLoading(true)
    // await fetch('http://localhost:8080/parking-spot/?date=2021-11-23')
    // .then(res => res.json())
    // .then((data) => {
    //     console.log(data);
    //     setParkingSpots(data)
    // })
    // .catch(console.log)
    // setLoading(false);
  }

  console.log("parking spots :" +parkingSpots)
  //http://localhost:8080/availableSpots?from=8&to=9

  
  function handleReserveSlot() {
    alert("handleReserveSlot" );
  }

  useEffect(() => {
    getParkingSpots();
    // eslint-disable-next-line
  }, []);

    return (
        <>
            {loading ? <h1>Loading...</h1> : null}
            {!loading && 
                <div class="container" style={{ display: "flex","marginTop": "10px"}}>
                    <div className="sidebar">
                        <div className="sidebarWrapper">
                        <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Dashboard</h3>
                            <ul className="sidebarList">
                            <Link to="/" className="link">
                                <li className="sidebarListItem active">
                                <PermIdentity className="sidebarIcon" />
                                Available 
                                </li>
                            </Link>
                            <Link to="/parking-history" className="link">
                                <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                History
                                </li>
                            </Link>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="home">
                        <div class="featured">
                        <div class="featuredItem">
                            <span class="featuredTitle">Available parking spots</span>
                            <div class="featuredMoneyContainer">
                            <span class="featuredMoney">{ parkingSpots && parkingSpots.length > 0 ? parkingSpots.length : 0 }</span>
                            </div>
                        </div>
                        </div>
                        <div class="homeWidgets" style={{ display: "flex", margin: "20px"}}>
                        <div class="widgetSm">
                            <span class="widgetSmTitle">Parking Spots</span>
                            <ul class="widgetSmList">
                            {parkingSpots.map((parkingSpot) => (
                            <li class="widgetSmListItem">
                            <img src="https://static.wikia.nocookie.net/peppapedia/images/0/05/Doge.png" alt="" class="widgetSmImg"/>
                            <div class="widgetSmUser">
                                <span class="widgetSmUserTitle">{parkingSpot.id}</span>
                                <span class="widgetSmUserTitle">{parkingSpot.size}</span>
                            </div>
                            <button class="widgetSmButton" onClick={handleReserveSlot}><svg class="MuiSvgIcon-root widgetSmIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" ><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>Reserve</button>
                            </li>
                            ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
            }
        </>
    )
}

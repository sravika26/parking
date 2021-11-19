import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { Button } from "react-bootstrap"

export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  // //REALTIME GET parking lot space
  const parkingSpotsCollection = firebase.firestore().collection('parking-spots')
  function getParkingSpots() {
      setLoading(true);
      parkingSpotsCollection.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setParkingSpots(items);
        setLoading(false);
      });
  }
  
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
                <div>
                    <div class="jumbotron">
                    <div class="container">
                        <h1 class="display-3">ABC Parking</h1>
                        <p>Thanks for visiting, the below parking slots are available</p>
                        <p><a class="btn btn-primary btn-lg" href="/test" role="button">Learn more »</a></p>
                    </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            {parkingSpots.map((parkingSpot) => (
                                <div class="col-md-4">
                                    <h2>Slot# {parkingSpot.id}</h2>
                                    <p>Car size:  {parkingSpot.size}</p>
                                    {/* <p><a class="btn btn-secondary" href="/test" role="button">Reserve »</a></p> */}
                                    <Button onClick={handleReserveSlot} >Reserve »</Button>
                                </div>
                            ))}
                        </div>
                        <hr/>
                    </div> 
                </div>
            }
        </>
    )
}

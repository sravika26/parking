import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { Button } from "react-bootstrap"

export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  // //REALTIME GET parking lot space
  
  async function getParkingSpots() {
      const parkingSpotsCollection = firebase.firestore().collection('parking-spots')
      setLoading(true);
      parkingSpotsCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setParkingSpots(items);
        setLoading(false);
      });

    // // If using local sprint boot server.
    // setLoading(true)
    // await fetch('http://localhost:8080/parking-spot/?date=2021-11-22')
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
                <div>
                    <div class="jumbotron">
                    <div class="container">
                        <h1 class="display-3">ABC Parking test</h1>
                        <p>Thanks for visiting, the below parking slots are available</p>
                        <p><a class="btn btn-primary btn-lg" href="/test" role="button">Learn more »</a></p>
                    </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            {parkingSpots.map((parkingSpot) => (
                                <div class="col-md-6">
                                    <h2>Slot# {parkingSpot.id}</h2>
                                    <p>Car size:  {parkingSpot.size}</p>
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

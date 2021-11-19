import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'

export default function WorkerDashboard() {
//   const [loading, setLoading] = useState(false);
//   const [parkingSpots, setParkingSpots] = useState([]);
//   // //REALTIME GET parking lot space
//   const parkingSpotsCollection = firebase.firestore().collection('users')
//   function getParkingSpots() {
//       setLoading(true);
//       parkingSpotsCollection.onSnapshot((querySnapshot) => {
//         const items = [];
//         querySnapshot.forEach((doc) => {
//           items.push(doc.data());
//         });
//         setParkingSpots(items);
//         setLoading(false);
//       });
//   }
  
//   useEffect(() => {
//     getParkingSpots();
//     // eslint-disable-next-line
//   }, []);

    return (
        <div>
            <div class="jumbotron">
            <div class="container">
                <h1 class="display-3">Worker Dashboard</h1>
                <p>Worker can do xyz</p>
                <p><a class="btn btn-primary btn-lg" href="/test" role="button">Learn more »</a></p>
            </div>
            </div>

            <div class="container">
            
            

            <div class="row">
                <div class="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a class="btn btn-secondary" href="/test" role="button">View details »</a></p>
                </div>
                <div class="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a class="btn btn-secondary" href="/test" role="button">View details »</a></p>
                </div>
                <div class="col-md-4">
                <h2>Heading</h2>
                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a class="btn btn-secondary" href="/test" role="button">View details »</a></p>
                </div>
            </div>

            <hr/>

            </div> 
        </div>
    )
}

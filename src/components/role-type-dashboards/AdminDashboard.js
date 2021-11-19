
import React from 'react'
import { Alert, Button } from "react-bootstrap"
export default function AdminDashboard() {
    function handlerAddWorker() {
       alert("handleAddWorker");
    }
    function handleAddParkingSlots() {
        alert("handleAddParkingSlots");
    }

    return (
        // <div>
        //     <Alert variant="danger">You are admin! </Alert>

        //     <Button onClick={handlerAddWorker} >Add Worker</Button>
        //     <Button onClick={handleAddParkingSlots} >Add Parking slots</Button>
        // </div>

        <div>
            <div class="jumbotron">
            <div class="container">
                <h1 class="display-3">Admin Dashboard</h1>
                <p>You can add/remove workers.</p>
                <p><a class="btn btn-primary btn-lg" href="/test" role="button">Learn more »</a></p>
            </div>
            </div>

            <div class="container">

            <div class="row">
                <div class="col-md-6" style={{ minHeight: "50px" }}>
                    <h2>Edit Worker</h2>
                    <p>You can add/remove workers and also adjust their time</p>
                    <Button onClick={handlerAddWorker} >Edit Worker</Button>
                </div>
                <div class="col-md-6" style={{ minHeight: "50px" }}>
                    <h2>Add Parking slots</h2>
                    <p>Add/Remove parking slots</p>
                    <Button onClick={handleAddParkingSlots} >Edit Parking slots</Button>
                </div>
            </div>

            <hr/>

            </div> 
        </div>
    )
}

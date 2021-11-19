import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import AdminDashboard from "./role-type-dashboards/AdminDashboard"
import WorkerDashboard from "./role-type-dashboards/WorkerDashboard"
import UserDashboard from "./role-type-dashboards/UserDashboard"
import firebase from '../firebase'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()

  const [users, setUsers] = useState([]);
  const [currentUserRole, setLoggedInUserRole] = useState([]);

  const [loading, setLoading] = useState(false);

  // TODO: Need api to get the user role
  // Role Id 1. Admin 2. Worker 3. User
  const roleId = 1;
  const usersCollection = firebase.firestore().collection('users')
  console.log(users);

  // //REALTIME GET FUNCTION
  // function getUsers() {
  //     setLoading(true);
  //     usersCollection.onSnapshot((querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((doc) => {
  //         items.push(doc.data());
  //       });
  //       setUsers(items);
  //       setLoading(false);
  //     });
  // }
  
  //DELETE FUNCTION
  function deleteUser(user) {
    usersCollection
      .doc(user.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // // EDIT FUNCTION
  function editUser(user) {
    setLoading();
    usersCollection
      .doc(user.id)
      .update(user)
      .catch((err) => {
        console.error(err);
      });
  }

  // useEffect(() => {
  //   getUsers();
  //   // eslint-disable-next-line
  // }, []);


  //ONE TIME GET FUNCTION
  function getUsers() {
    setLoading(true);
    usersCollection.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setUsers(items);
      setLoading(false);
    });
  }

  function getLoggedInUserRole(){
    setLoading(true);
    usersCollection.get().then((users) => {
      const items = users.docs.map((doc) => doc.data());
      console.log(items)
      const user = items.find((user) => user.id === currentUser.email)
      setLoggedInUserRole(user);
      setLoading(false);
    });
  }
  useEffect(() => {
    //getUsers();
    getLoggedInUserRole();
    // eslint-disable-next-line
  }, []);

  console.log(currentUserRole);

  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      {loading ? <h1>Loading...</h1> : null}


      {/* {users.map((user) => (
        <div className="school" key={user.id}>
          <h2>{user.id}</h2>
          <p>{user.roleId}</p>
          <div>
            <button onClick={() => deleteUser(user)}>X</button>
            <button
              onClick={() =>
                editUser({ title: user.roleId, id: user.id, desc: user.desc })
              }
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}


      {!loading && 
        <main role="main" style={{ minWidth :"100%", height:"100vh" }}>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        Hello, {currentUserRole?.desc || "Welcome"}
                    </li>
                </ul>
                <div>
                  <a class="btn btn-secondary" href="/update-profile" role="button">Update Profile »</a>
                </div>
                <div>
                  <Button variant="link" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
            </div>
          </nav>
          { currentUserRole && currentUserRole.roleId === 1 && <AdminDashboard/> }
          { currentUserRole && currentUserRole.roleId === 2 && <WorkerDashboard/> }
          { !currentUserRole && <UserDashboard/> }
        </main>
      }
    </>
  )
}

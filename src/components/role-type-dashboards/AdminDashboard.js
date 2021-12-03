import React, {useState, useEffect} from 'react'
import { Alert } from "react-bootstrap"
import "./home.css";
import "./sidebar.css";
import firebase from '../../firebase'
import "./sidebar.css";
import {
  PermIdentity,
  Storefront
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [error] = useState("")
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  function getAllUsers(){
      const usersCollection = firebase.firestore().collection('users')
      setLoading(true);
      usersCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
            if(user.roleId === 3)
                items.push(doc.data());
        });
        setUserList(items);
        setLoading(false);
      });
  }

  function showDetails() {
    alert("Display  details")
  }
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
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
                      Users
                    </li>
                  </Link>
                  <Link to="/workers" className="link">
                    <li className="sidebarListItem">
                      <Storefront className="sidebarIcon" />
                      Workers
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div class="home">
            <div class="featured">
              <div class="featuredItem">
                <span class="featuredTitle">Total number of Users</span>
                <div class="featuredMoneyContainer">
                  <span class="featuredMoney">{ userList && userList.length > 0 ? userList.length : 0 }</span>
                </div>
              </div>
            </div>
            <div class="homeWidgets" style={{ display: "flex", margin: "20px"}}>
              <div class="widgetSm">
                <span class="widgetSmTitle">Users</span>
                <ul class="widgetSmList">
                {userList.map((user) => (
                  <li class="widgetSmListItem">
                  <img src="https://static.wikia.nocookie.net/peppapedia/images/0/05/Doge.png" alt="" class="widgetSmImg"/>
                  <div class="widgetSmUser">
                    <span class="widgetSmUsername">{user.id}</span>
                    <span class="widgetSmUserTitle">{user.name}</span>
                    <span class="widgetSmUserTitle">{user.address}</span>
                  </div>
                  <button class="widgetSmButton" onClick={showDetails}><svg class="MuiSvgIcon-root widgetSmIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>Display</button>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}


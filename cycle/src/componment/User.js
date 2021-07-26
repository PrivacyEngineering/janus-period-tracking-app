import React from 'react';
import './user.css';
import Dropdown from 'react-bootstrap/Dropdown'
const User = () => (
  <div className="content">
    <div className="userPage">
      <h2>User Page</h2>

      <div className="queryContainer">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Select query
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>

  </div>
);

/* var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;
 
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data)); */

export default User;
import React, { useState } from 'react';
import './user.css';
import { gql, useLazyQuery  } from '@apollo/client';


const GET_USER = gql`
query user($id: Int!){
  getUser(id: $id){
    id
    username 
    lastName
    firstName
    age
    email
    role
    contraceptive
  },
  getSymptom(id: $id){ 
    id 
    date
    symptom
    pain
  },
  getCycle(id: $id){ 
    id 
    start
    end
  }
}
`;

const GET_ALL_USERS = gql`
query {
  allUsers{ 
    username 
    lastName
    firstName
    age
    email
    role
    contraceptive
    }
}
`;


const GET_SYMPTOM = gql`
query symptom($id: Int!){
  getSymptom(id: $id){ 
    id 
    date
    symptom
    pain
    }
}
`;

const GET_ALL_SYMPTOM = gql`
query {
  allSymptoms{ 
    id 
    date
    symptom
    pain
  }
}
`;

const GET_CYCLE = gql`
query cycle($id: Int!){
  getCycle(id: $id){ 
    id 
    start
    end
    hasUser{
      username 
      age
      lastName
      firstName
      email
      role
      contraceptive
    }
  }
}
`;

const GET_ALL_CYCLES = gql`
query {
  allCycles{ 
    id 
    start
    end
  }
}
`;

const User = () => {
  // Sets a state variable to save the current inputValue
  const [inputVal, setValue] = useState(" ");

  // Hook for quering all related userData by an ID
  const [getUserData, { data: dataA }] = useLazyQuery(
    GET_USER,
    { variables: { id: inputVal }, context: {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }}
  );

  // Hooks for quering AllUsers, AllSymptom, AllCycles  
  const [getAllUser, { data: dataB }] = useLazyQuery(GET_ALL_USERS, {
    context: {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }
  });
  const [allSymptoms, { data: dataC }] = useLazyQuery(GET_ALL_SYMPTOM, {
    context: {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }
  });
  const [allCycles, { data: dataD }] = useLazyQuery(GET_ALL_CYCLES, {
    context: {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }
  });

  // NOT USED: could be used for quering only one symptom by ID
  const [getSymptom, { data: dataE }] = useLazyQuery(
    GET_SYMPTOM,
    { variables: { id: inputVal } }
  );

  // NOT USED: only one cycle by ID
  const [getCycle, { data: dataF }] = useLazyQuery(
    GET_CYCLE,
    { variables: { id: inputVal } }
  );





  return (
    <div className="content">
      <div className="userPage">
        <h2>User Page</h2>

        <div className="btnContainer">
          <input placeholder="Enter ID" onChange={e => setValue(parseInt(e.target.value))} />
          <button onClick={() => getUserData()}>
            Get user data by ID.
          </button>
          <pre>
            {JSON.stringify(dataA, null, "  ")}
          </pre>
        </div>

        <div className="btnContainer">
          <button onClick={() => getAllUser()}>
            Get All Users.
          </button>
          <pre>
            {JSON.stringify(dataB, null, "  ")}
          </pre>
        </div>

        <div className="btnContainer">
          <button onClick={() => allSymptoms()}>
            Get All Symptoms.
          </button>
          <pre>
            {JSON.stringify(dataC, null, "  ")}
          </pre>
        </div>

        <div className="btnContainer">
          <button onClick={() => allCycles()}>
            Get All Cycles.
          </button>
          <pre>
            {JSON.stringify(dataD, null, "  ")}
          </pre>
        </div>

        {/* <div className="btnContainer">
          <input placeholder="Enter ID" onChange={e => {
            const newVal = e.target.value;
            setValue(prev => parseInt(prev + newVal))
          }} />
          <button onClick={() => getCycle()}>
            Get a Cycle by ID.
          </button>
          <pre>
            {JSON.stringify(dataD, null, "  ")}
          </pre>
        </div>

        <div className="btnContainer">
          <input placeholder="Enter ID" onChange={e => {
            const val = e.target.value;
            setValue(prev => parseInt(prev + val))
          }} />
          <button onClick={() => getSymptom()}>
            Get a Symptom by ID.
          </button> 
          <pre>
            {JSON.stringify(dataB, null, "  ")}
          </pre>
          
        </div>*/}
      </div>
    </div>
    
  );
}

export default User;
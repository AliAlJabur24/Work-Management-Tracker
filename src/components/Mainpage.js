import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import UserProfile from './UserProfile';
import { db } from "../Util/Firebase";
import '../assets/css/uikit.css'
import Select from 'react-select';
import Board from '@asseinfo/react-kanban';
import '../assets/css/Style.css';

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

function Mainpage() {
  const location = useLocation();
  const [Task, setTask] = useState('');
  const [Info, setInfo] = useState('');
  const [DataAdded, setDataAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [UserData, setUserData] = useState({});
  const Username = Object.entries(location.state.detail)[3][1]
  const usersCollectionRef = collection(db, Username);

  const options = [
    { value: 'Done', label: 'Done' },
    { value: 'Stuck', label: 'Stuck' },
    { value: 'In progress', label: 'In progress' },
  ];

  let board = {
    columns: [
      {
        id: 'In progress',
        title: 'In progress 🔨',
        cards: [
        ]
      },
      {
        id: 'Stuck',
        title: 'Stuck 💭',
        cards: [
        ]
      },
      {
        id: 'Done',
        title: 'Done ✅',
        cards: [
        ]
      }
    ]
  }

  console.log(board.columns.map((obj) => obj.id))

  const createTask = async () => {
    await addDoc(usersCollectionRef, { title: Task, description: Info, Status: selectedOption.value, id: Math.floor(Math.random() * 2147483647) + 1 }), getUsers();
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    dataEntry(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  const dataEntry = (data) => {
    for (let index = 0; index < Object.keys(data).length; index++) {
      if (data[index].Status === 'Stuck') {
        board.columns[1].cards.push(data[index]);
        data[index].id = Math.floor(Math.random() * 2147483647) + 1
      }
      if (data[index].Status === 'In progress') {
        data[index].id = Math.floor(Math.random() * 2147483647) + 1
        board.columns[0].cards.push(data[index]);
      }
      if (data[index].Status === 'Done') {
        data[index].id = Math.floor(Math.random() * 2147483647) + 1
        board.columns[2].cards.push(data[index]);
      }
    }
    console.log(board.table);
    setDataAdded(true);
  }


  useEffect(() => {
    getUsers();
  });

  return (
    <div>
      <UserProfile data={location.state.detail} />

      <div className="Taskinputs uk-position-medium uk-position-center-left uk-overlay uk-overlay-default">
        <div className="uk-card uk-card-default">
          <div className="uk-card uk-card-default uk-card-body">
            <h3 className="uk-card-title">Create Task</h3>
            <div className="uk-margin">
              <input
                className='uk-input uk-form-width-medium'
                placeholder="Task..."
                onChange={(event) => {
                  setTask(event.target.value);
                }}
              />
            </div>


            <div className="uk-margin">
              <input
                className='uk-input uk-form-width-medium'
                placeholder="More Info..."
                onChange={(event) => {
                  setInfo(event.target.value);
                }}
              />
            </div>
            <div className="uk-margin">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <button className="uk-button uk-button-default" onClick={createTask}> Create Task</button>
          </div>
        </div>



      </div>

      <Board initialBoard={board} />

    </div>
  );
}

export default Mainpage;

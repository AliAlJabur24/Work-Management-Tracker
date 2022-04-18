import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import regeneratorRuntime from "regenerator-runtime";
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
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UserData from './UserData';

function Mainpage() {
  const location = useLocation();
  const [Task, setTask] = useState('');
  const [Info, setInfo] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [UserData, setUserData] = useState([]);
  const Username = Object.entries(location.state.detail)[3][1]
  const usersCollectionRef = collection(db, Username);

  const options = [
    { value: 'Done', label: 'Done' },
    { value: 'Stuck', label: 'Stuck' },
    { value: 'In progress', label: 'In progress' },
  ];


  function onCardMove(card, source, destination) {
    console.table(board)
    console.log("----------");
    console.log(card);
    console.log(source);
    console.log(destination);
  }

  const board = {
    columns: [
      {
        id: 1,
        title: 'In progress🔨',
        cards: [
          {
            id: 1,
            title: 'UI Improvements',
            description: 'Rework Current UI Solution'
          },
        ]
      },
      {
        id: 2,
        title: 'Stuck💭',
        cards: [
          {
            id: 2,
            title: 'Add User Authentication',
            description: 'Use Google Authentication With react to create a seemless user experince'
          },
        ]
      },
      {
        id: 3348748374,
        title: 'Done✔️',
        cards: [
          {
            id: 3,
            title: 'Integrating Firebase',
            description: 'Integrate Firebase With React/electron'
          },
        ]
      }
    ]
  }



  const createTask = async () => {


    await addDoc(usersCollectionRef, { title: Task, description: Info,Status: selectedOption.value }), getUsers();
  };


  const deleteTask = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  useEffect(() => {

    getUsers();
  }, []);


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

        <Board onCardDragEnd={onCardMove} initialBoard={board} />


      </div>
      );
}

      export default Mainpage;

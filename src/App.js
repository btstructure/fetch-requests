import React, { useState, useEffect } from "react";
function App() {
  const [information, setInformation] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  //Get request
  useEffect(() => {
    fetch("http://localhost:3001/informations")
      .then((response) => response.json())
      .then((data) => setInformation(data));
  }, []);

  //POST request
  function addInformation(e) {
    e.preventDefault();
    if (!name || !age) {
      return;
    }
    const newInformation = {
      name: name,
      age: age,
    };
    fetch("http://localhost:3001/informations", {
      method: "POST",
      body: JSON.stringify(newInformation),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newInfo) => {
        setInformation([...information, newInfo]);
        setName("");
        setAge("");
      });
  }

  //DELETE request
  function deleteInformation(id) {
    const filteredInformation = information.filter((info) => info.id !== id);
    fetch(`http://localhost:3001/informations/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setInformation(filteredInformation));
  }

  return (
    <div className="App">
      {information.map((info) => (
        <div key={info.id}>
          <p>
            {info.name}: {info.age}
          </p>
          <button onClick={() => deleteInformation(info.id)}>Delete</button>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={name}
          name="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          value={age}
          name="age"
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <button onClick={addInformation}>Submit</button>
    </div>
  );
}

export default App;

import "./AccountCreatorScreen.css";
import React, { useState } from "react";
import logo from "./assets/Daco_117466.png";

function AccountCreatorScreen({ toHomeScreen }) {
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !username || !selectedAccountType) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          accountType: selectedAccountType
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Account created with $300 bonus in checking!");
        toHomeScreen();
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="flex flex-row items-center w-[100vw] h-[100vh]">
      <div className="w-[50%] bg-[#000046] h-full flex flex-col justify-center items-center gap-4">
        <form className="flex flex-col justify-center gap-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl text-white">
            Let's get you all set up. Create your account here.
          </h2>

          <label className="text-3xl text-white">What's your name?</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-lg p-2 w-[50%] text-white mb-4"
            placeholder="First"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded-lg p-2 w-[50%] text-white mb-4"
            placeholder="Last"
          />

          <label className="text-3xl text-white">Choose a username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg p-2 w-[50%] text-white mb-4"
            placeholder="Username"
          />

          <label className="text-3xl text-white">Account type</label>
          <div className="flex flex-row gap-4">
            {["personal", "business", "commercial"].map((type) => (
              <button
                key={type}
                type="button"
                className={`w-[30%] rounded text-white transition-colors duration-500 ease-in-out ${
                  selectedAccountType === type ? "bg-green-600" : "bg-gray-500 hover:bg-green-600"
                }`}
                onClick={() => setSelectedAccountType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-row gap-4 items-center">
            <button type="submit" className="bg-green-500 text-black font-bold rounded w-[30%]">
              Submit
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white rounded w-[30%]"
              onClick={toHomeScreen}
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>

      <div className="w-[50%] h-[100%] bg-black flex flex-col justify-center items-center">
        <img src={logo} alt="Logo" className="w-140 h-auto rounded-lg" />
        <header className="text-8xl text-white font-thin">Watergate</header>
        <label className="text-2xl text-white font-thin pt-4">
          Here to make banking effortless, for everyone.
        </label>
      </div>
    </div>
  );
}

export default AccountCreatorScreen;

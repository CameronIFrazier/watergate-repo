import "./AccountScreen.css";
import "./AccountScreen.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import SidebarIcon from "./assets/menu.png";
//images
import homeIcon from "./assets/house (1).png";
import upArrow from "./assets/upload.png";
import rightArrow from "./assets/chevron.png";
import infoIcon from "./assets/info-sign.png";
import shieldIcon from "./assets/security.png";
import logo from "./assets/Daco_117466.png";
import visa from "./assets/visa.png";
import cardAndShieldIcon from "./assets/payment-protection.png";
import cardIcon from "./assets/contactless.png";
import greenCheckMark from "./assets/check.png";
import piggyBank from "./assets/savings.png";
import lightBulb from "./assets/light-bulb.png";
import money from "./assets/money.png";
//ml-auto pushes things as far right as possible within container
function AccountScreen({ toHomeScreen, username }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMoneyOptions, setshowMoneyOptions] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);
  const [selectedTransaction, setselectedTransaction] = useState(null);
  const [account1, setaccount1] = useState(null);

  const [account2, setaccount2] = useState(null);

  const [checkingBalance, setCheckingBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [transferAmount, settransferAmount] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!username) return; // avoid running with null
    axios
      .get(`https://watergate-repo-production.up.railway.app/api/balance/${username}`)
      .then((res) => {
        setCheckingBalance(res.data.checking_balance);
        setSavingsBalance(res.data.savings_balance);
      })
      .catch((err) => console.error(err));
  }, [username]); // runs when username changes
const [error, setError] = useState(null);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked submit");
  try {
    // Step 1: Get the current balances
    const res = await axios.get(`https://watergate-repo-production.up.railway.app/api/balance/${username}`);
    const { checking_balance, savings_balance } = res.data;
    let newCheckingBalance = 0;
    let newSavingsBalance = 0;
    if(selectedTransaction==="deposit"){
      console.log("Deposit selected");
      if (account1 === "Checkings") {
        newCheckingBalance = checking_balance + transferAmount;
        newSavingsBalance = savings_balance;
      } else if (account1 === "Savings") {
        newCheckingBalance = checking_balance;
        newSavingsBalance = savings_balance + transferAmount;
      }
    } else if(selectedTransaction==="withdrawl"){
      console.log("Withdrawl selected");
      if (account1 === "Checkings") {
        newCheckingBalance = checking_balance - transferAmount;
        newSavingsBalance = savings_balance;
      } else if (account1 === "Savings") {
        newCheckingBalance = checking_balance;
        newSavingsBalance = savings_balance - transferAmount;
      }
    } else if(selectedTransaction==="transfer"){
      if (account1 === "Checkings" && account2 === "Savings") {
     newCheckingBalance = checking_balance - transferAmount;
     newSavingsBalance = savings_balance + transferAmount;
  } else {
      newCheckingBalance = checking_balance + transferAmount;
      newSavingsBalance = savings_balance - transferAmount;
  }
}
 if (newCheckingBalance < 0 || newSavingsBalance < 0) {
      setError("Insufficient funds");
      return; // stop execution, do not update DB
    }
     
    setError(null); // clear any previous error
    // Step 2: Update the balances in the database
    const updateRes = await axios.post("https://watergate-repo-production.up.railway.app/api/update_balances", {
      username,
      checking_balance: newCheckingBalance,
      savings_balance: newSavingsBalance,
    });

    console.log("Balances updated:", updateRes.data);

    // Step 3: Update local state (UI) too
    setCheckingBalance(newCheckingBalance);
    setSavingsBalance(newSavingsBalance);

  } catch (err) {
    console.error(err);
    setError("Server error. Try again.");
  }
};
  return (
    <div className="flex flex-col items-center w-[100vw] h-[250vh] ">
      <div className="flex flex-col bg-blue-800 items-center w-[100%] h-[12vh] ">
        <div className="flex flex-row w-[75%] h-[50%] pt-4 ">
          <img
            src={SidebarIcon}
            alt="Menu"
            className="w-10 h-10 cursor-pointer invert"
            onClick={() => setSidebarOpen(true)}
          />
          <img
            src={logo}
            alt="Menu"
            className="h-10 pl-4 w-auto cursor-pointer mix-blend-color-burn"
            onClick={() => setSidebarOpen(true)}
          />
          <div className="flex flex-row ml-auto gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 invert"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 invert"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <header onClick={toHomeScreen} className="text-gray-200">
              Sign out{" "}
            </header>
          </div>
        </div>
        <div className="flex flex-row gap-4 w-[75%] pt-4">
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Accounts
          </header>
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Pay & transfer
          </header>
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Plan & track
          </header>
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Investments
          </header>
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Benefits & travel
          </header>
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Securit & privacy
          </header>
          <header className=" text-gray-200 hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Explore products
          </header>
        </div>
      </div>
      {/* White bar */}
      <div className="flex bg-white justify-center items-center w-[100%] h-[6vh]">
        <div className="flex flex-row gap-4 w-[75%]">
          <header className=" text-black hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Overview
          </header>
          <header className=" text-black hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Statements & documents
          </header>
          <header className=" text-black hover:underline underline-offset-4 decoration-1 cursor-pointer">
            Profile & settings
          </header>
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      <div className="flex flex-row bg-gray-200 justify-center pt-8 w-[100%] h-[222vh] gap-4 ">
        {/* Begin Left side content can go here */}
        <div className="flex flex-col bg-gray-200 gap-4 items-center w-[50%] h-[200vh]">
          {/* Bank accounts */}
          <div className="flex flex-col bg-white w-[100%] rounded h-[45vh] gap-4 pl-4">
            <div className=" flex flex-row w-[100%] ">
              <header className="text-2xl font-bold pt-4">Bank accounts</header>
              <div className="flex justify-end items-center w-[80%] gap-4 pt-4">
                <img
                  src={infoIcon}
                  alt="Description"
                  className="h-6 w-auto rounded-lg "
                />
                <img
                  src={upArrow}
                  alt="Description"
                  className="h-6 w-auto rounded-lg"
                />
              </div>
            </div>
            <hr className=" w-[100%] border-t border-gray-300 border-t-2" />{" "}
            {/* Checkings */}
            <div className="flex flex-row gap-4">
              <header className="text-blue-500 w-[75%] ">
                Watergate Checkings...0873
              </header>
              <div className="w-[75%] justify-end  flex flex-row gap-4 pr-4">
                <img
                  src={cardAndShieldIcon}
                  alt="Description"
                  className="h-6 w-auto rounded-lg "
                />
                <img
                  src={shieldIcon}
                  alt="Description"
                  className="h-5 w-auto rounded-lg "
                />

                <button
                  type="button"
                  className="bg-blue-700 text-white rounded p-1 text-sm "
                >
                  Transfer Money
                </button>
                <button
                  type="button"
                  className="bg-white text-blue rounded border p-1 text-sm "
                >
                  More
                </button>
              </div>
            </div>
            <label className=" text-5xl">${checkingBalance.toFixed(2)}</label>
            <label className="">Available balance</label>
            <hr className=" w-[100%] border-t border-gray-300 border-t-2" />{" "}
            {/* Savings */}
            <div className="flex flex-row gap-4">
              <header className="text-blue-500 w-[25%]">
                Watergate Savings...9514
              </header>
              <div className="w-[75%] justify-end  flex flex-row gap-4 pr-4">
                <img
                  src={cardAndShieldIcon}
                  alt="Description"
                  className="h-6 w-auto rounded-lg "
                />
                <img
                  src={shieldIcon}
                  alt="Description"
                  className="h-5 w-auto rounded-lg "
                />

                <button
                  type="button"
                  className="bg-blue-700 text-white rounded p-1 text-sm "
                >
                  Transfer Money
                </button>
                <button
                  type="button"
                  className="bg-white text-blue rounded border p-1 text-sm "
                >
                  More
                </button>
              </div>
            </div>
            <label className=" text-5xl">${savingsBalance.toFixed(2)}</label>
            <label className="">Available balance</label>
          </div>

          {/* Credit Card */}
          <div className="flex flex-col rounded bg-white w-[100%] h-[45vh] gap-4 pl-4 ">
            <header className="text-2xl font-bold pt-4">Credit Cards</header>
            <hr className=" w-[100%] border-t border-gray-300 border-t-2" />{" "}
            {/* Checkings */}
            <div className="flex flex-row gap-4">
              <header className="text-blue-500 w-[20%] ">
                Freedom Rise...2920
              </header>
              <div className="w-[75%]  justify-end pr-4 ml-auto flex flex-row gap-4">
                {/* Insert image here */}
                {/* Insert image here */}

                <button
                  type="button"
                  className="bg-blue-700 text-white rounded p-1 text-sm "
                >
                  Pay Card
                </button>
                <button
                  type="button"
                  className="bg-white text-blue rounded border p-1 text-sm "
                >
                  More
                </button>
              </div>
            </div>
            <div className="w-[98%] rounded-lg bg-gray-100 ">
              {/* Check mark image here */}
              <div className="flex flex-row pl-4 items-center">
                <img src={greenCheckMark} className="h-6 w-6 "></img>
                <div className="pl-4">
                  <p>You have automatic payments enabled</p>
                  <label className="text-xs pb-2">
                    See payment activity for more info
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-[98%]">
              <div className=" flex flex-col h-[5vh]">
                <label className=" text-5xl">$0.00</label>

                <label className="">Current balance</label>
                <label className="text-xs text-blue-500">Details</label>
              </div>
              <img src={cardIcon} className="w-25 h-auto ml-auto"></img>
            </div>
            <div className="grid grid-cols-4 w-[100%]">
              <label className="font-bold">1st of every month</label>
              <label className="font-bold">0.00</label>
              <label className="font-bold">0.00</label>
              <label className="font-bold">1,000 </label>
              <label>payment due date</label>
              <label>Minimum payment due</label>
              <label>Interest saving balance</label>
              <label>Available credit</label>
            </div>
          </div>
        </div>
        {/* Begin Right side content can go here */}
        <div className="flex flex-col bg-gray-200 w-[25%] h-[200vh] gap-4">
          <div className="flex flex-col bg-white w-[100%] h-[13vh] pt-4 pl-4 gap-4 rounded">
            <header className="font-bold">Watergate MyHome</header>
            <div className="flex flex-row">
              {/*image of house here*/}
              <img
                src={homeIcon}
                alt="Description"
                className="w-12 h-auto rounded-lg "
              />

              <p className="text w-[70%] pl-6">
                See rates, properties and insights, and manage your mortgage{" "}
              </p>
              <img
                src={rightArrow}
                alt="Description"
                className="h-8 w-auto rounded-lg "
              />
            </div>
          </div>
          <div className="flex flex-col bg-white w-[100%] h-[13vh] pt-4 pl-4 gap-4 rounded">
            <header className="font-bold">Autosave</header>
            <div className="flex flex-row">
              {/*image of house here*/}
              <img
                src={piggyBank}
                alt="Description"
                className="w-12 h-auto rounded-lg "
              />

              <p className="text w-[70%] pl-6">
                Build a savings habit with repeat transfers.{" "}
              </p>
              <img
                src={rightArrow}
                alt="Description"
                className="h-8 w-auto rounded-lg "
              />
            </div>
          </div>
          <div className="flex flex-col bg-white w-[100%] h-[15vh] pt-4 pl-4 gap-4 rounded">
            <header className="font-bold">Help & support</header>
            <div className="flex flex-row">
              <img
                src={lightBulb}
                alt="Description"
                className="w-12 h-12 rounded-lg "
              />

              <p className="text w-[70%] pl-6">
                Get help replacing cardsm reporting fraud, ordering checks,
                exploring payment assistance, contacting us and more.{" "}
              </p>
              <img
                src={rightArrow}
                alt="Description"
                className="h-8 w-auto rounded-lg "
              />
            </div>
          </div>
          {/**DEPOSIT AND WITHDRAWL */}
          <div className="flex flex-col bg-white w-[100%] pb-4 h-auto pt-4 pl-4 gap-4 rounded">
            <header className="font-bold">Help & support</header>
            <div className="flex flex-row">
              <img
                src={money}
                alt="Description"
                className="w-12 h-12 rounded-lg "
              />

              <p className="text w-[70%] pl-6">
                Make a deposit, withdrawl, or transfer funds here.{" "}
              </p>
              <img
                src={rightArrow}
                alt="Description"
                className="h-8 w-auto rounded-lg "
                onClick={() => setshowMoneyOptions((prev) => !prev)}
              />
            </div>
          </div>
          {showMoneyOptions && (
  <div className="flex flex-col bg-white w-full h-auto pt-4 pl-4 gap-4 rounded pb-4">
    {/* Transaction type buttons */}
    <div className="flex flex-row gap-4">
      <button
        type="button"
        className={`bg-blue-700 text-white rounded p-1 text-sm transition-colors duration-500 ease-in-out ${
          selectedTransaction === "deposit" ? "bg-green-600" : "hover:bg-green-600"
        }`}
        onClick={() => {
          setShowAccount2(false);
          setselectedTransaction("deposit");
        }}
      >
        Deposit
      </button>

      <button
        type="button"
        className={`bg-blue-700 text-white rounded p-1 text-sm transition-colors duration-500 ease-in-out ${
          selectedTransaction === "withdrawl" ? "bg-green-600" : "hover:bg-green-600"
        }`}
        onClick={() => {
          setShowAccount2(false);
          setselectedTransaction("withdrawl");
        }}
      >
        Withdraw
      </button>

      <button
        type="button"
        className={`bg-blue-700 text-white rounded p-1 text-sm transition-colors duration-500 ease-in-out ${
          selectedTransaction === "transfer" ? "bg-green-600" : "hover:bg-green-600"
        }`}
        onClick={() => {
          setShowAccount2(true);
          setselectedTransaction("transfer");
        }}
      >
        Transfer
      </button>
    </div>

    {/* Account 1 selection */}
    <div className="flex flex-row gap-4 items-center">
      <label>Choose account:</label>
      <button
        type="button"
        className={`bg-blue-700 text-white rounded p-1 text-sm ${
          account1 === "Checkings" ? "bg-green-600" : "hover:bg-green-600"
        }`}
        onClick={() => setaccount1("Checkings")}
      >
        Checkings
      </button>
      <button
        type="button"
        className={`bg-blue-700 text-white rounded p-1 text-sm ${
          account1 === "Savings" ? "bg-green-600" : "hover:bg-green-600"
        }`}
        onClick={() => setaccount1("Savings")}
      >
        Savings
      </button>
    </div>

    {/* Account 2 selection for transfer */}
    {showAccount2 && (
      <div className="flex flex-row gap-4 items-center">
        <label>Choose account 2:</label>
        <button
          type="button"
          className={`bg-blue-700 text-white rounded p-1 text-sm ${
            account2 === "Checkings" ? "bg-green-600" : "hover:bg-green-600"
          }`}
          onClick={() => setaccount2("Checkings")}
        >
          Checkings
        </button>
        <button
          type="button"
          className={`bg-blue-700 text-white rounded p-1 text-sm ${
            account2 === "Savings" ? "bg-green-600" : "hover:bg-green-600"
          }`}
          onClick={() => setaccount2("Savings")}
        >
          Savings
        </button>
      </div>
    )}

    {/* Amount input */}
    <div className="flex flex-row gap-4 items-center">
      <label>Amount:</label>
      <input
        type="number"
        className="border rounded p-2 w-1/2"
        placeholder="Enter amount"
        value={transferAmount}
        onChange={(e) => settransferAmount(Number(e.target.value))}
      />
    </div>

    {/* Submit button */}
    <button
      type="button"
      className="bg-blue-700 text-white rounded p-2 w-1/4 mt-2"
      onClick={handleSubmit}
    >
      Submit
    </button>

    {/* Error display */}
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
)}

        </div>

        {/* End Right side content can go here */}
      </div>
    </div>
  );
}
export default AccountScreen;

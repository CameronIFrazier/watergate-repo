import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import AccountCreatorScreen from './AccountCreatorScreen';
import AccountScreen from './AccountScreen';
import CarouselComponent from "./components/Carousel";
import axios from "axios";

import debitCardIcon from "./assets/credit-card (2).png";
import jpMorganIcon from "./assets/communication.png";
import logo from "./assets/Daco_117466.png";
import creditCardIcon from "./assets/contactless.png";
import peopleImage1 from "./assets/coworker-tablet-tile.avif";
import moneyHandImage from "./assets/save-money.png";
import girlInCarImage from "./assets/handingcarkey.m3-w800-16-9.jpg";
import piggyBankIcon from "./assets/piggy-bank.png";
import homeIcon from "./assets/home (1).png";
import checkIcon from "./assets/checked.png";
import cardIcon from "./assets/credit-card (3).png";
import carIcon from "./assets/hatchback.png";
import briefcaseIcon from "./assets/briefcase.png";
import sportsAndEntertainmentIcon from "./assets/extracurricular-activities.png";
import securityIcon from "./assets/cyber-security.png";
import privateClientIcon from "./assets/personal-data.png";

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.get(`https://watergate-repo-production.up.railway.app/api/check-user/${username}`);
      if (res.data.exists) {
        navigate(`/account/${username}`);
      } else {
        setError("User not found!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[455vh] overflow-y-auto">
      <div className="h-[15vh] flex flex-col w-[70%]">
        <div className="grid grid-cols-2">
          <div className="flex flex-row pt-1">
            <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Personal</header>
            <header className="ps-4 hover:underline underline-offset-4 decoration-4 cursor-pointer">Business</header>
            <header className="ps-4 hover:underline underline-offset-4 decoration-4 cursor-pointer">Commercial</header>
          </div>
          <div className="pt-1">
            <div className="flex flex-row justify-end">
              <header className="pr-4 hover:underline underline-offset-4 decoration-4 cursor-pointer">Schedule a meeting</header>
              <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Customer Service</header>
            </div>
          </div>
        </div>
        <div className="flex flex-row pt-4 text-3xl w-[50%] gap-4">
          Watergate
          <img src={logo} alt="" className="w-15 h-auto rounded-lg" />
        </div>
        <div className="flex flex-row gap-4 pt-4">
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Checking</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Savings and CDs</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Credit Cards</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Home Loans</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Auto</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Investing by J.P. Morgan</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Education and Goals</header>
          <header className="hover:underline underline-offset-4 decoration-4 cursor-pointer">Travel</header>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center justify-center bg-[#000046] w-[100%] h-[45vh] p-6">
        <div className="flex flex-col h-[50%]">
          <div className="text-2xl pb-1 pt-2 text-white">Enjoy</div>
          <div className="text-7xl pb-4 text-white">$300!</div>
        </div>
        <div className="flex flex-col justify-center w-[30%] h-[50%]">
          <header className="text-white text-4xl pb-4">New Watergate Checking Customers</header>
          <p className="text-2xl text-white pb-4">
            New CrestLine Checking Customers will receive a large cash bonus upon sign up. Open a Watergate Total Checking® account with qualifying activities.
          </p>
          <button
            type="button"
            className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[30%]"
            onClick={() => navigate("/create-account")}
          >
            Open an account
          </button>
        </div>

        <div className="bg-white h-[90%] w-[19%] rounded-lg pl-4 pt-12">
          <form className="space-y-4 flex flex-col">
            <h2 className="text-3xl">Welcome</h2>
            <label>Username</label>
            <input
              id="name"
              type="text"
              className="border p-2 w-[50%] mb-4"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="button"
              className="bg-[#000046] text-white px-4 py-2 rounded-lg w-[25%]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <header className="text-gray-500 text-5xl">Choose what's right for you</header>
      <CarouselComponent className="w-full pt-4" />

      <div className="flex flex-row gap-4 w-[90%] h-[70vh] justify-center items-center text-white pt-9">
        <div className="flex flex-col w-[25%] h-[100%] bg-[#000046] border-2 border-gray-300">
          <div className="h-[25%] flex flex-row justify-center items-center text-white">
            <header className="text-3xl w-[60%]">Watergate Platinum Reserve®</header>
            <img src={debitCardIcon} alt="" className="w-40 h-auto rounded-lg" />
          </div>
          <div className="bg-white h-full flex flex-col gap-4 text-black p-4">
            <header className="text-black text-4xl font-bold h-[35%] pt-5">100,000 points + $500 Watergate Travel credit</header>
            <p className="text-black text-2xl h-[35%]">Our best offer ever. Plus, get more than $2,700 in annual value with the most rewarding card.</p>
            <button className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[40%]">See details</button>
          </div>
        </div>
        <div className="flex flex-col w-[25%] h-[100%] bg-blue-300 border-2 border-gray-300">
          <div className="h-[25%] flex flex-row justify-center items-center text-white">
            <header className="text-3xl w-[60%]">Watergate Free Unlmited Card®</header>
            <img src={creditCardIcon} alt="" className="w-40 h-auto rounded-lg" />
          </div>
          <div className="bg-white h-full flex flex-col text-black gap-4 p-4">
            <header className="text-black text-4xl font-bold h-[35%] pt-5">Earn a $200 Dollar Bonus</header>
            <p className="text-black text-2xl h-[35%]">Plus, earn unlimited 1.5% cash back or more on all purchases, including 3% on dining and drugstores - all with no annual fee</p>
            <button className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[40%]">Learn More</button>
          </div>
        </div>
        <div className="flex flex-col w-[25%] h-[100%] bg-gray-300 border-2 border-gray-300">
          <div className="h-[25%] flex flex-row justify-center items-center text-white">
            <header className="text-3xl w-[60%] text-black">J.P. Morgan</header>
            <img src={jpMorganIcon} alt="" className="w-38 h-auto rounded-lg" />
          </div>
          <div className="bg-white h-full flex flex-col text-black gap-4 p-4">
            <header className="text-black text-4xl font-bold h-[35%] pt-5">Don't go at it alone.</header>
            <p className="text-black text-2xl h-[35%]">Partner with a J.P. Morgan Private Client Advisore, dedicated to helping you reach your individual investment goals.</p>
            <button className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[40%]">Continue</button>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 w-[72%] my-4" />
      <div className="w-[69%] h-[35vh]">
        <div className="flex flex-row justify-center items-center w-full h-full text-white">
          <img src={peopleImage1} alt="Description" className="w-[35%] h-full object-cover rounded-lg bg-black" />
          <div className="flex flex-col h-full gap-8 p-4">
            <header className="text-6xl text-gray-800">Explore the knowledge center</header>
            <p className="text-black">Find articles, videos and more to help you start, manage or grow your business</p>
            <button className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[40%]">Continue</button>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 w-[72%] my-4" />
      <div className="w-[69%] h-[35vh] flex flex-col">
        <div className="flex flex-row justify-center items-center w-full h-full text-white">
          <div className="flex flex-col h-full gap-8 p-4">
            <header className="text-6xl text-gray-800">College Students: This offer is for you</header>
            <p className="text-black">
              As a new Watergate checking customer, earn 125$ when you open Watergate College Checking® and complete 10 qualifying transactions.{" "}
              <span className="font-bold">$0 Monthly Service Fee</span> while in school (5 years maximum). Ages 17-24.
            </p>
            <button className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[40%]">Continue</button>
          </div>
          <img src={moneyHandImage} alt="Description" className="w-[35%] h-full object-cover rounded-lg" />
        </div>
      </div>

      <hr className="border-t border-gray-300 w-[72%] my-4" />
      <div className="w-[69%] h-[35vh] flex flex-col">
        <div className="flex flex-row justify-center items-center w-full h-full text-white">
          <img src={girlInCarImage} alt="Description" className="w-[35%] h-full object-cover rounded-lg" />
          <div className="flex flex-col h-full gap-8 p-4">
            <header className="text-6xl text-gray-800">Find the best car for you</header>
            <p className="text-black">Use Watergate Auto to shop live inventory and filter by price, modle features and more. Then apply online in minutes for Watergate Auto financing.</p>
            <button className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg w-[40%]">Shop now</button>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 w-[72%] my-4" />
      <div className="flex flex-row">
        <header className="pb-4">Follow Me:</header>
      </div>

      <div className="bg-gray-50 flex h-[140vh] flex-col w-full pl-4 items-center">
        <header className="text-gray-600 text-2xl pt-8 text-black text-center">We're here to help you manage your money today and tomorrow</header>
        <div className="grid grid-cols-6 center-items-center pt-8 w-[65%] gap-x-8 gap-y-4">
          <img src={checkIcon} alt="Description" className="w-8 h-auto rounded-lg" />
          <img src={piggyBankIcon} alt="Description" className="w-10 h-auto rounded-lg" />
          <img src={cardIcon} alt="Description" className="w-8 h-auto rounded-lg" />
          <img src={homeIcon} alt="Description" className="w-10 h-auto rounded-lg" />
          <img src={carIcon} alt="Description" className="w-10 h-auto rounded-lg" />
          <img src={briefcaseIcon} alt="Description" className="w-10 h-auto rounded-lg" />
          <header>Checking Accounts</header>
          <header>Savings Accounts & CDs</header>
          <header>Credit Cards</header>
          <header>Mortgages</header>
          <header>Auto</header>
          <header>Watergate for Business</header>
          <p className="text-sm text-gray-800">Choose the checking account that works best for you.</p>
          <p className="text-sm text-gray-800">It's never too early to begin saving.</p>
          <p className="text-sm text-gray-800">Watergate credit cards can help you buy the things you need.</p>
          <p className="text-sm text-gray-800">Apply for a mortgage or refinance your mortgage with Watergate.</p>
          <p className="text-sm text-gray-800">Watergate Auto is here to help you get the right car.</p>
          <p className="text-sm text-gray-800">With Watergate for Business you'll receive guidance from a team of business professionals.</p>
          <img src={jpMorganIcon} alt="Description" className="w-10 h-auto" />
          <img src={privateClientIcon} alt="Description" className="w-10 h-auto" />
          <img src={privateClientIcon} alt="Description" className="w-10 h-auto" />
          <img src={sportsAndEntertainmentIcon} alt="Description" className="w-10 h-auto" />
          <img src={securityIcon} alt="Description" className="w-10 h-auto" />
          <div></div>
          <header>Investing by J.P. Morgan</header>
          <header>Watergate Private Client</header>
          <header>About Watergate</header>
          <header>Sports & Entertainment</header>
          <header>Watergate Security Center</header>
          <header></header>
          <p className="text-sm text-gray-800">Partner with a global leader who puts your financial needs first.</p>
          <p className="text-sm text-gray-800">Get more from a personalized relationship offering no everyday banking fees.</p>
          <p className="text-sm text-gray-800">Watergate serves millions of people with a broad range of products.</p>
          <p className="text-sm text-gray-800">Watergate gives you access to unique sports, entertainment and culinary events.</p>
          <p className="text-sm text-gray-800">Our suite of security features can help you protect your info, money and give you peace of mind.</p>
          <p></p>
        </div>
        <div className="flex flex-row w-full h-20 justify-center items-end gap-4">
          <header className="text-black font-bold">Other Services:</header>
          <label>Deposit Account Agreements</label>
          <label>Mobile Banking</label>
          <label>Online Banking</label>
          <label>Student Center</label>
          <label>Zelle</label>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-8 justify-center items-center">
        <p className="text-xs text-gray-500">"Watergate," "JPMorgan," "JPMorganWatergate," the JPMorgan Watergate logo and the Octagon Symbol are trademarks of JPMorgan Watergate Bank, N.A.</p>
        <p className="text-xs text-gray-500">"Watergate Private Client" is the brand name for a banking and investment product and service offering.</p>
        <p className="text-xs text-gray-500">Investing involves market risk, including possible loss of principal.</p>
        <div className="flex flex-row justify-center items-center gap-4">
          <label className="text-xs text-gray-500">About Watergate</label>
          <label className="text-xs text-gray-500">J.P. Morgan</label>
          <label className="text-xs text-gray-500">JPMorganWatergate</label>
          <label className="text-xs text-gray-500">Media Center</label>
          <label className="text-xs text-gray-500">Careers</label>
          <label className="text-xs text-gray-500">Site Map</label>
          <label className="text-xs text-gray-500">Privacy</label>
          <label className="text-xs text-gray-500">Security</label>
          <label className="text-xs text-gray-500">Terms of Use</label>
          <label className="text-xs text-gray-500">Accessibility</label>
        </div>
        <div className="flex flex-row justify-center items-center pt-4">
          <img src={homeIcon} alt="Description" className="w-10 h-auto rounded-lg" />
          <label className="text-xs text-gray-500">Equal Housing Opportunity</label>
        </div>
        <label className="text-xs text-gray-500">© 2025 JPMorganWatergate.</label>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-account" element={<AccountCreatorScreen toHomeScreen={() => window.location.href = "/"} />} />
      <Route path="/account/:username" element={<AccountScreen toHomeScreen={() => window.location.href = "/"} />} />
    </Routes>
  );
}

export default App;
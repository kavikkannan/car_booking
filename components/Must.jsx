import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import under from '@/assests/Car_Anime.json';
import { ref, get, query, orderByKey,set, update } from 'firebase/database';
import { db,auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
const Must = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [modeOfTransport, setModeOfTransport] = useState('');
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingBoxVisible, setBookingBoxVisible] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState([]);
    const [currentUser, setDisplayName] = useState('');

  const cities = ['CHENNAI AIRPORT', 'EGMORE/ CENTRAL RAILWAY STATION', 'BANGALORE RAILWAY STATION', 'BANGALORE AIRPORT', 'VIT-MAIN GATE', 'VIT-INSIDE CAMPUS,KATPADI STATION'];
  const router=useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName;
        setDisplayName(name);
      } else {
        setDisplayName('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (from && to && modeOfTransport && date) {
          const snapshot = await get(query(ref(db, 'newuser/vechile1'), orderByKey()));
          const vehicleData = snapshot.val();
          
          const vehiclesArray = [];
          for (const key in vehicleData) {
            console.log(vehicleData[key].to);
            if (vehicleData[key].from === from && vehicleData[key].to === to && vehicleData[key].mode === modeOfTransport && vehicleData[key].date === date) {
              vehiclesArray.push({
                id: key,
                mode: vehicleData[key].mode,
                vehicleNumber: vehicleData[key].vehicleNumber,
                seatsAvailable: vehicleData[key].noseat,
              });
            }
          }
          setVehicles(vehiclesArray);
          setLoading(false);
        } else {
          setLoading(true);
          setVehicles([]);
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };
    fetchData();
  }, [from, to ,modeOfTransport]); 

 const handlegoback =()=>{
  setBookingBoxVisible(false);
  setPassengerDetails([]);
 }
 const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              setIsLoggedIn(true);
          } else {
              setIsLoggedIn(false);
          }
      });
  }, []);
  const handleVehicleSelection = async (vehicle) => {
    setSelectedVehicle(vehicle);
   
  
    try {
      const snapshot = await get(ref(db, 'newuser/bookings'));
      const bookingData = snapshot.val();
      if(isLoggedIn) {
        setBookingBoxVisible(true);
        if (bookingData) {
        const passengerDetai=[];
        for (const userName in bookingData) {
          console.log(userName);
          const booking = bookingData[userName];
          console.log(booking.vehicleNumber);
          if (booking.vehicleNumber === vehicle.vehicleNumber) {
            const userDetailsRef = ref(db, `newuser/userdetail/${userName}`);
        const userDetailsSnapshot = await get(userDetailsRef);
            const passengerDetail = userDetailsSnapshot.val();
            if (passengerDetail) {
              passengerDetai.push(passengerDetail);
            }
          }
          
        }
        
        setPassengerDetails(passengerDetai);
      }
    }
    else{
      return <p>Please sign in to view your profile.</p>;
    }
    } catch (error) {
      console.error('Error fetching passenger details:', error);
    }
  };
  
  const handleConfirmBooking = async (vehicle) => {
    try {
      
      setLoading1(!loading1)
      const vechileRef = ref(db, `newuser/vechile1/${vehicle.vehicleNumber}`);
      const vechileSnapshot = await get(vechileRef);
      const vechileData = vechileSnapshot.val();
      const currentNoseat = vechileData.noseat;
  
      await set(vechileRef, {
        ...vechileData,
        noseat: currentNoseat - 1,
      });
      console.log(selectedVehicle.vehicleNumber);
      const bookingDetailsRef = ref(db, `newuser/bookings/${currentUser}`);
      await set (bookingDetailsRef,{
        vehicleNumber: selectedVehicle.vehicleNumber,
      });
      
      
      router.push("/thank");
      setBookingBoxVisible(false);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }finally{
      setLoading1(!loading1);
    }
  };
  
  
  return (
  <>
  {loading1 ? (
        <Loading />
      ) : (
  
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <div
            className="absolute flex justify-center items-center inset-x-0 top-10 -z-1 transform-gpu overflow-hidden blur-3xl sm:top-10"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[80rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
      <h1 className="text-3xl font-bold text-black ">Cab Sharing Service</h1>
      <div className=' z-10 w-full h-full flex flex-col sm:flex-row items-center justify-evenly pt-3 sm:pt-0'>
        <div className='  flex h-[75%] w-[60%] sm:w-[40%] shadow-gray-700 shadow-2xl justify-center items-center'>
          <form  className=" w-[75%] sm[50%] h-[50%] flex flex-col justify-evenly items-center  rounded-3xl ">
              <input 
               type="date"
               value={date}
               onChange={(e) => setDate(e.target.value)}
               className="border border-black rounded-md px-4 py-2 mb-4 w-full"

              />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border border-black rounded-md px-4 py-2 mb-4 w-full"
              >
                <option value="">Select From</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border border-black rounded-md px-4 py-2 mb-4 w-full"
              >
                <option value="">Select To</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={modeOfTransport}
                onChange={(e) => setModeOfTransport(e.target.value)}
                className="border border-black rounded-md px-4 py-2 mb-4 w-full"
              >
                <option value="">Select Mode of Transport</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
              </select>
                  
          </form>
        </div>
        <div className=' z-10 flex justify-center items-center h-[75%] w-[44%]'>
          <div>
            {loading ? (
              <div>
                <center>choose your destination</center>
                <Lottie animationData={under} className=' ' />
              </div>
            ) : (
              <>
                {from && to && modeOfTransport && !bookingBoxVisible &&(
                  <table className="border-collapse  text-black bg-gray-400  mt-4 rounded-md overflow-hidden shadow-2xl  shadow-gray-700">                    <thead>
                      <tr className="bg-gray-400">
                        <th className="border border-black px-4 py-2">Mode</th>
                        <th className="border border-black px-4 py-2">Vehicle Number</th>
                        <th className="border border-black px-4 py-2">Seats Available</th>
                        {!isLoggedIn &&(<th className="border  text-white px-4 py-2">login to view</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle, index) => (
                        <tr key={index}>
                          <td className="border border-black px-4 bg-gray-200 py-2">{vehicle.mode}</td>
                          <td className="border border-black px-4 bg-gray-200 py-2">{vehicle.vehicleNumber}</td>
                          <td className="border border-black px-4 bg-gray-200 py-2">{vehicle.seatsAvailable}</td>
                          <td className="border border-black px-4 bg-gray-200 py-2">
                            {isLoggedIn &&(<button onClick={() => handleVehicleSelection(vehicle)} className="bg-green-400 text-black py-1 px-2 rounded-md hover:bg-green-600 transition duration-300">
                              Book Now
                            </button>)}
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {bookingBoxVisible && selectedVehicle && (
                  <div className="mt-4 border border-gray-400 p-4">
                    <p><strong>Vehicle Number:</strong> {selectedVehicle.vehicleNumber}</p>
                    <p><strong>From:</strong> {from}</p>
                    <p><strong>To:</strong> {to}</p>
                    <p><strong>Passenger Details:</strong></p>
                    <div className="grid grid-cols-2 gap-4">
                      {passengerDetails.map((passenger, index) => (
                        <div key={index} className="border border-gray-300 p-2">
                          <p><strong>Name:</strong> {passenger.name}</p>
                          <p><strong>Registration Number:</strong> {passenger.regno}</p>
                          <p><strong>Age:</strong> {passenger.age}</p>
                          <p><strong>Graduate:</strong> {passenger.graduate}</p>
                          <p><strong>Branch:</strong> {passenger.branch}</p>
                          <p><strong>Year of Passout:</strong> {passenger.yearofpassout}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button onClick={handlegoback} className="bg-red-500 text-black font-bold py-1 px-2 rounded-md hover:bg-red-600 transition duration-300">
                        Go Back
                      </button>
                      {vehicles.map((vehicle) => (<button onClick={() => handleConfirmBooking(vehicle)} className="bg-green-500 font-bold text-black py-1 px-2 rounded-md hover:bg-green-600 transition duration-300">
                        Confirm Booking
                      </button>))}
                    </div>
                  </div>
                )}


              </>
            )}
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Must;

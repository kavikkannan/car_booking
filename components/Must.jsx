import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import under from '@/assests/Car_Anime.json';
import { ref, get, query, orderByKey,set, update } from 'firebase/database';
import { db } from '@/firebaseConfig';
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
  const currentUser = 'kavi';
  const cities = ['CHENNAI AIRPORT', 'EGMORE/ CENTRAL RAILWAY STATION', 'BANGALORE RAILWAY STATION', 'BANGALORE AIRPORT', 'VIT-MAIN GATE', 'VIT-INSIDE CAMPUS,KATPADI STATION'];
  const router=useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (from && to && modeOfTransport && date) {
          const snapshot = await get(query(ref(db, 'newuser/vechile1'), orderByKey()));
          const vehicleData = snapshot.val();
          
          const vehiclesArray = [];
          for (const key in vehicleData) {
            console.log(vehicleData[key].to);
            // Check if the vehicle's 'from', 'to', and 'mode' match the selected inputs
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
  }, [from, to ,modeOfTransport]); // Dependency array includes 'from' and 'to' for re-fetching when they change
   // No dependencies for this useEffect hook
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic here
  };
 const handlegoback =()=>{
  setBookingBoxVisible(false);
  setPassengerDetails([]);
 }
  const handleVehicleSelection = async (vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingBoxVisible(true);
  
    try {
      const snapshot = await get(ref(db, 'newuser/bookings'));
      const bookingData = snapshot.val();
  
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
    } catch (error) {
      console.error('Error fetching passenger details:', error);
    }
  };
  
  const handleConfirmBooking = async () => {
    try {
      
      setLoading1(!loading1)
      // Fetch the current noseat value
      const vechileRef = ref(db, `newuser/vechile1`);
      const vechileSnapshot = await get(vechileRef);
      const vechileData = vechileSnapshot.val();
      const currentNoseat = vechileData.noseat;
  
      // Update the noseat value in the database by decrementing it by 1
      await set(vechileRef, {
        ...vechileData,
        noseat: currentNoseat - 1,
      });
      console.log(selectedVehicle.vehicleNumber);
      // Update database with the user's booking information
      const bookingDetailsRef = ref(db, `newuser/bookings/${currentUser}`);
      await set (bookingDetailsRef,{
        vechileNumber: selectedVehicle.vehicleNumber,
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
  
    <div className="flex flex-col items-center justify-center h-screen text-green-700">
      <h1 className="text-3xl font-bold ">Cab Sharing Service</h1>
      <div className=' w-full h-full flex flex-col sm:flex-row items-center justify-evenly pt-3 sm:pt-0'>
        <div className='  flex h-[75%] w-[60%] sm:w-[40%] shadow-gray-700 shadow-2xl justify-center items-center'>
          <form onSubmit={handleSubmit} className=" w-[75%] sm[50%] h-[50%] flex flex-col justify-evenly items-center  rounded-3xl ">
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
        <div className='  flex justify-center items-center h-[75%] w-[44%]'>
          <div>
            {loading ? (
              <div>
                <center>choose your destination</center>
                <Lottie animationData={under} className=' ' />
              </div>
            ) : (
              <>
                {from && to && modeOfTransport && !bookingBoxVisible &&(
                  <table className="border-collapse border border-green-800 mt-4">
                    {/* Table header */}
                    <thead>
                      <tr className="bg-green-200">
                        <th className="border border-green-600 px-4 py-2">Mode</th>
                        <th className="border border-green-600 px-4 py-2">Vehicle Number</th>
                        <th className="border border-green-600 px-4 py-2">Seats Available</th>
                        <th className="border border-green-600 px-4 py-2"></th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                      {vehicles.map((vehicle, index) => (
                        <tr key={index}>
                          <td className="border border-green-600 px-4 py-2">{vehicle.mode}</td>
                          <td className="border border-green-600 px-4 py-2">{vehicle.vehicleNumber}</td>
                          <td className="border border-green-600 px-4 py-2">{vehicle.seatsAvailable}</td>
                          <td className="border border-green-600 px-4 py-2">
                            <button onClick={() => handleVehicleSelection(vehicle)} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300">
                              Book Now
                            </button>
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
          <p><strong>Phone Number:</strong> {passenger.phonenumber}</p>
          <p><strong>Age:</strong> {passenger.age}</p>
          <p><strong>Graduate:</strong> {passenger.graduate}</p>
          <p><strong>Branch:</strong> {passenger.branch}</p>
          <p><strong>Year of Passout:</strong> {passenger.yearofpassout}</p>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-4">
      <button onClick={handlegoback} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300">
        Go Back
      </button>
      <button onClick={handleConfirmBooking} className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition duration-300">
        Confirm Booking
      </button>
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

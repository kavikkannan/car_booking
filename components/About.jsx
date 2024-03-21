import React from 'react';

const AboutPage = () => {
  return (
    <div className=" flex justify-center items-center text-black min-h-screen py-16 px-4 sm:px-6 lg:px-8">
     <div
            className="absolute inset-x-0 top-40 -z-3 transform-gpu overflow-hidden blur-3xl sm:top-10"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div
            className="absolute  -bottom-40  transform-gpu overflow-hidden blur-3xl sm:bottom-0 sm:right-0"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
      <div className="max-w-4xl mx-auto ">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="mb-6">Welcome to Easy Connect, your premier transportation solution serving the vibrant community of VIT Vellore campus and beyond. Easy Connect is dedicated to bridging the gap between VIT Vellore and key transportation hubs such as Chennai Airport, Chennai Railway Station, Bangalore Airport, and Bangalore Railway Station.</p>
          <p className="mb-6">At Easy Connect, we understand the importance of reliable and convenient transportation, especially for students, faculty, and visitors traveling to and from VIT Vellore. That's why we've tailored our services to meet the unique needs of our customers, offering a diverse fleet to suit every occasion and preference.</p>
          <p className="mb-6">Whether you're heading to the airport for a weekend getaway, catching a train to your hometown, or simply need a ride into the city, Easy Connect has you covered. Our intuitive booking system makes reserving a vehicle a breeze. Simply select your desired vehicle, choose your pickup and drop-off locations, and confirm your reservation in just a few clicks.</p>
          <p className="mb-6">With Easy Connect, you can check the availability of vehicles in real-time, ensuring you can find the perfect ride for your needs, whenever you need it. Our transparent pricing policy ensures there are no hidden fees or surprises, so you can book with confidence. Our secure payment system accepts multiple payment methods, making it easy and convenient to pay for your rental online.</p>
          <p className="mb-6">Read reviews and ratings from fellow renters to help you choose the perfect vehicle for your trip, and leave feedback to help others make informed decisions. Drive with peace of mind knowing that Easy Connect offers comprehensive insurance options to protect you against unexpected incidents.</p>
          <p className="mb-6">Experience the convenience of Easy Connect today and discover why we're the preferred transportation choice for the VIT Vellore community.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

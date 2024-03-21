import React from 'react';

const Help = () => {
  return (
    <div className="bg-white text-black min-h-screen py-16 px-4 sm:px-6 lg:px-8">
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
            className="absolute  -bottom-40 transform-gpu overflow-hidden blur-3xl sm:bottom-0 sm:-right-10"
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
     <h2 className="text-3xl text-center font-bold mb-6">Help</h2>
      <div className="max-w-4xl flex mx-auto">

          <p className="mb-6">Welcome to the Easy Connect HHelp Center! Whether you're a student, faculty member, or visitor, we're here to ensure your journey between VIT Vellore campus and key transportation hubs is smooth and stress-free. Below are some resources to assist you:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Frequently Asked Questions (FAQs): Have questions about booking a ride, vehicle options, or payment methods? Check out our FAQs for answers to common inquiries.</li>
            <li>Contact Us: Need assistance or have a specific inquiry? Our dedicated support team is available to hHelp. Reach out to us via email, phone, or WhatsApp and we'll be happy to assist you.</li>
            <li>Terms of Service: Familiarize yourself with our Terms of Service to understand your rights and obligations when using Easy Connect's services.</li>
            <li>Privacy Policy: Learn about how we collect, use, and protect your personal information by reviewing our Privacy Policy.</li>
            <li>Feedback: We value your feedback! Share your thoughts, suggestions, or concerns with us using our feedback form. Your input hHelps us continually improve our services for the VIT Vellore community.</li>
          </ul>
          <p className="mb-6">Thank you for choosing Easy Connect for your transportation needs. We're here to make your journey between VIT Vellore and key transportation hubs as seamless and enjoyable as possible.</p>
       
      </div>
    </div>
  );
};

export default Help;

import React from 'react';

const PacksCard = ({pack}) => {
    const {name, description, price, serviceType, durationHours, imageURL, features} = pack;
    // console.log(imageURL);
    
    return (
      <div className="bg-[#FCFAE0] p-4 rounded-xl mt-8 shadow-2xl">
        <img src={imageURL} className="rounded-xl h-77 w-full" alt="" />
        <h1 className="text-2xl font-semibold text-center my-2">{name}</h1>
        <p>{description}</p>
        <p className="flex justify-between flow-col md:flex-row font-semibold my-2">
          <span>Service Type: {serviceType}</span>
          <span>Duration Hours: {durationHours}h</span>
        </p>
        <ul>
          {" "}
          <strong>Features:</strong>
          <li className="list-disc ml-8">{features[0]}</li>
          <li className="list-disc ml-8">{features[1]}</li>
          <li className="list-disc ml-8">{features[2]}</li>
          <li className="list-disc ml-8">{features[3]}</li>
        </ul>
        <h5 className="my-5 text-xl">
          <strong>Price: </strong> ${price}
        </h5>
        <button className="btn btn-primary w-full">Book now</button>
      </div>
    );
};

export default PacksCard;
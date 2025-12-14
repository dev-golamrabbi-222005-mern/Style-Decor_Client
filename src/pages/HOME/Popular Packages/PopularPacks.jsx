import React, { use } from 'react';
import PacksCard from './PacksCard';

const packsPromise = fetch("/popularPacks.json").then((res) => res.json());

const PopularPacks = () => {
        const packsData = use(packsPromise);        

    return (
      <div className="bg-white p-4 my-10 md:my-15 lg:my-22 rounded-xl">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          Our Popular Packages
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-5">
          {packsData.map((pack) => (
            <PacksCard pack={pack} key={pack.id} />
          ))}
        </div>
        <div className='flex justify-center items-center my-8'>
          <button className="btn btn-primary">View all Services</button>
        </div>
      </div>
    );
};

export default PopularPacks;
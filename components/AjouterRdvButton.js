import React from 'react';
import Link from 'next/link';


const AjouterRdvButton = () => {
    return <div>
      <Link href='/addRdv' passHref={true}><button className=" w-96 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
          créer un rendez vous
      </button>
      </Link>
    </div>;
  };
export default AjouterRdvButton;

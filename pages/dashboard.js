import React from 'react';
import { getSession } from 'next-auth/react';
import PatientCard from '../components/PatientCard';

export default function dashboard(){
 
  
  return (
  <div>
    
      <PatientCard ></PatientCard>
  </div>
    );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              permanent: false,
          },
      };
  }
  
  return {
     
      props: { session },
  };
}


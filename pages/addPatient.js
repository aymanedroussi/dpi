import React from 'react';
import FormAddPatients from '../components/FormAddPatients';
import { getSession } from 'next-auth/react';

const addPatient = ({data}) => {
  
  return <div>
<FormAddPatients dataProps={data}></FormAddPatients>
  </div>;
};




export default addPatient;

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
  let data=context.query;
  return {
     
      props: { session ,data},
  };
}


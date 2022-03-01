import React from 'react';
import FormAddRdv from '../components/FormAddRdv';
import { getSession } from 'next-auth/react';

const addRdv = ({data}) => {
  
  return <div>
<FormAddRdv dataProps={data}></FormAddRdv>
  </div>;
};



export default addRdv;

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



import React from 'react';
import { getSession } from 'next-auth/react';

import 'nprogress/nprogress.css'

import FormRegister from '../components/FormRegister';
const register = () => {

   
  
  
  
  return (
    <FormRegister></FormRegister>
   
  );


}
export default register;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false,
          },
      };
  }
  return {
     
      props: { session },
  };
}


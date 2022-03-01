import React from 'react';
import { getSession } from 'next-auth/react';
import RdvComponent from '../components/RdvComponent';
const rdv = () => {
  return <RdvComponent></RdvComponent>;
};

export default rdv;
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
  
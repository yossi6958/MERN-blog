import React from 'react';
import { useParams } from 'react-router-dom';
import ShowProfile from './ShowProfile';
import Navi from './Navi';

function UserProfile() {
  const { userId } = useParams();

  return (

    <div>
      <Navi/>
      <ShowProfile userId={userId} />
    </div>
  );
}

export default UserProfile;

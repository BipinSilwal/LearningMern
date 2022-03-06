import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Dashboard = () => {

    const [value, setValue] = useState('Hello');

    const fetchingData = async()=>{

        const {data} = await axios.get('/api/v1/jobs');

        setValue(data);
        


    };

    useEffect(()=>{

            fetchingData();

    },[])


  return (
    <div>{`Dashboard ${value}`}</div>
  )
}

export default Dashboard
import React, { useEffect } from 'react'
import { Loading, StatsContainer, ChartsContainer } from '../../components/index'
import { useAppContext } from '../../context/appContext'

const Stats = () => {

    const {allStats, isLoading, monthlyApplications} = useAppContext();


    useEffect(()=>{

          allStats();

    },[])


    if(isLoading){

        <Loading center />

    }


  return (
   <>
   
    <StatsContainer/>
    {monthlyApplications.length > 0 && <ChartsContainer />}

    </>
  )
}

export default Stats
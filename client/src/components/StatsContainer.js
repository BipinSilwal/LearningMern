import React from "react";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import { useAppContext} from '../context/appContext';


const StatsContainer = () => {
 

  const { defaultStats } = useAppContext();

  const defaultStating = [

    {
        title: 'pending application',
        count: defaultStats.pending || 0,
        icon: <FaSuitcaseRolling/>,
        color: '#e9b949',
        bcg: '#fcefc7'
    
    },
    {
        title: 'interviews scheduled',
        count: defaultStats.interview || 0,
        icon: <FaCalendarCheck />,
        color: '#647acb',
        bcg: '#e0e8f9'
    
    },
    {
        title: 'jobs declined',
        count: defaultStats.declined || 0,
        icon: <FaBug/>,
        color: '#d66a6a',
        bcg: '#ffeeee'
    
    },





];


  return (
    <>
      <Wrapper>
       
        { defaultStating.map((item, index)=>{
              return  <StatItem key={index} {...item} />

        })  
        }
      </Wrapper>
    </>
  );
};

export default StatsContainer;

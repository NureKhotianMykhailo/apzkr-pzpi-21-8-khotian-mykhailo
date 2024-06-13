import React, { useState, useEffect } from 'react'
import Chart from '../Portfolio-Chart/Chart'
import MainHeader from '../Header/MainHeader'
import './Portfolio.css'
import AlocationTable from '../Alocation-Table/AlocationTable'
import axios from 'axios'
import StarredHeader from '../StarredHeader/StarredHeader'
import { useLocation } from 'react-router-dom';

const Portfolio = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get('user');

  const [data, setData] = useState(null)

  const fetchUserSettings = async () => {
    try {   
        const response = await axios.get('api/user')
        if (response.status == 401){
          window.location.href = '/login'
        } else {
          return response.data.settings    
        }
    } catch (error) { 
      window.location.href = '/login'
     
      console.error(error)    
    }    
}
const [isEnglish, setIsEnglish] = useState(null)
const [isUkr, setIsUkr] = useState(null)

useEffect(() => {

  const fetchData = async () => {
    try {
      const settingsData = await fetchUserSettings()
      setIsEnglish(settingsData.isEngLanguage)
      setIsUkr(!settingsData.isEngRegion)

      const responseW = await axios.post('/api/wallet', {"address": user ? user : null});
      const responseB = await axios.post('/api/balance', {"address": user ? user : null});
      const dataW = responseW.data;
      const dataB = responseB.data;
      let data = {"bal": dataB, "values": dataW}
      setData(data);

      
     
    } catch (error) {

    }

  };

  fetchData();

}, []);


  // let pdata = data? data.data? data.data.eth : data : NONE;

  return (
    <div className='Portfolio'>
        {props.isMain ? <MainHeader /> : <StarredHeader user = {user? user : ""}/>}
        <Chart data  = {data? data.bal? data.bal :            
              [
                {"bal": '0',"time":'00:00:00'},
                {"bal": '0',"time":'00:00:01'},
                {"bal": '0',"time":'00:00:02'},
                {"bal": '0',"time":'00:00:03'},
                {"bal": '0',"time":'00:00:04'},
                {"bal": '0',"time":'00:00:05'},
                {"bal": '0',"time":'00:00:06'},
                {"bal": '0',"time":'00:00:07'},
                {"bal": '0',"time":'00:00:08'},
                {"bal": '0',"time":'00:00:09'},
                {"bal": '0',"time":'00:00:10'},
                {"bal": '0',"time":'00:00:11'},
              ] :
              [
                {"bal": '0',"time":'00:00:00'},
                {"bal": '0',"time":'00:00:01'},
                {"bal": '0',"time":'00:00:02'},
                {"bal": '0',"time":'00:00:03'},
                {"bal": '0',"time":'00:00:04'},
                {"bal": '0',"time":'00:00:05'},
                {"bal": '0',"time":'00:00:06'},
                {"bal": '0',"time":'00:00:07'},
                {"bal": '0',"time":'00:00:08'},
                {"bal": '0',"time":'00:00:09'},
                {"bal": '0',"time":'00:00:10'},
                {"bal": '0',"time":'00:00:11'},
              ]
          } isUkr = {isUkr}
          isEnglish = {isEnglish}
           ethValue = {data? data.values.ethValue : 3000} 
           usdc  = {data? data.values.usdc*1.0012 : 0}
           usdt = {data? data.values.usdt*0.9998 : 0}/>
        <AlocationTable data = {data? data.values:
            {"eth":0,"usdt":0,"usdc":0,"ignite":0,"ethValue":0}
           
        } isEnglish = {isEnglish}/>
    </div>
  )
}

export default Portfolio
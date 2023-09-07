import * as React from 'react'
import { useEffect, useState } from 'react'
import FormLogin from './components/FormLogin'
import { FormInstance } from 'antd/lib/form';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axiosClient from "./../API/axios.config";
var ACCESS_TOKEN = '';


function App() {

  const formRef = React.createRef<FormInstance>();
  const [visibleModal, SetVisibleModal] = useState(false)
  const [data, setdata] = useState([]);
  useEffect(() => {
    SetVisibleModal(false);
    var to = sessionStorage.getItem('Token')
    localStorage.removeItem('Token');

    if (to != null) {
      ACCESS_TOKEN = to;
      console.log("I got TOken: " + ACCESS_TOKEN)
    }
  }, [])

  const HanleBntGet = () => {
    console.log("CLICKKK")
    if (ACCESS_TOKEN === '') {
      SetVisibleModal(true);
      console.log("check====" + visibleModal)
    } else {
    //   axiosClient({
    //     url:  'https://localhost:44363/GateWay_WeatherForecast',
    //     method: 'get',
    //     headers: {
    //         'Authorization': "Bearer "+ ACCESS_TOKEN,
    //         'Content-Type': 'application/json'
    //     }
    //  })
     axiosClient.get("/GateWay_WeatherForecast", {headers: {
      'Authorization': "Bearer "+ ACCESS_TOKEN,
      'Content-Type': 'application/json'
  }})
     .then(response => {
        setdata(response.data)
        console.log(response)
     }) 
     .catch(err => {
        console.log(err);
     });
    }


  }
  interface DataType {
    key: string;
    date: string;
    TemperatureC: string;
    TemperatureF: string;
    summary: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'TemperatureC',
      dataIndex: 'temperatureC',
      key: 'temperatureC'
    },
    {
      title: 'TemperatureF',
      dataIndex: 'temperatureF',
      key: 'temperatureF'
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary'
    },
  
    ]
  return (
    <>
      <h1> GET WEATHER </h1>
      <button type="button" className="btn btn-primary mt-5" onClick={HanleBntGet}>GET NOW</button>

      <FormLogin
        open={visibleModal}
        FormRef={formRef}
        onCancel={() => {
          console.log("cook")
          SetVisibleModal(false);
          formRef.current?.resetFields();
        }}
      />
        {data.length !=0 ?
        <Table className='pt-5' columns={columns} dataSource={data} rowKey='date'/>
        : null
        }
    </>
  )
}

export default App

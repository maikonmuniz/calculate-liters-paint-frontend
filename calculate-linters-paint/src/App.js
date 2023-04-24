import './styles.css'
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './services/api.js'

function App() {

  let arraObjCalculateLintersPaint          = [];
  let resultApi                             = '';
  const [wallHeight, setWallHeight]         = useState();
  const [wallWidth, setWallWidth]           = useState();
  const [door, setDoor]                     = useState();
  const [window, setWindow]                 = useState();  

  function handleChangeWallHeight(event){
    setWallHeight(event.target.value);
  }

  function handleChangeWallWidth(event){
    setWallWidth(event.target.value);
  }

  function handleChangeDoor(event){
    setDoor(event.target.value);
  }

  function handleChangeWindow(event){
    setWindow(event.target.value);
  }

  function addObjInArray(){

    if(arraObjCalculateLintersPaint.length > 3){
      return
    }
    arraObjCalculateLintersPaint.push({wallHeight, wallWidth, door, window})
  }

  async function adjustmentNameForAlertResult(obj){
    const nameLintersResult = Object.keys(obj);
    const resultLintersCalculate   = obj;
  
    let nameConcatLintersResult = "";

    for(let linters of nameLintersResult){
      nameConcatLintersResult += "litros "+ linters + " quantidade " + resultLintersCalculate[linters] + ", ";
    }

    return nameConcatLintersResult;
  }

  async function sendDadosToCalculateLintersPaint(){

      let objDatasendApi = {}

      objDatasendApi['objForCalculateAmountLiters'] = arraObjCalculateLintersPaint

      resultApi = await api.post('calculateLitersPaintWill', objDatasendApi).then((response) => {

        console.log(response)

        return response;

      })
      
      if(resultApi.status === 200){
        const nameConcatLintersResult =await adjustmentNameForAlertResult(resultApi.data.result)
        // const nameLintersResult = Object.keys(resultApi.data.result)
        // const resultLintersCalculate   = resultApi.data.result
      
        // let nameConcatLintersResult = "";

        // for(let linters of nameLintersResult){
        //   nameConcatLintersResult += "litros "+ linters + " quantidade " + resultLintersCalculate[linters] + ", ";
        // }

        toast.success(nameConcatLintersResult);
      }


      

  }


  return (

    <div className="container">

      <h1>Calcular quantidade de tinta necessária...</h1>

      <label>Altura Parede</label>
      <input className='inputContainer' onChange={handleChangeWallHeight} type="text" placeholder='digite a altura da parede'/>
      
      <label>Largura da Parede</label>
      <input className='inputContainer' onChange={handleChangeWallWidth} type="text" placeholder='digite a largura da parede'/>

      <label>Quantidade de Janela</label>
      <input className='inputContainer' onChange={handleChangeDoor} type="text" placeholder='digite a quantidade de janela'/>

      <label>Quantidade de Porta</label>
      <input className='inputContainer' onChange={handleChangeWindow} type="text" placeholder='digite a quantidade de porta'/>

      <input onClick={sendDadosToCalculateLintersPaint} className='inputForm' value='Enviar' type='button'></input>
      <input onClick={addObjInArray} value='Adicionar' className='inputForm' type='button'></input>
    <ToastContainer/>
    </div>
    
  );
}

export default App;

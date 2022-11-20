import React, { useEffect, useState } from 'react';


import { 
	Panel,
	ScreenSpinner, 
	Button,
	Title, 
	Div,
	PanelHeader,
	PanelHeaderBack,
	Alert
 } from '@vkontakte/vkui';

import './Game.css';  



import ExmpleGeneration from '../../scripts/decideTask';
import { getPadTime } from '../../scripts/getPadTime';
import { Icon16ClockCircleFill } from '@vkontakte/icons';
import { qsSign } from '../../hooks/qs-sign';
import axios from 'axios';
import { client } from '../../sockets/receiver';

import '../../img/Fonts.css'

const TemporaryGame = ({ id, go, count, setCount, setActivePanel, setPopout, singleType, answer, setAnswer,themeColors }) => {

    const [first, setFirst] = useState(true) //первый запуск

    const [gameData, setGameData] = useState(false)

    const [taskNumber, setTaskNumber] = useState(0)


     
 
	

	const [equation, setEquation] = useState([2, 2, '+', 4]); //задача

	const [tasks, setTasks] = useState(null);//варианты ответов
 
	const [timeLeft, setTimeLeft] = useState(30); //время
	const [isCounting, setIsCounting] = useState(false); //время
	

	const minutes = getPadTime(Math.floor(timeLeft/60)); //минуты

	const seconds = getPadTime(timeLeft - minutes * 60); //секунды



	

	useEffect(()=>{
		if(timeLeft === 0){
			setPopout(<ScreenSpinner size='large' />)
			setTaskNumber(0)
			setActivePanel('result')}
	}, [timeLeft])
    
	useEffect(()=>{
		

        setPopout(null)

		//lol()
	}, [])

	useEffect(()=>{


		const interval = setInterval(()=>{
			isCounting && setTimeLeft((timeLeft)=> timeLeft >= 1 ? timeLeft - 1 :0)
		}, 1000)
		
	},[isCounting])


    useEffect(()=>{
        console.log(answer)
    }, [answer])


    

	//код времени не мой кст :)
	



    function createLvl(){
        axios.post(`https://showtime.app-dich.com/api/plus-plus/lvl${qsSign}`, {
            "lvlType": "single30"
          })
        .then(async function (response) {
            console.log(response.data.data)
			setIsCounting(true)
            setAnswer({
                "id": response.data.data.id,
                "lvlType": "single30",
                "answers": [],
              })
            
            setGameData(response.data.data)
			setPopout(null)
        })
        .catch(function (error) {
            console.warn(error);
        });
    }
 
	return(

 
		<Panel id={id}>

		<PanelHeader 
		style={{backgroundColor: 'transparent' }} 
		transparent={true}
		shadow={false}
		separator={false}before={<PanelHeaderBack onClick={()=>{
			setPopout(
				<Alert
				  actions={[
					{
					  title: "Завершить",
					  mode: "destructive",
					  autoclose: true,
					  action: () => setActivePanel('menu') ,
					},
					{
					  title: "Отмена",
					  autoclose: true,
					  mode: "cancel",
					},
				  ]}
				  actionsLayout="vertical"
				  onClose={()=>{
					setPopout(null)
				  }}
				  header="Подтвердите действие"
				  text="Вы уверены, что хотите завершить игру?"
				/>
			  );
		
		}} />}>
		</PanelHeader>

		<div style={{background: themeColors === 'light'?"#F7F7FA":"#1D1D20", height: window.pageYOffset}}>


			<div className='game-div-margin'> 
			<Title level="2" className='selectAnswer' style={{ textAlign: 'center' }}>{!gameData &&'Выбери любой ответ, чтобы начать' ||gameData &&'Выбери правильный ответ:'}</Title>
			<div className='equationDiv'>
			{gameData&&<Title level="1" className='equation'
			style={{background: themeColors === 'light'?'#F0F1F5':'#2E2E33'}}>
                {gameData.tasks[taskNumber].task[0]}
                {gameData.tasks[taskNumber].task[2]}
                {gameData.tasks[taskNumber].task[1]}
                =<span className='equationMark'>?</span>
                </Title>}
			</div>

            {!gameData &&
            <div className='equationDiv'>
			<Title level="1" className='equation' style={{background: themeColors === 'light'?'#F0F1F5':'#2E2E33'}}>
                1+2
                =<span className='equationMark'>?</span>
                </Title>
			</div>}


	 
			<div style={{height: 30, marginTop: 12}} className='single-clock-div'>
					<Icon16ClockCircleFill width={16} height={16} className='multiplayer-title-return'
							fill='#99A2AD'
							style={{
								display:'inline-block', 
								paddingLeft:5,
								marginTop: 3
							}}
					/>
					<Title
					className='multiplayer-title-code'
					style={{
						display:'inline-block', 
						paddingLeft:5, 
						color: '#99A2AD',
						fontSize: 14}} ><span>{minutes}</span><span>:</span><span>{seconds}</span></Title>
					
			</div>
			
			
				<Div className='container'>

					{[0,1,2,3].map((value, index)=>{
						return(
						
						<Button 
						stretched 
						size="l" 
						sizeY='regular' 
						mode="neutral" 
						className='item'
						id={'button' + index} 
						style={{background: themeColors === 'light'?'#F0F1F5':'#2E2E33', color:  themeColors === 'light'?'#000':'#F0F1F5'}}
						key={index}
						onClick={()=>{
                            if(first){
								setPopout(<ScreenSpinner size='large' />)
                                createLvl()
                            }

                            if(!first){
								if(gameData){
									console.log(gameData)

									const newItem = {
										"id": gameData.tasks[taskNumber].id,
										"answer": gameData.tasks[taskNumber].answers[index]
									}

									const copy  = Object.assign({}, answer);
									copy.answers = [...answer.answers, newItem]
									setAnswer(copy);
								}

                            }
                            setFirst(false)
                            setTaskNumber(taskNumber+1)
							
							//setIsCounting(true)
						}} >
							<Title>
							{gameData&&gameData.tasks[taskNumber].answers[index]}
                            {!gameData&&index+1}
							</Title>
						</Button>
						

						
						)
						
						
					})}

				</Div>
			</div>
		</div>			
		</Panel>
	);
}



export default TemporaryGame;

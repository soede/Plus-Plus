import React, { useEffect, useState } from 'react';

import { 
	Input,
	ModalPage, 
	Button,
	PanelHeaderClose, 
	ModalPageHeader,
    Div
 } from '@vkontakte/vkui';


import bridge from '@vkontakte/vk-bridge';

import { Icon24DismissDark } from '@vkontakte/icons';
 

import './style.css'



import InputMinimalist from './InputMinimalist'
import { joinRoom } from '../../sockets/game';
 

const ModalInputCode = ({ id, setGameInfo, gameInfo,setJoinCode, setConnectType,setActiveModal, platform}) =>{

    const textInput = React.createRef();

 

    return(
        
        <ModalPage id={id}>

        <ModalPageHeader
            after={platform === 'ios'||
            platform === 'android'||
            platform === 'mobile-web'&&<Icon24DismissDark onClick={()=>{}} />}
            >
            Введите код
        </ModalPageHeader>
                <Div>
                    <Div  style={{padding: 10}}>
                    </Div>
                    
                    <div className='input-code-div'>
                    <InputMinimalist
                        
                        placeholder='XXXXX'
                        ref={textInput}
                        maxLength={5}
                        onChange={value => console.log(value)}

                        />
                    </div>

                    <div></div>

                    <Div style={{marginLeft: 20, marginTop: 30, marginRight: 20}}>
                        <Button
                        stretched 
                        onClick={()=>{
                            async function getId(){
                                const user = await bridge.send('VKWebAppGetUserInfo'); 
                                //await connectRoom(qsSign, textInput.current.value, user.id);
                                joinRoom(textInput.current.state.value, user.id)
                                setGameInfo({ ...gameInfo, roomId: textInput.current.state.value})
                                setConnectType('join')
                                setJoinCode(textInput.current.state.value)
                                setActiveModal(null)
                            }

                            getId()
                            console.log()
                        }}
                        style={{padding: 12, borderRadius: 25, background: '1A84FF'}}>
                            Присоединиться
                        </Button>
                    </Div>
                    
                    
                </Div> 
                <Div  style={{padding: 20}}>
                </Div>
        </ModalPage>
        
      );
}


export default ModalInputCode;

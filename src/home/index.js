import React , { useState, useEffect ,forwardRef, useRef, useImperativeHandle} from 'react'

import SpringTitle from '../components/spring-title'
import Bgm from '../components/audio'

import './index.scss'

const Index = () =>{
    const childRef = useRef();


    const handleClick =()=>{
        console.log(' do something')
        childRef.current.doPlay()
    }

    return (
        <div className='root'>
            <SpringTitle handleClick={handleClick}/>

            <Bgm ref={childRef} class='bgm' />
        </div>
    )
}

export default Index
import React ,{ forwardRef, useState, useRef, useImperativeHandle }from 'react'

import bgm from '../../assets/sounds/bgm.mp3'
import './index.scss'

const Index = forwardRef((props,ref) =>{

    const [playing, setPlaying] = useState(false);

    useImperativeHandle(ref, () => ({

        doPlay() {
            console.log('do play')
            if(!playing){
                console.log('====> he')
                play()
                setPlaying(true)
            }
        }
    
      }));

    const loadAudio=()=>{
        const AudioContext = window.AudioContext || window.webkitAudioContext

        const context = new AudioContext()


        const analyser = context.createAnalyser()
        analyser.fftSize = 512

        const audio = document.getElementById('audio')
        const source = context.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(context.destination)

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const WIDTH = 600
        const HEIGHT = 300

        const barWidth = WIDTH / bufferLength * 2
        let barHeight

        const renderFrame = ()=>{
            console.log('render frame')
            requestAnimationFrame(renderFrame)

            analyser.getByteFrequencyData(dataArray)

            ctx.clearRect(0, 0, WIDTH, HEIGHT)

            for (let i = 0, x = 0 ;i < bufferLength; i++) {
                barHeight = dataArray[i]

                const r = Math.ceil(Math.random() * 255)

                const g = Math.ceil(Math.random() * 255)
                const b = Math.ceil(Math.random() * 255)
                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

                x += barWidth + 2
            }
        }

        renderFrame()
    }

    const play = () =>{
        const audio = document.getElementById("audio")
        audio.play()
        loadAudio()
    }


    return (
        <div>
            <audio
                id='audio'
                loop
                src={bgm}
                crossOrigin='anonymous'
            />
            <canvas id="canvas"></canvas>
        </div>
    )
})

export default Index
import React , { Component } from 'react'

import SpringTitle from './spring-title'
import bgm from './bgm.mp3'


import './index.css'

class Index extends Component{

    loadAudio=()=>{
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

        console.log(bufferLength, dataArray)

        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const WIDTH = 400
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

    play=()=>{
        const audio = document.getElementById("audio")
        audio.play()
        this.loadAudio()
    }

    componentDidMount(){
        // chrome 禁止页面自动播放声音

        // window.addEventListener('hover', this.play(), { passive: true })

    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', this.play())
      }

    render (){
        return (
                <div className='root'>
                    <audio
                        id='audio'
                        loop
                        src={bgm}
                        crossOrigin='anonymous'
                    />
                    <div className='title' onClick={this.play}>Holicking</div>

                    <canvas id="canvas"></canvas>
                    <SpringTitle />
                </div>
            )
        }
}

export default Index
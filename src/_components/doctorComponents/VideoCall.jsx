import { useRef, useState, useEffect } from 'react'
import Peer from 'simple-peer'
import socket from '../../config/socket.js'
import { useNavigate } from 'react-router-dom'

const VideoCall = ({ patientId }) => {

  const [me, setMe] = useState("")
  const [stream, setStream] = useState()
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState("")
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState("")
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream)
      if (myVideo.current) myVideo.current.srcObject = stream
    })

    socket.emit("get-my-id", id => {
      setMe(id)
    })

    socket.on("callUser", (data) => {
      setReceivingCall(true)
      setCaller(data.from)
      setName(data.name)
      setCallerSignal(data.signal)
    })

    setIdToCall(patientId)

  }, [])

  useEffect(() => {
    socket.emit('send-docId', me, patientId)
  }, [me])


  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    navigate('/doctor/appointments')
  }

  const declineCall = () => {
    setCallEnded(true)
    socket.emit("callEnded", { callerId: me, patientId: idToCall })
    navigate('/doctor/appointments')
  }

  return (
    <div className='relative min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <div className="relative flex-1 w-full ">
        <div className="video absolute bottom-4 right-4 w-48 h-36 bg-black z-10 border border-primary-600">
          {stream && <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />}
        </div>
        <div className="video absolute inset-0 bg-black">
          {callAccepted && !callEnded ? (
            <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover" />
          ) : null}
        </div>
      </div>
      <div className="">
        {callAccepted && !callEnded ? (
          <button className='absolute bottom-10 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={leaveCall}>
            End Call
          </button>
        ) : (
          null
        )}
      </div>
      <div className="absolute bottom-20">
        {receivingCall && !callAccepted ? (
          <div className="flex justify-center items-center text-white">
            <h1><span className='capitalize font-bold'>{name}</span> is requesting Permission to join  </h1>
            <button className="ms-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded" onClick={answerCall}>
              Give Permission
            </button>
            <button className="ms-3 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={declineCall}>
              Decline
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VideoCall
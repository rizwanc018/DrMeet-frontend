import { useRef, useState, useEffect } from 'react'
import Peer from 'simple-peer'
import socket from '../../config/socket.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../Spinner.jsx'



const VideoCall = ({ docSokId }) => {
  const navigate = useNavigate()
  const [showSpinner, setShowSpinner] = useState(false)
  const { userInfo } = useSelector(state => state.auth)


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

  useEffect(() => {
    setIdToCall(docSokId)
  }, [])


  useEffect(() => {


    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (myVideo.current) {
            myVideo.current.srcObject = stream;
          }
        })
        .catch((error) => {
          // Handle permission denied or other errors
          console.error('Error accessing media devices:', error);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }

    socket.emit("get-my-id", id => {
      setMe(id)
    })

    socket.on("callUser", (data) => {
      setReceivingCall(true)
      setCaller(data.from)
      setName(data.name)
      setCallerSignal(data.signal)
    })

    socket.on("callEnded", () => {
      toast.error("Request declined")
      setTimeout(() => {
        navigate('/')
      }, 1000);
    })

    setName(userInfo.fname + ' ' + userInfo.lname)

  }, [])


  const callDoctor = (id) => {
    setShowSpinner(true)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
      })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }


  const leaveCall = () => {
    setCallEnded(true)
    navigate('/')
  }


  return (
    <>
      <Toaster />

      <div className='relative min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
        <div className="relative flex-1 w-full">
          <div className="video absolute bottom-4 right-4 w-48 h-36 bg-black z-10 border border-primary-600">
            {stream && <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />}
          </div>
          <div className="video absolute inset-0 bg-black">
            {callAccepted && !callEnded ? (
              <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover" />
            ) : null}
          </div>
        </div>
        <div className="relative mt-8">
          <input
            id="filled-basic"
            placeholder="ID to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            className="hidden p-2 rounded-md border border-gray-300"
          />
          <div className="mt-4">
            {callAccepted && !callEnded ? (
              <button className="absolute w-24 bottom-20 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={leaveCall}>
                End Call
              </button>
            ) : (

              showSpinner ?
                (
                  <button className="absolute  bottom-20 bg-black  font-bold py-2 px-4 rounded" onClick={() => callDoctor(idToCall)}>
                    <Spinner />
                  </button>
                ) : (
                  <button className="absolute  bottom-20 bg-primary-600 hover:bg-primary-700 text-white font-bold p-2 rounded" onClick={() => callDoctor(idToCall)}>
                    <p className="text-lg w-28">Ask to join</p>
                  </button>
                )
            )}
          </div>
        </div>
      </div >
    </>

  )
}

export default VideoCall
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { ToastContainer } from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import Forgetpasword from './Pages/Forgetpasword'
import { fetchUserByToken } from './Store/Userslice'
import Profilepage from './Pages/Profilepage'
import Friendprofile from './Pages/Friendprofile'
import Chat from './Pages/Chat'
import { connectSocket, disconnectSocket } from './Store/Socketslice'



const App=()=> {



let Userslice=useSelector((state)=>state.user);
 let socketSlice = useSelector((state) => state.socket);
let token=Userslice.token
let login=Userslice.login
console.log(Userslice); 

let dispatch=useDispatch()

  useEffect(()=>{
      if(token){
        dispatch(fetchUserByToken(token))
      }
  },[token])

useEffect(() => {
    if (Userslice?.user?._id) {
      dispatch(connectSocket(Userslice?.user?._id)); 
    }
return ()=>{
  if (socketSlice.isConnected) {
dispatch(disconnectSocket())
}

}
  }, [Userslice?.user?._id, dispatch]);
  return (
    <>
<BrowserRouter>
<div className='h-65px'>  
<Navbar/>

</div>
<Routes>
<Route path='/' element={ login===true?<Home/>:<Navigate to={'/login'}/>} />
<Route path='/profile' element={ login===true?<Profilepage/>:<Navigate to={'/login'}/>} />
<Route path='/login' element={login===false? <Login/>:<Navigate to={'/'}/> } />
<Route path='/signup' element={login===false? <Signup/>:<Navigate to={'/'}/>} />
<Route path='/forget' element={login===false? <Forgetpasword/>:<Navigate to={'/'}/>} />
<Route path='/friendprofile' element={login===true? <Friendprofile/>:<Navigate to={'/login'}/>} />
<Route path='/chat' element={login === true ? <Chat /> : <Navigate to={'/login'} />} />
</Routes>
<ToastContainer/>
</BrowserRouter>
    </>
  )
}


export default App

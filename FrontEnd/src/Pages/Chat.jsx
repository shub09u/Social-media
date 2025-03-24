import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { socket } from "../Store/Socketslice"
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = () => {
  let userSlice = useSelector((state) => state.user)

  let location = useLocation();
  let friendId = location.state.friend?.id
  let friendProfilePic = location.state.friend?.profilePic
  let friendName = location.state.friend?.name
  console.log(friendId);

  const [allMessages, setallMessages] = useState([]);
console.log(allMessages);

  const getChat = async () => {
    let res = await axios.get(`http://localhost:8090/chat/getFriendChat/${friendId}`, {
      headers: {
        'Authorization': userSlice.token
      }
    })
    let data = res.data;
    console.log(data)
    console.log(data[0].messages)
    setallMessages(data[0].messages)

  }

  useEffect(() => {
    getChat();
  }, [friendId, userSlice?.user?._id])


  let messageref = useRef()

  const handleSendMessage = async()=>{

      let obj = {
        text :messageref.current.value
      }
 socket.emit('sendMessage',{...obj,userId:userSlice.user._id, friendId})

      let res = await axios.post(`http://localhost:8090/chat/create/${friendId}`,obj,{
        headers:{
          'Authorization':userSlice.token
        }
      })
      let data = res.data;

      console.log(data)
      getChat()
      messageref.current.value = ''
  }
  useEffect(()=>{
    socket.on('recievedMsg',(ans)=>{
      console.log(ans)
      setallMessages((prev)=>[...prev,ans])
    })
  },[])

const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <div className="flex h-[calc(100vh-65px)] overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-300">
          {/* Sidebar Header */}
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Chat Web</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
              {/* Menu Dropdown */}
              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                  {/* Add more menu options here */}
                </ul>
              </div>
            </div>
          </header>
          {/* Contact List */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{friendName}</h2>
                <p className="text-gray-600">Hoorayy!!</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Martin</h2>
                <p className="text-gray-600">That pizza place was amazing! We should go again sometime. 🍕</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Charlie</h2>
                <p className="text-gray-600">Hey, do you have any recommendations for a good movie to watch?</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">David</h2>
                <p className="text-gray-600">I just finished reading a great book! It was so captivating.</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Ella</h2>
                <p className="text-gray-600">What's the plan for this weekend? Anything fun?</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Fiona</h2>
                <p className="text-gray-600">I heard there's a new exhibit at the art museum. Interested?</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">George</h2>
                <p className="text-gray-600">I tried that new cafe downtown. The coffee was fantastic!</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Hannah</h2>
                <p className="text-gray-600">I'm planning a hiking trip next month. Want to join?</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Ian</h2>
                <p className="text-gray-600">Let's catch up soon. It's been too long!</p>
              </div>
            </div>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Jack</h2>
                <p className="text-gray-600">Remember that hilarious joke you told me? I can't stop laughing!</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main Chat Area */}
        <div className="flex-1">
          {/* Chat Header */}
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold text-black">{friendName}</h1>
          </header>



        
          {/* Chat Messages */}
          <ScrollToBottom  className="h-[70vh] bg-black overflow-y-auto relative p-4 ">
          {
  allMessages.map((ele)=>{
    return ele.userId===friendId ? <div className="flex mb-4 cursor-pointer">
    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
      <img src={friendProfilePic} alt="User Avatar" className="w-8 h-8 rounded-full" />
    </div>
    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
      <p className="text-gray-700">{ele.text}</p>
    </div>
  </div>
  :
  <div className="flex justify-end mb-4 cursor-pointer">
              <div className="flex max-w-96 bg-indigo-900 text-white rounded-lg p-3 gap-3">
                <p>{ele.text}</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <img src={userSlice?.user?.profilePic} alt="My Avatar" className="w-8 h-8 rounded-full" />
              </div>
            </div>

  })
}
             
          </ScrollToBottom> 

            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
              <div className="flex items-center">
                <input ref={messageref} type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border text-black border-gray-400 focus:outline-none focus:border-blue-500" />
                <button onClick={handleSendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
              </div>
            </footer>
          </div>
        </div>
      </div>
  )
}

export default Chat
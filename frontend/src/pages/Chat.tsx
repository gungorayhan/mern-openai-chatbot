import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material"
import { useAuth } from '../context/AuthContext'
import red from '@mui/material/colors/red'
import { IoMdSend } from "react-icons/io"
import ChatItem from '../components/Chat/ChatItem'
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
// const chatMessage = [
//   {
//     role: "user",
//     content: "Hello"
//   },
//   {
//     role: "user",
//     content: "Can you help me?"
//   },
//   {
//     role: "assistant",
//     content: "Hello, how can i you?"
//   },
// ]

type Message = {
  role: "user" | "assistant",
  content: string
}
const Chat = () => {

  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const auth = useAuth();

  const [chatMessage, setChatMessage] = useState<Message[]>([]);

  const hadnleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessage((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessage([...chatData.chats]);
  }

  const handleDeleteChats = async ()=>{
    try {
      toast.loading("DEleting Chats",{id:"deletechats"})
      await deleteUserChats();
      setChatMessage([])
      toast.success("Delete chats successfuly",{id:"deletechats"})
    } catch (error) {
      console.log(error)
      toast.error("Delete chats not succesfully",{id:"deletechats"});
    }
  }

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      //toast.loading("Loading Chats", { id: "loadchats" })
      getUserChats().then((data) => {
        setChatMessage([...data.chats]);
        toast.success("Successfully loaded chats",{id:"localhost"})
      }).catch((error)=>{
        console.log(error);
        toast.error("Loading Failed",{id:"loadchats"})
      })
    }

  },[auth])

  useEffect(()=>{
if(!auth?.user){
  return navigate("/login")
}
  },[auth])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3
      }}
    >
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3
        }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: 'black', fontWeight: 700 }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some related to Knowledgr, Business, Advices,Educat,on, etc. But avoid sharing personel information
          </Typography>
          <Button onClick={handleDeleteChats} sx={{
            width: "200px", my: "auto", color: "white", fontweight: "700", borderRadious: 3, mx: "auto", bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400
            }
          }}>CLEAR CONVERSATION</Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: {
            md: 0.8,
            xs: 1,
            sm: 1
          },
          flexDirection: "column",
          px: 3,
        }}>
        <Typography
          sx={{
            textAlign: 'center', fontSize: "40px", color: "white", mb: 2, mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            widht: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth"
          }}
        >
          {
            //map ile mesajlar gezilecek
            chatMessage.map((chat, index) => (
              //@ts-ignore
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))
          }
        </Box>
        <div style={{
          width: "100%",
          padding: "20px",
          borderRadius: 8,
          backgroundColor: "rgb(17,27,39)",
          display: "flex",
          margin: "auto"
        }}>
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
            placeholder='message' />
          <IconButton onClick={hadnleSubmit} sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat
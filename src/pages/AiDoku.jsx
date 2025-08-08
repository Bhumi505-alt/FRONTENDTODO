import React from 'react'
import { useState, useEffect , useRef } from 'react'

const AiDoku = () => {
  const [messages , setmessages] = useState([]);
  const [inputValue , setInputValue] = useState(""); 
  const [aiReady , setAiReady ] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const messagesEndref = useRef(null);

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter && window.puter.ai && typeof window.puter.ai.chat === "function") {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const scrollToBottom = () => {
    messagesEndref.current?.scrollIntoView({
      behavior: "smooth"
    });
  }
  useEffect(scrollToBottom, [messages]);

  const addmessages = (msg, isUser) => {
    setmessages((prev) => [
      ...prev,
      { content: msg, isUser, id: Date.now() + Math.random() }
    ]);
  }

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;
    if (!aiReady) {
      addmessages("DokuAi is processing your request  Please wait....", false);
      return;
    }
    addmessages(message, true);
    setInputValue("");
    setIsloading(true);

    try {
      const response = await window.puter.ai.chat(message);
      const reply = 
        typeof response === "string"
          ? response
          : response.message?.content || "no reply received.";
      addmessages(reply, false);
    } catch (error) {
      addmessages(`ERROR: ${error.message || "something went wrong"}`, false);
    } finally {
      setIsloading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-900 via-slate-950 to-emerald-900 flex flex-col items-center justify-center p-4 gap-8'>
      <h1 className='text-6xl sm:text-7xl font-light bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500 bg-clip-text text-transparent text-center h-20'>DokuAI</h1>

      <div className={`px-4 py-2 rounded-full text-sm ${aiReady ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20"}`}>
        {aiReady ? "🟢 Doku Ready" : " 🟡 Waiting for Doku..."}
      </div> 

      <div className="w-full max-w-2xl mx-auto px-2 sm:px-6 bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border border-gray-600 rounded-3xl p-6 shadow-2xl">
        <div className='h-[60vh] sm:h-[70vh] overflow-y-auto border-b border-gray-600 mb-6 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-2xl'>
          {
            messages.length === 0 && (
              <div className='text-center text-gray-400 mt-20'>
                Start with DokuAi and get started with productivity
              </div>
            )
          }
          {
            messages.map((msg) => (
              <div key={msg.id} className={`p-3 m-2 rounded-2xl max-w-xs text-wrap ${msg.isUser ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white ml-auto text-right" : "bg-gradient-to-r from-emerald-600 to-indigo-600 text-white"}`}>
                <div className='whitespace-pre-wrap'>{msg.content}</div>
              </div>
            ))
          }
          {
            isloading && (
              <div className='p-3 m-2 rounded-2xl max-w-xs bg-gradient-to-r from-emerald-600 to-indigo-600 text-white'>
                <div className='flex items-center gap-2'>
                  <div className='animate-spin w-4 h-4 border-2 border-white border-t-white rounded-full'></div>
                  Thinking....
                </div>
              </div>
            )
          }
          <div ref={messagesEndref}></div>
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={aiReady ? "Ask Doku...." : "waiting for Doku to be ready"}
            disabled={!aiReady || isloading}
            className='flex-1 px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:shadow-xl focus:shadow-sky-400/80 focus:ring-sky-500 transition duration-400 disabled:opacity-50 disabled:cursor-not-allowed'
          />

          <button
            onClick={sendMessage}
            disabled={!aiReady || isloading || !inputValue.trim()}
            className='px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 hover:opacity-80 text-white font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {
              isloading ? (
                <div className='flex items-center gap-2'>
                  <div className='animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full'></div>
                  Sending 
                </div>
              ) : (
                "Send"
              )
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default AiDoku

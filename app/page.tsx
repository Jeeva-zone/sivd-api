"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ChevronDown, Copy, Image as ImageIcon, Menu, MessageSquarePlus, Moon, Paperclip, PanelLeft, Plus, Search, Sparkles, Sun, X, Zap } from "lucide-react";

type Mode={id:string;name:string;description:string;icon:string;kind:"chat"|"tool"};
type Message={id:number;role:"user"|"assistant";text:string;mode?:string;image?:string};

const modes:Mode[]=[
{id:"gpt-5",name:"GPT-5",description:"General purpose chat",icon:"✦",kind:"chat"},
{id:"gemini",name:"Gemini",description:"Fast creative chat",icon:"✧",kind:"chat"},
{id:"cohere",name:"Cohere",description:"Clear long-form answers",icon:"◈",kind:"chat"},
{id:"gptlogic",name:"GPT Logic",description:"Prompt-driven assistant",icon:"◎",kind:"chat"},
{id:"copilot",name:"Copilot",description:"Quick assistant",icon:"◌",kind:"chat"},
{id:"llama",name:"Llama",description:"Open model route",icon:"◇",kind:"chat"},
{id:"pinterest",name:"Pinterest",description:"Find visual ideas",icon:"▣",kind:"tool"},
{id:"tiktok",name:"TikTok",description:"Process a video URL",icon:"♪",kind:"tool"},
{id:"facebook",name:"Facebook",description:"Process a post URL",icon:"f",kind:"tool"},
{id:"youtube",name:"YouTube",description:"Find playable media",icon:"▶",kind:"tool"},
{id:"enhance",name:"Enhance",description:"Enhance an image URL",icon:"⌁",kind:"tool"},
{id:"screenshot",name:"Screenshot",description:"Capture a web page",icon:"▧",kind:"tool"}];

const starters=["Explain quantum computing simply","Write a tiny story about a robot","Give me a clean React project plan","Help me brainstorm a startup idea"];

export default function Home(){
const[mode,setMode]=useState("gpt-5"),[messages,setMessages]=useState<Message[]>([]),[input,setInput]=useState(""),[loading,setLoading]=useState(false),[sidebar,setSidebar]=useState(true),[dark,setDark]=useState(true),[picker,setPicker]=useState(false);
const endRef=useRef<HTMLDivElement>(null);
const selected=useMemo(()=>modes.find(m=>m.id===mode)||modes[0],[mode]);
useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[messages,loading]);
useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light"},[dark]);

async function send(text=input){
const value=text.trim();if(!value||loading)return;setInput("");setPicker(false);setMessages(m=>[...m,{id:Date.now(),role:"user",text:value,mode}]);setLoading(true);
try{const r=await fetch("/api/proxy",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({mode,input:value})});const d=await r.json();if(!d.ok)throw new Error(d.error||"The API did not respond.");const image=typeof d.text==="string"&&/^https?:\\/\\//.test(d.text)?d.text:undefined;setMessages(m=>[...m,{id:Date.now()+1,role:"assistant",text:image?"Your result is ready.":d.text,mode,image}])}
catch(e){setMessages(m=>[...m,{id:Date.now()+1,role:"assistant",text:e instanceof Error?e.message:"Something went wrong."}])}finally{setLoading(false)}}

function newChat(){setMessages([]);setInput("")}

return <main className={dark?"app dark":"app"}>
<header className="mobile-header"><button className="icon-btn" onClick={()=>setSidebar(v=>!v)}><Menu size={20}/></button><div className="brand mini"><span className="brand-dot">✦</span><b>SIVD</b></div><button className="icon-btn" onClick={newChat}><Plus size={20}/></button></header>
<aside className={sidebar?"sidebar open":"sidebar"}>
<div className="side-top"><div className="brand"><span className="brand-dot">✦</span><div><b>SIVD</b><small>AI WORKSPACE</small></div></div><button className="icon-btn side-collapse" onClick={()=>setSidebar(false)}><PanelLeft size={18}/></button></div>
<button className="new-chat" onClick={newChat}><MessageSquarePlus size={18}/> New chat <span>⌘ K</span></button>
<div className="section-label">WORKSPACE</div><button className="side-link active"><Sparkles size={17}/> AI Chat</button><button className="side-link"><ImageIcon size={17}/> Media tools <span className="pill">6</span></button>
<div className="section-label tools-label">CHAT MODES</div>
<div className="mode-list">{modes.filter(m=>m.kind==="chat").map(item=><button key={item.id} className={mode===item.id?"mode-item selected":"mode-item"} onClick={()=>setMode(item.id)}><span className="mode-icon">{item.icon}</span><span><b>{item.name}</b><small>{item.description}</small></span></button>)}</div>
<div className="section-label">RECENT</div><div className="recent">{messages.filter(m=>m.role==="user").slice(-4).reverse().map(m=><button key={m.id} className="recent-item">{m.text}</button>)}{!messages.some(m=>m.role==="user")&&<p className="empty-recent">Your conversations will appear here.</p>}</div>
<div className="side-bottom"><button className="side-link"><Zap size={17}/> API status <span className="status-dot"/></button><button className="side-link" onClick={()=>setDark(v=>!v)}>{dark?<Sun size={17}/>:<Moon size={17}/>} {dark?"Light mode":"Dark mode"}</button></div>
</aside>
{!sidebar&&<button className="desktop-open icon-btn" onClick={()=>setSidebar(true)}><PanelLeft size={18}/></button>}
<section className="workspace">
<div className="topbar"><div className="topbar-title"><span className="tiny-spark">✦</span><b>{selected.name}</b><span className="online">Ready</span></div><div className="topbar-actions"><button className="icon-btn"><Search size={18}/></button><button className="avatar">J</button></div></div>
<div className={messages.length?"chat-area has-chat":"chat-area"}>
{!messages.length?<div className="welcome"><div className="mascot"><div className="mascot-glow"/><div className="mascot-face"><span>•ᴗ•</span></div><span className="spark s1">✦</span><span className="spark s2">✧</span><span className="spark s3">·</span></div><p className="eyebrow">HELLO, I'M SIV</p><h1>What are we <em>creating</em> today?</h1><p className="welcome-copy">One calm place for chat, media tools, and the whole SIVD API toolbox.</p><div className="starter-grid">{starters.map(p=><button key={p} onClick={()=>send(p)}>{p}<ArrowUp size={14}/></button>)}</div></div>
:<div className="messages">{messages.map(m=><div key={m.id} className={m.role==="user"?"message-row user":"message-row"}>{m.role==="assistant"&&<div className="message-avatar">✦</div>}<div className="message-bubble">{m.mode&&<div className="message-meta">{modes.find(x=>x.id===m.mode)?.name}</div>}<div className="message-text">{m.text}</div>{m.image&&<img src={m.image} alt="API result" className="result-image"/>}{m.role==="assistant"&&<button className="copy-btn" onClick={()=>navigator.clipboard?.writeText(m.text)}><Copy size={13}/> Copy</button>}</div></div>)}{loading&&<div className="message-row"><div className="message-avatar">✦</div><div className="message-bubble typing"><i/><i/><i/></div></div>}<div ref={endRef}/></div>}
</div>
<div className="composer-wrap"><div className="composer"><button className="composer-icon"><Paperclip size={18}/></button><div className="input-area"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder={selected.kind==="tool"?`Paste a ${selected.name} URL or enter a query…`:`Message ${selected.name}…`} rows={1}/><div className="composer-bottom"><button className="mode-picker" onClick={()=>setPicker(v=>!v)}><span>{selected.icon}</span>{selected.name}<ChevronDown size={14}/></button><span className="hint">Enter to send · Shift + Enter for new line</span></div></div><button className={input.trim()&&!loading?"send-btn ready":"send-btn"} onClick={()=>send()} disabled={!input.trim()||loading}><ArrowUp size={19}/></button></div>
{picker&&<div className="picker"><div className="picker-head"><b>Choose a mode</b><button onClick={()=>setPicker(false)}><X size={16}/></button></div><div className="picker-grid">{modes.map(item=><button key={item.id} className={mode===item.id?"picker-item active":"picker-item"} onClick={()=>{setMode(item.id);setPicker(false)}}><span className="mode-icon">{item.icon}</span><span><b>{item.name}</b><small>{item.description}</small></span></button>)}</div></div>}<p className="footer-note">SIVD connects to third-party APIs. Results depend on upstream availability.</p></div>
</section></main>}
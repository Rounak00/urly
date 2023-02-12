import {useState} from "react"
import axios from "axios";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main=styled.div`
/* */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
width: 100%;
`
const Heading=styled.div`
margin-bottom: 20vh;
height: 10vh;
width: 100%;
background-color: #2874F0;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`
const HeadingPara=styled.p`

 color: white;
 font-size: 2rem;
 font-weight: 800;
 @media (max-width:416px) {
  font-size: 1.5rem
 }
`
const Container=styled.div`
background-color: #2874f0; 
height: 50vh;
width: 40%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
 @media (max-width: 600px){
   width: 100vw;
 }
`
const InputField=styled.div`
  height: 5vh;
  width: 100%;
  padding:0 10px;
  background-color: rgb(253, 62, 87);
  background-image: linear-gradient(1deg, rgb(253, 79, 79), rgb(243, 20, 113) 99%);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Components=styled.div`
 margin: 10px 0;
`
function App() {
  const [search,setSearch]=useState("");
  const [copied,setCopied]=useState("");
  const [result,setResult]=useState(null);
 
  const fetchData=async()=>{
    try{
      const res=await axios(`https://api.shrtco.de/v2/shorten?url=${search}`);
      
      setResult(res.data.result.full_short_link);
      
    }catch(err){
      alert(err);
    }
  }
  const clickFunc=()=>{
      fetchData();
      setSearch("");
  }
  const notify = () => {toast("Result Copied");}
  
  return (
  <>
    <ToastContainer/>
    <Main>
      
      <Heading>
        <HeadingPara>Short Your URL with URLY</HeadingPara>
      </Heading>
      <Container>
        <Components>
          <InputField>
          <input 
          style={{height:"4vh", width:"70%",
          border:"none",
          outline:"none",
          paddingLeft:"5px"
           }}
          placeholder="Paste your URL" type="text" value={search}
          onChange={(e)=>setSearch(e.target.value)}></input>
          <button
          style={{height:"4vh",
          width:"30%",
          border:"none",
          color:"white",

          backgroundColor: "rgb(62, 178, 253)",
          backgroundImage: "linear-gradient(1deg, rgb(79, 88, 253), rgb(20, 155, 243) 99%)"
           }} 
          onClick={clickFunc}>Click Here</button>

          </InputField>
          
          </Components>
          <Components>
            {
              !result ? (<p style={{
                color:"white"
              }}>Paste your URL in the Search Box</p>):(<>
              
              <span style={{color:"white"}}>
                {result}</span> <span>
                   <CopyToClipboard text={result}
                    onCopy={()=>setCopied(true)}
                   >
                      <button 
                      style={{marginLeft:"1rem",
                      backgroundColor: "rgb(253, 62, 87)", 
                      backgroundImage: "linear-gradient(1deg, rgb(253, 79, 79), rgb(243, 20, 113) 99%)",
                      border:"none",
                      color:"white",
                      padding:"5px",
                      fontWeight:"500",
                    }} onClick={notify}>Copy to Clipboard</button>
                    
                  </CopyToClipboard>
               </span>
              </>)
            }  
          </Components>
      </Container>
    </Main>
    </>
  );
}

export default App;

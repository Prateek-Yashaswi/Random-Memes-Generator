import axios from "axios";
import React,{useEffect, useState} from "react";
import './App.css';
import * as ReactBootStrap from 'react-bootstrap';

const App = () => {

    const [meme, setMeme] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subReddit, setSubReddit] = useState(null);
    const [title, setTitle] = useState(null);
    const [postLink, setPostLink] = useState(null);

    const generateMeme = async () =>{
        try{
            await axios.get("https://meme-api.herokuapp.com/gimme")
            .then(res => {
                setMeme(res.data.url);
                setSubReddit(res.data.subreddit);
                setTitle(res.data.title);
                setPostLink(res.data.postLink);
            });
            setLoading(true);
        }catch(e){
            console.log(e);
        }
    };

    useEffect(() => {
        generateMeme()
    },[])

    return (
        <div className="App">
            <h1 id="heading"><span>Here Is Your Randomly Generated Meme</span></h1>
            <div className="content">
                {loading ? 
                <div className="meme-details">
                    <p>Title: {title}</p>
                    <p>SubReddit: {subReddit}</p>
                    <p><a href={postLink}>Go To Post</a></p>
                    <img src={meme} alt= "Random Gif"/>
                    
                </div>  : <ReactBootStrap.Spinner animation="grow" className="spinner"/>}
            </div>
            
        </div>
    );
}

export default App;
import React from "react";

export default function Form() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        url: "http://i.imgflip.com/1bij.jpg"
    })
    const [memeImage, setMemeImage] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeImage(data.data.memes))
    }, [])

    function getNewMeme() {
        const randomNum = Math.floor(Math.random() * memeImage.length)
        setMeme(prevState => ({
            ...prevState,
            url: memeImage[randomNum].url
        }))
    }
    function newMemeData(event) {
        const { name, value} = event.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    return (
        <div className="meme">
            <form action="">
                <input 
                type="text" 
                className="meme--form-text" 
                placeholder="Top Text"
                onChange={newMemeData}
                name="topText"
                value={meme.topText}
                />
                <input 
                type="text" 
                className="meme--form-text" 
                placeholder="Bottom Text"
                onChange={newMemeData}
                name="bottomText"
                value={meme.bottomText}
                />
                <button type="button" onClick={getNewMeme} className="meme--form-btn">Get a new meme image 🖼</button>
            </form>
            <div className="meme-">
                <h1 className="meme--text top">{meme.topText}</h1>
                <img src={meme.url} alt="" className="meme--img" />
                <h1 className="meme--text bottom">{meme.bottomText}</h1>
            </div>
        </div>
    )
}
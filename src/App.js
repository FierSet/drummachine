import React from 'react';
import audio from './audio';
import Colors from './Colors';

function App()
{
    const [color] = React.useState(Math.floor(Math.random() * Colors.length));
    const [volumen, setvolumen] = React.useState(1);
    
    const [label, setlabel] = React.useState("Sound.");
    const [power, setpower] = React.useState(true);

    const havepower = () =>
    {
        if(document.getElementById('checked1').checked)
            setpower(true);
        else
            setpower(false)
    }
    
    return (
        <div style = {{backgroundColor: Colors[color], minHeight: "100vh"}}>
            <div className = 'text-center'>
                <div className = 'container pt-5'>
                    <div className = 'card'>

                        <div className = 'card-header'><h2>Drum Machin.</h2></div>
                        <div className = 'card-header'>
                            <h1>Power: {power && 'On'} {!power && 'Off'}</h1>
                            <label className = "switch">
                                <input type = "checkbox" id = 'checked1' onClick = {havepower} defaultChecked></input>
                                <span className ="slider"></span>
                            </label>
                        
                        </div>
                        <div className = 'card-body'>
                            {audio.map((clip) => 
                            (
                                <Pad key = {clip.id} clip = {clip} volumen = {volumen} setlabel = {setlabel} />
                            ))}
                        </div>

                        <div className = 'card-header'><h2>{label}</h2></div>
                        <div className = 'card-body'>
                            <input 
                                type = 'range' 
                                step = '0.01' 
                                max = '1' 
                                className='w-50' 
                                value = {volumen} 
                                onChange = 
                                { (e) => 
                                    {
                                        setvolumen(e.target.value); 
                                        setlabel("Volumen: " + parseInt(e.target.value * 100));
                                    }
                                } 
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function Pad ( {clip, volumen, setlabel} )
{
    const [active, setactive] = React.useState(false);

    const havepower = () =>
    {
        overview();
        if(document.getElementById('checked1').checked)
            playsound();
    }
    const overview = () =>
    {
        setactive(true);
        setTimeout(() => setactive(false), 200);
    }
    const playsound = () =>
    {
        const audiotag = document.getElementById(clip.keyTrigger);
        audiotag.volume = volumen;
        audiotag.currentTime = 0;
        audiotag.play();
        setlabel(clip.id);
    }

    return(
        <div className = {`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`} onClick = {havepower}>
            <audio className = 'clip' id = {clip.keyTrigger} src = {clip.url}/>
            {clip.keyTrigger}
        </div>
    );
}

export default App;

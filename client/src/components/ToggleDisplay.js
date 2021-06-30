import React,{useState} from 'react'
import HookCounter from './HookCounter'

function ToggleDisplay() {

    const [display, toggleDisplay] = useState(true)

    return (
        <div>
            <button onClick={()=> toggleDisplay(!display)}>Toogle display</button>
            {display ? <HookCounter/> : null}
        </div>
    )
}

export default ToggleDisplay

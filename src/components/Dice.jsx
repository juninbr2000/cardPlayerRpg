import React, { useState } from 'react'

const Dice = () => {
    
    const [result, setResult] = useState('')

    function rollDice (num) {
        console.log(num)
        let value = parseInt(Math.random() * num + 1);

        if(value > num){
            value = num
        }
        if(value <= 0){
            value = 1
        }
        console.log(value)
        setResult(value)
    }

    return (
        <div className='dice_modal'>
            <h3>Escolha um dado</h3>
            <div className='modal_button'>
                <button className='primary' onClick={() => rollDice(4)}>d4</button>
                <button className='primary' onClick={() => rollDice(6)}>d6</button>
                <button className='primary' onClick={() => rollDice(8)}>d8</button>
                <button className='primary' onClick={() => rollDice(10)}>d10</button>
                <button className='primary' onClick={() => rollDice(20)}>d20</button>
            </div>
            <div>
                <h1>Resultado: {result}</h1>
            </div>
        </div>
    )
}

export default Dice
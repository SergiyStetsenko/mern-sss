import React from 'react'

export const LinkCard = ({link})=>{
    return(
        <div>
            <h2 >Ссылка</h2>
            <p>Твоя ссылка: <a href={link.to} target="blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </div>
    )
}
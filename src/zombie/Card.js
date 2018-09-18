import React from 'react';

const Card = (props) => {
    return (
        <div class="card" key={props.index} id={"cards" + props.index} style={{width: '18rem', position: 'relative', top: 0, left: 0}} onMouseDown={(e) => props.initialClick(e, "cards"+ props.index)}>
            <img class="card-img-top" src={props.url} alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title">{props.name}</h5>
                <p class="card-text">Level: {props.level}</p>
            </div>
        </div>
    )
}


export default Card;
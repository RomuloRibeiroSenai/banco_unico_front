import './style.css';

export default function Item_extrato(props){

    return(
        <div className="container_item">
            <div className='item'>{props.tipo}</div>
            <div className='item'>R${props.valor}</div>
        </div>
    );
}
import './style.css'

export default function Campo_texto(props){

    function digitando (event) {
        let valor = event.target.value;
        props.onChange(valor);
        console.log(valor)
    }


    return(
        <input
                type={props.type} 
                placeholder={props.placeholder}
                required={props.required} 
                onChange={digitando}
                value={props.value}
            />
    );
}
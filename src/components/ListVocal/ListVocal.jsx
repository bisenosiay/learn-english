import './listVocal.css'

function ListVocal({ data }) {
    const renderList = () => {
        return data.map((vocal) => {
            return (
                <li key={vocal.value}>
                    {vocal.value}
                </li>
            )
        })
    }
    return ( 
        <ul className="list_vocal">
           {renderList()}
        </ul>
    );
}

export default ListVocal;

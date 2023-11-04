import './listVocal.css'

function ListVocal({ data, ____language }) {
    const renderList = () => {
        return data.map((vocal) => {
            return (
                <li key={vocal._id}>
                    {vocal[____language]}
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

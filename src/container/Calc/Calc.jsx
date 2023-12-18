import { useEffect, useState } from 'react';
import './calc.css'

function CalcFood() {
    const [_person,_setPerson] = useState(0)
    const [_detail,_setDetail] = useState(Array.from({length:15}))
    const [_discount,_setDiscount] = useState(0)
    const [_total,_setTotal] = useState(0)
    
    const saveDate = () => {
        const a = new Date(Date.now())
        const obj = {
            orderItem: [..._detail],
            discount: _discount,
            date: a.toString(),
            total: _total
        }
        localStorage.setItem("food",JSON.stringify(obj))
    }

    const handleCalc = () => {
        let total = 0
        let totalAmount = 0
        for (let i = 0; i < _detail.length; i++) {
            if (i>= _person)
                break
            total += _detail[i].value * 1            
        }
        let newDetail = []
        for (let j = 0; j < _detail.length; j++) {
            const ele = _detail[j];
            if (j>= _person)
                break
            let percent = ele.value / total * 100
            newDetail.push({
                value: ele.value,
                dis: (percent / 100 * _discount).toFixed(2)
            })
            totalAmount +=  (ele.value - (percent / 100 * _discount))
        }
        _setTotal(totalAmount)
        _setDetail(newDetail)
    }
    const changeInput = (value,index) => {
        
        _setDetail(pre=> pre.map((e,i)=> ({
            value: i==index ? value : e?.value,
            dis: 0
        })))
    }
    const returnArray = (count) => {
        let arr = Array.from({length:count})
        return arr.map((e,index) => {
            return (
                <div>
                    <input type='number' value={_detail[index]?.value || 0} onChange={(e)=>changeInput(e.target?.value,index)}/> 
                    <span>{_detail[index]?.dis || 0}</span>
                    <span>Tổng: {(_detail[index]?.value - _detail[index]?.dis).toFixed(2) || 0}</span>
                </div>
            )
        })
    }

    return (
        <div className="cal_food">
            <h5>Tính tiền thức ăn</h5>
            <input 
                className='cal_food_person'
                type='number' 
                placeholder='Số người đặt' 
                value={_person} 
                onChange={(e) => _setPerson(e.target.value)}
            />
            <div className='cal_food_input'>
                {returnArray(_person)}
            </div>
            <input 
                className='cal_food_person'
                type='number' 
                placeholder='Giảm giá' 
                value={_discount} 
                onChange={(e) => _setDiscount(e.target.value)}
            />
            <button onClick={()=>handleCalc()}> Calc</button>
            <span>Tổng tiền: {_total.toFixed(2)}</span>
            <button onClick={() => saveDate()}>Save</button>
        </div>
    );
}

export default CalcFood;

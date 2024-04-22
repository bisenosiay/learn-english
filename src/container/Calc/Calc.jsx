import { useEffect, useState } from 'react';
import './calc.css'

function CalcFood() {
    const [_person, _setPerson] = useState("")
    const [_detail, _setDetail] = useState(Array.from({ length: 15 }))
    const [_discount, _setDiscount] = useState("")
    const [_calc, _setCalc] = useState("")
    const [_total, _setTotal] = useState(0)

    const saveDate = () => {
        const a = new Date(Date.now())
        const obj = {
            orderItem: [..._detail],
            discount: _discount,
            date: a.toString(),
            total: _total
        }
        localStorage.setItem("food", JSON.stringify(obj))
    }

    const handleCalc = () => {
        let total = 0
        let totalAmount = 0
        for (let i = 0; i < _detail.length; i++) {
            if (i >= _person)
                break
            total += _detail[i].value * 1
        }
        let newDetail = []
        let realDiscount = total - _discount
        for (let j = 0; j < _detail.length; j++) {
            const ele = _detail[j];
            if (j >= _person)
                break
            let percent = ele.value / total * 100
            newDetail.push({
                value: ele.value,
                dis: (percent / 100 * realDiscount).toFixed(2)
            })
            totalAmount += (ele.value - (percent / 100 * realDiscount))
        }
        _setTotal(totalAmount)
        _setDetail(newDetail)
    }
    const changeInput = (value, index) => {

        _setDetail(pre => pre.map((e, i) => ({
            value: i == index ? value : e?.value,
            dis: 0
        })))
    }
    const returnArray = (count) => {
        let arr = Array.from({ length: count })
        return arr.map((e, index) => {
            return (
                <div key={index} className='cal_food_table_row'>
                    <input className='cal_food_table_row_1' type='number' value={_detail[index]?.value || 0} onChange={(e) => changeInput(e.target?.value, index)} />
                    <span className='cal_food_table_row_2'>{_detail[index]?.dis || 0}</span>
                    <span className='cal_food_table_row_3'>{((_detail[index]?.value - _detail[index]?.dis) || 0).toFixed(2)}</span>
                    <input className='cal_food_table_row_4' type='text' />
                </div>
            )
        })
    }
    const handleCalcDiscount = (e) => {
        try {
            const dis =evil(_calc) 
            if (dis && !isNaN(dis)) {
                _setDiscount(dis)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cal_food">
            <h2>Công cụ tính tiền</h2>
            <div className='cal_food_order'>
                <span>
                    Số lượng người đặt
                </span>
                <input
                    className='cal_food_person'
                    type='number'
                    placeholder='Số người đặt'
                    value={_person}
                    onChange={(e) => {
                        if (e.target.value > 0 && e.target.value < 20)
                            _setPerson(e.target.value)
                    }}
                />
            </div>
            <div className='cal_food_table'>
                <div className='cal_food_table_row _tr'>
                    <span className='cal_food_table_row_1'>Tiền từng món</span>
                    <span className='cal_food_table_row_2'>Giảm giá</span>
                    <span className='cal_food_table_row_3'>Tiền phải trả</span>
                    <span className='cal_food_table_row_4'>Tên</span>
                </div>
                {returnArray(_person)}
            </div>
            <div className='div_middle'>
                <input
                    className='cal_food_person'
                    type='text'
                    placeholder='Máy tính'
                    value={_calc}
                    onChange={(e) => _setCalc(e.target.value)}
                />
                <input
                    className='cal_food_person'
                    type='text'
                    placeholder='Số tiền thực trả'
                    value={_discount}
                    onChange={(e) => _setDiscount(e.target.value)}
                />
                <div className='_input_calc' onClick={() => handleCalcDiscount(_calc)}>C</div>
            </div>
            <span className='_total'>Tổng tiền: {_total.toFixed(2)}</span>
            <div  className='div_middle'>
                <button onClick={() => handleCalc()}> Calc</button>
                <button onClick={() => saveDate()}>Save</button>
            </div>
        </div>
    );
}

export default CalcFood;


function evil(fn) {

    return new Function('return ' + fn)();
}
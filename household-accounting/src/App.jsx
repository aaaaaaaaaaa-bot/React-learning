import Eeact, {useState,useEffect} from 'react';

export default function App(){
  {/*}
  const [amount,setAmount] = useState();//金額入力欄,初期値「空」
  const [purpose,setPurpose] = useState('');//使用用途の入力欄,初期値「空」
  const [type,setType] = useState("expence");//収入(income)か支出(expence)の入力欄,初期値「expence」
  */}
  const [formData,setFormData] = useState({
    amount_form: '',
    purpose_form: '',
    type_form:"income",
  });//保存されたデータの配列,初期値「空」

  const [storage,setStorage] = useState([]);//家計簿の履歴を配列で保存

  {/*}
  useEffect(
    () => {

    },[]
  );
  */}

  const saveAmount = (e) => {//金額入力欄の内容を保存
    setAmount(e.target.value);
  }

  const savePurpose = (e) => {//使用用途の内容の保存
    setPurpose(e.target.value);
  }

  const saveType = (e) => {
    setType(e.target.value);
  }

  const saveData = () => {
    setFormData({
      amount_form:{amount},
      purpose_form:{purpose},
      type_form:{type},
    })
  }

  return(
    <li>
      <h1>家計簿</h1>
      <form onSubmit = {saveData}>
        <label>入力欄</label>
        <input
        type = "text"
        value = {amount}
        name = "amount_form"
        placeholder = "金額を入力"
        onChange = {(e) => saveAmount(e)}
        />

        <input
        type = "text"
        value = {purpose}
        name = "purpose_form"
        placeholder = "用途を入力"
        onChange = {(e) => savePurpose(e)}
        />

        <label>支出・収入の選択</label>
        <select name = "type_form" onChange ={(e) => saveType(e)}>
          <option value="income" selected>収入</option>
          <option value="expence">支出</option>
        </select>
        <button>保存</button>
      </form>
      <p>収支</p>
      {formData.map((formData,index) => {
        <>
          <p>金額:{formData.amount}</p>
          <p>用途:{formData.purpose}</p>
          <p>{formData.type}</p>
        </>
      })}
    </li>
  );
}
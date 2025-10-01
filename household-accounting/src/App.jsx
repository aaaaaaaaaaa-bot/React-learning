import Eeact, {useState,useEffect} from 'react';

export default function App(){
  const [amount,uesAmount] = useState(0);//金額入力欄,初期値「0」
  const [purpose,usePurpose] = useState('');//使用用途の入力欄,初期値「空」
  const [type,useType] = useState("expence")//収入(income)か支出(expence)の入力欄,初期値「expence」
  const [data,useData] = useState([]);//保存されたデータの配列,初期値「空」

  useEffect(
    () => {

    },[]
  );

  const saveAmount = (e) => {//金額入力欄の内容を保存
    uesAmount(Number(e.target.value));
  }


  const savePurpose = (e) => {//使用用途の内容の保存
    usePurpose(e.target.value);
  }

  const saveType = (e) => {
    useType(e.target.value);
  }

  const saveData = () => {

  }

  return(
    <li>
      <h1>家計簿</h1>
      <label>入力欄</label>
      <input
      type = "text"
      value = {amount}
      placeholdar = "金額を入力"
      onChange = {(e) => saveAmount(e.target.value)}
      />
      <input
      type = "text"
      value = {purpose}
      placeholder="用途を入力"
      onChange = {(e) => savePurpose(e.target.value)}
      />
      <select>
        
      </select>
      <button onClick = {saveData}>保存</button>
    </li>
  );
}
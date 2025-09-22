import React, {useState, useEffect} from 'react';
import 

function App(){
  const [query,setQuery] = useState('');//検索欄
  const [image,setImage] = useState([]);//画像データを入れる
  const [error, setError] = useState({ message: null, type: null });//エラーメッセージとエラー内容の一括管理に用いる
  const [loading, setLoading] = useState(false);//画像検索中の表記に用いる

  const handleSearch = () => {
    if (query.trim() === ''){ //queryが空なら何もしない
      setError({
        message: "キーワードが入力されていません",
        type: "empty_error"
      })
      console.log("エラータイプ:", "empty_error");//デバック用
    }else{

      setLoading(true);//画像の検索に入る

    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https:pixabay.com/api/?key=${API_KEY}&q=${query}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          // エラーを投げることで、下の.catch()ブロックに処理が移る
          throw new Error("画像の取得に失敗しました");
        }
        return response.json();
      })
      .then(data => {
        setImage(data.hits);
        setLoading(false);
      })
      .catch(error => { // throwされたエラーをキャッチ
      console.error("エラー:", error);
      setLoading(false);
      setError({
        message: "通信エラーが発生しました",
        type: "communication_error"
      });
      })
    }
  }

  return(
    <div>
      <h1>画像検索</h1>
      <input 
        type = "text"
        value = {query}
        placeholder="キーワードを入力"
      />
      <button onClick = {handleSearch}>検索</button>

      {loading ? (
        <p>画像データを読み込み中</p>
      ) : error.message ? (
        <p>{error.message}</p>
      ) : image ? (
        <ul>
          
        </ul>
      ):null}
    </div>
  );
}
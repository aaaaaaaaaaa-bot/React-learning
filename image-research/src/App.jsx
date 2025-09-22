import React, {useState, useEffect} from 'react';
import 

function App(){
  const [query,setQuery] = useState();
  const [error, setError] = useState({ message: null, type: null });//エラーメッセージとエラー内容の一括管理に用いる
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (query.trim() === ''){ //queryが空なら何もしない
      setError({
        message: "キーワードが入力されていません",
        type: "empty_error"
      })
      console.log("エラータイプ:", "empty_error");//デバック用
    }else{
      setLoading(true);

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https:pixabay.com/api/?key=${API_KEY}&q=${query}``;
`;

    fetch(url)

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
      ) : (

      )}
    </div>
  );
}
import React, {useState, useEffect} from 'react';

function App(){
  const [query,setQuery] = useState();
  const [error, setError] = useState({ message: null, type: null });//エラーメッセージとエラー内容の一括管理に用いる

  const handleSearch = () => {
    if (query.trim() === ''){ //queryが空なら何もしない
      setError({
        message: "キーワードが入力されていません",
        type: empty_error
      })
      console.log("エラータイプ:", "empty_error");//デバック用
    }else{

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

      {error.message ? (
        <p>{error.message}</p>
      ) : (

      )}
    </div>
  );
}
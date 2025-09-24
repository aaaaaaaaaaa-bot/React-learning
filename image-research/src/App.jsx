import React, { useState} from 'react';

export default function App() {
  const [query, setQuery] = useState('');//検索欄の内容保持
  const [image, setImage] = useState([]);//画像データを入れる
  const [error, setError] = useState({ message: null, type: null });//エラーメッセージとエラー内容の一括管理に用いる
  const [loading, setLoading] = useState(false);//画像検索中の表記に用いる
  const [type,setType] = useState("all");

  const handleWord = (e) => {//検索欄に文字が入力されるたびその内容を保持する
    setQuery(e.target.value)
  }

  const typePhoto = () => {
    setType("photo");
  }

  const typeIllustration = () => {
    setType("illustration")
  }

  const typeVector = () => {
    setType("vector")
  }

  const typeAll = () => {
    setType("all")
  }

  const handleSearch = () => { //ボタンが押された時の処理
    if (query.trim() === '') { //queryが空なら何もしない
      setError({
        message: "キーワードが入力されていません",
        type: "empty_error"
      })
      console.log("エラータイプ:", "empty_error");//デバック用
    } else {

      setLoading(true);//画像の検索に入る

      const API_KEY = process.env.REACT_APP_API_KEY;
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=${type}`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            // エラーを投げることで、下の.catch()ブロックに処理が移る
            throw new Error("画像の取得に失敗しました");
          }
          return response.json();
        })
        .then(data => {
          setImage(data.hits);//画像データを配列に入れる
          setLoading(false);
        })
        .catch(error => { // throwされたエラーをキャッチ
          console.error("エラー", error);
          setLoading(false);
          setError({
            message: "通信エラーが発生しました",
            type: "communication_error"
          });
        })
    }
  }

  return (
    <div>
      <h1>画像検索</h1>
      <h2>現在の表示内容：{type}</h2>
      <input
        type="text"
        value={query}
        placeholder="キーワードを入力"
        onChange={handleWord}
      />
      <button onClick={handleSearch}>検索</button>

      <div> {/*検索結果の判別*/}
        <button onClick={typePhoto}>写真</button>
        <button onClick={typeIllustration}>図や絵</button>
        <button onClick={typeVector}>ベクター</button>
        <button onClick={typeAll}>全て</button>
      </div>

      {loading ? (
        <p>画像データを読み込み中</p>
      ) : error.message ? (
        <p>{error.message}</p>
      ) : image.length > 0 ? (
        <>
        <h3>{query}</h3> {/*検索欄の入力を表示*/}
        <ul>
          {image.map((hits) => (
            <li key={hits.id}>
              {/*<p>検索結果{image.totalHits}件</p> あとで追加できるようにする*/}
              <img
                src={hits.webformatURL}
                alt={hits.tags}
              />
            </li>
          ))}
        </ul>
        </>
      ) : null}
    </div>
  );
}
import React, {useState,useEffect} from 'react';

export default function App() {
    const [title,setTitle] = useState(''); //学習記録(タイトル)保持用
    const [content,setContent] = useState('');//学習記録(学習内容)保持用
    const [records,setRecords] = useState([]); //学習記録保存用

    const studyRecord_title = (e) => {
        setTitle(e.target.value);//学習記録(タイトル)の保持
    }

    const studyRecord_content = (e) => {//学習記録(学習内容)の保持
        setContent(e.target.value);
    }

    const saveRecord = () => { //学習記録保存
        // 新しい記録のオブジェクトを作成
        const newRecord = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString(), // 日付を記録
        };

        // 既存の記録配列に新しい記録を追加
        const updatedRecords = [...records, newRecord];

        // 新しい配列で状態を更新
        setRecords(updatedRecords);

        // localStorageに保存
        window.localStorage.setItem('study_records', JSON.stringify(updatedRecords));

        // 入力欄をクリア
        setTitle('');
        setContent('');
    }

    return(
        <div>
            <h1>学習記録アプリ</h1>
            <label>タイトル</label>
            <input
            type = "text"
            value = {title}
            placeholder="タイトルを入力"
            onChange = {studyRecord_title}
            />
            <label>学習内容</label>
            <textarea
            value = {content}
            placeholder="学習内容を入力"
            onChange = {studyRecord_content}
            rows="10" //10行分
            cols="50" //横に50文字
            />
            {/*} //勉強時間あとで追加したい
            <input
            type = "range"
            value = {}
            />
            */}

            <button onClick = {saveRecord}>保存</button> {/*別のところに表示する予定 */}

            <h2>学習記録</h2>
            <ul>
                {records.map((record,index) => (
                    <li id={index}>
                        <p>日付: {record.date}</p>
                        <label>{record.title}</label>
                        <p>{record.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


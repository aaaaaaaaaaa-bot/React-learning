import React, {useState,useEffect} from 'react';

export default function App() {
    const [title,setTitle] = useState(''); //学習記録(タイトル)保持用
    const [content,setContent] = useState('');//学習記録(学習内容)保持用
    const [records,setRecords] = useState([]); //学習記録保存用
    const [time,setTime] = useState(0);//時間記録用

    useEffect(
        () => {
            //localStorageに保存されているデータを取得
            const storedRecords = localStorage.getItem('study_records');
            //setRecodsに中身があれば
            if(storedRecords){
                //localStorageの中身を戻して配列に加える
                setRecords(JSON.parse(storedRecords));
            }
        },[]
    );

    const studyRecord_title = (e) => {
        setTitle(e.target.value);//学習記録(タイトル)の保持
    }

    const studyRecord_content = (e) => {//学習記録(学習内容)の保持
        setContent(e.target.value);
    }

    const recordDelate = (index) => {//削除ボタン
        const newRecord2 = records.filter((record,i) => i !== index)//indexが一致しないものだけにする//!==にすることで型まで一致してるか調べる

        setRecords(newRecord2);

        // localStorageも更新
        localStorage.setItem('study_records', JSON.stringify(newRecord2));
    }

    const saveRecord = () => { //学習記録保存

        //タイトルと学習記録が入力されていない時は保存できないようにする
        if (title.trim() === '' || content.trim() === '') {
        alert('タイトルと学習内容を入力してください');
        return; // 処理を中断
        }
        let updatedRecords;

        const existRecord = records.find(record => record.title === title);//同じタイトルの物がないを調べる

        if(existRecord){//同じタイトルのものがある場合

            updatedRecords = records.map(record => {
            if (record.title === title) {
                return {
                    ...record,
                    entries: [...record.entries, {
                        content: content,
                        date: new Date().toLocaleDateString(),
                        time: time,
                    }]
                };
            }
            return record;
            });

        }else{//同じタイトルの物がない場合
            // 新しい記録のオブジェクトを作成
            const newRecord = {
            title: title,
            entries: [{
                content: content,
                date: new Date().toLocaleDateString(), // 日付を記録
                time: time,
                //勉強時間も追加
            }],
            };

            // 既存の記録配列に新しい記録を追加
            //recordsを直接変更しないようにするために新しく作る
            updatedRecords = [...records, newRecord];
        }
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
            <input
            type="range"
            min="0" // 最小値
            max="120" // 最大値 (例: 120分)
            step="5" // 5分刻み
            value={time}
            onChange={(e) => setTime(e.target.value)}
            />
            {/* ここに現在の時間を表示する */}
            <p>現在: {time} 分</p>

            <button onClick = {saveRecord}>保存</button> {/*別のところに表示する予定 */}

            <h2>学習記録</h2>
            <ul>{/*タイトルと学習内容が空欄の場合は記録できないようにする*/}
                {records && records.length > 0 ? (//recordsがあり,何か書かれている
                    records.map((record,index) => (
                        <li key={index}>
                            <label>{record.title}</label>
                            {/* entries配列をさらにmapでループする */}
                            {/*record.entries &&という条件を追加することで、record.entriesがundefinedまたはnullの場合、mapは実行されずに処理が終了します */}
                            {record.entries && record.entries.map((entry, entryIndex) => (
                            <div key={entryIndex}>
                                <p>日付: {entry.date}</p>
                                <p>{entry.content}</p>
                                <p>時間: {entry.time}分</p>
                            </div>
                            ))}
                        <button onClick={() => recordDelate(index)}>削除</button>{/*recordDelate(index)だけだとレンダリングされるたびに関数が実行されちゃう */}
                        </li>
                    ))
                ):null}
            </ul>
        </div>
    )
}


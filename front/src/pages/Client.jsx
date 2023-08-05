import { useState } from 'react';
import { useForm } from "react-hook-form";
import SubImg from "../components/SubImg";

function Client() {
    const [encodedImg, setEncodedImg] = useState("");
    const [questions, setQuestions] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    const { register, handleSubmit, formState: { errors }} = useForm(
        {mode: "all"}
    );

    const onSubmit = (data) => {
        const arr = Object.entries(data);
        let postData = "";
        arr.map((item, index) => {
            postData = postData + '>' + item[1];
        })
        if (postData.length > 1817) {
            setFetchError(true);
        }
        else {
            const jsd = JSON.stringify([{ "data" : postData}]);
            fetch('http://localhost:5000/encode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsd
            }).then(res => res.json())
                .then(result => setEncodedImg(result[0]['data']))
        }
    }

    return (
        <>
            <SubImg setQuestions={setQuestions}/>

            <p>回答の入力</p>
            <form name="qf" id="qf" onSubmit={handleSubmit(onSubmit)}>
                <>
                    {
                        questions.map((data, index) => (
                            index !== 0 ?
                                <div key={index}>
                                    <p>{data}</p>
                                    <textarea id="qfs" rows={30} cols={75} {...register('text' + index.toString())}></textarea>
                                </div>
                                : <p key={index}>{data}</p>
                        ))
                    }
                </>
                <button type="submit" id="subbtn">変換</button>
            </form>
            {fetchError ? <p>エラー: 質問はパース用の記号 '>' と改行コード '\n' も含めて1817文字までにしてください。</p> : <></>}

            <p>変換された回答内容の二次元コード</p>
            <div>
                {encodedImg !== "" ? <img src={"data:image/png;base64," + encodedImg} /> : <p>未回答</p>}
            </div>
        </>
    );
}

export default Client;
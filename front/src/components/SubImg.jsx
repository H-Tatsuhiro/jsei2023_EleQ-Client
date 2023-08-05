import { useForm } from "react-hook-form";

function SubImg(props) {
    const { register, handleSubmit, formState: { errors }} = useForm(
        {mode: "all"}
    );

    const onSubmitQuestionImg = () => {
        const uploadImage = document.querySelector('#qImg')
        const file = uploadImage.files[0]

        const reader = new FileReader()
        reader.onload = (event) => {
            const base64Text = event.currentTarget.result.split(',')[1]
             const jsd = JSON.stringify([{ "data" : base64Text}]);
            fetch('http://localhost:5000/decode', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: jsd
            }).then(res => res.json())
                .then(result => props.setQuestions(result))
        }
        reader.readAsDataURL(file)
    };

    return (
        <>
            <p>質問内容の二次元コードの読み取り</p>
            <form onSubmit={handleSubmit(onSubmitQuestionImg)}>
                <input type="file" id="qImg" {...register('file', {
                    required: "質問内容についての二次元コードが含まれた画像ファイルを選択してください。"
                })}/>
                {errors.file && <p>エラー: {errors.file.message}</p>}
                <button type="submit">読み取る</button>
            </form>

        </>
    );
}

export default SubImg;
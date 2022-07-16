import { useState,useRef,useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'
import { v4 as uuidv4 } from "uuid"
import Button from '@mui/material/Button'

function App() {
  // ※※※todo管理※※※
  // useState[初期値を入れる箱,更新する値を入れる箱]
  const [todos, setTodos] = useState([
    // todosに初期値セット
    // {id:1,name:"Todo1",completed:false},
  ])

  // useRefは、画面入力値等の要素を取得出来る
  const todoNameRef = useRef()

  // タスク追加ボタン押下
  const handleAddTodo = () => {
    //　タスクを追加する
    const name = todoNameRef.current.value
    // 空白の場合は処理終了
    if(name==="") return
    
    setTodos((prevTodos) => {
      // uuidv4でランダムな文字列をidに渡す
      return [...prevTodos, {id:uuidv4(),name:name,completed:false}]
    })
    todoNameRef.current.value = null

    // 入力した値のみをログに出す
    // console.log(todoNameRef.current.value)
  }

  const toggleTodo = (id) =>{
    // todosをnewTodosにコピー
    const newTodos = [...todos]
    // newTodos配列と選択されたチェックボックスのidを比較する find関数はtrueだけを集める
    const todo = newTodos.find((todo) => todo.id === id)
    // チェックボックスの状態を反転させる
    todo.completed = !todo.completed
    // ToDoを更新する
    setTodos(newTodos)
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }
  // ※※※todo管理※※※

  // ※※※講義２※※※
  // リロードしても保存する
  const getData = () => {
    const data = localStorage.getItem("test")
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }

  // 登録されるデータを保持するuseState
  const [data, setData] = useState(getData)
  // const [data,setData]  = useState([])

  // タイトル入力欄のテキスト情報を保持するuseState
  const [title,setTitle] = useState("")
  const [title2,setTitle2] = useState("")

  // 送信を押したら登録
  const handleAddSubmit = (e) =>{
    // フォームタグは送信の際に画面がリロードされるのでそれをさせないおまじないが以下
    e.preventDefault()

    // データを登録する「塊＝オブジェクト」を作る
    let pushData = {
      title,
      title2
    }
    // 元々あるdataに、配列として渡す
    setData([...data,pushData])
    setTitle("")
    setTitle2("")
  }

  // useStateの[data]に変更があったらlocalStorageを更新する
  // ブラウザ上に保存する
  useEffect(() =>{
    localStorage.setItem("test",JSON.stringify(data))
  },[data])

  // ※※※講義２※※※

  return (
    <div>
      {/* ※※※todo管理※※※ */}
      {/* オリジナルのコンポーネント作成 */}
      {/* 初期値を渡す */}
      <TodoList todos={todos} toggleTodo={toggleTodo}/> 

      {/* web画面 */}
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスク追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      {/* filterはfindの逆。falseの値を集める。↓はfalseの配列の数を返している。 */}
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
      {/* ※※※todo管理※※※ */}

      {/* ※※※講義２※※※ */}
      <hr />
      <h1>localStrage</h1>
      {/* 送信⇨onSubmitという実行の流れになる */}
      <form onSubmit={handleAddSubmit}>
        {/* title */}
        <label>タイトル入力</label>
        <input 
          type="text"
          // 入力必須
          required
          // フォームに入力された文字をsetTitleに格納
          onChange={(e) => setTitle(e.target.value)}
          // フォームに入力された文字
          value={title}
        />
        {/* title2 */}
        <label>タイトル2入力</label>
        <input 
          type="text"
          required
          // フォームに入力された文字をsetTitleに格納
          onChange={(e) => setTitle2(e.target.value)}
          // フォームに入力された文字
          value={title2}
        />
        {/* 送信ボタン */}
        {/* <button type="submit">送信</button> */}
        <Button variant="contained" type="submit">送信</Button>
      </form>

      {/* dataというuseStateの塊を、es6のmap関数を使って画面に表示する。 */}
      {data.map((item,index) => (
        <div key={index}>
          <p>{item.title}</p>
          <p>{item.title2}</p>
        </div>
      ))}

      {/* ※※※講義２※※※ */}
    </div>
  )
}

export default App

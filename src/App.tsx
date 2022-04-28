import React, { LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import { createTask, getListOfTasksReq, getPagesReq, LogIn, LogOut, Refresh, Registration } from './req/req';
import { TodoList } from './Todo/TodoList';
import styles from './App.module.css';
import {RootState} from './redux/store'
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN, LOG_OUT, SET_TODO_ARR } from './redux/slice';
import { getUser } from './store/store';

function App() {

  const [pages, setPages] = useState(0);
  const [pagesButtons, setPagesButtons] = useState(Array);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState("ASC");
  const [orderField, setOrderField] = useState("ID")
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [UserName, setUserName]=useState();
  const [Text, setText]=useState();

  /*let inputRef = React.createRef<FileList>();
  let formRef =  React.createRef<HTMLFormElement>();*/
  const [file, setFile] = useState(Object);

  const logIn = useSelector((state: RootState) => state.login.isLOG_IN);
  const arr = useSelector((state: RootState) => state.login.todoArr);
  const update = useSelector((state: RootState) => state.login.update);
  const dispatch = useDispatch()

  let refNickname = useRef();
  let refPassword = useRef();

  function callbackTasks(){
    getListOfTasksReq(currentPage, orderType, orderField)
    .then(
      (res:any)=>{
      dispatch(SET_TODO_ARR(res));}
    );
  }

  function callbackPages()
  {
    getPagesReq()
      .then((res:any)=>{
        setPages(res);
      });
  }

  function handleChange(event:any) {
    setFile(event.target.files[0])
  }

  useEffect(()=>{TryLogIn()}, [])

  useEffect(()=>{
    
      callbackTasks();

      callbackPages();
      
    }, [update]);

  useEffect(()=>{setPagesButtonsF()}, [pages])

  useEffect(()=>{
    callbackTasks();
  }, [orderField, orderType, currentPage])


  async function addTask(){

    let response:any;

    if(Text)
    {
    try{
          response=await createTask(getUser()!, Text, file)

          if(response.status==201)
          {
          alert("Задача создана!")
            callbackPages();
            callbackTasks();
          }
        }
        catch{alert("Не вышло")}
    }
    else{
      alert("Заполните все поля!")
    }


  }

  async function setPagesButtonsF(){

    let arr= [];

    for(let i=1; i<=pages; i++)
    arr.push(PageItem(i))

    setPagesButtons(arr);
  }

  function PageItem(n:any){
    return (<button onClick={()=>{
      setCurrentPage(n)
    }} style={{backgroundColor: (currentPage==n)?'lightgrey':'lightgrey'}}>{n}</button>)
  }

  function Pages(){
    return(
      <div className={styles.pages}>
        {pagesButtons.map((element:any)=>element)}
      </div>
    )
  }

  function Head(){
    return logIn?
    <div style={{width: '100%', alignItems: 'center',backgroundColor: 'tomato',flexDirection: 'column', marginBottom: 50, marginTop: 10, display: 'flex'}}>
      <div>{getUser()}</div>
      <button onClick={Logout}>Выйти</button>
    </div>
    :!modalOpen?
    <div style={{flexDirection: 'column',
    display: 'flex',
     marginBottom: 15,
      marginTop: 10,
       backgroundColor: 'tomato',
        width: '100%',
        height: 50,
         justifyContent: 'center',
          alignItems: 'center',
          }}>
      <button onClick={()=>setModalOpen(true)}>Войти</button>
    </div>
    :
    <Modal/>
  }

  async function TryLogIn(){
    try{
      const refr = await Refresh()
      if(refr.status===201)
      {
        dispatch(LOG_IN());
      }
      else{
        const login = await LogIn(refNickname+'', refPassword+'');
        if(login===201)
        dispatch(LOG_IN());
      }
    }
    catch
    {
      const login = await LogIn(refNickname+'', refPassword+"");
      if(login===201)
      dispatch(LOG_IN());
    }
  }


  async function TryRegister(){
    Registration(refNickname+'', refPassword+"");
  }

  function Logout() {
    try{
    LogOut();
    dispatch(LOG_OUT())
    }
    catch{alert("Не удалось выйти");
    }
  }

  function Modal(){
    return (<div style={{display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center', 
    width: '100%', 
    height: 150, 
    backgroundColor: 'tomato',
    flexDirection: 'column',
    marginBottom: 20}}>
      <div>
      <div>Логин</div>
      <input
        type="text" 
        value={refNickname.current}
        onChange={(e:any)=>refNickname=e.target.value}
      ></input>
      </div>
      <div>
      <div>Пароль</div>
      <input
        type='password' 
        value={refPassword.current}
        onChange={(e:any)=>refPassword=e.target.value}
      ></input>
      </div>
      <button onClick={()=>TryLogIn()}>Войти</button>
      <button onClick={TryRegister}>Зарегистрировать</button>
    </div>)
  }

  return (
    <div className={styles.container}>
      <Head/>
      <TodoList todos={arr}/>
        {logIn?<button style={{marginBottom: 20, marginTop: 10}} onClick={()=>setIsAdd(true)}>Добавить</button>:null}
      {isAdd?<div style={{backgroundColor: 'lightgrey', width: 500, flexDirection: 'column', marginBottom: 15, display:'flex'}} className={styles.ItemContainer}>
            <div style={{display: 'flex', width: '100%'}}>
                <textarea onBlur={(e:any)=>setText(e.target.value)} placeholder='Задача' style={{width: '100%', resize: 'none', marginLeft: 'auto', marginRight: 'auto'}}></textarea>
            </div>
            <form action="blog_image" method="post" encType="multipart/form-data">
            <input onChange={handleChange} type="file" name="blog_image" />
            </form>
            <button onClick={addTask}>Отправить</button>
        </div>:null}
      <Pages/>
    </div>
  );
}





export default App;

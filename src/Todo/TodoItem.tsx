import React, {
     useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DONE_TODO } from "../redux/slice";
import { RootState } from "../redux/store";
import { deleteTask, doneTask, editTask } from "../req/req";
import styles from "./Todo.module.css";
import VideoPlayer from "../video";
import { getUser } from "../store/store";
import { stringify } from "querystring";

export function TodoItem({todo, key, index, callback}:any)
{
    const logIn = useSelector((state: RootState) => state.login.isLOG_IN);
    const [Text, setText] = useState(todo.Text);
    const dispatch = useDispatch();
    let pathImage = "localhost/";
    let pathVideo = "localhost/";
    
    
    if(todo.PathImage)
    pathImage = "http://188.225.56.228/"+todo.PathImage.split("/")[2];

    if(todo.PathVideo)
    pathVideo = "http://188.225.56.228/"+todo.PathVideo.split("/")[2];


    const videoJsOptions = {
        sources: [
          {
            src: pathVideo,
            type: "video/mp4"
          }
        ]
      };
    
    async function Edit(){

        console.log(Text)
        console.log(todo.ID);

        const response = await editTask(Text, todo.ID);

        if(response.status==201)
        alert("обновлено!")

    }

    console.log("p "+pathImage)
    console.log(pathVideo)
    const splitDate = todo.createdAt.split('-');
    const date= [splitDate[2].slice(0,2), splitDate[1], splitDate[0]].join('.');

    return(
        <div style={{backgroundColor: 'lightgreen'}} className={styles.ItemContainer}>
            <div className={styles.dataItem}>
                <div className={styles.userNameItemText}>{todo.User.Nickname}</div>
                <div className={styles.emailItemText}>{todo.Email}</div>
            </div>
            <div className={styles.dataItem}>
                <textarea onBlur={(e:any)=>setText(e.target.value)} readOnly={!logIn} className={styles.textAreaItem}>{todo.Text}</textarea>
                {todo.PathImage?<img width="200" height="200" src={pathImage}/>:null}
                {todo.PathVideo?<VideoPlayer options={videoJsOptions} />:null}
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15}}>
            {logIn&&todo.User.Nickname===getUser()?<button onClick={()=>{deleteTask(todo.ID);dispatch(DONE_TODO(index))}}>Удалить</button>:null}
            <div>Created:{date}</div>
            {logIn&&todo.User.Nickname===getUser()?<button onClick={Edit}>Редактировать</button>:null}
            </div>
        </div>
    )
}
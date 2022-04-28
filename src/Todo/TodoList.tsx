import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../redux/slice";
import { RootState } from "../redux/store";
import { TodoItem } from "./TodoItem";

export function TodoList({todos}:any)
{
    const dispatch = useDispatch();

    function callback(){
        dispatch(UPDATE())
    }

    return(
        <div>
            {todos.map((element:any, index:any)=><TodoItem todo={element}
                key={element.ID}
                index={index}
                callback={callback}/>)}
        </div>
    )
}
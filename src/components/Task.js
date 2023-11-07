import React, { useEffect, useState } from 'react'

const Task = () => {

    const[allTodos,setTodos]=useState([]);
    const [newTitle,setnewTitle]=useState("");
    const [newDescription,setnewDescription] = useState("");
    const[isComplete,setIsComplete] = useState(false);
    const[completeTodos,setcompleteTodos]= useState([]);

    const newtasks=()=>
  {
    let newTodoItem ={
      title:newTitle,
      description:newDescription
    }

    let updatedTodoArr =[...allTodos];
    updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
     setnewTitle('');
     setnewDescription('');
  };

 
  
  const handledeletbtn =index=>
  {
  let reducedTodo=[...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handledonebtn=(index)=>
  {
    let now = new Date();
    let dd = now.getDate(); 
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '-'+ mm + '-' + yyyy+  ' at ' + h+ ':' +m+ ': '+ s;

    let filteredItem ={
      ...allTodos[index],
      completedOn :completedOn
    }

    let updatedCompletedArr =[...completeTodos];
    updatedCompletedArr.push(filteredItem);
    setcompleteTodos(updatedCompletedArr);
    handledeletbtn(index);
    localStorage.setItem('completedtodos',JSON.stringify(updatedCompletedArr));
   
  }

  const completehandledeletbtn =index=>
  {
  let reducedTodo=[...completeTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('completetodos',JSON.stringify(reducedTodo));
    setcompleteTodos(reducedTodo);
  };

  useEffect(()=>{
    let savedTodo =JSON.parse(localStorage.getItem('todolist'));
    let savecompTodo = JSON.parse(localStorage.getItem('completedtodos'))
    if(savedTodo)
    {
      setTodos(savedTodo);
    }
    if(savecompTodo)
    {
      setcompleteTodos(savecompTodo)
    }

  },[])


  return (
    <>
        <h1 style={{color:"white"}} className='text-center todohead'>My Todo</h1>

<div className="card container my-4 back p-4" style={{width:"44rem","minHeight":"18rem"}}>
<div className="mb-3">
<label style={{fontSize:"30px",color:"white",fontWeight:"500"}} htmlFor="exampleInputEmail1" className="form-label">Task</label>
<input  type="text" value={newTitle} placeholder='what is your task?' onChange={(e)=>setnewTitle(e.target.value)}  className="form-control inp" id="exampleInputEmail1" aria-describedby="emailHelp"/>

</div>
<div className="mb-3">
<textarea type="text" rows="3" style={{fontSize:"20px"}}  className="form-control  inp" value={newDescription} placeholder='Task description' onChange={(e)=>setnewDescription(e.target.value)} id="floatingTextarea"/>
</div>
<button  type="submit" className="btn submitbtn" onClick={newtasks}>Submit</button>
</div>

<hr></hr>
<center>
<div className="container toggtdcombtn">
<button 
                type="button"
                className={`toggbtn ${
                  isComplete === false ? "active" : null
                }`}
                onClick={() => {
                  setIsComplete(false);
                }}
              >
                To-Do
              </button>
              <button
                type="button"
                className={`toggbtn ${
                  isComplete === true ? "active" : null
                }`}
                onClick={() => {
                  setIsComplete(true);
                }}
              >
                Completed
              </button>
              </div>

              <div className='container tasklist'>

{isComplete===false && allTodos.map((item,index)=>
{
  return(
   
<div style={{color:"white"}} className="d-flex justify-content-around my-4 mx-4 bgtask" key={index}>
<div  style={{color:"black"}}> 
  <h1 className='title' style={{"color":"white"}}>{item.title}</h1>
  <p className='desc' style={{"color":"white"}}>{item.description}</p>
  </div>
  <i className="fa fa-trash faicons icondel" onClick={()=>handledeletbtn(index)} ></i>
  <i className="fa faicons iconcomp" onClick={()=>handledonebtn(index)} >&#xf00c;</i>
 
</div>

  )

})
}

{isComplete===true && completeTodos.map((item,index)=>
{
  return(
   
<div style={{color:"white"}} className="d-flex justify-content-around my-4 mx-4 bgtask" key={index}>
<div  style={{color:"black"}}> 
  <h1 className='title' style={{"color":"white"}}>{item.title}</h1>
  <p className='desc' style={{"color":"white"}}>{item.description}</p>
  <b><i style={{"color":"grey"}}>Completed On :  {item.completedOn}</i></b>
  </div>
  <i className="fa fa-trash faicons icondel" onClick={()=>completehandledeletbtn(index)} ></i> 
</div>

  )

})
}

</div>
</center>

    </>
  )
}

export default Task
import React, {Component} from 'react';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks  :  [],//id:unique,B1 : khai báo tasks
      isDisabled : false,
      taskEditing : null,
      filter : {
        name : '',
        status : -1,
      },
      keyword : '',
      sort :{ 
        sortBy : '',
        sortValue : 1,
      }
    }
  }
  toggleTab = () => {//thêm tab
    if(this.state.isDisabled && this.state.taskEditing !== null){
      this.setState({
        isDisabled : !this.state.isDisabled,
        taskEditing :'',
      })
    }
    else{
      this.setState({
        isDisabled : !this.state.isDisabled,
        taskEditing :'',
      })
    }
  }
  onCloseForm = () => {
    this.setState({
      isDisabled : false,
      taskEditing :'',
      keyword: '',
    })
  }
  //thêm data
  onSubmit = (data) => {
    // console.log(data);
    let {tasks} =  this.state;//gọi lại task
    if(data.id === ""){
      var rdStr= require("randomstring");
      var task = {
        id : rdStr.generate(),
        name : data.name,
        status : Boolean(data.status),
      }
      tasks.push(task);//push task vào tasks
    }
    else{
      //editing
      let index = this.findIndex(data.id)
      tasks[index] = data;
      // this.onCloseForm();
    }
    this.setState({
      tasks: tasks,
      taskEditing : '',
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  onUpdateDataInApp = (id) => {
    // console.log(id);
    let {tasks} =  this.state
    let index = this.findIndex(id)
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  onUpdateInApp = (id) => {
    let {tasks} =  this.state;
    let index = this.findIndex(id)
    let taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing,
    })
    this.onShowForm()
  }
  onShowForm = () => {
    this.setState({
      isDisabled : true,
    })
  }
  onDeleteInApp = (id) => {
    let {tasks} =  this.state;
    let index = this.findIndex(id)
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  findIndex = (id) => {
    let {tasks} =  this.state;
    var results = -1;
    tasks.forEach((task,index) => {
      if(task.id===id){
        results = index;
      }
    });
    return results;
  }
  onFilter = (filterName,filterStatus) => {
    filterStatus = parseInt(filterStatus,10)
    this.setState({
      filter : {
        name : filterName,
        status : filterStatus
      }
    })
  }
  onKeyWord = (keyWord) => {
    this.setState({
      keyword : keyWord,
    })
  }
  onSort = (sortBy,sortValue) => {
    // console.log(sortBy,sortValue);
    this.setState({
      sort : {
        sortBy : sortBy,
        sortValue : sortValue,
      }
    })
    // console.log(this.state.sort);
  }
  render(){
    var {tasks,isDisabled,taskEditing ,filter,keyword,sort} = this.state;// === var tasks = this.state.tasks;

    //Filter
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
        })
      }
      // if(filter.status){//đang kiểm tra true --> !== null , !==0  ,.....
      tasks = tasks.filter((task) => {
        if(filter.status === -1){
          return task;
        }
        else{
          return task.status === (filter.status === 1 ? false : true)
        }
        
      })
      // }
    }
    //search
    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      })
    }
    //Sort
    if(sort.sortBy === 'name') {
      tasks.sort((task1, task2) => {
        if(task1.name > task2.name) return (sort.sortValue);
        else if(task1.name < task2.name) return -(sort.sortValue);
        else return 0;
      })
    }
    else
    {
      tasks.sort((task1, task2) => {
        if(task1.status > task2.status) return -(sort.sortValue);
        else if(task1.status < task2.status) return (sort.sortValue);
        else return 0;
      })
    }
    
    var elementTabForm = isDisabled 
        ?  <TaskForm taskEditing={taskEditing} onSubmit={this.onSubmit} onCloseForm={this.onCloseForm}/> : '';
    return (
      <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className={isDisabled ?"col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
          {elementTabForm}
        </div>
        <div className={isDisabled ?"col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >
          <button type="button" className="btn btn-primary" onClick={this.toggleTab}>
            <span className="fa fa-plus mr-5"/>Thêm Công Việc
          </button>
          <Control onKeyWord = {this.onKeyWord} onSort = {this.onSort} sortBy = {sort.sortBy} sortValue = {sort.sortValue}/>
          <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList 
                onDeleteInApp={this.onDeleteInApp} 
                onUpdateDataInApp={ this.onUpdateDataInApp }
                onUpdateInApp={this.onUpdateInApp}
                onFilter ={ this.onFilter }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
      );
  } 
}

export default App;

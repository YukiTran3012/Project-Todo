import React, {Component} from 'react';
import TaskItem from './TaskItem'

class TaskList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1, //all:-1 ,đã xong : 1,Chưa : 0
    }
  }
  onChange = (e) => {
      var target = e.target;
      var name = target.name;
      var value = target.value;
      this.props.onFilter(
        name === 'filterName' ? value : this.state.filterName,
        name === 'filterStatus' ? value : this.state.filterStatus);
      this.setState({
          [name] : value,
      })
  }
  render(){
    var {filterName,filterStatus} = this.state;
    var {tasks}  =  this.props; //B3 : lấy thằng tasks bên app bằng props
    var getTask =  tasks.map( (task, index)=>{
        return <TaskItem 
                  key={task.id} //bắt buộc
                  task={task} 
                  index={index}
                  onUpdateDataInTaskList={this.props.onUpdateDataInApp}
                  onDeleteInTaskList={this.props.onDeleteInApp}
                  onUpdateInTaskList={this.props.onUpdateInApp}
                />
    })
    return (
        <table className="table table-bordered table-hover mt-15">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td />
                    <td>
                        <input type="text" className="form-control" name="filterName" 
                            value={filterName} onChange={this.onChange}/>
                    </td>
                    <td>
                        <select className="form-control" name="filterStatus" 
                            value={filterStatus} onChange={this.onChange}>
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Đã Xong</option>
                            <option value={1}>Chưa Hoàn Thành</option>
                        </select>
                    </td>
                    <td />
                </tr>
                {getTask}
            </tbody>
        </table>
      );
  } 
}

export default TaskList;

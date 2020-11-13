import React, {Component} from 'react';

class TaskItem extends Component{
  onUpdateDataInTaskItems = () => {
    // console.log(this.props.task.id);
    this.props.onUpdateDataInTaskList(this.props.task.id);
  }
  onDelete = () => {
    this.props.onDeleteInTaskList(this.props.task.id);
  }
  onUpdate = () => {
    this.props.onUpdateInTaskList(this.props.task.id);
  }
  render(){
    var {task,index} = this.props;
    return (
      <tr>
        <td>{index+1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span 
            className={task.status ===  true ? "label label-success cursor" : "label label-danger cursor"}
            onClick={this.onUpdateDataInTaskItems}
            >
            {task.status === true ? 'Đã Xong' : 'Chưa Hoàn Thành'}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
      );
  } 
}

export default TaskItem;

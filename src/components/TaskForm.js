import React, {Component} from 'react';
import  {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      id  : '',
      name: '',
      status: false,
    }
  }
  onExitForm = () => {
    this.props.onCloseForm();
  }
  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ 
      [name] : value
    })
  }
  onSubmit =  (e) => {
    e.preventDefault();
    this.props.onAddTask(this.state);//làm trên store
    this.onClear();
    this.CloseForm();
  }
  onClear = () => {
    this.setState({ 
      name: '',
      status: false,
    })
  }
  componentWillMount(){
    if(this.props.taskEditing){
      this.setState({
        id :this.props.taskEditing.id,
        name:this.props.taskEditing.name,
        status:this.props.taskEditing.status,
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.taskEditing){
      this.setState({
        id :nextProps.taskEditing.id,
        name:nextProps.taskEditing.name,
        status:nextProps.taskEditing.status,
      })
    }
    else if(!nextProps.taskEditing) {
      this.setState({
        id :'',
        name:'',
        status:false,
      })
    }
  }
  render(){
    var {id} = this.state;
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title" >
                    {id !== '' ? 'Sửa Công Việc' : 'Thêm Công Việc'}
                    <span className="fa fa-times-circle float-right" onClick={this.onExitForm}></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.name}//giá trị mặc định
                        name="name" 
                        onChange={this.handleChange}
                        />
                    </div>
                    <label className="m-3">
                          Trạng Thái :
                    </label>
                    <select 
                      className="form-control" 
                      required="required"
                      name="status"
                      value={this.state.status}//giá trị mặc định
                      onChange={this.handleChange}>
                        <option value={true}>Đã Xong</option>
                        <option value={false}>Chưa Hoàn Thành</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">
                            <span className="fa fa-plus mr-5"/> Lưu lại
                        </button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onClear}>
                            <span className="fa fa-close mr-5"/>Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
      );
  } 
}

const mapStateToProps = state => {
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    onAddTask : (task) => {
      dispatch(actions.addTask(task));
    },
    onCloseForm : () => {
      dispatch(actions.closeForm());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);

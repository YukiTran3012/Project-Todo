import React, {Component} from 'react';

class Search extends Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value,
    })
    this.props.onKeyWord(value);
  }
  render(){
    var {keyword} = this.state;
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            {/* Search */}
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Nhập từ khóa..." 
                  value={keyword}
                  name='keyword'
                  onChange={this.onChange}
                />
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">
                        <span className="fa fa-search mr-5" />Tìm
            </button>
                </span>
            </div>
        </div>
      );
  } 
}

export default Search;

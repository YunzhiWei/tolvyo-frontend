import './like.css';
import React from 'react'; 
import fetchJsonp from 'fetch-jsonp';

let Like = React.createClass({
	getInitialState: function() {
		return {
			stores: [],
		}
	},

	componentDidMount: function() {
		fetchJsonp(this.props.source).then((response) => {
			return response.json();
		}).then((data) => {
			if(data.status) {
				if(this.isMounted()) {
					this.setState({
						stores: data.data,
					});
				}
			}else {
				alert(data.msg);
				reject("get data error!")
			}
		})
	},

	render: function() {
		let countId = 0;
		return (
			<div id="like">
				{
					this.state.stores.map((item) => {
						return <div className="like_content" key={"like" + countId++}>
									<div className="mask">
										<div className="like_link">
											<a href={ item.url }>
												<img src={ item.icon } alt="" style={{height: "120px"}}/>
											</a>
										</div>
										<div className="like_desc">
											<span className="text">
												{ item.desc }		
											</span>
											<div className="like_price">
												<span>¥{ item.price }</span>
												<div><a href="#">查看更多</a></div>
											</div>
										</div>
									</div>
								</div>
					})
				}
			</div>
		);
	}
})

Like.propTypes = {
    source: React.PropTypes.string.isRequired,
}
module.exports = Like;

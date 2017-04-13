import './more.css';
import '../lib/swiper.min.css';
import Swiper from '../lib/swiper.min.js';
import fetchJsonp from 'fetch-jsonp';
import React, { Component } from 'react'

class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			more: []
		}
	}

	componentDidMount() {
		fetchJsonp(this.props.source).then((response) => {
			return response.json();
		}).then((data) => {
			if(data.status) {
				this.setState({
					more: data.data.slice(0,2),
				})
			    new Swiper ('.more_bottom .swiper-container', {
				    loop: true,
				    pagination: '.swiper-pagination',
				    paginationClickable: true,
				    autoplay : 2000,
					autoplayDisableOnInteraction : false,		    
				})
			}else {
				alert(data.msg);
			}
		})
	}

	render() {

		let countId = 0;
		return (
			<div id="more">
				<div className="more_bottom">
					<div className="swiper-container">
						<div className="swiper-wrapper">
							{
								this.state.more.map((item) => {
									return  <div className="swiper-slide" key={"more" + countId++}>
												<a href={item.url}>
													<img src={item.icon} alt=""/>
												</a>
											</div>
								})
							}
						</div>
						<div className="swiper-pagination"></div>
					</div>
				</div>
			</div>
		);
	}
}

More.propTypes = {
    source: React.PropTypes.string.isRequired,
}
module.exports = More;

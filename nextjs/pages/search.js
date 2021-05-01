import React from "react";
import Layout from "../components/MyLayout.js";
import {getInfo} from '../lib/utils.js';
class Home extends React.Component {
        constructor(props) {
                super(props);
                this.state = {search: ""};
        }
        async handleUpdate(evt) {

<<<<<<< HEAD
		this.setState({search: evt.target.value});
	}
	async handleSearch(evt) {
		const parkInfo = await getInfo(this.state.search);
		console.log(parkInfo);
		this.setState({parkInfo});
		this.setState({button:"pushed"});
		this.setState({searched: this.state.search});
		// add the information to the state
	}
	render() {
		return (
			    <Layout>
			<div
			style={{
				margin: "auto auto",
					width: "800px",
					textAlign: "center",
					borderStyle: "groove",
			}}
			>
			<h1>New Mexico Campground Search</h1>
			<p>
			<input
			className="input-style"
			type="text"
			value={this.state.search}
			onChange={this.handleUpdate.bind(this)}
			/>
			</p>
			<div className="button-style"
			onClick={this.handleSearch.bind(this)}>
			Submit
			</div>
			{this.state.button !=null? (
			this.state.parkInfo != null ? (
				<div>
				<h2>{this.state.parkInfo.name}</h2>
				<img src= {this.state.parkInfo.image_url} className="App-logo" />
				<h2>{this.state.parkInfo.closest_town}</h2>
				<h3>{this.state.parkInfo.description}</h3>
				</div>
			) :  <div>
		<h2>{this.state.searched + " Campground Not Found"}</h2>
		</div>): null}

			 
			<br />
			<style jsx>{`
						  .button-style {
								      margin: auto auto;
								      margin-top: 35px;
								      cursor: pointer;
								      background-color: #c6e2ff;
								      color: #000080;
								      width: 150px;
								      height: 45px;
								      font-family: "Arial";
								      line-height: 1.9;
								      font-size: 1.4rem;
								      font-weight: bold;
								    }
=======
                this.setState({search: evt.target.value});
        }
        async handleSearch(evt) {
                const parkInfo = await getInfo(this.state.search);
                console.log(parkInfo);
                this.setState({parkInfo});
                this.setState({button:"pushed"});
                this.setState({searched: this.state.search});
                // add the information to the state
        }
        render() {
                return (
                            <Layout>
                        <div
                        style={{
                                margin: "auto auto",
                                        width: "800px",
                                        textAlign: "center",
                                        borderStyle: "groove",
                        }}
                        >
                        <h1>New Mexico Campground Search</h1>
                        <p>
                        <input
                        className="input-style"
                        type="text"
                        value={this.state.search}
                        onChange={this.handleUpdate.bind(this)}
                        />
                        </p>
                        <div className="button-style"
                        onClick={this.handleSearch.bind(this)}>
                        Submit
                        </div>
                        {this.state.button !=null? (
                        this.state.parkInfo != null ? (
                                <div>
                                <h2>{this.state.parkInfo.name}</h2>
				<img src= {this.state.parkInfo.image_url} className="App-logo" />
                                <h2>{this.state.parkInfo.closest_town}</h2>
                                <h3>{this.state.parkInfo.description}</h3>
                                </div>
                        ) :  <div>
                                                        <h2>{this.state.searched + " Campground Not Found"}</h2>
                </div>): null}
				
				
                        <br />
                        <style jsx>{`
                                                  .button-style {
                                                                      margin: auto auto;
                                                                      margin-top: 35px;
                                                                      cursor: pointer;
                                                                      background-color: #c6e2ff;
                                                                      color: #000080;
                                                                      width: 150px;
                                                                      height: 45px;
                                                                      font-family: "Arial";
                                                                      line-height: 1.9;
                                                                      font-size: 1.4rem;
                                                                      font-weight: bold;
                                                                    }
>>>>>>> 6858fd6223f6fd77eca01885d1e866a2d302d5e0

                                                  .input-style {
                                                                      font-size: 1.4rem;
                                                                      line-height: 1.6;
                                                                    }

                                                  h1 {
                                                                      font-size: 2.1rem;
                                                                      font-family: "Arial";
                                                                      color: #000080;
                                                                    }
                                                  h2 {
                                                                      font-family: "Arial";
                                                                      font-size: 1.6rem;
                                                                      color:#000080;
                                                                    }

                                                  h3 {
                                                                      font-family: "Arial";
                                                                      font-size: 1.0rem;
                                                                       color:#000000;
                                                                    }
                                                  .App-logo {
                                                                      height: 500px;
                                                                    }
                                                `}</style>
                        </div>
                 </Layout>
                );
        }
}
export default Home;

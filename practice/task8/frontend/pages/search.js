import Link from 'next/link';
import React from "react";
import Post from "./[id].js";
import Layout from "../components/MyLayout.js";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			array:[],
		};
	}
	async handleUpdate(evt) {
		this.setState({search: evt.target.value});
	}
	async handleSearch(evt) {

		// fetch the back-end response
		fetch(`http://localhost:8080/api/retrieve?des=${this.state.search}`)
			.then((resp) => {
				return resp.json();
			})
			.then((response) => {
				this.setState({ array: response });
			});

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

			{ this.state.array ? (
				<div>
				{this.state.array.map((camps, lo) =>(
					 <li key={camps.id}>
			<Link href="/[id]" as={`/${camps._id}`} >
				
					<h3>
					{camps._source.name}
					{camps._source.closest_town}
					({camps._score})
					</h3>
					</Link>
					   </li>
				))};
				</div>
			) : null}
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
					margin: 3px;
					 padding: 2px;
					 text-align: center
				}
				th, td{
				
					font-family: Arial, Helvetica, sans-serif;
					border-bottom: 2px solid #ddd;
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

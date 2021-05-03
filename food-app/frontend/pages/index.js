import React from "react";

class Food extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			search: "",
			array:[],
		};
	}
	handleSearch(evt){
		// set the state
		this.setState({search: evt.target.value});


		// fetch the back-end response
		fetch(`http://34.74.68.21/?input=${evt.target.value}`)
			.then((resp) => {
				return resp.json();
			})
			.then((response) => {
				this.setState({ array: response });
			});
		console.log(this.state.array);
	}
	render(){
		return (
			<div>
			<img src="/static/logo.svg" className= "image1"
			style={{
				width: "300px",
					height: "150px",
					padding: "0",

			}}
			/>
			<img src="/static/banner1.jpg" 
			style={{
				width:"100%", 
					height:"250px",
			}}
			/>
			<h1>Nutritional Information About Food</h1>

			
			<p>
			<input
			className = "input-style"
			type = "text"
			value = {this.state.search} onChange={this.handleSearch.bind(this)}

			/>
			{ this.state.array ? (
				<div className="text-style">
				<table>
				<thead>
				<tr>
				<th>description</th>
				<th>kcal</th>
				<th>protein(g)</th>
				<th>fats(g)</th>
				<th>carbohydrates(g)</th>
				</tr>
				</thead>
				<tbody>
				{this.state.array.map((food, lo) =>(
					<tr>
					<td>{food.description}</td>
					<td>{food.kcal}</td>
					<td>{food.protein_g}</td>
					<td>{food.fat}</td>
					<td>{food.carbohydrate_g}</td>
					</tr>
				))}
				</tbody>
				</table>
				<br></br>
				</div>
			) : null}
			</p>

			<style jsx>{`
				.image1 {
					animation: round infinite 10s linear;
					pointer-events: none;
					position: absolute;
					margin-left: auto;
					margin-right: auto;
					left: 0;
					right: 0;
					text-align: center;
					z-index: 2;
				}
				h1 {
					font-family: "Impact, fantasy";
					position: URMOM;
					margin-left: auto;
					margin-right: auto;
					left: 0;
					right: 0;
					top: 150px;
					text-align:center;
					color:black;
				}
				h2 {
					font-family: "Impact, fantasy";
					position: absolute;
					margin-left: auto;
					margin-right: auto;
					left: 0;
					}
				div{
					text-align: center
				}
					.input-style  {
						width: 30%;
						box-sizing: border-box;
						border: 2px solid #000;
						font-size: 25px;
						padding: 12px 24px 12px 50px;                                              
						margin-top: 20px;
					}
						.input-style:focus{
							outline: none;
							box-shadow: 0px 0px 3px #000000;
						}
					table{
					
						width: 100%;
						margin-top: 20px;
					}
					th, td{
						padding: 8px;
						text-align: left;
						font-family: Arial, Helvetica, sans-serif;
						border-bottom: 2px solid #ddd;
					}
					`}</style>
						</div>
					);
			}
}
export default Food;

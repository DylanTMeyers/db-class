import Layout from "../components/MyLayout.js";
import fetch from "isomorphic-unfetch";
import ReactDOM from 'react-dom';

const Post = (props) => (
	
	
	  <Layout>
	    <h1>{props.show._source.name}</h1>
	    <img src={props.show._source.image_url} />
	    <h1>{props.show._source.closest_town}</h1>

	    <p>{props.show._source.description}</p>
	

	<style jsx>{`
		h1,
		h2,
		h3,
		h4,
		a,
		p {
			font-family: "Arial";
			color: #34495e;
			font-size: 20px;
		}

		.text-style {
			margin: auto auto;
			width: 200px;
		}
		`}</style>
	</Layout>
);

Post.getInitialProps = async function (context) {
	
	const { id } = context.query;
	console.log(id);
	const res = await fetch(`http://localhost:8080/api/re?id=${id}`);
		const show = await res.json();

		console.log(`Fetched show: ${show.name}`);
		return { show };
	};

	export default Post;


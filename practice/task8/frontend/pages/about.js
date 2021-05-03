import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
export default function About() {
	return (
		
		<Layout>
		<h1>Watch A cool video below!</h1>
		<video width="700" height="550" controls src="/static/vid.mp4">
		  Your browser does not support the video tag.
		  </video>
		<style jsx>{`
		h1 {
						font-size: 2.1rem;											font-family: "Arial";											color: #366198;																									}
															 h2 {											
					font-family: "Arial";
					font-size: 1.3rem;
					color:#125213;
						 }
		 h3 {																													font-family: "Arial";											font-size: 0.9rem;
							color:#125213;
																					 }
		.App-logo {
																     				height: 500px;
																				}
																																																																								     `}</style>
		</Layout>
	)
}

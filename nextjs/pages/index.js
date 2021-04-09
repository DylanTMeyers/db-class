import Layout from "../components/MyLayout.js";

export default function Index() {
  return (
    <Layout>
      <h1>Welcome to Campgrounds!</h1>

      <h2>We can help you find and inform you on any campground in New Mexico</h2>
	<h4> <img src="/static/My_pic.jpg" className="App-logo"/></h4>     
      <h3>We have the largest database of New Mexican Campgrounds that can be found on the interwebs. Right now we have over 13 campgrounds. I can barely even count that high! Did you know we have had people from all across our company visit our website? You are not the first and there is many more to come, but we still care about you and want to thank you for taking time out of your day to visit our website. If our website is not informative enough (which I highly doubt) you can call us at 203-049-6419 </h3>
	 
	<style jsx>{`
		                                               
		                                                   h1 {
									                                                                         font-size: 1.7rem;
									                                                                         font-family: "Arial";
																		 color: #366198;
																		 padding: 0 500px;
									                                                                       }
		                                                   h2 {
									                                                                         font-family: "Arial";
									                                                                         font-size: 1.3rem;
									                                                                         color:#000080;
																		  padding: 0 300px;
									                                                                       }

		                                                   h3 {
									                                                                         font-family: "Arial";
									                                                                         font-size: 1.0rem;
																		  color: #000000;
																		   padding: 0 200px;
									                                                                       }
																	


		                                                   .App-logo {
																		 padding: 0 500px;
																		 height: 400px;
																		 width: 300px;
									                                                                       }
		                                                 `}</style>
    </Layout>
  );
}

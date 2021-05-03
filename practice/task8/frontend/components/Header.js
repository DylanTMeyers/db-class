import Link from 'next/link'

const linkStyle = {
  marginRight: 100
}

export default function Header() {
  return (
    <div>
	  <h1>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
      <Link href="/search">
     <a style={linkStyle}>Find A Campground</a>
     </Link>
	  </h1>
	                            <style jsx>{`
                          a{
			   font-weight: bold;
                           font-size: 1.0rem;
                           font-family: "Arial";
                           color: #366198;

                                       }
			a2{
			   padding: 0 50px;
                           font-weight: bold;
                           font-size: 1.0rem;
                           font-family: "Arial";
                           color: #366198;
			}
			 h1{
			 margin-left: 500px;
					    }`}</style>
    </div>
  )
}

import Header from './Header'

const layoutStyle = {

   "text-align": "left", 
  border: '1px solid #DDD'}
export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      
   <Header />
{props.children}
     
    </div>
  )
}

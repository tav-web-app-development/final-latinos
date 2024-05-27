import './button.css'


export default function Button({children, style}) {
  return (
    <button className={`btn ${style}`}>{children}</button>
  )
}

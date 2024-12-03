import Part from './Part.jsx'
const Content = ({parts}) => {
    console.log(parts)
  return (
    <>
    {parts.map((part) => {
        return(
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )
       
    })}
    </>

  )
}

export default Content
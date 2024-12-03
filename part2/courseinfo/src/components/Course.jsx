import Header from './Header.jsx'
import Content from './Content.jsx'
import PropTypes from 'prop-types'
import Total from './Total.jsx'


const Course = (props) => {
console.log(props)
const {name, parts} = props.course;
const totalExercises = parts.reduce((sum, part) => {
    return(
        sum + part.exercises
    )
}, 0)

console.log(totalExercises)
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total total={parts.length} totalExercises={totalExercises}/>
            
        </>
    )
}

Course.propTypes = {
    course: PropTypes.shape({
        name: PropTypes.string,
        parts: PropTypes.array,
        id: PropTypes.number.isRequired
    })
}

export default Course
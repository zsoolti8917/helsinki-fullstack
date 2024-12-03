import Header from './Header.jsx'
import Content from './Content.jsx'
import PropTypes from 'prop-types'

const Course = (props) => {
const {name, parts} = props.course;
console.log(parts)
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
        </>
    )
}

Course.propTypes = {
    course: PropTypes.shape({
        name: PropTypes.string,
        parts: PropTypes.array
    })
}

export default Course
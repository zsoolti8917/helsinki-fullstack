import Header from './Header.jsx'
import Content from './Content.jsx'
import PropTypes from 'prop-types'
import Total from './Total.jsx'
const Course = (props) => {
const {name, parts} = props.course;
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total total={parts.length} />
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
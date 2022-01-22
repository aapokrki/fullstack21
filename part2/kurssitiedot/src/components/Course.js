import React from 'react';

const Course = ({course}) => {
    return(
      <div>
      <Header course={course} />
      <Content course={course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sumTotal = course.parts.reduce((sum, order) => {
        console.log(sum, order)
        return sum + order.exercises
    },0);
  
    return(
      <p>Total of exercises {sumTotal}</p>
    )
    
  }
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        
          {course.parts.map(part => 
            <Part key={part.id} part={part} />
          )}
  
          <b>
            <Total course = {course}/>
          </b>
        
      </div>
    )
  }
  export default Course
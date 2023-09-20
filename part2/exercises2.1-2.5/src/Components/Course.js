import React from 'react';
import Header from './Header.js';
import Content from './Content.js';

const Course = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((item) => (
        <React.Fragment key={item.id}>
          <Header title={item.name} />
          <Content content={item.parts} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Course;

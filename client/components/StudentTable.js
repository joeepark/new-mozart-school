import { useState, useEffect } from "react"
import Loading from "./Loading";

function StudentTable() {
  const [students, setStudents] = useState([]);

  // Fetching data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [JSON.stringify(students)])

  // Handling the POST request after form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');
    const dob = formData.get('dob');
    const lesson = formData.get('lesson');
    const studentData = {
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      lesson: lesson
    }
    const jsonData = JSON.stringify(studentData);
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        body: jsonData
      });
      if (response.ok) {
        const data = await response.json();
        setStudents([...students, data]);
      } else {
        console.error(response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {students ?
        <div className='selection students active'>
          <form method='post' action='/api/students' onSubmit={handleSubmit} className='form'>
            <input type='text' placeholder="First Name" name='first_name' required />
            <input type='text' placeholder="Last Name" name='last_name' required />
            <input type='text' placeholder="DOB" name='dob' required />
            <input type='text' placeholder="Lesson" name='lesson' required />
            <button type="submit">Add Student</button>
          </form>
          <div className='table'>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DOB</th>
                  <th>Lesson</th>
                </tr>
              </thead>
              <tbody>
                {students && students.map((student, index) => (
                  <Row student={student} key={index} />))}
              </tbody>
            </table>
          </div>
        </div> : <Loading />}
    </>
  )
}

// Data per row for each student
function Row({ student }) {
  return (
    <>
      <tr className='rows'>
        <td>
          {student.first_name}
        </td>
        <td>
          {student.last_name}
        </td>
        <td>
          {student.dob && student.dob.slice(0, 10)}
        </td>
        <td>
          {student.lesson}
        </td>
      </tr>
    </>
  )
}

export default StudentTable;
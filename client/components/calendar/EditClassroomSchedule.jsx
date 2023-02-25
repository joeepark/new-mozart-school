import { useRef, useEffect } from 'react';

function EditClassroomSchedule({ selectedEvent }) {
  const clickBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clickBoxRef.current && !clickBoxRef.current.contains(event.target)) {
        let popup = document.querySelector('.schedule-edit-container');
        popup.style.display = 'none';
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  console.log(selectedEvent);

  let {
    start,
    end,
    resource: {
      classroom_name,
      teacher_first_name,
      teacher_last_name,
      student_first_name,
      student_last_name,
    },
  } = selectedEvent;

  let date = start.toString().slice(0, 15);
  if (start.toString().slice(16, 17) === '0') {
    start = start.toString().slice(17, 21);
    end = end.toString().slice(17, 21);
  } else {
    start = start.toString().slice(16, 21);
    end = end.toString().slice(16, 21);
  }

  return (
    <div className="schedule-edit-container" id="clickbox" ref={clickBoxRef}>
      <div className="schedule-edit">
        <span>Date: {date}</span>
        <span>
          Time: {start}-{end}
        </span>
        <span>Classroom: {classroom_name}</span>
        <span>
          Teacher: {teacher_first_name} {teacher_last_name}
        </span>
        <span>
          Student: {student_first_name} {student_last_name}
        </span>
      </div>
    </div>
  );
}
export default EditClassroomSchedule;

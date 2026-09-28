const rows = [
  { time: "8:35–9:35", cells: ["Mathematics", "Mathematics", "Mathematics", "Mathematics to 9:20; Library 9:20–9:35", "Mathematics"] },
  { time: "9:35–10:35", cells: ["English Language Arts", "English Language Arts", "English Language Arts", "English Language Arts", "Core French / Health Education (prep)"] },
  { time: "10:35–10:50", cells: ["Recess", "Recess", "Recess", "Recess", "Recess"] },
  { time: "10:50–11:50", cells: ["Social Studies", "Science", "Social Studies or Science inquiry", "Physical and Health Education: shared PE 11:10–11:50", "Physical and Health Education: PE 11:10–11:50"] },
  { time: "11:50–12:35", cells: ["Lunch", "Lunch", "Lunch", "Lunch", "Lunch"] },
  { time: "12:35–12:55", cells: ["Quiet individual time", "Core French / Health Education (prep to 1:35)", "Quiet individual time", "Quiet individual time", "Quiet individual time"] },
  { time: "12:55–2:05", cells: ["Career Education · Core Competencies & Project Time", "Prep to 1:35; quiet time 1:35–1:50; short project 1:50–2:05", "Health Education · Core Competencies & Project Time", "ADST · Core Competencies & Project Time; technology", "Arts Education · creative projects"] },
  { time: "2:05–2:20", cells: ["Classroom community", "Classroom community", "Classroom community", "Classroom community", "Classroom community"] },
  { time: "2:20–2:35", cells: ["Planners, jobs, dismissal", "Planners, jobs, dismissal", "Planners, jobs, dismissal", "Planners, jobs, dismissal", "Planners, jobs, dismissal"] },
];

export default function RecurringTimetable() {
  return <section className="recurring-timetable" aria-labelledby="recurring-timetable-title">
    <div className="recurring-timetable__heading"><div><p className="section-kicker">DIVISION 8 · ROOM 112</p><h2 id="recurring-timetable-title">Recurring classroom schedule</h2></div></div>
    <p>Use this pattern for dated day plans. Social Studies and Science can exchange inquiry days; Career Education, Health Education and ADST can exchange project days. LST times are pending.</p>
    <div className="recurring-timetable__scroll"><table><thead><tr><th scope="col">Time</th>{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => <th scope="col" key={day}>{day}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.time}><th scope="row">{row.time}</th>{row.cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>
    <p className="recurring-timetable__note">Thursday PE is shared with another class every week; Friday PE is the individual gym block. Snack is usually about 10:20 Monday–Thursday and after recess Friday. Dated events and closures override this pattern.</p>
  </section>;
}

import './phe-season-plan.css';

export const sesaaCalendarUrl = 'https://www.sesaa.org/uploads/9/0/2/1/9021463/sesaa_athletics_2026-2027_sports_at_a_glance.pdf';

export const pheSportSeasons = [
  {
    id: 'soccer', title: 'Soccer', teaching: 'September–mid October',
    calendar: 'League: Sept. 21–Oct. 9, 2026. Play days: Oct. 13–16.',
    focus: 'Start with controlled dribbling, stopping the ball and an inside-foot pass. Then teach receiving into space, supporting a teammate and defending without contact.',
    practice: 'Use pairs and small groups, then small-sided games with frequent restarts. Begin each lesson with one model and one skill focus; return to that skill in the game.',
    check: 'Watch a student control, pass and move to a useful space. Ask which choice helped a teammate.',
  },
  {
    id: 'cross-country', title: 'Cross-country', teaching: 'September–October, alongside soccer',
    calendar: 'Meets: Sept. 29–Oct. 21, 2026.',
    focus: 'Teach a comfortable starting pace, the talk test, route awareness and a safe finish. Practise adjusting effort before increasing distance.',
    practice: 'Use a supervised loop with walk, run or wheel intervals and planned rest. Revisit the same route so students can judge pacing privately.',
    check: 'Ask the student to explain one pacing adjustment and the cue that prompted it. Use the existing effort lesson for the private check.',
  },
  {
    id: 'volleyball', title: 'Volleyball', teaching: 'Mid October–November',
    calendar: 'League: Oct. 19–Nov. 19, 2026. Play days: Nov. 23–27.',
    focus: 'Teach ready position, forearm passing and moving under the ball. Follow with an underhand serve, calling for the ball and covering shared space.',
    practice: 'Begin with a light ball and short partner distances. Allow a catch or bounce while learning, then reduce that support as control improves. Use cooperative rallies before small-team games.',
    check: 'Notice preparation, controlled contact and communication across several attempts. Ask what helped keep a rally going.',
  },
  {
    id: 'basketball', title: 'Basketball', teaching: 'January–February; begin with skills after winter break',
    calendar: 'League: Jan. 18–Feb. 19, 2027. Play days: Feb. 22–26.',
    focus: 'Teach dribbling with eyes up, stopping, pivoting and passing. Build toward receiving in space, an appropriate shooting distance and non-contact defence.',
    practice: 'Use short skill stations and two-on-one or three-on-three games. Rehearse one movement choice, pause to notice it, then replay. Adjust ball size, target height and distance.',
    check: 'Watch a student stop under control and choose a pass or an open route. Ask what they noticed before deciding.',
  },
  {
    id: 'ultimate', title: 'Ultimate', teaching: 'Late February–April; revisit before the May play day',
    calendar: 'League: Mar. 8–Apr. 23, 2027. Play day: May 5.',
    focus: 'Teach a short backhand throw, a two-hand catch, stopping and pivoting. Then practise moving to receive, creating space and resolving a disagreement respectfully.',
    practice: 'Start in spaced pairs with soft discs. Move to short possession games with no contact or diving. Rehearse before spring break and retrieve the skills after it.',
    check: 'Notice a controlled throw to a ready partner, movement into space and a respectful restart after a disputed play.',
  },
  {
    id: 'badminton', title: 'Badminton', teaching: 'March preparation, then April',
    calendar: 'League: Mar. 31–Apr. 30, 2027. Grade 5/6 league day: Tuesday.',
    focus: 'Teach safe racquet spacing, a relaxed grip and ready position. Progress through a short serve, controlled return and recovery toward a useful court position.',
    practice: 'Use balloon or shuttle control, partner feeds and cooperative rallies before short games. Adjust the net, distance and equipment; avoid crowded racquet stations.',
    check: 'Observe safe spacing, a playable serve and recovery after a return. Ask which adjustment made the next shot easier.',
  },
  {
    id: 'track-field', title: 'Track and field', teaching: 'Late April–early June',
    calendar: 'School-size meets: May 25–June 2, 2027. Rain dates: May 28, June 3–4.',
    focus: 'Rotate through running starts, pacing, relay exchanges, controlled jumping and safe throwing. Teach the event-specific safety routine before each station.',
    practice: 'Build from technique trials to repeated attempts and small personal goals. Throw only on the teacher signal and collect only when the throwing area is closed. Use school-approved equipment and landing areas.',
    check: 'Observe one taught technique and safe participation over repeated attempts. Students explain one useful improvement without a public ranking.',
  },
] as const;

export function PheSeasonPlan() {
  return <section className="phe-season-plan" aria-labelledby="phe-season-heading">
    <header>
      <p className="section-kicker">PE THROUGH THE SCHOOL YEAR · 2026–27</p>
      <h2 id="phe-season-heading">Build skills for the season ahead</h2>
      <p>Use one or two focused skill lessons, followed by practice and game play, across two or three active blocks in a typical week. Everyone learns the skills, whether or not they join a school team.</p>
      <p><a href={sesaaCalendarUrl} target="_blank" rel="noreferrer">Open the SESAA athletics calendar</a> · <a href="https://www.sesaa.org/" target="_blank" rel="noreferrer">Current schedules and coaching resources</a></p>
    </header>
    <p className="phe-season-note">The teaching windows below are classroom suggestions based on the SESAA calendar, checked September 13, 2026. Confirm Walnut Road’s fixtures, facilities and meet allocation with the school coaches. A league window includes breaks; it does not add lessons during school holidays.</p>
    <div className="phe-season-grid">{pheSportSeasons.map(season => <article key={season.id}>
      <small>{season.teaching}</small><h3>{season.title}</h3>
      <p className="phe-season-dates">{season.calendar}</p>
      <p><strong>Teach:</strong> {season.focus}</p>
      <details><summary>Practice and observation check</summary><p>{season.practice}</p><p><strong>Look for:</strong> {season.check}</p></details>
    </article>)}</div>
    <footer>
      <p><strong>December and late June:</strong> revisit familiar games, dance and movement phrases, cooperative challenges and student choices. During report-writing weeks, repeat a known activity and observe a small group; a tournament or new project is optional.</p>
      <p><strong>Across the year:</strong> keep the health studio every two or three weeks, daily movement opportunities and accessible ways to participate. When badminton and ultimate overlap, alternate indoor and outdoor blocks. Keep dance, balance and other movement experiences in the rotation.</p>
      <details><summary>Calendar details to confirm</summary><p>The badminton play-day line says “May 4 &amp; 6, 2026” within the 2026–27 calendar. Confirm the corrected dates with the convenor before booking. Track meets depend on school size. SESAA also lists STM on May 11–12 with rain dates May 13–14; coordinate any participation and preparation with the school’s support team.</p></details>
    </footer>
  </section>;
}

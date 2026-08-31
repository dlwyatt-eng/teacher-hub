type PlanningPrivacyNoteProps = {
  id?: string;
};

export function PlanningPrivacyNote({ id }: PlanningPrivacyNoteProps) {
  return (
    <p id={id} className="planning-privacy-note">
      <strong>Planning only—this static site is not a secure student-record system.</strong>{" "}
      Do not enter student names, contacts, access codes, medical details, confidential safety information, or student-specific supports. Use the district-approved private TTOC record for those details.
    </p>
  );
}


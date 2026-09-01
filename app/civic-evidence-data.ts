export const unit2ScenarioCards = {
  powerRoles: [
    { role: "Chair · final decision", tokens: 2, power: "You announce the final room plan when time ends. You may speak at any time.", limit: "You cannot read the hidden need unless you invite the Need Knower to speak.", privateMove: "Listen if you choose—but the final call is yours." },
    { role: "Budget Keeper · most resources", tokens: 6, power: "You hold and place six of the group’s ten counters. Nobody may move them without your permission.", limit: "You do not get the final word unless the Chair agrees with you.", privateMove: "Choose where your six counters go. You may say no to a request." },
    { role: "Need Knower · hidden information", tokens: 1, power: "Only you may read the hidden need: at least one future room user needs a quiet area near the door with a wide, clear path.", limit: "You may explain the hidden need only if the Chair asks you to speak.", privateMove: "Place your one counter. Wait to be invited before revealing the need." },
    { role: "Community Voice · lives with the result", tokens: 1, power: "You place one counter and may ask the group one public question before time ends.", limit: "You do not get a vote on the final plan.", privateMove: "Use your one question carefully. Notice whether anyone answers it." },
  ],
  powerObserver: { role: "Optional observer · group of five", power: "Do not help decide. Make tally marks for who speaks, who moves counters, whose idea changes the plan, and who is interrupted.", limit: "Share your observations only after the Chair announces the plan." },
  systems: [
    { name: "One leader acts", route: ["Leader receives the warning", "Leader chooses a response", "Agencies carry it out", "Public hears the decision"], tradeoff: "Fast action; few built-in voices or checks." },
    { name: "Representatives decide", route: ["Emergency team gives evidence", "Elected representatives debate", "A majority decides", "Decision can be reviewed"], tradeoff: "More voices and reasons; decision may take longer." },
    { name: "Community vote", route: ["Options are published", "Residents question the options", "Eligible voters choose", "Officials carry out the result"], tradeoff: "Direct participation; difficult when time or information is limited." },
  ],
  rightsCases: [
    { title: "The quiet room", facts: "A community centre has one quiet study room. A new rule gives it only to students who can pay a weekly fee.", rights: "Equality and access", question: "What facts matter before deciding whether the rule is fair?" },
    { title: "The protest poster", facts: "A student group wants to display a respectful poster criticizing a public decision. The poster names no students and includes cited facts.", rights: "Expression and responsibility", question: "What limit, if any, would cause the least harm?" },
    { title: "The public meeting", facts: "A city meeting about a playground is held upstairs in a building with no working elevator. Remote participation is not offered.", rights: "Equality, access, and participation", question: "What remedy would make participation more equal?" },
  ],
} as const;

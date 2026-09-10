/** Short explanations and fictional worked examples, shared by Plan and Project. */
export type SocialExplanation = { idea: string; example: string[]; ask: string; answer: string };
export const socialExplanations: Record<string, SocialExplanation> = {
  "maps-make-arguments": {
    idea: "A map is made for a purpose. It can help us answer some questions and leave other questions unanswered. Compare what each map chooses to show.",
    example: ["Practice example: a street map shows the road to a park.", "It can help us plan a route. It does not show whether the route feels safe to a child.", "We would need another source, such as crossing information or observations, to answer that question."],
    ask: "Does a missing label prove that a place or community does not exist?", answer: "No. It may tell us about the mapmaker’s purpose or choices. Check another source before deciding."
  },
  "who-drew-the-world": {
    idea: "The Earth is round. A flat world map must change some shapes, sizes, distances or directions. The useful map depends on the question we want to answer.",
    example: ["Use the two world maps already on screen. Choose the same land area on each.", "Compare how large it looks relative to another land area. The land has not changed; the way the map shows it has.", "For comparing land areas, look for a map that preserves area. That does not make it perfect for every other job."],
    ask: "Can a map preserve every shape, area and distance perfectly?", answer: "No. Explain which feature matters for your question, then name a limit of that map."
  },
  "trace-the-claim": {
    idea: "A claim is something someone says is true. Trace it back to the original message, number or record before deciding whether to believe or repeat it.",
    example: ["Fictional message: ‘Every trip is cancelled!’", "Original notice: ‘Friday’s trip is postponed.’ The notice describes one trip and a delay.", "A careful correction is: ‘This notice does not say all trips are cancelled.’"],
    ask: "Does repeating a message many times make it stronger evidence?", answer: "No. Many copies can come from the same mistaken source. Check the original and its date."
  },
  "perspective-without-guessing": {
    idea: "People may notice different effects of the same decision. Use what they actually said or what the source shows. Mark your guesses as guesses.",
    example: ["Practice card: ‘A shop receives deliveries on this street.’", "Evidence: deliveries use the street. Possible effect: changing vehicle access could affect deliveries.", "Unknown: whether the owner supports or opposes the plan. The card does not tell us."],
    ask: "Can we decide someone’s opinion just from their job?", answer: "No. We can raise a possible concern, but need their own words or another source to know their view."
  },
  "fleetwood-case-file": {
    idea: "A case file brings evidence together to answer one real local question. Your recommendation says what should happen next and explains why the evidence supports it.",
    example: ["Fictional practice question: ‘Where could a crossing help people reach a park?’", "A map helps locate routes. Observations show how people use them. A public plan helps identify who can decide.", "We might recommend studying one crossing location first. We still need evidence about traffic and access."],
    ask: "Are three websites repeating the same notice three different kinds of evidence?", answer: "No. Look for sources that add different information, and record who created each one."
  },
  "power-in-the-room": {
    idea: "Power is the ability to shape what happens. Making the final decision is one kind. Controlling resources, sharing information and getting people to listen are other kinds.",
    example: ["Fictional group: one person makes the final room plan; another holds the counters.", "The first person has decision power. The second can affect what the group can build.", "Giving everyone a turn to speak may help, but it does not automatically change who gets the final choice."],
    ask: "If everyone speaks once, do they all have equal power?", answer: "Not necessarily. Check who controls the final decision, resources and information, and whether people can challenge the choice."
  },
  "compare-government-systems": {
    idea: "A government system sets rules for who can decide, how leaders are chosen and how decisions can be challenged. Compare the same features each time.",
    example: ["Fictional system A: one leader decides. System B: representatives discuss and vote.", "A may make this decision quickly. B may give more people a formal voice. Check the actual rules before claiming either result.", "Ask both: who can question a decision, and what protects people’s rights?"],
    ask: "Does an election alone tell us everything about people’s power?", answer: "No. We also need evidence about rights, access to information and ways to question leaders."
  },
  "rights-in-tension": {
    idea: "A public decision can affect several rights and needs at once. Explain the effects on different people, then look for a choice that protects rights and reduces harm.",
    example: ["Fictional practice: a shared space needs a closing rule.", "People may need access, quiet and safety. Naming one need does not make the others disappear.", "Compare two possible rules. Ask who could be shut out, what protection is needed and how the rule could be reviewed."],
    ask: "Does a popular choice automatically protect everyone’s rights?", answer: "No. A majority can overlook someone. Check rights and effects as well as counting votes."
  },
  "civic-decision-brief": {
    idea: "A decision brief is a short explanation for someone who can act. Say what you recommend, show the evidence, compare another option and name a risk or unanswered question.",
    example: ["Fictional recommendation: ‘Try a marked quiet area beside the shared space.’", "Reason: it could give people another way to use the space. Compare it with closing the whole area.", "Limit: we do not yet know whether it will meet the need. Ask users and review the trial."],
    ask: "What makes a recommendation more useful than ‘I like this option’?", answer: "It connects a specific action to evidence, explains effects on people, names who can act and gives a way to check the result."
  },
  "city-moves": {
    idea: "Migration means moving to live in another place. Urbanization means a growing share of people living in cities. Use the story’s details to explain a move; one story cannot represent everyone.",
    example: ["The supplied nurse card describes a job in another country and relatives nearby.", "We can identify movement across a country border and two stated reasons: work and family connections.", "We cannot tell how every family member feels. Put that in the ‘unknown’ column."],
    ask: "Does crossing a border tell us that someone is a refugee?", answer: "No. The route alone does not tell us the reason or legal status. Use the evidence in the story."
  },
  "data-skyline": {
    idea: "An average or overall number can hide differences inside a group. Read who was counted, what was measured and when. A gap tells us there is a difference; it does not explain the cause.",
    example: ["The supplied 2022 Canada cards show 95% for age 15+ and 72% for age 75+ using the Internet.", "95 − 72 = 23 percentage points. Age 75+ is already inside age 15+, so do not add the two rates.", "We can describe this gap. These numbers do not tell us why someone is offline or whether they can afford a connection."],
    ask: "Can these figures prove that older people do not value the Internet?", answer: "No. That is a claim about a cause or attitude. The survey figures shown here do not establish it."
  },
  "supply-chain-shockwave": {
    idea: "A supply chain is the linked work that turns resources into something we use. A delay or rule change at one step can affect people at other steps. Trace the link and explain how it happens.",
    example: ["Fictional example: a fabric delivery is late.", "The sewing workshop may start later → the shop may receive fewer shirts → customers may wait.", "These are possible effects, not guaranteed results. Stock already in the shop could change what happens."],
    ask: "Does approval of a project prove that all its promised benefits happened?", answer: "No. Approval, predicted benefits and measured results are different. The dated Cedar LNG sources show a decision and claims; later evidence is needed for outcomes."
  },
  "cooperation-control-room": {
    idea: "Cooperation means people or governments working together. They may bring different knowledge, money or authority. An agreement matters, but we must also check what was done and what changed.",
    example: ["Fictional river plan: a regulator checks spill records; a community group reports where pellets gather.", "The records answer different questions. Sharing them may help identify where to act.", "Choosing a cleanup is a plan. Completing it is action. Comparing later samples can help check results."],
    ask: "Which is evidence of a result: signing a plan or measuring a change afterwards?", answer: "The measurement can show a result if it is a fair comparison. Signing the plan shows agreement, not that the problem is solved."
  },
  "pull-the-system-thread": {
    idea: "A system is a set of connected people, resources and rules. A system map shows how one part may affect another. Use evidence for known links and question marks for ideas you still need to check.",
    example: ["Supplied fictional case: 20 items were borrowed and 14 returned. Six locations are unknown.", "A hard-to-find return tray could be one cause—but the count does not prove it.", "Map borrowing → use → returning. Test a clearly marked tray and count again, while checking that everyone can reach it."],
    ask: "Do the six missing returns prove that someone stole the items?", answer: "No. We know the count, not the locations or reasons. Investigate the routine before blaming people."
  },
  "responses-under-pressure": {
    idea: "A response is something people do about a problem. It might help now, prevent a future problem or change a rule. Ask what it changes, who is involved and what evidence shows it worked.",
    example: ["Fictional litter example: collecting litter helps with waste already there.", "A refill station might prevent some bottles becoming waste. A purchasing rule could change what gets supplied.", "They work at different points. Each still needs evidence about cost, access and results."],
    ask: "If a response has a limit, must we reject the whole idea?", answer: "No. Explain what it can do, what it cannot do and what you would keep, change or investigate next."
  },
  "make-it-teachable": {
    idea: "Teach one question well. Help classmates understand three evidence-backed ideas, then give them a short task that makes them use those ideas. A clear paper activity can be your finished product.",
    example: ["Fictional paper exhibit: ‘How could our borrowing routine work better?’", "Show the count, a small map and two possible changes. Ask classmates to choose a change and explain a trade-off.", "Use the same small product for testing. Add evidence you already gathered rather than starting another topic."],
    ask: "Does adding a video or a complex model automatically improve the lesson?", answer: "No. The format helps only if classmates understand the ideas and can use the evidence. Check that before adding polish."
  },
  "expert-exchange": {
    idea: "Testing means watching whether classmates can use and explain your activity. Their questions show where you need to explain an idea or direction more clearly. Improve the same small product.",
    example: ["A tester asks: ‘Is 14 the number borrowed or returned?’", "Change the label to ‘14 of 20 borrowed items were returned by the end of the day.’", "Ask the tester to explain it again. Record the question, the change you made and whether it helped."],
    ask: "Is ‘It looked amazing’ enough evidence that the audience learned?", answer: "No. Ask them to explain an idea, use a source or make a choice with a reason. That shows what they understood."
  }
};

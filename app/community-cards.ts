export type CardCategory='similar'|'different'|'rather';
export type CommunityCard={id:string;category:CardCategory;prompt:string;followUp:string;art:string};
export const categoryLabels:Record<CardCategory,string>={similar:'Find Someone Similar',different:'Find Someone Different',rather:'Would You Rather?'};
const similar=[
 ['Find someone who enjoys one of the same things outside school as you.','What do you like most about it?','play'],
 ['Find someone who likes the same kind of music as you.','Who or what have you been listening to lately?','music'],
 ['Find someone who enjoys the same kind of free-time activity as you.','How did you get interested in it?','create'],
 ['Find someone who enjoys the same school subject as you.','What makes that subject enjoyable for you?','learn'],
 ['Find someone who would choose the same adventure: city, beach, mountains, forest, or somewhere else.','What would you want to do there?','explore'],
 ['Find someone who enjoys a similar learning activity: doing, watching, discussing, reading, listening, or creating.','When has that activity helped you learn?','learn'],
 ['Find someone who wants to get better at something similar this year.','Why is that important to you?','grow'],
 ['Find someone with a similar hope for Grade 6.','What would make that especially fun or interesting?','community']
];
const different=[
 ['Find someone who prefers a different way to spend free time.','What do you enjoy about it that I might not know?','play'],
 ['Find someone whose favourite school subject is different from yours.','What makes that subject interesting to you?','learn'],
 ['Find someone who prefers a different way of working: alone, with a partner, in a small group, or as a whole class.','What makes that way work well for you?','community'],
 ['Find someone who would choose a different learning activity: build, write, talk, research, draw, or experiment.','When has that helped you learn really well?','create'],
 ['Find someone who would choose a different group role: leader, organizer, creator, helper, speaker, or problem-solver.','What do you like about that role?','community'],
 ['Find someone with a different idea about what makes a classroom feel comfortable.','Why does that matter to you?','grow'],
 ['What matters most to you in a classroom: kindness, fairness, fun, learning, respect, or independence? Find someone who chose differently.','Why did you choose that one?','community'],
 ['Find someone with a different hope for Grade 6.','What would make that a great part of the year for you?','explore']
];
const rather=[
 ['Explore space or the deep ocean?','What would you hope to discover?','space'],
 ['Travel 100 years into the past or 100 years into the future?','What is one thing you would want to find out?','explore'],
 ['Be able to fly or teleport?','Where would you go first?','space'],
 ['Talk to animals or understand every human language?','Who would you want to talk with?','nature'],
 ['Build a giant invention or a tiny, complicated invention?','What would your invention do?','create'],
 ['Make a movie, video game, song, book, or invention?','What would yours be about?','music'],
 ['Discover a new animal, a planet, an ancient city, or something that changes science?','Why would that discovery matter?','space'],
 ['Live in a treehouse, houseboat, castle, spaceship, or underground home?','What feature would it need?','nature'],
 ['Solve a mystery or go on an adventure?','What would make it exciting?','explore'],
 ['Be amazing at art, music, sports, technology, or languages?','How would you use that skill?','play'],
 ['Always know the answer or always know the right question to ask?','How could your choice help someone?','learn'],
 ['Have more free time or more energy?','What would you do with it?','grow'],
 ['Work on one huge project or lots of smaller challenges?','What helps you stay interested?','create'],
 ['Create something completely new or improve something that already exists?','What would you work on?','create'],
 ['Explore somewhere no human has visited or discover something hidden in your own community?','What might surprise you?','explore'],
 ['Be the leader, inventor, storyteller, investigator, builder, or helper on a team?','What would you contribute?','community']
];
export const communityCards:CommunityCard[]=([['similar',similar],['different',different],['rather',rather]] as const).flatMap(([category,rows])=>rows.map(([prompt,followUp,art],i)=>({id:`${category}-${i+1}`,category,prompt,followUp,art})));

export type CurriculumGroup = {
  title: string;
  items: string[];
};

export type CurriculumRecord = {
  officialTitle: string;
  sourceUrl: string;
  summary: string;
  bigIdeas: string[];
  competencies: CurriculumGroup[];
  content: CurriculumGroup[];
  student: {
    learning: string;
    canDo: string[];
  };
};

export const curriculum: Record<string, CurriculumRecord> = {
  "English Language Arts": {
    officialTitle: "English Language Arts 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/english-language-arts/6/core",
    summary: "Students comprehend, connect, create, and communicate through oral, written, visual, and digital texts.",
    bigIdeas: [
      "Language and text can be a source of creativity and joy.",
      "Exploring stories and other texts helps us understand ourselves and make connections to others and to the world.",
      "Exploring and sharing multiple perspectives extends our thinking.",
      "Developing our understanding of how language works allows us to use it purposefully.",
      "Questioning what we hear, read, and view contributes to our ability to be educated and engaged citizens.",
    ],
    competencies: [
      {
        title: "Comprehend and connect (reading, listening, viewing)",
        items: [
          "Access information and ideas for diverse purposes and from a variety of sources and evaluate their relevance, accuracy, and reliability",
          "Apply appropriate strategies to comprehend written, oral, and visual texts, guide inquiry, and extend thinking",
          "Synthesize ideas from a variety of sources to build understanding",
          "Recognize and appreciate how different features, forms, and genres of texts reflect various purposes, audiences, and messages",
          "Think critically, creatively, and reflectively to explore ideas within, between, and beyond texts",
          "Recognize and identify the role of personal, social, and cultural contexts, values, and perspectives in texts",
          "Recognize how language constructs personal, social, and cultural identity",
          "Construct meaningful personal connections between self, text, and world",
          "Respond to text in personal, creative, and critical ways",
          "Understand how literary elements, techniques, and devices enhance and shape meaning",
          "Recognize an increasing range of text structures and how they contribute to meaning",
          "Recognize and appreciate the role of story, narrative, and oral tradition in expressing First Peoples perspectives, values, beliefs, and points of view",
        ],
      },
      {
        title: "Create and communicate (writing, speaking, representing)",
        items: [
          "Exchange ideas and viewpoints to build shared understanding and extend thinking",
          "Use writing and design processes to plan, develop, and create engaging and meaningful literary and informational texts for a variety of purposes and audiences",
          "Assess and refine texts to improve their clarity, effectiveness, and impact according to purpose, audience, and message",
          "Use an increasing repertoire of conventions of Canadian spelling, grammar, and punctuation",
          "Use and experiment with oral storytelling processes",
          "Select and use appropriate features, forms, and genres according to audience, purpose, and message",
          "Transform ideas and information to create original texts",
        ],
      },
    ],
    content: [
      {
        title: "Story / text",
        items: [
          "forms, functions, and genres of text",
          "text features",
          "literary elements",
          "literary devices",
          "techniques of persuasion",
        ],
      },
      {
        title: "Strategies and processes",
        items: ["reading strategies", "oral language strategies", "metacognitive strategies", "writing processes"],
      },
      {
        title: "Language features, structures, and conventions",
        items: [
          "features of oral language",
          "paragraphing",
          "language varieties",
          "sentence structure and grammar",
          "conventions",
          "presentation techniques",
        ],
      },
    ],
    student: {
      learning: "We are learning how language and stories shape ideas, identity, and community.",
      canDo: [
        "I can understand and question what I read, hear, and view.",
        "I can connect ideas across texts, my life, and the world.",
        "I can create clear, purposeful texts for different audiences.",
        "I can listen to and share perspectives respectfully.",
      ],
    },
  },

  Mathematics: {
    officialTitle: "Mathematics 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/mathematics/6/core",
    summary: "Students reason, solve, communicate, and connect while developing number, pattern, spatial, data, and financial understanding.",
    bigIdeas: [
      "Mixed numbers and decimal numbers represent quantities that can be decomposed into parts and wholes.",
      "Computational fluency and flexibility with numbers extend to operations with whole numbers and decimals.",
      "Linear relations can be identified and represented using expressions with variables and line graphs and can be used to form generalizations.",
      "Properties of objects and shapes can be described, measured, and compared using volume, area, perimeter, and angles.",
      "Data from the results of an experiment can be used to predict the theoretical probability of an event and to compare and interpret.",
    ],
    competencies: [
      {
        title: "Reasoning and analyzing",
        items: [
          "Use logic and patterns to solve puzzles and play games",
          "Use reasoning and logic to explore, analyze, and apply mathematical ideas",
          "Estimate reasonably",
          "Demonstrate and apply mental math strategies",
          "Use tools or technology to explore and create patterns and relationships, and test conjectures",
          "Model mathematics in contextualized experiences",
        ],
      },
      {
        title: "Understanding and solving",
        items: [
          "Apply multiple strategies to solve problems in both abstract and contextualized situations",
          "Develop, demonstrate, and apply mathematical understanding through play, inquiry, and problem solving",
          "Visualize to explore mathematical concepts",
          "Engage in problem-solving experiences that are connected to place, story, cultural practices, and perspectives relevant to local First Peoples communities, the local community, and other cultures",
        ],
      },
      {
        title: "Communicating and representing",
        items: [
          "Use mathematical vocabulary and language to contribute to mathematical discussions",
          "Explain and justify mathematical ideas and decisions",
          "Communicate mathematical thinking in many ways",
          "Represent mathematical ideas in concrete, pictorial, and symbolic forms",
        ],
      },
      {
        title: "Connecting and reflecting",
        items: [
          "Reflect on mathematical thinking",
          "Connect mathematical concepts to each other and to other areas and personal interests",
          "Use mathematical arguments to support personal choices",
          "Incorporate First Peoples worldviews and perspectives to make connections to mathematical concepts",
        ],
      },
    ],
    content: [
      {
        title: "Number and computational fluency",
        items: [
          "small to large numbers (thousandths to billions)",
          "multiplication and division facts to 100 (developing computational fluency)",
          "order of operations with whole numbers",
          "factors and multiples — greatest common factor and least common multiple",
          "improper fractions and mixed numbers",
          "introduction to ratios",
          "whole-number percents and percentage discounts",
          "multiplication and division of decimals",
        ],
      },
      {
        title: "Patterns and relations",
        items: [
          "increasing and decreasing patterns, using expressions, tables, and graphs as functional relationships",
          "one-step equations with whole-number coefficients and solutions",
        ],
      },
      {
        title: "Geometry and measurement",
        items: [
          "perimeter of complex shapes",
          "area of triangles, parallelograms, and trapezoids",
          "angle measurement and classification",
          "volume and capacity",
          "triangles",
          "combinations of transformations",
        ],
      },
      {
        title: "Data, probability, and finance",
        items: [
          "line graphs",
          "single-outcome probability, both theoretical and experimental",
          "financial literacy — simple budgeting and consumer math",
        ],
      },
    ],
    student: {
      learning: "We are learning to see patterns, reason with numbers, and use mathematics to understand real situations.",
      canDo: [
        "I can choose and explain strategies for solving a problem.",
        "I can represent numbers, patterns, shapes, and data in different ways.",
        "I can estimate, calculate, test, and revise my thinking.",
        "I can connect mathematics to place, story, culture, and daily life.",
      ],
    },
  },

  Science: {
    officialTitle: "Science 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/science/6/core",
    summary: "Students investigate body systems, mixtures, forces and motion, and our place in the universe through scientific inquiry.",
    bigIdeas: [
      "Multicellular organisms rely on internal systems to survive, reproduce, and interact with their environment.",
      "Everyday materials are often mixtures.",
      "Newton’s three laws of motion describe the relationship between force and motion.",
      "The solar system is part of the Milky Way, which is one of billions of galaxies.",
    ],
    competencies: [
      {
        title: "Questioning and predicting",
        items: [
          "Demonstrate a sustained curiosity about a scientific topic or problem of personal interest",
          "Make observations in familiar or unfamiliar contexts",
          "Identify questions to answer or problems to solve through scientific inquiry",
          "Make predictions about the findings of their inquiry",
        ],
      },
      {
        title: "Planning and conducting",
        items: [
          "With support, plan appropriate investigations to answer their questions or solve problems they have identified",
          "Decide which variable should be changed and measured for a fair test",
          "Choose appropriate data to collect to answer their questions",
          "Observe, measure, and record data, using appropriate tools, including digital technologies",
          "Use equipment and materials safely, identifying potential risks",
        ],
      },
      {
        title: "Processing and analyzing data and information",
        items: [
          "Experience and interpret the local environment",
          "Identify First Peoples perspectives and knowledge as sources of information",
          "Construct and use a variety of methods, including tables, graphs, and digital technologies, as appropriate, to represent patterns or relationships in data",
          "Identify patterns and connections in data",
          "Compare data with predictions and develop explanations for results",
          "Demonstrate an openness to new ideas and consideration of alternatives",
        ],
      },
      {
        title: "Evaluating",
        items: [
          "Evaluate whether their investigations were fair tests",
          "Identify possible sources of error",
          "Suggest improvements to their investigation methods",
          "Identify some of the assumptions in secondary sources",
          "Demonstrate an understanding and appreciation of evidence",
          "Identify some of the social, ethical, and environmental implications of the findings from their own and others’ investigations",
        ],
      },
      {
        title: "Applying and innovating",
        items: [
          "Contribute to care for self, others, and community through personal or collaborative approaches",
          "Co-operatively design projects",
          "Transfer and apply learning to new situations",
          "Generate and introduce new or refined ideas when problem solving",
        ],
      },
      {
        title: "Communicating",
        items: [
          "Communicate ideas, explanations, and processes in a variety of ways",
          "Express and reflect on personal, shared, or others’ experiences of place",
        ],
      },
    ],
    content: [
      {
        title: "Life science",
        items: ["the basic structures and functions of body systems: excretory, reproductive, hormonal, and nervous"],
      },
      {
        title: "Physical science",
        items: [
          "heterogeneous mixtures",
          "mixtures separated using a difference in component properties and local First Peoples knowledge of separation and extraction methods",
          "Newton’s three laws of motion",
          "effects of balanced and unbalanced forces in daily physical activities",
          "force of gravity",
        ],
      },
      {
        title: "Earth and space science",
        items: [
          "the overall scale, structure, and age of the universe",
          "the position, motion, and components of our solar system in our galaxy",
        ],
      },
    ],
    student: {
      learning: "We are learning to investigate systems—from the human body to forces, materials, and the universe.",
      canDo: [
        "I can ask a testable question and make a prediction.",
        "I can plan a fair investigation and collect useful evidence.",
        "I can find patterns, explain results, and consider other ideas.",
        "I can connect scientific learning to place, people, and responsible action.",
      ],
    },
  },

  "Social Studies": {
    officialTitle: "Social Studies 6 — Global Issues and Governance",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/social-studies/6/core",
    summary: "Students investigate global issues, systems of government, human rights, media, conflict, cooperation, and civic action.",
    bigIdeas: [
      "Economic self-interest can be a significant cause of conflict among peoples and governments.",
      "Complex global problems require international cooperation to make difficult choices for the future.",
      "Systems of government vary in their respect for human rights and freedoms.",
      "Media sources can both positively and negatively affect our understanding of important events and issues.",
    ],
    competencies: [
      {
        title: "Inquiry and active citizenship",
        items: [
          "Use Social Studies inquiry processes and skills to — ask questions; gather, interpret, and analyze ideas; and communicate findings and decisions",
          "Develop a plan of action to address a selected problem or issue",
        ],
      },
      {
        title: "Thinking like a social scientist",
        items: [
          "Construct arguments defending the significance of individuals/groups, places, events, or developments (significance)",
          "Ask questions, corroborate inferences, and draw conclusions about the content and origins of a variety of sources, including mass media (evidence)",
          "Sequence objects, images, or events, and recognize the positive and negative aspects of continuities and changes in the past and present (continuity and change)",
          "Differentiate between short- and long-term causes, and intended and unintended consequences, of events, decisions, or developments (cause and consequence)",
          "Take stakeholders’ perspectives on issues, developments, or events by making inferences about their beliefs, values, and motivations (perspective)",
          "Make ethical judgments about events, decisions, or actions that consider the conditions of a particular time and place, and assess appropriate ways to respond (ethical judgment)",
        ],
      },
    ],
    content: [
      {
        title: "Global issues and governance",
        items: [
          "the urbanization and migration of people",
          "global poverty and inequality issues, including class structure and gender",
          "roles of individuals, governmental organizations, and NGOs, including groups representing indigenous peoples",
          "different systems of government",
          "economic policies and resource management, including effects on indigenous peoples",
          "globalization and economic interdependence",
          "international cooperation and responses to global issues",
          "regional and international conflict",
          "media technologies and coverage of current events",
        ],
      },
    ],
    student: {
      learning: "We are learning how power, resources, rights, media, and cooperation shape our connected world.",
      canDo: [
        "I can ask questions and use trustworthy evidence.",
        "I can compare perspectives, causes, consequences, and systems of government.",
        "I can think ethically about global issues and human rights.",
        "I can plan informed action on an issue that matters.",
      ],
    },
  },

  "Arts Education": {
    officialTitle: "Arts Education 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/arts-education/6/core",
    summary: "Students explore, create, reason, reflect, communicate, and document through dance, drama, music, and visual arts.",
    bigIdeas: [
      "Engaging in creative expression and experiences expands people’s sense of identity and community.",
      "Artistic expressions differ across time and place.",
      "Dance, drama, music, and visual arts are each unique languages for creating and communicating.",
      "Experiencing art is a means to develop empathy for others’ perspectives and experiences.",
    ],
    competencies: [
      {
        title: "Exploring and creating",
        items: [
          "Intentionally select, apply, combine, and arrange artistic elements, processes, materials, movements, technologies, tools, techniques, and environments in art making",
          "Create artistic works collaboratively and as an individual using ideas inspired by imagination, inquiry, experimentation, and purposeful play",
          "Explore relationships between identity, place, culture, society, and belonging through the arts",
          "Demonstrate an understanding and appreciation of personal, social, cultural, historical, and environmental contexts in relation to the arts",
        ],
      },
      {
        title: "Reasoning and reflecting",
        items: [
          "Research, describe, interpret and evaluate how artists use processes, materials, movements, technologies, tools, techniques, and environments in the arts",
          "Develop and refine ideas, processes, and technical skills in a variety of art forms to improve the quality of artistic creations",
          "Reflect on works of art and creative processes to understand artists’ intentions",
          "Interpret creative works using knowledge and skills from various areas of learning",
          "Examine relationships between the arts and the wider world",
        ],
      },
      {
        title: "Communicating and documenting",
        items: [
          "Adapt learned skills, understandings, and processes for use in new contexts and for different purposes and audiences",
          "Interpret and communicate ideas using symbols and elements to express meaning through the arts",
          "Take creative risks to express feelings, ideas, and experiences",
          "Express feelings, ideas, and experiences through the arts",
          "Describe, interpret and respond to works of art and explore artists’ intent",
          "Experience, document and present creative works in a variety of ways",
          "Demonstrate increasingly sophisticated application and/or engagement of curricular content",
        ],
      },
    ],
    content: [
      {
        title: "Artistic languages and processes",
        items: [
          "purposeful application of elements and principles to create meaning in dance, drama, music, and visual arts",
          "processes, materials, movements, technologies, tools, strategies, and techniques to support creative works",
          "choreographic devices",
          "a variety of dramatic forms",
          "notation in music and dance to represent sounds, ideas, movement, elements, and actions",
          "image development strategies",
          "symbolism and metaphor to explore ideas and perspective",
        ],
      },
      {
        title: "Culture, place, and responsibility",
        items: [
          "traditional and contemporary Aboriginal arts and arts-making processes",
          "a variety of national and international works of art and artistic traditions from diverse cultures, communities, times, and places",
          "personal and collective responsibility associated with creating, experiencing, or presenting in a safe learning environment",
        ],
      },
    ],
    student: {
      learning: "We are learning to use the arts as languages for ideas, identity, empathy, and belonging.",
      canDo: [
        "I can explore and combine artistic elements with purpose.",
        "I can create, revise, document, and present original work.",
        "I can take creative risks and explain my choices.",
        "I can respond thoughtfully to art from different people, places, and times.",
      ],
    },
  },

  "Applied Design, Skills & Technologies": {
    officialTitle: "Applied Design, Skills, and Technologies 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/adst/6/core",
    summary: "Students identify needs, design and test solutions, build practical skills, and make thoughtful choices about technologies.",
    bigIdeas: [
      "Design can be responsive to identified needs.",
      "Complex tasks require the acquisition of additional skills.",
      "Complex tasks may require multiple tools and technologies.",
    ],
    competencies: [
      {
        title: "Applied Design — Understanding context and defining",
        items: [
          "Empathize with potential users to find issues and uncover needs and potential design opportunities",
          "Choose a design opportunity",
          "Identify key features or potential users and their requirements",
          "Identify criteria for success and any constraints",
        ],
      },
      {
        title: "Applied Design — Ideating and prototyping",
        items: [
          "Generate potential ideas and add to others’ ideas",
          "Screen ideas against criteria and constraints",
          "Evaluate personal, social, and environmental impacts and ethical considerations",
          "Choose an idea to pursue",
          "Identify and use sources of information",
          "Develop a plan that identifies key stages and resources",
          "Explore and test a variety of materials for effective use",
          "Construct a first version of the product or a prototype, as appropriate, making changes to tools, materials, and procedures as needed",
          "Record iterations of prototyping",
        ],
      },
      {
        title: "Applied Design — Testing, making, and sharing",
        items: [
          "Test the first version of the product or the prototype",
          "Gather peer and/or user and/or expert feedback and inspiration",
          "Make changes, troubleshoot, and test again",
          "Identify and use appropriate tools, technologies, and materials for production",
          "Make a plan for production that includes key stages, and carry it out, making changes as needed",
          "Use materials in ways that minimize waste",
          "Decide on how and with whom to share their product",
          "Demonstrate their product and describe their process, using appropriate terminology and providing reasons for their selected solution and modifications",
          "Evaluate their product against their criteria and explain how it contributes to the individual, family, community, and/or environment",
          "Reflect on their design thinking and processes, and evaluate their ability to work effectively both as individuals and collaboratively in a group",
          "Identify new design issues",
        ],
      },
      {
        title: "Applied Skills and Applied Technologies",
        items: [
          "Demonstrate an awareness of precautionary and emergency safety procedures in both physical and digital environments",
          "Identify and evaluate the skills and skill levels needed, individually or as a group, in relation to a specific task, and develop them as needed",
          "Select, and as needed learn about, appropriate tools and technologies to extend their capability to complete a task",
          "Identify the personal, social, and environmental impacts, including unintended negative consequences, of the choices they make about technology use",
          "Identify how the land, natural resources, and culture influence the development and use of tools and technologies",
        ],
      },
    ],
    content: [
      {
        title: "Computational Thinking",
        items: [
          "simple algorithms that reflect computational thinking",
          "visual representations of problems and data",
          "evolution of programming languages",
          "visual programming",
        ],
      },
      {
        title: "Computers and Communications Devices",
        items: [
          "computer system architecture, including hardware and software, network infrastructure, intranet/Internet, and personal communication devices",
          "strategies for identifying and troubleshooting simple hardware and software problems",
          "function of input and output devices, including 3D printing and adaptive technologies for those with special needs",
          "ergonomics in use of computers and computing devices",
          "effective and efficient keyboarding techniques",
        ],
      },
      {
        title: "Digital Literacy",
        items: [
          "Internet safety",
          "digital self-image, citizenship, relationships, and communication",
          "legal and ethical considerations, including creative credit and copyright, and cyberbullying",
          "methods for personal media management",
          "search techniques, how search results are selected and ranked, and criteria for evaluating search results",
          "strategies to identify personal learning networks",
        ],
      },
      { title: "Drafting", items: ["technical drawing, including sketching and manual drafting techniques", "elements of plans and drawings", "simple computer-aided drafting programs"] },
      { title: "Entrepreneurship and Marketing", items: ["role of entrepreneurship in designing and making products and services", "market niche", "branding of products, services, institutions, or places", "pricing product/service, including decision to seek profit or break even", "role of basic financial record-keeping and budgeting"] },
      { title: "Food Studies", items: ["basic food handling and simple preparation techniques and equipment", "factors in ingredient use, including balanced eating/nutrition, function, and dietary restrictions", "factors that influence food choices, including cost, availability, and family and cultural influences"] },
      { title: "Media Arts", items: ["digital and non-digital media, and their distinguishing characteristics and uses", "techniques for using images, sounds, and text to communicate information, settings, ideas, and story structure", "media technologies and techniques to capture, edit, and manipulate images, sounds, and text for specific purposes", "influences of digital media for the purpose of communication and self-expression"] },
      { title: "Metalwork", items: ["characteristics and uses of metals", "metalworking techniques and processes using hand tools", "metals as a non-renewable resource"] },
      { title: "Power Technology", items: ["power is the rate at which energy is transformed", "forms of energy", "energy is conserved", "devices that transform energy"] },
      { title: "Robotics", items: ["a robot is a machine capable of carrying out a complex series of actions automatically", "uses of robotics", "main components of robots: sensors, control systems, and effectors", "various ways that objects can move", "programming and logic for robotics components", "various platforms for robotics"] },
      { title: "Textiles", items: ["range of uses of textiles", "variety of textile materials", "hand construction techniques for producing and/or repairing textile items", "consumer concerns that influence textile choices"] },
      { title: "Woodwork", items: ["ways in which wood is used in local cultural and economic contexts", "characteristics of wood as a material", "woodworking techniques and basic joinery using hand tools"] },
    ],
    student: {
      learning: "We are learning to design useful solutions by understanding people, testing ideas, and choosing tools responsibly.",
      canDo: [
        "I can notice a need and define a design opportunity.",
        "I can plan, prototype, test, gather feedback, and improve.",
        "I can use tools, materials, and technologies safely.",
        "I can explain the impacts of my design choices.",
      ],
    },
  },

  "Physical & Health Education": {
    officialTitle: "Physical and Health Education 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/physical-health-education/6/core",
    summary: "Students develop physical literacy, healthy and active living habits, safety skills, relationship skills, and mental well-being.",
    bigIdeas: [
      "Daily physical activity enables us to practice skillful movement and helps us develop personal fitness.",
      "Physical literacy and fitness contribute to our success in and enjoyment of physical activity.",
      "We experience many changes in our lives that influence how we see ourselves and others.",
      "Healthy choices influence our physical, emotional, and mental well-being.",
      "Learning about similarities and differences in individuals and groups influences community health.",
    ],
    competencies: [
      {
        title: "Physical literacy",
        items: [
          "Develop, refine, and apply fundamental movement skills in a variety of physical activities and environments",
          "Develop and apply a variety of movement concepts and strategies in different physical activities",
          "Apply methods of monitoring and adjusting exertion levels in physical activity",
          "Develop and demonstrate safety, fair play, and leadership in physical activities",
          "Identify and describe preferred types of physical activity",
        ],
      },
      {
        title: "Healthy and active living",
        items: [
          "Participate daily in physical activity designed to enhance and maintain health components of fitness",
          "Describe how students’ participation in physical activities at school, at home, and in the community can influence their health and fitness",
          "Explore and plan food choices to support personal health and well-being",
          "Describe the impacts of personal choices on health and well-being",
          "Analyze health messages and possible intentions to influence behaviour",
          "Identify, apply, and reflect on strategies used to pursue personal healthy-living goals",
          "Identify and describe strategies for avoiding and/or responding to potentially unsafe, abusive, or exploitive situations",
          "Describe and assess strategies for responding to discrimination, stereotyping, and bullying",
          "Describe and apply strategies for developing and maintaining healthy relationships",
          "Explore strategies for promoting the health and well-being of the school and community",
        ],
      },
      {
        title: "Mental well-being",
        items: [
          "Describe and assess strategies for promoting mental well-being, for self and others",
          "Describe and assess strategies for managing problems related to mental well-being and substance use, for others",
          "Explore and describe strategies for managing physical, emotional, and social changes during puberty and adolescence",
          "Explore and describe how personal identities adapt and change in different settings and situations",
        ],
      },
    ],
    content: [
      {
        title: "Movement and fitness",
        items: [
          "proper technique for fundamental movement skills, including non-locomotor, locomotor, and manipulative skills",
          "movement concepts and strategies",
          "ways to monitor and adjust physical exertion levels",
          "how to participate in different types of physical activities, including individual and dual activities, rhythmic activities, and games",
          "training principles to enhance personal fitness levels, including the FITT principle and the SAID principle",
        ],
      },
      {
        title: "Health, safety, and relationships",
        items: [
          "influences on food choices",
          "practices that reduce the risk of contracting sexually transmitted infections and life-threatening communicable diseases",
          "sources of health information",
          "basic principles for responding to emergencies",
          "strategies to protect themselves and others from potential abuse, exploitation, and harm in a variety of settings",
          "consequences of bullying, stereotyping, and discrimination",
          "strategies for managing personal and social risks related to psychoactive substances and potentially addictive behaviours",
          "physical, emotional, and social changes that occur during puberty and adolescence",
          "influences on individual identity, including sexual identity, gender, values, and beliefs",
        ],
      },
    ],
    student: {
      learning: "We are learning how movement, choices, relationships, safety, and identity support lifelong well-being.",
      canDo: [
        "I can move skillfully, safely, and fairly in different activities.",
        "I can monitor effort and set realistic health goals.",
        "I can evaluate health messages and make informed choices.",
        "I can use respectful strategies for boundaries, relationships, and well-being.",
      ],
    },
  },

  "Career Education": {
    officialTitle: "Career Education 6",
    sourceUrl: "https://curriculum.gov.bc.ca/curriculum/career-education/6/core",
    summary: "Students explore identity, strengths, leadership, service, project management, safety, and the people and experiences that shape career paths.",
    bigIdeas: [
      "Our attitudes toward careers are influenced by our view of ourselves as well as by our friends, family, and community.",
      "Our personal digital identity forms part of our public identity.",
      "Practising respectful, ethical, inclusive behaviour prepares us for the expectations of the workplace.",
      "Leadership represents good planning, goal-setting, and collaboration.",
      "Safe environments depend on everyone following safety rules.",
      "New experiences, both within and outside of school, expand our career skill set and options.",
    ],
    competencies: [
      {
        title: "Career-life development",
        items: [
          "Recognize their personal preferences, skills, strengths, and abilities and connect them to possible career choices",
          "Question self and others about how their personal public identity can have both positive and negative consequences",
          "Examine the importance of service learning and the responsibility of individuals to contribute to the community and the world",
          "Appreciate the importance of respect, inclusivity, and other positive behaviours in diverse, collaborative learning, and work environments",
          "Question self and others about the reciprocal relationship between self and community",
          "Use entrepreneurial and innovative thinking to solve problems",
          "Demonstrate leadership skills through collaborative activities in the school and community",
          "Demonstrate safety skills in an experiential learning environment",
          "Set realistic short- and longer-term learning goals, define a path, and monitor progress",
          "Recognize the influence of peers, family, and communities on career choices and attitudes toward work",
          "Appreciate the value of new experiences, innovative thinking and risk taking in broadening their career options",
          "Explore volunteer opportunities and other new experiences outside school and recognize their value in career development",
          "Apply project management skills to support career development",
        ],
      },
    ],
    content: [
      {
        title: "Personal Development",
        items: ["goal-setting strategies", "self-assessment", "project management", "leadership", "problem-solving and decision-making strategies"],
      },
      {
        title: "Connections to Community",
        items: ["local and global needs and opportunities", "cultural and social awareness", "global citizenship", "volunteer opportunities"],
      },
      {
        title: "Life and Career Plan",
        items: [
          "factors affecting types of jobs in the community",
          "technology in learning and working",
          "role of mentors, family, community, school, and personal network in decision making",
        ],
      },
    ],
    student: {
      learning: "We are learning how our strengths, identity, relationships, choices, and experiences shape possible futures.",
      canDo: [
        "I can name my strengths, interests, skills, and next goals.",
        "I can collaborate, lead, solve problems, and manage a project.",
        "I can make safe, respectful, inclusive choices in shared spaces.",
        "I can explore how service, mentors, and new experiences expand my possibilities.",
      ],
    },
  },
};


export type BusinessFlashcard = {
  front: string;
  back: string;
  connection: string;
  example: string;
};

export type CheatSheetSection = {
  title: string;
  summary: string;
  points: string[];
  formula?: string;
  action?: string;
};

export type BusinessStudyModule = {
  module: number;
  title: string;
  description: string;
  flashcards: BusinessFlashcard[];
  cheatSheet: CheatSheetSection[];
};

export const businessStudyModules: BusinessStudyModule[] = [
  {
    module: 1,
    title: "Business Foundations",
    description:
      "Understand finance, strategy, planning, discipline, and the basic decisions that shape a business.",
    flashcards: [
      {
        front: "Revenue",
        back: "The total income generated before expenses are deducted.",
        connection: "Revenue connects marketing and sales activity to financial performance.",
        example: "A company sells 100 products at $50 each and generates $5,000 in revenue.",
      },
      {
        front: "Profit",
        back: "The amount remaining after relevant business expenses are deducted from revenue.",
        connection: "Profit connects pricing, costs, operations, and financial sustainability.",
        example: "If revenue is $5,000 and expenses are $3,500, profit is $1,500.",
      },
      {
        front: "Cash Flow",
        back: "The movement of money into and out of a business.",
        connection: "Cash flow connects customer payments, expenses, debt, payroll, and daily survival.",
        example: "A profitable company may still struggle if customers pay invoices late.",
      },
      {
        front: "Fixed Expense",
        back: "A cost that generally stays consistent regardless of sales volume.",
        connection: "Fixed expenses affect break-even planning and monthly budgeting.",
        example: "Office rent of $2,000 per month.",
      },
      {
        front: "Variable Expense",
        back: "A cost that changes as sales, production, or activity changes.",
        connection: "Variable expenses connect product volume to gross margin.",
        example: "Packaging, shipping, and transaction fees per order.",
      },
      {
        front: "Business Strategy",
        back: "A coordinated plan that connects goals, resources, decisions, and execution.",
        connection: "Strategy connects the company vision to marketing, operations, finance, and leadership.",
        example: "Target one niche, offer one core service, and grow through referrals.",
      },
      {
        front: "SMART Goal",
        back: "A goal that is specific, measurable, achievable, relevant, and time-bound.",
        connection: "SMART goals connect strategy to measurable execution.",
        example: "Generate 50 qualified leads within 60 days.",
      },
      {
        front: "Opportunity Cost",
        back: "The value of the best alternative given up when choosing one option.",
        connection: "Opportunity cost connects limited resources to strategic priorities.",
        example: "Spending $10,000 on ads means that money cannot also fund new equipment.",
      },
      {
        front: "Break-Even Point",
        back: "The sales level where total revenue equals total costs.",
        connection: "Break-even connects pricing, expenses, and sales goals.",
        example: "If fixed costs are $5,000 and profit per sale is $100, 50 sales are needed.",
      },
      {
        front: "Business Model",
        back: "The system explaining how a business creates, delivers, and captures value.",
        connection: "The business model connects customers, offers, delivery, costs, and revenue.",
        example: "A subscription company charges customers monthly for ongoing access.",
      },
      {
        front: "Founder Discipline",
        back: "The ability to prioritize, execute, review, and remain accountable.",
        connection: "Founder discipline connects plans to actual business results.",
        example: "Reviewing sales, finances, and priorities every Monday.",
      },
      {
        front: "Risk Management",
        back: "The process of identifying, evaluating, and reducing business risks.",
        connection: "Risk management connects legal, financial, operational, and strategic decisions.",
        example: "Maintaining insurance, contracts, cash reserves, and backup suppliers.",
      },
    ],
    cheatSheet: [
      {
        title: "Core Financial Terms",
        summary: "Use these numbers to understand whether the business is healthy.",
        points: [
          "Revenue: total income before expenses.",
          "Gross profit: revenue minus direct costs.",
          "Net profit: money remaining after all applicable expenses.",
          "Cash flow: timing of cash entering and leaving.",
          "Assets: valuable resources owned or controlled.",
          "Liabilities: amounts or obligations owed.",
        ],
        formula: "Profit = Revenue - Expenses",
        action: "Review revenue, expenses, cash, debt, and profit every week.",
      },
      {
        title: "Business Strategy Framework",
        summary: "Turn the vision into a measurable operating plan.",
        points: [
          "Define the desired future.",
          "Assess the current position.",
          "Identify the target customer.",
          "Choose a competitive advantage.",
          "Set measurable objectives.",
          "Assign resources and ownership.",
          "Review results and adjust.",
        ],
        action: "Write a one-page strategy with three priorities for the next 90 days.",
      },
      {
        title: "Founder Weekly Review",
        summary: "A simple weekly discipline for staying in control.",
        points: [
          "Review cash and upcoming expenses.",
          "Review sales pipeline and conversions.",
          "Review current projects and deadlines.",
          "Identify the largest business constraint.",
          "Choose the three most important weekly actions.",
        ],
        action: "Schedule a 30-minute founder review every Monday.",
      },
    ],
  },

  {
    module: 2,
    title: "Marketing & Operations",
    description:
      "Connect customer acquisition with repeatable systems, delivery, quality, and measurable performance.",
    flashcards: [
      {
        front: "Target Market",
        back: "The specific group of customers a business intends to serve.",
        connection: "The target market connects product design, messaging, pricing, and advertising.",
        example: "Faith-based coaches serving women entrepreneurs.",
      },
      {
        front: "Value Proposition",
        back: "A clear explanation of why a customer should choose the offer.",
        connection: "The value proposition connects customer problems to the business solution.",
        example: "Build your coaching platform without managing multiple software tools.",
      },
      {
        front: "Marketing Channel",
        back: "A method used to reach and communicate with potential customers.",
        connection: "Channels connect the offer to the audience.",
        example: "Email, social media, referrals, events, search, or paid ads.",
      },
      {
        front: "Customer Acquisition Cost",
        back: "The average amount spent to acquire one new customer.",
        connection: "CAC connects marketing spending to profitability.",
        example: "Spending $1,000 to gain 10 customers creates a $100 CAC.",
      },
      {
        front: "Conversion Rate",
        back: "The percentage of people who complete a desired action.",
        connection: "Conversion connects traffic and leads to actual sales.",
        example: "Five purchases from 100 visitors equals a 5% conversion rate.",
      },
      {
        front: "Sales Funnel",
        back: "The stages a prospect moves through before becoming a customer.",
        connection: "The funnel connects awareness, interest, trust, and purchase.",
        example: "Social post, landing page, consultation, checkout.",
      },
      {
        front: "Standard Operating Procedure",
        back: "A documented method for completing a recurring process.",
        connection: "SOPs connect employee actions to consistent outcomes.",
        example: "A checklist for onboarding every new client.",
      },
      {
        front: "Operational Bottleneck",
        back: "The step that limits the speed or capacity of the entire workflow.",
        connection: "Bottlenecks connect process efficiency to growth limitations.",
        example: "One employee manually approving every customer order.",
      },
      {
        front: "Quality Standard",
        back: "A measurable expectation for how work should be completed.",
        connection: "Quality standards connect customer expectations to operations.",
        example: "All customer inquiries answered within one business day.",
      },
      {
        front: "Key Performance Indicator",
        back: "A measurable value used to evaluate performance.",
        connection: "KPIs connect goals to operational data.",
        example: "Conversion rate, delivery time, refund rate, or customer retention.",
      },
      {
        front: "Customer Journey",
        back: "The complete experience a customer has with a business.",
        connection: "The journey connects marketing, sales, delivery, and support.",
        example: "First impression through purchase, onboarding, delivery, and follow-up.",
      },
      {
        front: "Continuous Improvement",
        back: "The ongoing process of measuring and improving performance.",
        connection: "Continuous improvement connects feedback to stronger systems.",
        example: "Reviewing support complaints monthly and updating the process.",
      },
    ],
    cheatSheet: [
      {
        title: "Marketing Funnel",
        summary: "Move people from awareness to purchase and retention.",
        points: [
          "Awareness: the customer discovers the brand.",
          "Interest: the customer sees relevance.",
          "Consideration: the customer compares solutions.",
          "Conversion: the customer buys or books.",
          "Retention: the customer continues.",
          "Referral: the customer recommends others.",
        ],
        action: "Create one clear action for each stage of your customer funnel.",
      },
      {
        title: "Operational Workflow",
        summary: "Map how value moves through the business.",
        points: [
          "Customer request or order.",
          "Information collection.",
          "Payment or approval.",
          "Production or service delivery.",
          "Quality review.",
          "Final delivery.",
          "Follow-up and support.",
        ],
        action: "Map one customer order from first contact to completion.",
      },
      {
        title: "Business Metrics",
        summary: "Track both marketing effectiveness and operational quality.",
        points: [
          "Leads generated.",
          "Customer acquisition cost.",
          "Conversion rate.",
          "Average order value.",
          "Fulfillment time.",
          "Error or refund rate.",
          "Customer retention.",
        ],
        formula: "Conversion Rate = Conversions / Total Opportunities x 100",
        action: "Choose five metrics and review them every week.",
      },
    ],
  },

  {
    module: 3,
    title: "People, Research & Administration",
    description:
      "Build teams, validate ideas, organize business records, and create reliable administrative systems.",
    flashcards: [
      {
        front: "Human Resource Management",
        back: "The management of recruiting, onboarding, training, performance, and employee support.",
        connection: "HR connects people strategy to operational capacity.",
        example: "Creating job descriptions, onboarding plans, and performance reviews.",
      },
      {
        front: "Job Description",
        back: "A written description of role responsibilities, qualifications, and expectations.",
        connection: "The job description connects hiring to accountability.",
        example: "A sales representative responsible for outbound calls and CRM updates.",
      },
      {
        front: "Onboarding",
        back: "The process of preparing and integrating a new employee.",
        connection: "Onboarding connects hiring decisions to employee performance.",
        example: "Training, access setup, policies, goals, and introductions.",
      },
      {
        front: "Performance Management",
        back: "The process of setting expectations, reviewing results, and improving employee performance.",
        connection: "Performance management connects goals to feedback and development.",
        example: "Monthly reviews based on sales, customer service, and documentation.",
      },
      {
        front: "Primary Research",
        back: "Original information collected directly from customers or the market.",
        connection: "Primary research connects business assumptions to real customer evidence.",
        example: "Surveys, interviews, observation, and product tests.",
      },
      {
        front: "Secondary Research",
        back: "Existing information from reports, articles, studies, and databases.",
        connection: "Secondary research connects business planning to broader market knowledge.",
        example: "Industry reports and competitor websites.",
      },
      {
        front: "Customer Interview",
        back: "A structured conversation used to understand customer problems and behavior.",
        connection: "Interviews connect product decisions to customer reality.",
        example: "Asking how customers currently solve a problem and what frustrates them.",
      },
      {
        front: "Delegation",
        back: "Assigning responsibility and authority to another person.",
        connection: "Delegation connects team development to founder capacity.",
        example: "Assigning a trained employee responsibility for client onboarding.",
      },
      {
        front: "Business Administration",
        back: "The coordination of records, schedules, communication, policies, and recurring tasks.",
        connection: "Administration connects separate departments into one organized company.",
        example: "Managing contracts, calendars, files, and internal approvals.",
      },
      {
        front: "Document Control",
        back: "The system used to organize, secure, update, and retrieve business records.",
        connection: "Document control connects legal, financial, HR, and operational records.",
        example: "Version-controlled folders for contracts, policies, and invoices.",
      },
      {
        front: "Organizational Chart",
        back: "A visual representation of roles and reporting relationships.",
        connection: "The organizational chart connects authority to accountability.",
        example: "CEO, operations manager, sales manager, and customer support.",
      },
      {
        front: "Company Culture",
        back: "The shared behaviors, expectations, and values within an organization.",
        connection: "Culture connects leadership behavior to employee experience.",
        example: "A culture emphasizing honesty, speed, service, and accountability.",
      },
    ],
    cheatSheet: [
      {
        title: "Hiring Process",
        summary: "Build a repeatable system for selecting and preparing employees.",
        points: [
          "Define the role and expected outcome.",
          "Create the job description.",
          "Source candidates.",
          "Screen for skills and values.",
          "Interview consistently.",
          "Verify information when appropriate.",
          "Provide structured onboarding.",
        ],
        action: "Create one complete role scorecard before hiring.",
      },
      {
        title: "Business Research",
        summary: "Use evidence before investing heavily in an idea.",
        points: [
          "Define the question.",
          "Study available market information.",
          "Interview potential customers.",
          "Analyze competitors.",
          "Test a small version of the offer.",
          "Review behavior, not only opinions.",
        ],
        action: "Interview five potential customers this week.",
      },
      {
        title: "Administrative Documents",
        summary: "Keep essential business records organized and accessible.",
        points: [
          "Formation documents.",
          "Licenses and permits.",
          "Contracts and agreements.",
          "Financial statements and invoices.",
          "Employee records.",
          "Insurance records.",
          "Policies and procedures.",
        ],
        action: "Create a secure folder structure for every document category.",
      },
    ],
  },

  {
    module: 4,
    title: "Accounting, Economics & Planning",
    description:
      "Connect financial records, economic conditions, budgeting, pricing, and international business decisions.",
    flashcards: [
      {
        front: "Bookkeeping",
        back: "The recording and organization of financial transactions.",
        connection: "Bookkeeping connects daily activity to accounting reports.",
        example: "Recording every sale, expense, refund, and payment.",
      },
      {
        front: "Income Statement",
        back: "A report showing revenue, expenses, and profit over a period.",
        connection: "The income statement connects operations to financial performance.",
        example: "Monthly revenue of $20,000 minus expenses of $14,000.",
      },
      {
        front: "Balance Sheet",
        back: "A report showing assets, liabilities, and equity at a specific time.",
        connection: "The balance sheet connects owned resources to obligations.",
        example: "Cash, equipment, loans, and owner equity.",
      },
      {
        front: "Cash Flow Statement",
        back: "A report explaining cash movement through operating, investing, and financing activity.",
        connection: "It connects profit reporting to actual available cash.",
        example: "Customer payments, equipment purchases, and loan proceeds.",
      },
      {
        front: "Demand",
        back: "The quantity customers are willing and able to purchase.",
        connection: "Demand connects customer behavior to pricing and sales volume.",
        example: "More buyers seeking a limited service may support higher prices.",
      },
      {
        front: "Supply",
        back: "The quantity producers are willing and able to provide.",
        connection: "Supply connects production capacity to market pricing.",
        example: "A shortage of skilled contractors may increase labor prices.",
      },
      {
        front: "Scarcity",
        back: "The condition of limited resources relative to competing wants.",
        connection: "Scarcity connects economics to business prioritization.",
        example: "A company has limited capital and must choose which product to launch.",
      },
      {
        front: "Budget Variance",
        back: "The difference between planned and actual financial results.",
        connection: "Variance connects financial planning to accountability.",
        example: "Marketing was budgeted at $2,000 but actual spending was $2,600.",
      },
      {
        front: "Cash Reserve",
        back: "Money held to manage emergencies, timing gaps, or unexpected expenses.",
        connection: "Reserves connect risk management to financial stability.",
        example: "Three months of essential operating expenses.",
      },
      {
        front: "Exchange Rate Risk",
        back: "The possibility that currency changes affect costs, revenue, or profit.",
        connection: "Currency risk connects international activity to financial results.",
        example: "Paying a foreign supplier in a currency that becomes more expensive.",
      },
      {
        front: "Gross Margin",
        back: "The percentage of revenue remaining after direct costs.",
        connection: "Gross margin connects pricing and direct costs to profitability.",
        example: "A $100 sale with $40 in direct costs has a $60 gross profit.",
      },
      {
        front: "Financial Forecast",
        back: "An estimate of future revenue, expenses, cash, and performance.",
        connection: "Forecasting connects past data to future planning.",
        example: "Estimating monthly sales and expenses for the next year.",
      },
    ],
    cheatSheet: [
      {
        title: "Financial Statements",
        summary: "Use all three statements together for a complete view.",
        points: [
          "Income statement: profitability over time.",
          "Balance sheet: financial position at one moment.",
          "Cash flow statement: movement of actual cash.",
          "No single statement tells the entire story.",
        ],
        action: "Review all three reports at least monthly.",
      },
      {
        title: "Budget Plan",
        summary: "Plan revenue, spending, reserves, and investment.",
        points: [
          "Estimate realistic revenue.",
          "Separate fixed and variable expenses.",
          "Include tax and debt obligations.",
          "Create an emergency reserve.",
          "Compare planned and actual results.",
          "Update assumptions when conditions change.",
        ],
        action: "Create a 12-month budget with monthly targets.",
      },
      {
        title: "Pricing Review",
        summary: "Pricing must support customer value and business economics.",
        points: [
          "Understand direct costs.",
          "Include overhead.",
          "Review competitor alternatives.",
          "Measure customer value.",
          "Protect a sustainable margin.",
          "Test and review pricing regularly.",
        ],
        formula: "Gross Margin % = (Revenue - Direct Costs) / Revenue x 100",
        action: "Calculate the gross margin for each core offer.",
      },
    ],
  },

  {
    module: 5,
    title: "Growth & Customer Acquisition",
    description:
      "Connect customer experience, acquisition, retention, pricing, revenue, and sustainable growth.",
    flashcards: [
      {
        front: "Customer Acquisition",
        back: "The process of attracting and converting new customers.",
        connection: "Acquisition connects marketing activity to revenue.",
        example: "Using ads, referrals, email, and consultations to gain customers.",
      },
      {
        front: "Customer Retention",
        back: "The ability to keep customers engaged and purchasing over time.",
        connection: "Retention connects customer service to long-term revenue.",
        example: "A subscription customer remaining for 18 months.",
      },
      {
        front: "Customer Lifetime Value",
        back: "The estimated total value a customer generates during the relationship.",
        connection: "LTV connects retention, purchase frequency, and pricing.",
        example: "A customer paying $100 monthly for 12 months has $1,200 gross revenue value.",
      },
      {
        front: "Average Order Value",
        back: "The average amount spent in one transaction.",
        connection: "AOV connects product packaging and upsells to revenue growth.",
        example: "Revenue of $10,000 from 100 orders equals a $100 AOV.",
      },
      {
        front: "Upsell",
        back: "An offer encouraging the customer to purchase a higher-value option.",
        connection: "Upsells connect customer needs to larger transaction value.",
        example: "Upgrading from a basic course to coaching plus community.",
      },
      {
        front: "Cross-Sell",
        back: "An offer for an additional related product or service.",
        connection: "Cross-selling connects multiple solutions to one customer relationship.",
        example: "Selling a workbook alongside a course.",
      },
      {
        front: "Referral",
        back: "A new prospect introduced by an existing customer or partner.",
        connection: "Referrals connect customer satisfaction to lower-cost acquisition.",
        example: "A coaching client referring another founder.",
      },
      {
        front: "Churn",
        back: "The rate at which customers stop purchasing or cancel.",
        connection: "Churn connects customer experience to recurring revenue stability.",
        example: "Five cancellations from 100 subscribers equals 5% monthly churn.",
      },
      {
        front: "Growth Constraint",
        back: "The main limitation preventing the business from growing faster.",
        connection: "The constraint connects strategy to the highest-priority problem.",
        example: "Strong demand but insufficient delivery capacity.",
      },
      {
        front: "Lead",
        back: "A potential customer who has shown interest or matches the target profile.",
        connection: "Leads connect marketing reach to sales opportunities.",
        example: "Someone completing a consultation form.",
      },
      {
        front: "Sales Pipeline",
        back: "The organized stages of current sales opportunities.",
        connection: "The pipeline connects leads to expected revenue.",
        example: "New lead, contacted, qualified, proposal, closed.",
      },
      {
        front: "Sustainable Growth",
        back: "Growth that the company can finance, deliver, and maintain responsibly.",
        connection: "Sustainable growth connects sales, operations, finance, and people.",
        example: "Increasing customers while maintaining quality and cash flow.",
      },
    ],
    cheatSheet: [
      {
        title: "Customer Acquisition Plan",
        summary: "Build a repeatable process for attracting qualified customers.",
        points: [
          "Define the ideal customer.",
          "Clarify the problem and offer.",
          "Choose two primary channels.",
          "Create a strong call to action.",
          "Track leads and conversions.",
          "Measure acquisition cost.",
        ],
        action: "Run a seven-day acquisition sprint using one channel.",
      },
      {
        title: "Revenue Growth Levers",
        summary: "Revenue can grow through several connected factors.",
        points: [
          "Increase qualified traffic.",
          "Improve conversion rate.",
          "Raise average order value.",
          "Increase purchase frequency.",
          "Reduce customer churn.",
          "Introduce upsells and cross-sells.",
        ],
        formula: "Revenue = Customers x Purchase Frequency x Average Order Value",
        action: "Choose one growth lever to improve this month.",
      },
      {
        title: "Customer Service Standard",
        summary: "Create a consistent experience that strengthens retention.",
        points: [
          "Respond promptly.",
          "Listen before answering.",
          "Communicate clearly.",
          "Own the problem.",
          "Provide a realistic resolution.",
          "Follow up after resolution.",
        ],
        action: "Write a one-page customer service response standard.",
      },
    ],
  },

  {
    module: 6,
    title: "Launch & Leadership",
    description:
      "Connect product launches, communication, execution, accountability, values, and leadership.",
    flashcards: [
      {
        front: "Product Validation",
        back: "Testing whether customers understand, value, and will purchase an offer.",
        connection: "Validation connects research to launch investment.",
        example: "Pre-selling a small pilot before building the full program.",
      },
      {
        front: "Product Positioning",
        back: "The way an offer is understood relative to customer needs and alternatives.",
        connection: "Positioning connects the product, customer, message, and competition.",
        example: "A premium faith-based coaching platform for business leaders.",
      },
      {
        front: "Minimum Viable Product",
        back: "The simplest useful version of a product used to test assumptions.",
        connection: "The MVP connects product development to customer evidence.",
        example: "Launching one course module before building the entire academy.",
      },
      {
        front: "Launch Plan",
        back: "A coordinated timeline for preparation, promotion, release, delivery, and review.",
        connection: "The launch plan connects teams, marketing, operations, and deadlines.",
        example: "A four-week campaign leading to enrollment day.",
      },
      {
        front: "Leadership Vision",
        back: "A clear description of the future the leader is working to create.",
        connection: "Vision connects people and priorities to a shared destination.",
        example: "Build the most trusted faith-based coaching ecosystem.",
      },
      {
        front: "Integrity",
        back: "Consistency between values, words, decisions, and actions.",
        connection: "Integrity connects leadership credibility to team trust.",
        example: "Honoring commitments even when the decision is difficult.",
      },
      {
        front: "Accountability",
        back: "Taking responsibility for commitments, actions, and results.",
        connection: "Accountability connects ownership to execution.",
        example: "Reporting progress on assigned goals every Friday.",
      },
      {
        front: "Servant Leadership",
        back: "Leading by supporting people and the mission rather than seeking power alone.",
        connection: "Servant leadership connects authority to responsibility.",
        example: "Removing barriers so employees can perform their best work.",
      },
      {
        front: "Decision Framework",
        back: "A consistent method for evaluating choices.",
        connection: "Decision frameworks connect values, evidence, risk, and outcomes.",
        example: "Review mission fit, cost, benefit, risk, and timing.",
      },
      {
        front: "Execution",
        back: "The disciplined completion of agreed priorities and actions.",
        connection: "Execution connects strategy to business results.",
        example: "Assigning owners, deadlines, and progress reviews.",
      },
      {
        front: "Post-Launch Review",
        back: "A structured evaluation of launch results and lessons.",
        connection: "The review connects launch data to future improvement.",
        example: "Comparing traffic, conversion, revenue, refunds, and customer feedback.",
      },
      {
        front: "Leadership Code",
        back: "A written set of standards guiding a leader's behavior and decisions.",
        connection: "A leadership code connects personal values to organizational culture.",
        example: "Lead honestly, communicate clearly, serve others, and own results.",
      },
    ],
    cheatSheet: [
      {
        title: "Seven-Step Product Launch",
        summary: "Move from idea to measured release.",
        points: [
          "Research the customer problem.",
          "Validate demand.",
          "Define the offer and positioning.",
          "Prepare delivery and support.",
          "Create launch messaging and assets.",
          "Launch and communicate consistently.",
          "Review results and improve.",
        ],
        action: "Build a launch calendar with owners and deadlines.",
      },
      {
        title: "Leadership Operating System",
        summary: "Create consistent leadership across people and projects.",
        points: [
          "Communicate the vision.",
          "Define priorities.",
          "Assign ownership.",
          "Set deadlines and standards.",
          "Review performance.",
          "Coach and correct.",
          "Recognize results.",
        ],
        action: "Create a weekly leadership meeting with a fixed agenda.",
      },
      {
        title: "Decision Checklist",
        summary: "Use a repeatable process before making major decisions.",
        points: [
          "Does it support the mission?",
          "What evidence supports the decision?",
          "What are the financial consequences?",
          "What are the operational consequences?",
          "Who is affected?",
          "What can go wrong?",
          "How will success be measured?",
        ],
        action: "Use this checklist for your next major business decision.",
      },
    ],
  },
];
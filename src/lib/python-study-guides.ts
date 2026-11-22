export type StudyGuide = {
  title: string;
  connection: string;
  walkthrough: string[];
  mistake: string;
  remember: string;
};

export const pythonStudyGuides: Record<string, StudyGuide> = {
  fa_t1SrIc0A: {
    title: "Variables: giving useful names to values",
    connection: "Think of a learner registration form. Name and completed-lesson count describe different kinds of information. Variables give these values meaningful names so the program can refer to them later without repeating the values everywhere.",
    walkthrough: ["name refers to the text Anu. The quotes describe a string; they are not part of the stored name.", "lessons refers to the integer 1. It represents a count, not the text '1'.", "print reads the current values and displays Anu 1. Change lessons to 2 and predict the new output before running."],
    mistake: "Do not confuse a variable name with its value. print(name) reads a variable; print('name') prints the literal word name.",
    remember: "A variable binds a name to a value. Choose names that explain what the value means.",
  },
  IlVAa9UkRgk: {
    title: "Calculations and readable f-strings",
    connection: "A study planner starts with counts and durations, calculates a result, then presents it to a learner. Keep those three jobs separate: inputs are data, multiplication is computation, and the f-string is presentation.",
    walkthrough: ["lessons = 3 sets the number of lessons to study.", "lessons * 20 calculates 60 and assigns that result to minutes. Updating lessons later does not automatically recalculate minutes.", "The f-string evaluates {minutes} and produces Study time: 60 minutes. The expression is evaluated when this line runs."],
    mistake: "Dynamic typing does not mean all types work with every operator. Adding text to a number needs an intentional conversion or formatting operation.",
    remember: "Calculate with numeric values; format the finished result into text for the user.",
  },
  G5QGywXpj9w: {
    title: "Reading characters with indices and slices",
    connection: "Number the letters in Python as P=0, y=1, t=2, h=3, o=4 and n=5. An index asks for one position; a slice asks for a range. This same convention appears in lists and many data-processing libraries.",
    walkthrough: ["topic stores the six-character string Python.", "topic[0] selects P because indexing starts at zero.", "topic[0:3] selects indices 0, 1 and 2, producing Pyt. The stop index 3 is excluded."],
    mistake: "Indexing an empty string or an out-of-range position raises IndexError. Slicing is more forgiving, but it still uses an exclusive stop.",
    remember: "Index = one item. Slice = a range from start up to, but not including, stop.",
  },
  gW5MzrWcBf4: {
    title: "Cleaning strings without changing the original",
    connection: "User-entered names often contain extra spaces or inconsistent case. Normalization makes comparisons more consistent, but you should decide which changes are appropriate: lowercasing a comparison key is different from altering someone's displayed name.",
    walkthrough: ["message contains leading and trailing spaces around Hello Python.", "strip returns Hello Python without the surrounding whitespace. It does not remove the space between the words.", "lower returns hello python. The final value is assigned to clean; message still contains its original text."],
    mistake: "Calling a string method does not mutate the original string. Store or use its returned value.",
    remember: "Strings are immutable. Cleaning operations produce new strings.",
  },
  "X-uPZ2mcJ-4": {
    title: "Lists: ordered collections you can update",
    connection: "A learning plan is an ordered sequence of tasks. A list is a natural fit when you need to keep that order and add or remove tasks as the plan changes. The list itself can be modified.",
    walkthrough: ["topics begins with Python at index 0 and AI at index 1.", "append adds Cloud as one new final item. The existing topics list is changed in place.", "topics[0] still reads Python; printing topics shows all three items in their current order."],
    mistake: "append returns None. Writing topics = topics.append('Cloud') replaces your list variable with None.",
    remember: "Use a list for ordered items that may change; use append without assigning its return value.",
  },
  I_moN3K5xkg: {
    title: "Tuples and unpacking related values",
    connection: "Latitude and longitude belong together and their positions have meaning. A tuple groups those values in a fixed sequence. Unpacking gives each position a descriptive name, which is easier to read than repeating numeric indices.",
    walkthrough: ["location stores two values in the order latitude, longitude.", "latitude, longitude = location assigns the first item to latitude and the second to longitude.", "The print call displays 12.97 77.59. Unpacking requires the expected number of values unless you explicitly use starred unpacking."],
    mistake: "Tuple immutability means its positions cannot be reassigned. A mutable object inside a tuple can still have its own contents changed.",
    remember: "A tuple fixes a sequence's item positions; unpacking gives those positions meaningful names.",
  },
  "04Zd7zDB_b0": {
    title: "Dictionaries: retrieving data by meaning",
    connection: "A profile is clearer when values have labels such as name and day. A dictionary connects each key to its value. Choose direct lookup for required fields and a deliberate default when a field is optional.",
    walkthrough: ["learner contains the keys name and day with different value types.", "learner['name'] retrieves Anu. This lookup would raise KeyError if name were missing.", "get('goal', 'Not set') returns Not set because no goal key exists. It does not add the missing key to the dictionary."],
    mistake: "A fallback should not hide a required missing field. Use validation when the application cannot work without a value.",
    remember: "Dictionary keys explain what a value represents; required and optional lookups need different handling.",
  },
  IujALR4FNMw: {
    title: "Sets: membership and unique values",
    connection: "If a learner enters Python twice, a unique-skills collection should still count it once. Sets model this requirement directly. They also make comparisons between groups, such as shared skills, easy to express.",
    walkthrough: ["The repeated Python value is stored only once, so the skills set contains two distinct items.", "len(skills) therefore displays 2, not 3.", "The membership test checks whether Python belongs to the set and displays True. It does not ask for a particular position."],
    mistake: "Sets are not ordered sequences. Do not index them or depend on a particular printed order; sort explicitly when needed.",
    remember: "Use a set when uniqueness or membership matters more than position.",
  },
  Ok6I2uc98EY: {
    title: "Conditions: choosing exactly one branch",
    connection: "A grading rule is a decision table. Check the strongest condition first, then less demanding conditions. In an if/elif/else chain, only the first matching branch runs, so order changes the result.",
    walkthrough: ["With score = 75, score >= 80 is false, so the first print is skipped.", "score >= 50 is true, so Python prints Keep practising.", "The else branch is skipped because a previous branch matched. Try scores 80, 50 and 49 to inspect the boundaries."],
    mistake: "Separate if statements can each run. An if/elif chain behaves differently and is useful when categories must be exclusive.",
    remember: "Write conditions in the intended priority order and test values exactly at each boundary.",
  },
  S35flQyorX8: {
    title: "Nested decisions and application access",
    connection: "An application may need two checks: is the user signed in, and is the user a student? A nested decision reaches the second question only after passing the first. This makes the decision path visible.",
    walkthrough: ["logged_in and is_student are both True in the example.", "Python enters the outer block because the sign-in check succeeds.", "The inner check also succeeds and prints Welcome, learner! Change either flag to see why a distinct else message is needed."],
    mistake: "A user-interface boolean is not real authentication or authorization. Production access checks must be enforced by trusted application logic.",
    remember: "Nested conditions model dependent decisions; each denied path should have an understandable outcome.",
  },
  "4D63snzuu0U": {
    title: "For loops: one action per item",
    connection: "A repeated print statement becomes hard to maintain as a plan grows. A for loop says what to do for every item, leaving the collection to decide how many repetitions are needed.",
    walkthrough: ["topics contains three items in order.", "On each iteration, topic refers to the next item: Python, then AI, then Cloud.", "The indented print runs once for each item and produces three lines. An empty list produces no lines."],
    mistake: "Indentation controls what repeats. A statement outside the loop executes once after the loop instead of once per item.",
    remember: "Trace the current item and the changing result for each iteration.",
  },
  h3mCxnJvwVQ: {
    title: "While loops and nested repetition",
    connection: "A while loop is useful when repetition depends on a changing condition rather than a fixed collection. Treat it as a small state machine: initial state, test, work, update, and eventual stop.",
    walkthrough: ["day starts at 1, so day <= 3 is true and Day 1 is printed.", "day += 1 changes the state; the same steps print Day 2 and Day 3.", "After the third update, day becomes 4. The next condition is false and the loop ends."],
    mistake: "Forgetting the update can create an infinite loop. For nested loops, count inner work for every outer iteration.",
    remember: "Every while loop needs a reason its condition will become false or an explicit bounded exit.",
  },
  m4MMiwaFfSk: {
    title: "Turning a library action into a function",
    connection: "A library manager has several separate responsibilities: storing books, displaying them, and handling user choices. Give each action a clear function boundary so it can be reused and tested independently.",
    walkthrough: ["def creates show_books but does not yet display any books.", "The call supplies a two-item list as the books argument.", "The function loops through that supplied list and prints each title. Passing another list reuses the same action without rewriting it."],
    mistake: "Defining a function is not the same as calling it. Avoid mixing every library action into one large function.",
    remember: "A function should name one clear task and accept the data that task needs.",
  },
  "4FLwPm0oeFs": {
    title: "Function parameters and returned results",
    connection: "A calculator function should compute a result rather than decide how it is displayed. Returning a value lets the caller print it, store it, or use it in a later calculation. This separation makes testing easier.",
    walkthrough: ["The call passes 3 into lessons and 20 into minutes.", "The function calculates 3 * 20 and returns 60 to the caller.", "The outer print displays the returned value. Call the function with different inputs without changing its implementation."],
    mistake: "Printing inside a function does not return the printed value. A function without an explicit return normally returns None.",
    remember: "Parameters bring values in; return sends a result out.",
  },
  xVYGt9f_fXI: {
    title: "Expected failures and explicit recovery",
    connection: "Text entered by a user cannot always be converted to a number. Handle that expected failure with a useful message while allowing unrelated programming errors to remain visible. Cleanup belongs in finally or a context manager.",
    walkthrough: ["int('hello') cannot produce an integer and raises ValueError.", "The matching except block prints Please enter a whole number.", "finally prints Finished regardless of success or failure. With a valid numeric string, the except block is skipped but finally still runs."],
    mistake: "Catching every exception can hide bugs. Catch the specific errors the operation is expected to raise.",
    remember: "Use precise exception handling to explain expected failures, not to disguise unexpected ones.",
  },
  "_aIR0xvNj-0": {
    title: "Files: storing data beyond a program run",
    connection: "Variables disappear when a program exits. A text file can retain a learning goal for the next run. File mode is an important part of the operation because reading, replacing and appending have different consequences.",
    walkthrough: ["The first with block opens goal.txt in write mode and writes Learn Python.", "Exiting the block closes the file even if an exception occurs inside it.", "The second block opens the file for reading and displays the saved text. The path is relative to the process's working directory."],
    mistake: "Write mode replaces existing contents. Use a dedicated practice filename; never experiment with a file you need to preserve.",
    remember: "Choose the path, mode and encoding deliberately; use with to manage the open file.",
  },
  LgBUgm7_8mM: {
    title: "Modules, packages and reusable tools",
    connection: "A module puts reusable definitions in one place. The standard library already provides many common operations, so reuse a tested function instead of recreating it unnecessarily. External packages require separate installation.",
    walkthrough: ["import math loads the standard-library module and makes its name available.", "math.sqrt selects the square-root function from that module.", "sqrt(25) returns 5.0. The module prefix tells readers where the function comes from."],
    mistake: "Do not name a local file math.py when importing the standard math module; local naming can shadow the intended module.",
    remember: "Import exposes reusable definitions; installation and import are separate operations.",
  },
  ZeP3sXlUpFE: {
    title: "Classes and independent object state",
    connection: "A learner record combines data with actions that use that data. A class describes the structure; each object has its own attributes. Two learner objects should be able to hold different names independently.",
    walkthrough: ["Calling Learner('Anu') creates an object and initializes its name attribute.", "Inside methods, self refers to that particular object, so self.name reads its stored name.", "greet prints Hello, Anu. Create Learner('Ravi') separately to see that the two objects retain different names."],
    mistake: "self is not all objects at once. Be careful with shared mutable class attributes when you intend per-object data.",
    remember: "Class = definition. Object = instance. Attribute = state. Method = behaviour.",
  },
  AsG8BNTmyuY: {
    title: "Inheritance and method overriding",
    connection: "Different learner types can share a common interface while supplying different behaviour. Inheritance reuses a parent definition; overriding replaces a particular inherited method for a child class.",
    walkthrough: ["Learner defines the general goal method returning Keep learning.", "AILearner inherits from Learner but defines its own goal method.", "Calling goal on an AILearner returns Build an AI app. The same method name can produce different behaviour for different objects."],
    mistake: "Inheritance should express a genuine 'is a' relationship. Do not use it only to borrow unrelated code.",
    remember: "Polymorphism lets a common operation work with different implementations.",
  },
  BPZvNcoSoZI: {
    title: "A clear interface around object details",
    connection: "A course can expose its title without making callers depend on how the title is stored. Properties offer an attribute-like interface that can later include validation. This is a design boundary, not an encryption mechanism.",
    walkthrough: ["The constructor stores the supplied title in _title.", "The property method returns that value when a caller reads course.title.", "The example prints Python without calling title as a function. No setter is defined, so assignment through this property is not supported."],
    mistake: "A leading underscore is a convention, not strict privacy. Encapsulation does not protect secret data from code with access to the process.",
    remember: "Expose a small, meaningful interface and keep callers independent of unnecessary implementation details.",
  },
  a6MVlRKdDog: {
    title: "A Streamlit input-to-output interaction",
    connection: "A widget connects a user's choice to a Python value. Streamlit commonly reruns the script when interaction changes, so separate durable state from values recomputed on each run. Begin with a simple input and displayed result.",
    walkthrough: ["text_input displays a field and returns its current text value.", "An empty string is false in the if condition, so no greeting is shown initially.", "Entering Anu makes the condition true and displays Hello, Anu! Start the script with streamlit run app.py, not a browser HTML file."],
    mistake: "Script reruns can repeat side effects. Do not put uncontrolled paid API calls or destructive actions directly on every rerun.",
    remember: "Widgets produce values; Python uses those values to decide what the interface displays.",
  },
  "9GSPegvMuUQ": {
    title: "Type hints as an explicit contract",
    connection: "A function signature is easier to understand when it says what comes in and what goes out. Type hints support editors and static checks. User input still needs validation when the program actually runs.",
    walkthrough: ["name: str documents that the function expects text.", "-> str documents that the greeting result is text.", "The call returns Hello, Anu. Ordinary annotations alone do not reject other runtime values."],
    mistake: "A type annotation is not automatic runtime validation. Do not rely on it to reject unsafe or malformed input.",
    remember: "Type hints describe intent; static tools and runtime validation enforce different kinds of checks.",
  },
  x2lawyHyLMM: {
    title: "Validating data with a Pydantic model",
    connection: "External data may have missing fields or unexpected types. A model gives that data a defined shape before application logic uses it. Field types and business constraints are separate decisions.",
    walkthrough: ["Learner declares a required text name and integer day.", "Creating the model validates the supplied values according to Pydantic's configuration; some values may be converted rather than rejected.", "learner.name reads the validated field. Add constraints explicitly if day must be positive or name must be non-empty."],
    mistake: "A field annotated as int does not by itself mean a positive integer. Add constraints and handle ValidationError explicitly.",
    remember: "Validate structure and business rules before trusting incoming data.",
  },
};

export function getPythonStudyGuide(videoId: string): StudyGuide {
  const guide = pythonStudyGuides[videoId];
  if (!guide) throw new Error(`Missing Python study guide: ${videoId}`);
  return guide;
}

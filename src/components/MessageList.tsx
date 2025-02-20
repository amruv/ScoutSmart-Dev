import { cn } from "@/lib/utils";
import { PlayerNameCarousel } from "@/components/PlayerNameCarousel";
import type { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
}

// Female Players (100)
const FEMALE_PLAYERS = [
  "Marta", "Megan Rapinoe", "Alex Morgan", "Sam Kerr", "Ada Hegerberg",
  "Wendie Renard", "Lucy Bronze", "Vivianne Miedema", "Alexia Putellas", "Pernille Harder",
  "Christine Sinclair", "Birgit Prinz", "Homare Sawa", "Abby Wambach", "Michelle Akers",
  "Sun Wen", "Mia Hamm", "Carli Lloyd", "Beth Mead", "Mary Earps",
  "Asisat Oshoala", "Caroline Graham Hansen", "Dzsenifer Marozsán", "Amandine Henry", "Lena Oberdorf",
  "Aitana Bonmatí", "Keira Walsh", "Lauren James", "Trinity Rodman", "Rose Lavelle",
  "Chloe Kelly", "Ella Toone", "Rachel Daly", "Georgia Stanway", "Millie Bright",
  "Alexandra Popp", "Lena Goeßling", "Sara Däbritz", "Svenja Huth", "Merle Frohms",
  "Marie-Antoinette Katoto", "Kadidiatou Diani", "Grace Geyoro", "Sakina Karchaoui", "Delphine Cascarino",
  "Jennifer Hermoso", "Irene Paredes", "Patricia Guijarro", "Mariona Caldentey", "Sandra Paños",
  "Kosovare Asllani", "Magdalena Eriksson", "Sofia Jakobsson", "Fridolina Rolfö", "Hedvig Lindahl",
  "Saki Kumagai", "Mana Iwabuchi", "Yui Hasegawa", "Risa Shimizu", "Hina Sugita",
  "Christiane Endler", "Debinha", "Formiga", "Tamires", "Andressa Alves",
  "Ji So-yun", "Cho So-hyun", "Lee Geum-min", "Kim Jung-mi", "Jang Sel-gi",
  "Steph Catley", "Ellie Carpenter", "Caitlin Foord", "Hayley Raso", "Emily van Egmond",
  "Janine Beckie", "Jessie Fleming", "Ashley Lawrence", "Kadeisha Buchanan", "Jordyn Huitema",
  "Barbara Bonansea", "Sara Gama", "Cristiana Girelli", "Laura Giuliani", "Valentina Giacinti",
  "Caroline Seger", "Stina Blackstenius", "Nilla Fischer", "Linda Sembrant", "Olivia Schough",
  "Sherida Spitse", "Lieke Martens", "Jackie Groenen", "Daniëlle van de Donk", "Stefanie van der Gragt",
  "Wang Shuang", "Wu Haiyan", "Zhang Rui", "Peng Shimeng", "Tang Jiali"
];

// Male Players (900)
const MALE_PLAYERS = [
  // Male Players (900)
  "Lionel Messi", "Cristiano Ronaldo", "Pelé", "Diego Maradona", "Johan Cruyff",
  "Franz Beckenbauer", "Zinedine Zidane", "Ronaldo Nazário", "Ronaldinho", "Eusébio",
  "Alfredo Di Stéfano", "Michel Platini", "Marco van Basten", "George Best", "Roberto Baggio",
  "Paolo Maldini", "Lev Yashin", "Garrincha", "Ferenc Puskás", "Gerd Müller",
  "Erling Haaland", "Kylian Mbappé", "Robert Lewandowski", "Mohamed Salah", "Kevin De Bruyne",
  "Virgil van Dijk", "Karim Benzema", "Luka Modrić", "Neymar Jr.", "Manuel Neuer",
  "Thierry Henry", "Xavi", "Andrés Iniesta", "Cafu", "Roberto Carlos",
  "Fabio Cannavaro", "Oliver Kahn", "Gianluigi Buffon", "Peter Schmeichel", "Iker Casillas",
  "Rio Ferdinand", "John Terry", "Carles Puyol", "Nemanja Vidić", "Ashley Cole",
  "Steven Gerrard", "Frank Lampard", "Paul Scholes", "Patrick Vieira", "Claude Makélélé",
  "Javier Zanetti", "Pavel Nedvěd", "Michael Ballack", "Ruud van Nistelrooy", "Raúl",
  "Ryan Giggs", "Kenny Dalglish", "Zlatan Ibrahimović", "Sócrates", "Romário",
  "George Weah", "Hristo Stoichkov", "Roger Milla", "Samuel Eto'o", "Didier Drogba",
  "Yaya Touré", "Jay-Jay Okocha", "Nwankwo Kanu", "Michael Essien", "Sadio Mané",
  "George Eastham", "Laurie Cunningham", "Cyril Regis", "Brendon Batson", "Viv Anderson",
  "Mark Walters", "Paul Ince", "Des Walker", "Chris Waddle", "John Barnes",
  "Ian Wright", "Andy Cole", "Les Ferdinand", "Sol Campbell", "David James",
  "Emile Heskey", "Trevor Sinclair", "Danny Mills", "Gareth Southgate", "Rio Ferdinand",
  "Kieron Dyer", "Jermaine Jenas", "Ledley King", "David Beckham", "Michael Owen",
  "Wayne Rooney", "Frank Lampard", "Steven Gerrard", "Joe Cole", "Ashley Cole",
  "John Terry", "Gary Neville", "Jamie Carragher", "Paul Scholes", "Phil Neville",
  "Nicky Butt", "Wes Brown", "Owen Hargreaves", "David Seaman", "Peter Crouch",
  "Jermain Defoe", "Aaron Lennon", "Theo Walcott", "Stewart Downing", "Shaun Wright-Phillips",
  "Micah Richards", "Gabriel Agbonlahor", "James Milner", "Scott Parker", "Tom Huddlestone",
  "Darren Bent", "Michael Dawson", "Robert Green", "Glen Johnson", "Ashley Young",
  "Leighton Baines", "Phil Jagielka", "Joleon Lescott", "Gareth Barry", "Adam Johnson",
  "Joe Hart", "Andy Carroll", "Peter Odemwingie", "Grant Holt", "Leon Osman",
  "Danny Welbeck", "Daniel Sturridge", "Rickie Lambert", "Jay Rodriguez", "Ross Barkley",
  "Raheem Sterling", "Jordan Henderson", "Adam Lallana", "Gary Cahill", "Chris Smalling",
  "Phil Jones", "Kyle Walker", "Danny Rose", "Andros Townsend", "Dele Alli",
  "Harry Kane", "Jamie Vardy", "Eric Dier", "Marcus Rashford", "Jesse Lingard",
  "Jordan Pickford", "Kieran Trippier", "Harry Maguire", "John Stones", "Raheem Sterling",
  "Declan Rice", "Mason Mount", "Jadon Sancho", "Dominic Calvert-Lewin", "Jack Grealish",
  "Bukayo Saka", "Phil Foden", "Trent Alexander-Arnold", "Reece James", "Ben Chilwell",
  "Luke Shaw", "Kalvin Phillips", "Jordan Henderson", "Marcus Rashford", "Jude Bellingham",
  "Harry Kane", "Kylian Mbappé", "Erling Haaland", "Kevin De Bruyne", "Mohamed Salah",
  "Sadio Mané", "Neymar Jr.", "Robert Lewandowski", "Virgil van Dijk", "Alisson Becker",
  "Sergio Ramos", "Thiago Silva", "Antoine Griezmann", "Eden Hazard", "Paul Pogba",
  "Paulo Dybala", "Romelu Lukaku", "Christian Eriksen", "Son Heung-min", "Casemiro",
  "Toni Kroos", "David Alaba", "Leonardo Bonucci", "Giorgio Chiellini", "Luis Suárez",
  "Edinson Cavani", "Ángel Di María", "Sergio Agüero", "Gonzalo Higuaín", "Arturo Vidal",
  "Alexis Sánchez", "James Rodríguez", "Radamel Falcao", "Philippe Coutinho", "Miralem Pjanić",
  "Ivan Rakitić", "Jan Oblak", "Marc-André ter Stegen", "Keylor Navas", "Hugo Lloris",
  "Samir Handanović", "Wojciech Szczęsny", "Ederson", "Thibaut Courtois", "David de Gea",
  "Manuel Neuer", "Gianluigi Donnarumma", "Petr Čech", "Edwin van der Sar", "Jens Lehmann",
  "Dida", "Júlio César", "Víctor Valdés", "Pepe Reina", "Roberto Ayala",
  "Walter Samuel", "Lúcio", "Javier Mascherano", "Gerard Piqué", "Mats Hummels",
  "David Luiz", "Vincent Kompany", "Diego Godín", "Miranda", "Thiago Silva",
  "Marcelo", "Dani Alves", "Philipp Lahm", "Bastian Schweinsteiger", "Xabi Alonso",
  "Andrea Pirlo", "Clarence Seedorf", "Wesley Sneijder", "Frank Rijkaard", "Ruud Gullit",
  "Frank de Boer", "Dennis Bergkamp", "Patrick Kluivert", "Edgar Davids", "Giovanni van Bronckhorst",
  "Arjen Robben", "Robin van Persie", "Rafael van der Vaart", "Dirk Kuyt", "Mark van Bommel",
  "Wesley Sneijder", "Arjen Robben", "Robin van Persie", "Rafael van der Vaart", "Dirk Kuyt",
  "Mark van Bommel", "Giovanni van Bronckhorst", "Edgar Davids", "Patrick Kluivert", "Dennis Bergkamp",
  "Frank de Boer", "Ruud Gullit", "Frank Rijkaard", "Clarence Seedorf", "Andrea Pirlo",
  "Xabi Alonso", "Bastian Schweinsteiger", "Philipp Lahm", "Dani Alves", "Marcelo",
  "Thiago Silva", "Miranda", "Diego Godín", "Vincent Kompany", "David Luiz",
  "Mats Hummels", "Gerard Piqué", "Javier Mascherano", "Lúcio", "Walter Samuel",
  "Roberto Ayala", "Pepe Reina", "Víctor Valdés", "Júlio César", "Dida",
  "Jens Lehmann", "Edwin van der Sar", "Petr Čech", "Gianluigi Donnarumma", "Manuel Neuer",
  "David de Gea", "Thibaut Courtois", "Ederson", "Wojciech Szczęsny", "Samir Handanović",
  "Hugo Lloris", "Keylor Navas", "Marc-André ter Stegen", "Jan Oblak", "Ivan Rakitić",
  "Miralem Pjanić", "Philippe Coutinho", "Radamel Falcao", "James Rodríguez", "Alexis Sánchez",
  "Arturo Vidal", "Gonzalo Higuaín", "Sergio Agüero", "Ángel Di María", "Edinson Cavani",
  "Luis Suárez", "Giorgio Chiellini", "Leonardo Bonucci", "David Alaba", "Toni Kroos",
  "Casemiro", "Son Heung-min", "Christian Eriksen", "Romelu Lukaku", "Paulo Dybala",
  "Paul Pogba", "Eden Hazard", "Antoine Griezmann", "Thiago Silva", "Sergio Ramos",
  "Alisson Becker", "Virgil van Dijk", "Robert Lewandowski", "Neymar Jr.", "Sadio Mané",
    "Alan Shearer", "Teddy Sheringham", "Les Ferdinand", "Robbie Fowler", "Michael Owen",
    "Emile Heskey", "Andy Cole", "Dwight Yorke", "Jimmy Floyd Hasselbaink", "Ruud van Nistelrooy",
    "Thierry Henry", "Dennis Bergkamp", "Patrick Vieira", "Freddie Ljungberg", "Robert Pires",
    "Ashley Cole", "Sol Campbell", "Kolo Touré", "Jens Lehmann", "David Seaman",
    "Tony Adams", "Martin Keown", "Nigel Winterburn", "Lee Dixon", "Ray Parlour",
    "Emmanuel Petit", "Gilles Grimandi", "Sylvain Wiltord", "Lauren", "Pascal Cygan",
    "Gaël Clichy", "Cesc Fàbregas", "Robin van Persie", "Samir Nasri", "Alexandre Song",
    "Bacary Sagna", "Thomas Vermaelen", "Laurent Koscielny", "Per Mertesacker", "Lukasz Fabianski",
    "Wojciech Szczęsny", "Manuel Almunia", "Jens Lehmann", "David Ospina", "Petr Čech",
    "Bernd Leno", "Aaron Ramsdale", "David Raya", "Arthur Okonkwo", "Karl Hein",
    "James Beattie", "Kevin Davies", "Peter Crouch", "Bobby Zamora", "Darren Bent",
    "Gabriel Agbonlahor", "Kenwyne Jones", "Marlon Harewood", "Craig Bellamy", "Louis Saha",
    "Yakubu Aiyegbeni", "Michael Chopra", "Benjani Mwaruwari", "Ricardo Fuller", "Fraizer Campbell",
    "DJ Campbell", "Grant Holt", "Peter Odemwingie", "Demba Ba", "Papiss Cissé",
    "Rickie Lambert", "Jay Rodriguez", "Danny Ings", "Charlie Austin", "Glenn Murray",
    "Jamie Vardy", "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin",
    "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa",
    "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke",
    "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe",
    "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert",
    "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson",
    "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi",
    "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen",
    "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge",
    "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez",
    "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray",
    "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak",
    "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise",
    "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck",
    "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell",
    "Jay Rodriguez", "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney",
    "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney",
    "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze",
    "Michael Olise", "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe",
    "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham",
    "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert", "Charlie Austin", "Glenn Murray",
    "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins",
    "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo",
    "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke", "Carlton Cole",
    "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe", "Andy Carroll",
    "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert", "Charlie Austin",
    "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin",
    "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa",
    "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke",
    "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe",
    "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert",
    "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson",
    "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi",
    "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen",
    "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge",
    "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez",
    "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray",
    "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak",
    "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise",
    "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck",
    "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell",
    "Jay Rodriguez", "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney",
    "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney",
    "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze",
    "Michael Olise", "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe",
    "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham",
    "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert", "Charlie Austin", "Glenn Murray",
    "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins",
    "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo",
    "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke", "Carlton Cole",
    "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe", "Andy Carroll",
    "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert", "Charlie Austin",
    "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin",
    "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa",
    "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke",
    "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe",
    "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert",
    "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson",
    "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi",
    "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen",
    "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge",
    "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez",
    "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray",
    "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak",
    "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise",
    "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck",
    "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell",
    "Jay Rodriguez", "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney",
    "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney",
    "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze",
    "Michael Olise", "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe",
    "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham",
    "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert", "Charlie Austin", "Glenn Murray",
    "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins",
    "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo",
    "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke", "Carlton Cole",
    "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe", "Andy Carroll",
    "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert", "Charlie Austin",
    "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson", "Dominic Calvert-Lewin",
    "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi", "Yoane Wissa",
    "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen", "Dominic Solanke",
    "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge", "Jermain Defoe",
    "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez", "Rickie Lambert",
    "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray", "Callum Wilson",
    "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak", "Taiwo Awoniyi",
    "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise", "Jarrod Bowen",
    "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck", "Daniel Sturridge",
    "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell", "Jay Rodriguez",
    "Rickie Lambert", "Charlie Austin", "Glenn Murray", "Troy Deeney", "Andre Gray",
    "Callum Wilson", "Dominic Calvert-Lewin", "Ollie Watkins", "Ivan Toney", "Alexander Isak",
    "Taiwo Awoniyi", "Yoane Wissa", "Bryan Mbeumo", "Eberechi Eze", "Michael Olise",
    "Jarrod Bowen", "Dominic Solanke", "Carlton Cole", "Victor Anichebe", "Danny Welbeck",
    "Daniel Sturridge", "Jermain Defoe", "Andy Carroll", "Connor Wickham", "Fraizer Campbell",
    "Jay Rodriguez", "Rickie Lambert",
];

const LEGENDARY_PLAYERS = [...MALE_PLAYERS, ...FEMALE_PLAYERS];

export const MessageList = ({ messages, isDarkMode }: MessageListProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "p-4 rounded-lg animate-fade-in",
              msg.isUser ? "bg-black text-white ml-auto" : isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}
            style={{ maxWidth: "85%" }}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))
      ) : (
        <div className="text-center mt-8">
          <div className={cn(
            "flex flex-col items-center justify-center gap-4",
            isDarkMode ? "text-white" : "text-gray-600"
          )}>
            <p className="text-lg">Which baller will you find who'll turn out to be the next...</p>
            <PlayerNameCarousel players={LEGENDARY_PLAYERS} />
          </div>
        </div>
      )}
    </div>
  );
};

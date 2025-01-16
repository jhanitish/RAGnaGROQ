import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { eduSearch, leetcode, ats,
  petNutrition,
  summarizer, } from '../images';
import StyleSwitcher from '../components/StyleSwitcher';

const HomePage = () => {
    const switcherColor = useSelector((state) => state.color.switcherColor);
    const skinColor = useSelector((state) => state.color.skinColor);

    const pages = [
      {
        title: 'Leetcode Assistant',
        route: '/leetcode-bot',
        description: 'Leetcode Gen AI Assistant using Mixtral-8x7b-32768',
        imageUrl: leetcode,
        status: 'available',
      },
      {
        title: 'Search Engine',
        route: '/search-engine',
        description: 'Educational Gen AI Assistant using Llama3-8b-8192',
        imageUrl: eduSearch,
        status: 'available',
      },
      {
        title: 'PDF Text Summerisation',
        route: '/text-summerize',
        description: 'Text Summerization Assistant',
        imageUrl: summarizer,
        status: 'Work In Progress',
      },
      {
        title: 'ATS Resume Assistant',
        route: '/ats',
        description: 'ATS Resume Checker',
        imageUrl: ats,
        status: 'Coming Soon',
      },
      {
        title: 'Pets Nutrition Assistant',
        route: '/pet-nutrition',
        description: 'Pets Nutrition Assistant',
        imageUrl: petNutrition,
        status: 'Coming Soon',
      },
    ];

  return (
    <div
      className={`${skinColor === "dark" ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen p-2 flex flex-col`}
    >
      <StyleSwitcher />
      <header className="p-8 mt-6 text-center text-6xl font-bold ">
        <span className={clsx(
            `${skinColor}`,
                `text-${switcherColor}`,
                `border-${switcherColor}`,
                `text-blue border-blue`
              )}>RAG</span>
              <span className={clsx(
                  `${skinColor}`,`glow`
              )}>na</span>
              <span className={clsx(
                  `${skinColor}`,
                `text-${switcherColor}`,
                `border-${switcherColor}`,
                `text-blue border-blue`
              )}>GROQ</span>
          <br />
          <h2 className=""
              className={clsx(
                `${skinColor} subHeading`,
            )}
          >
            Retrieval Augmented Generation with state-of-the-art Groq hardware
          </h2>
      </header>
      {/* Cards Section */}
      <div className="flex justify-center items-center flex-grow">
        <div className="flex flex-wrap gap-4 justify-center p-8">
          {pages.map((page, index) => (
            <div
              key={index}
              className={clsx(
                  `${skinColor}`,
                `text-${switcherColor}`,
                `border-${switcherColor}`,
                `text-blue border-blue relative w-[320px] h-[230px] overflow-hidden rounded-lg shadow-md border border-2 ${
                    page.status === 'comingSoon' ? 'cursor-not-allowed' : 'hover:shadow-xl'
                  }`
              )}
            >
              {page.status === 'available' ? (
                <Link to={page.route} className="block">
                  <div className="relative w-full h-full">
                    {/* Image */}
                    <img
                      src={page.imageUrl}
                      alt={page.title}
                      className="w-full h-[150px] object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </Link>
              ) : (
                <div className="block">
                  <div className="relative w-full h-full">
                    {/* Image with Blur */}
                    <img
                      src={page.imageUrl}
                      alt={page.title}
                      className="w-full h-[150px] object-cover opacity-50"
                    />
                    {/* Overlay for Work in Progress */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Text Container with Red Blurred Background */}
                      <div className={clsx(
                          `bg-${switcherColor}-500`,
                          `relative px-4 py-2 bg-opacity-40 backdrop-blur-lg rounded-md`
                        )}
                      >
                        <p
                          className={clsx(
                            `text-${switcherColor}`,
                            `border-${switcherColor}`,
                            `text-blue font-semibold text-lg transform scale-100 transition-transform duration-300 hover:scale-110`
                          )}
                        >
                          {page.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


              )}
              {/* Description */}
              <div className={clsx(
                    `text-${switcherColor}`,
                    `border-${switcherColor}`,
                    `flex text-blue border-blue bg-gray-800 h-[80px] text-sm font-bold p-3 text-center justify-center items-center`
                )}>
                {page.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={clsx(
            `text-${switcherColor}`,
            `border-${switcherColor}`,
            `text-blue border-blue p-4 text-center`
        )}
      >
        Made with ❤️ by <a href="https://www.linkedin.com/in/pingnitish/" rel="noreferrer" target="_blank">Nitish Jha</a>
      </footer>
    </div>
  );
};

export default HomePage;

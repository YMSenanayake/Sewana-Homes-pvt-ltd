import { assets } from "../assets/data";

const Testimonial = () => {
   const cardsData = [
     {
       image: assets.user2,
       name: 'Nadee Darshani',
       handle: '@Nadee Darshani',
       date: 'Sep 22, 2025',
       comment: 'මමත් ඕඩර් එකක් දැම්මා මේ වීඩියෝ එකේ කියන විදියටම මගේ පැල ටික ආවා ගොඩක් තැන්කියු ඉස්සරහටත් මම ගන්නවා....🌷🌷'
     },
  {
    image: assets.user1,
    name: 'Nethmi Gunawardena',
    handle: '@Nethmi Gunawardena',
    date: 'Sep 24, 2025',
    comment: 'Highly recommend.ඔයාලා එවපු plants ටික හොදටම තිබ්බා.Thank u.🙏🙏🙏'
  },
  {
    image: assets.user3,
    name: 'Gamage Tharushi Sathsarani ',
    handle: '@Gamage Tharushi Sathsarani ',
    date: 'Sep 21, 2025',
    comment: 'ඇත්තටම ඔයාගෙ ප්ලාන්ට්ස් ගොඩක් හොදයි. මල් වරදින්නෙත් නෑ දලු වරදින්නෙත් නෑ. ලස්සනට ගෙන්නුවට ලොකු බලාපොරොත්තුවක් තිබ්බෙ නෑ ඕඩර් කරල ගෙන්නන නිසා. ඒත් මන් ඔයාගෙ බිස්නස් එක highly recommend කරනවා.❤️❤️'
  },
  {
    image: assets.user4,
    name: 'Mayura Namal ',
    handle: '@Mayura Namal ',
    date: 'Sep 21, 2025',
    comment: 'ඉතාමත් විශ්වාසවන්ත සේවාවක් සපයන ස්ථානයක් තමයි . උත්තමාවී water lily'
  },
  {
    image: assets.user5,
    name: 'Lakmini Chathurika ',
    handle: '@Lakmini Chathurika ',
    date: 'Oct 25, 2025',
    comment: 'Math oyagr pela gaththa godak loku pela awala thibuna harima parisamat thank u'
  },
];


const cardsData1 = [
  {
    image: assets.user6,
    name: 'Briar Martin',
    handle: '@neilstellar',
    date: 'April 20, 2025',
    comment: 'Radiant helped us double our online engagement in just two weeks — truly impressive!'
  },
  {
    image: assets.user7,
    name: 'Avery Johnson',
    handle: '@averywrites',
    date: 'May 10, 2025',
    comment: 'Their team transformed our workflow. Everything feels smoother and faster now.'
  },
  {
    image: assets.user8,
    name: 'Jordan Lee',
    handle: '@jordantalks',
    date: 'June 5, 2025',
    comment: 'From design to delivery, Radiant nailed every detail. Highly recommended!'
  },
  {
    image: assets.user9,
    name: 'Lena Carter',
    handle: '@lenacreates',
    date: 'July 18, 2025',
    comment: 'We’ve tried multiple solutions, but Radiant’s service stands out — efficient and friendly.'
  },
  {
    image: assets.user10,
    name: 'Yasiru Senanayake',
    handle: '@yasiru_dev',
    date: 'August 2, 2025',
    comment: ''
  },
];


    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
            <div className="flex gap-2">
                <img className="size-11 rounded-full" src={card.image} alt="User Image" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p>{card.name}</p>
                        
                    </div>
                    <span className="text-xs text-slate-500">{card.handle}</span>
                </div>
            </div>

            <p className="text-sm py-4 text-gray-800">{card.comment}</p>

            <div className="flex items-center justify-between text-slate-500 text-xs">
                <div className="flex items-center gap-1">
                    <span>Posted on</span>
                    <a href="https://www.facebook.com/share/16MFDppkLT/" target="_blank" className="hover:text-sky-500">
                        <img src={assets.facebook} alt="" width={16}/>
                    </a>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
      <section className="max-padd-container py-16 xl:py-22">
        <>
            <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
              }
              
              .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
                }
                
                .marquee-reverse {
                  animation-direction: reverse;
                  }
                  `}</style>

            <div className="marquee-row overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                      <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                      <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </>
                    </section>
    )
}

export default Testimonial
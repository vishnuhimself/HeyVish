import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFF] dark:bg-black">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Profile Image */}
        <div className="flex justify-center">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
            <Image
              src="/Vish_DP.webp"
              alt="Srivishnu Ramakrishnan"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-3xl font-medium text-black dark:text-white">
              Srivishnu Ramakrishnan
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
          apps, domains, tiktok experiments. 
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 w-full">
          <Link
            href="https://x.com/VishHimself"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-200 text-sm font-medium"
          >
            <div className="relative w-3.5 h-3.5">
              <svg viewBox="0 0 300 300.251" className="w-full h-full fill-current">
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/>
              </svg>
            </div>
            <span>Follow</span>
          </Link>

          <Link
            href="mailto:hey@heyvish.com"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-200 text-sm font-medium"
          >
            <svg 
              className="w-3.5 h-3.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            <span>Email</span>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-200 text-sm font-medium"
          >
            <svg 
              className="w-3.5 h-3.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
              />
            </svg>
            <span>Blog</span>
          </Link>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 w-full">
          {/* <h2 className="text-sm font-medium text-muted-foreground">what i'm currently working on 👇</h2> */}
          <div className="space-y-3">
          <Link
            href="https://apps.apple.com/in/app/growthkit-track-height-weight/id6740914430"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-300 dark:border-gray-800 rounded-lg
                       hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src="/growthkit-logo.png"
                    alt="GrowthKit Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">GrowthKit</div>
                  <div className="text-xs text-muted-foreground">Track height & weight</div>
                </div>
              </div>
              <div className="bg-[#000] dark:bg-gray-800 text-white dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium">
                iOS
              </div>
            </div>
          </Link>

          <Link
            href="https://apps.apple.com/in/app/mood-tracker-journal-moosh/id6746203544"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-300 dark:border-gray-800 rounded-lg
                       hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src="/moosh-logo.png"
                    alt="Moosh Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">Moosh</div>
                  <div className="text-xs text-muted-foreground">Mood tracker & journal</div>
                </div>
              </div>
              <div className="bg-[#000] dark:bg-gray-800 text-white dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium">
                iOS
              </div>
            </div>
          </Link>

          <Link
            href="https://github.com/vishnuhimself/UGCVidGen"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-300 dark:border-gray-800 rounded-lg
                       hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src="/UGC Video Gen.png"
                    alt="UGC Video Generator Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">Bulk UGC Video Creator</div>
                  <div className="text-xs text-muted-foreground">Bulk Generate UGC Videos</div>
                </div>
              </div>
              <div className="bg-[#000] dark:bg-gray-800 text-white dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium">
                Open Source
              </div>
            </div>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

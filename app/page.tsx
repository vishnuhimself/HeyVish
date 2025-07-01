import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FBFBF9] dark:bg-black">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Profile Image */}
        <div className="flex justify-center">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
            <Image
              src="/Srivishnu-Social-DP-Small.PNG"
              alt="Srivishnu Ramakrishnan"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name with hover animation - isolated container */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-3xl font-medium group cursor-pointer flex items-baseline whitespace-nowrap px-1">
              <span className="inline-block align-baseline overflow-hidden max-w-0 group-hover:max-w-[3ch] transition-all duration-700 ease-out text-neutral-400">
                Sri
              </span>
              <span className="text-foreground align-baseline">vish</span>
              <span className="inline-block align-baseline overflow-hidden max-w-0 group-hover:max-w-[15ch] transition-all duration-700 ease-out text-neutral-400">
                nu Ramakrishnan
              </span>
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
          apps, domains, tiktok experiments. 
          </p>
        </div>

        {/* Follow on X */}
        <div className="w-full">
          <Link
            href="https://x.com/VishHimself"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-200 dark:border-gray-800 rounded-lg
                       hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-4 h-4">
                <svg viewBox="0 0 300 300.251" className="w-full h-full fill-current">
                  <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium">follow @vishhimself</div>
                <div className="text-xs text-muted-foreground">this is where i yap the most</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 w-full">
          <h2 className="text-sm font-medium text-muted-foreground">projects</h2>
          <div className="space-y-3">
          <Link
            href="https://apps.apple.com/in/app/growthkit-track-height-weight/id6740914430"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-200 dark:border-gray-800 rounded-lg
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
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium">
                iOS
              </div>
            </div>
          </Link>

          <Link
            href="https://apps.apple.com/in/app/mood-tracker-journal-moosh/id6746203544"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-200 dark:border-gray-800 rounded-lg
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
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium">
                iOS
              </div>
            </div>
          </Link>

          <Link
            href="https://github.com/vishnuhimself/UGCVidGen"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 border border-gray-200 dark:border-gray-800 rounded-lg
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
                  <div className="font-medium">UGC Video Generator</div>
                  <div className="text-xs text-muted-foreground">Bulk Generate UGC Videos</div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-md font-medium">
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

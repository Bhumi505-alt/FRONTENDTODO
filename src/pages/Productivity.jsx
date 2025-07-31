
import React from "react";
import { motion } from "framer-motion";

const techniques = [
  {
    title: "Pomodoro Technique",
    description: "Break work into 25-minute focus intervals followed by short breaks.",
    link: "https://en.wikipedia.org/wiki/Pomodoro_Technique",
  },
  {
    title: "Eisenhower Matrix",
    description: "Prioritize tasks by urgency and importance to focus on what truly matters.",
    link: "https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method",
  },
  {
    title: "Time Blocking",
    description: "Schedule your day into specific blocks dedicated to tasks or categories.",
    link: "https://en.wikipedia.org/wiki/Time_management#Time_blocking",
  },
  {
    title: "Deep Work",
    description: "Focus without distraction on cognitively demanding tasks for peak productivity.",
    link: "https://en.wikipedia.org/wiki/Deep_Work",
  },
  {
    title: "2-Minute Rule",
    description: "If something takes less than two minutes, do it right away.",
    link: "https://en.wikipedia.org/wiki/Getting_Things_Done",
  },
  {
    title: "Don’t Break the Chain",
    description: "Track daily progress and keep the streak going to build consistent habits.",
    link: "https://en.wikipedia.org/wiki/Jerry_Seinfeld#Productivity_method",
  },
  {
    title: "Eat That Frog",
    description: "Tackle the hardest, most important task first thing in the morning.",
    link: "https://en.wikipedia.org/wiki/Eat_That_Frog!",
  },
  {
    title: "Pareto Principle (80/20 Rule)",
    description: "Focus on the 20% of tasks that yield 80% of the results.",
    link: "https://en.wikipedia.org/wiki/Pareto_principle",
  },
  {
    title: "Parkinson’s Law",
    description: "Work expands to fill the time available — set tighter deadlines.",
    link: "https://en.wikipedia.org/wiki/Parkinson%27s_law",
  },
  {
    title: "Flow State",
    description: "Get into a highly focused mental state where you lose track of time.",
    link: "https://en.wikipedia.org/wiki/Flow_(psychology)",
  },
  {
    title: "SMART Goals",
    description: "Set Specific, Measurable, Achievable, Relevant, and Time-bound goals.",
    link: "https://en.wikipedia.org/wiki/SMART_criteria",
  },
  {
    title: "Ivy Lee Method",
    description: "Write down the 6 most important tasks to do the next day and tackle them in order.",
    link: "https://www.youtube.com/watch?v=KkaXNvzE4pk",
  },
  {
    title: "Notion Productivity Setup",
    description: "Use Notion to create dashboards for habit tracking, journaling, and planning.",
    link: "https://www.youtube.com/watch?v=QaFeU3c-9Ww",
  },
  {
    title: "Mind Mapping",
    description: "Visualize ideas and tasks to improve memory and planning.",
    link: "https://en.wikipedia.org/wiki/Mind_map",
  },
  {
    title: "Bullet Journaling",
    description: "A method to track the past, organize the present, and plan the future.",
    link: "https://en.wikipedia.org/wiki/Bullet_journal",
  },
  {
    title: "Digital Minimalism",
    description: "Limit digital distractions to reclaim time and focus.",
    link: "https://www.youtube.com/watch?v=3E7hkPZ-HTk",
  },
];

const Productivity = () => {
  return (
    <div className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        🚀 Productivity Boosters
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {techniques.map((technique, index) => (
          <motion.a
            key={index}
            href={technique.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">{technique.title}</h2>
            <p className="text-sm">{technique.description}</p>
            <p className="mt-2 text-sm text-blue-200 underline">
              Learn more
            </p>
          </motion.a>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-white/90 border-t border-white/20 pt-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <strong>Note from the maker:</strong> This app was built <span className="text-yellow-300 font-medium"></span> to help people manage tasks, build consistency, and stay motivated. The goal is to offer a simple, clean interface with impactful features to boost your productivity daily.
        </motion.p>
        <p className="mt-4 text-white/70">
          © {new Date().getFullYear()} Bhomik Khanna. All rights reserved. More features coming soon ✨
        </p>
      </footer>
    </div>
  );
};

export default Productivity;

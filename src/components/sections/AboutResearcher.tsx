import { motion } from 'framer-motion'
import { MapPin, Calendar, Award, Code, Database } from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/huy.ht.1302',
    icon: 'https://img.icons8.com/?size=100&id=118497&format=png&color=000000',
    color: 'hover:text-blue-600 dark:hover:text-blue-400'
  },
  {
    name: 'Twitter/X',
    url: 'https://x.com/huyht1302',
    icon: 'https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000',
    color: 'hover:text-blue-500 dark:hover:text-blue-300'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thanhhhuy_23/',
    icon: 'https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000',
    color: 'hover:text-pink-600 dark:hover:text-pink-400'
  }
  ,
  {
    name: 'GitHub',
    url: 'https://github.com/HuyHT130204',
    icon: 'https://img.icons8.com/?size=100&id=12598&format=png&color=000000',
    color: 'hover:text-gray-900 dark:hover:text-gray-100'
  }
]

const skills = [
  { name: 'Blockchain Development', level: 90 },
  { name: 'React & TypeScript', level: 95 },
  { name: 'Smart Contract Development', level: 85 },
  { name: 'Web3 Integration', level: 88 },
  { name: 'Data Analysis', level: 82 },
  { name: 'Research & Documentation', level: 90 }
]

const achievements = [
  {
    icon: Award,
    title: 'Blockchain Researcher',
    description: 'Specialized in Solana ecosystem analysis and state management solutions'
  },
  {
    icon: Code,
    title: 'Full-Stack Developer',
    description: 'Expert in modern web technologies and blockchain integration'
  },
  {
    icon: Database,
    title: 'Technical Writer',
    description: 'Creating comprehensive technical documentation and research papers'
  }
]

export default function AboutResearcher() {
  return (
    <section id="about-researcher" className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About the Researcher
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the blockchain researcher and developer behind this comprehensive analysis of Solana's state bloat problem.
          </p>
        </motion.div>

        {/* Main Profile Section - Single Integrated Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>

          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12">
              {/* Avatar & Basic Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <img
                  src="/avatar.jpg"
                  alt="Huy Ho Avatar"
                  className="w-40 h-40 rounded-full mx-auto lg:mx-0 mb-6 object-cover shadow-lg"
                />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Huy Ho
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium text-lg mb-4">
                  Blockchain Researcher & Developer
                </p>
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Vietnam</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Active since 2023</span>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="flex-1">
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                    I am a passionate blockchain researcher and full-stack developer with a deep interest in 
                    Solana ecosystem and state management solutions. With expertise in modern web technologies 
                    and blockchain development, I focus on creating comprehensive technical analyses and 
                    proposing innovative solutions to complex blockchain challenges.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    This research represents my commitment to advancing blockchain technology through 
                    rigorous analysis, data-driven insights, and practical solution proposals. I believe 
                    in the power of open research and collaborative development to drive innovation in 
                    the blockchain space.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Technical Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Focus Areas */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Research Focus Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="text-center group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {achievement.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Social Links & Contact */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Connect with me
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Interested in collaborating on blockchain research or discussing technical solutions? 
                Feel free to reach out through any of my social channels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 ${social.color}`}
                  >
                    <img
                      src={social.icon}
                      alt={`${social.name} icon`}
                      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
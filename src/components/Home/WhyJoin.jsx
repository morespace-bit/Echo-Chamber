import { motion } from "framer-motion";

export default function WhyJoin() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="h-250 md:h-150 mt-30 flex  flex-col md:flex-row md:justify-between gap-5  "
        id="community"
      >
        {/* left container */}
        <div>
          {/* the text container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex px-4  flex-col text-left mt-8 md:mt-40 md:w-"
          >
            <p className="font-semibold text-blue-500 md:text-xl">
              Why join us
            </p>
            <p className="font-semibold text-2xl md:text-3xl text-black">
              Why join our growing social media community!
            </p>
            <p className="font-serif mt-3 text-gray-600">
              Echo Chamber offers a refreshing take on social media—no politics,
              no toxic feeds, just genuine connections. Discover communities
              based on your interests, enjoy a clutter-free experience, and be
              part of a platform that values respectful conversation and real
              engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-left px-4 mt-10 mb-6"
          >
            <button className="text-xl text-left border-2 border-gray-200 py-2 px-6 rounded-2xl hover:bg-blue-500 hover:text-white duration-150 ease-in-out cursor-pointer hover:scale-105">
              Join our Community
            </button>
          </motion.div>
        </div>

        <div className="flex items-center flex-col gap-10">
          {/* meet new people */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="px-4 flex items-center justify-center gap-4 group"
          >
            <img
              src="message.png"
              alt=""
              className="w-20 group-hover:bg-blue-500 rounded-xl group-hover:p-4 duration-250 ease-in-out"
            />
            {/* text content */}
            <div className="flex justify-center flex-col text-left">
              <p className="text-2xl font-semibold font-sans group-hover:text-blue-500">
                Meet new non-toxic people
              </p>
              <p className="pt-4 font-serif text-gray-500">
                Here in this community you can find various people with various
                interest. You can engage in non-toxic intractive conversation.
                You can even find people with similar interest as you and have
                conversation.
              </p>
            </div>
          </motion.div>

          {/* vibe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="px-4 flex items-center justify-center gap-4 group"
          >
            <img
              src="socialvibes.png"
              alt=""
              className="w-20  group-hover:bg-blue-500 rounded-xl group-hover:p-4 duration-250 ease-in-out"
            />
            {/* text content */}
            <div className="flex justify-center flex-col text-left">
              <p className="text-2xl font-semibold font-sans group-hover:text-blue-500">
                Vibes is the most important
              </p>
              <p className="pt-4 font-serif text-gray-500">
                At Echo Chamber, it’s all about good vibes. Connect with people
                who share your interests and enjoy real, respectful
                conversations. No drama—just chill, engaging, and meaningful
                interactions.
              </p>
            </div>
          </motion.div>

          {/* peacefull env */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="px-4 flex items-center justify-center gap-4 group"
          >
            <img
              src="forpeace.png"
              alt=""
              className="w-20  group-hover:bg-blue-500 rounded-xl group-hover:p-4 duration-250 ease-in-out"
            />
            {/* text content */}
            <div className="flex justify-center flex-col text-left">
              <p className="text-2xl font-semibold font-sans group-hover:text-blue-500">
                Peaceful Interaction
              </p>
              <p className="pt-4 font-serif text-gray-500">
                Echo Chamber is built for calm, thoughtful exchanges. No
                shouting matches or trolling—just respectful conversations where
                everyone feels heard and valued.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

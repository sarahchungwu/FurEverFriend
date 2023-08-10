import LoginButton from '../../components/Login/LoginButton'
import RegisterButton from '../../components/Register/RegisterButton'
import { motion } from 'framer-motion'
function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-orange-50 min-h-screen p-20 bg-cover bg-cente w-full">
        <div className="mb-20 flex flex-col justify-start pl-6 ">
          <motion.h1
            className=" text-2xl text-yellow-900 pb-2"
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            UNITE{' '}
          </motion.h1>
          <motion.h1
            className="text-3xl text-yellow-900 pb-2"
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            IGNITE LIFELONG
          </motion.h1>
          <motion.h1
            className="text-4xl text-yellow-900"
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            FRIENDSHIPS.
          </motion.h1>
          <motion.img
            src="/image/Dog1.png"
            alt="dog image"
            initial={{ opacity: 0, translateY: -50, rotate: 0 }}
            animate={{ opacity: 1, translateY: 0, rotate: [-10, 10, -10, 10] }}
            transition={{ duration: 5, delay: 4 }}
          />
        </div>

        <div className="space-x-4 flex flex-row justify-center w-11/12">
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </>
  )
}

export default LandingPage

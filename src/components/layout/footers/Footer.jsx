import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { defaultFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { PureComponent } from 'react';

class Footer extends PureComponent {
  render() {
    return (
      <motion.section
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        className="px-5% pt-10 flex flex-col"
      >
        <div className="flex items-baseline gap-6 text-grey-txt">
          <a href="https://www.facebook.com/netflix/">
            <FacebookIcon fontSize="large" />
          </a>
          <a href="https://www.instagram.com/netflixasia/">
            <InstagramIcon fontSize="large" />
          </a>
          <a href="https://twitter.com/netflix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            <TwitterIcon fontSize="large" />
          </a>
          <a href="https://twitter.com/netflix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            <YouTubeIcon fontSize="large" />
          </a>
        </div>
        <ul className="flex flex-wrap w-full py-4 text-sm font-light text-grey-txt font-roboto">
          <li className="w-1/3 h-8 md:w-1/4">Audio & Subtitile</li>
          <li className="w-1/3 h-8 md:w-1/4">Audio Description</li>
          <li className="w-1/3 h-8 md:w-1/4">Help Center</li>
          <li className="w-1/3 h-8 md:w-1/4">Gift Cards</li>
          <li className="w-1/3 h-8 md:w-1/4">Media Center</li>
          <li className="w-1/3 h-8 md:w-1/4">Inverstor Ralations</li>
          <li className="w-1/3 h-8 md:w-1/4">Jobs</li>
          <li className="w-1/3 h-8 md:w-1/4">Term of use</li>
          <li className="w-1/3 h-8 md:w-1/4">Privacry</li>
          <li className="w-1/3 h-8 md:w-1/4">Legal Notice</li>
          <li className="w-1/3 h-8 md:w-1/4">Cookies Preferences</li>
          <li className="w-1/3 h-8 md:w-1/4">Coporate Information</li>
          <li className="w-1/3 h-8 md:w-1/4">Contact Us</li>
        </ul>
        <div className="px-2 text-sm font-light border border-solid rounded-sm py-2px border-grey-txt max-w-max text-grey-txt">
          Service Code
        </div>
        <div className="py-3 text-xs text-grey-txt">
          © 1977-{new Date().getFullYear()}, Inc. {'{hihi-haha-hihi-haha}'}
        </div>
      </motion.section>
    );
  }
}

export default Footer;

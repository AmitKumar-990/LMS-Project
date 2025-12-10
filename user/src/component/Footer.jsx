import { Link } from "react-router-dom";
import { Instagram, Linkedin, Github, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 pt-12 px-10 pb-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/src/assets/logo.png" className="w-10" alt="logo" />
            <h1 className="text-2xl font-bold text-white">Get-Skillz</h1>
          </div>

          <p className="text-gray-400 leading-6">
            Get-Skillz is your online learning companion.  
            Learn new skills, explore top courses, and grow your career.
          </p>

          <div className="flex gap-4 mt-5">
            <a href="https://www.instagram.com/_.official_amit_/" target="blank" className="hover:text-pink-400">
              <Instagram size={22} />
            </a>

            <a href="https://www.linkedin.com/in/amitgupta44/" target="blank" className="hover:text-blue-400">
              <Linkedin size={22} />
            </a>

            <a href="https://github.com/AmitKumar-990" target="blank" className="hover:text-gray-200">
              <Github size={22} />
            </a>

            <a href="https://youtube.com" target="blank" className="hover:text-red-500">
              <Youtube size={22} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/ExploreCourses" className="hover:text-white">Explore Courses</Link></li>
            <li><Link to="/my-learning" className="hover:text-white">My Learning</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Reviews</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            {/* <li><a href="#" className="hover:text-white">Refund Policy</a></li> */}
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>

          <div className="mt-5">
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              📩 Email:  
              <a href="mailto:getspeeddev@gmail.com" className="text-gray-400 text-sm">
                get.skillz.help@gmail.com
              </a>
            </li>
            <li>
              📞 Phone:
              <a href="tel:+919736213715" className="text-gray-400 text-sm">
                +91 97362 13715
              </a>
            </li>
            <li>
              📍 Location: Himachal Pradesh, India
            </li>
          </ul>
        </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Get-Skillz — All Rights Reserved.
      </div>
    </footer>
  );
}



{/* <div className="mt-5">
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p className="text-gray-400 text-sm">📩 support@getskillz.com</p>
            <p className="text-gray-400 text-sm">📞 +91 7018390589</p>
          </div>
        </div> */}
